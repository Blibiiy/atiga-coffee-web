// ============================================
// ATIGA COFFEE - MAIN JAVASCRIPT
// ============================================

// MOBILE MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// SMOOTH SCROLL & ACTIVE LINK
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    input.style.borderColor = '#c73e1d';
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    input.style.borderColor = '#C9B5A0';
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'nameError', 'Nama harus minimal 2 karakter');
        isValid = false;
    } else {
        clearError(nameInput, 'nameError');
    }

    // Validate email
    if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'emailError', 'Email tidak valid');
        isValid = false;
    } else {
        clearError(emailInput, 'emailError');
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'messageError', 'Pesan harus minimal 10 karakter');
        isValid = false;
    } else {
        clearError(messageInput, 'messageError');
    }

    // If all valid, show success message
    if (isValid) {
        alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
        contactForm.reset();
    }
});

// Clear error on input focus
nameInput.addEventListener('focus', () => clearError(nameInput, 'nameError'));
emailInput.addEventListener('focus', () => clearError(emailInput, 'emailError'));
messageInput.addEventListener('focus', () => clearError(messageInput, 'messageError'));

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section and card elements
document.querySelectorAll('.section-title, .feature-card, .audience-card, .story-content, .flavor-content').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// SCROLL-TO-TOP BUTTON (Optional Enhancement)
// ============================================

window.addEventListener('scroll', () => {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300 && scrollButton) {
        scrollButton.style.display = 'block';
    } else if (scrollButton) {
        scrollButton.style.display = 'none';
    }
});

// ============================================
// LAZY LOADING IMAGES (Optional)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}