// ============================================
// ATIGA COFFEE - UPDATED JAVASCRIPT
// DYNAMIC SCROLL ANIMATIONS
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
        if (hamburger) hamburger.classList.remove('active');
    });
});

// SMOOTH SCROLL & ACTIVE LINK
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
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
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').slice(1);
        if (linkHref === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// DYNAMIC SCROLL ANIMATIONS (FADE IN/OUT)
// ============================================

const observerOptions = {
    threshold: [0, 0.1, 0.5, 1],
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Section masuk viewport - FADE IN
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('fade-out');
        } else {
            // Section keluar viewport - FADE OUT
            entry.target.classList.add('fade-out');
            entry.target.classList.remove('fade-in');
        }
    });
}, observerOptions);

// Apply observer ke semua sections kecuali hero
const sections = document.querySelectorAll('section:not(#home)');
sections.forEach(section => {
    section.classList.add('fade-out'); // Initial state
    scrollObserver.observe(section);
});

// ============================================
// INDIVIDUAL ELEMENT ANIMATIONS (OPTIONAL)
// ============================================

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('element-fade-in');
            entry.target.classList.remove('element-fade-out');
        } else {
            entry.target.classList.add('element-fade-out');
            entry.target.classList.remove('element-fade-in');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Apply to major content elements
document.querySelectorAll('.achievement-content, .section-title, .feature-card, .audience-card, .contact-wrapper').forEach(element => {
    element.classList.add('element-fade-out');
    elementObserver.observe(element);
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
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
        input.style.borderColor = '#EBDBC1';
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
}

// ============================================
// LAZY LOADING IMAGES (OPTIONAL)
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