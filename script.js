// Generated for Handy Experts — static site — no images — animated CSS-only design

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavigation();
    initScrollAnimations();
    initAccordions();
    initServiceCards();
    initTestimonialCarousel();
    initFormEnhancements();
    initSmoothScrolling();
    initAccessibilityEnhancements();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Scroll-based animations using Intersection Observer
function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show all elements immediately if reduced motion is preferred
        const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
        animatedElements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.setAttribute('aria-hidden', 'false');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .card-hover');
    animatedElements.forEach(el => {
        el.setAttribute('aria-hidden', 'true');
        observer.observe(el);
    });
}

// Accordion functionality with keyboard support
function initAccordions() {
    const accordions = document.querySelectorAll('.tips-accordion, .faq-accordion');
    
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                toggleAccordionItem(this);
            });
            
            header.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleAccordionItem(this);
                }
            });
        });
    });
}

function toggleAccordionItem(header) {
    const content = document.getElementById(header.getAttribute('aria-controls'));
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    // Close all other accordion items in the same accordion
    const accordion = header.closest('.tips-accordion, .faq-accordion');
    const allHeaders = accordion.querySelectorAll('.accordion-header');
    const allContents = accordion.querySelectorAll('.accordion-content');
    
    allHeaders.forEach(h => {
        if (h !== header) {
            h.setAttribute('aria-expanded', 'false');
        }
    });
    
    allContents.forEach(c => {
        if (c !== content) {
            c.classList.remove('active');
        }
    });
    
    // Toggle current item
    if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        content.classList.remove('active');
    } else {
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
        
        // Smooth scroll to the opened accordion item
        setTimeout(() => {
            header.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }
}

// Service card flip functionality
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card-detailed');
    
    serviceCards.forEach(card => {
        const flipBtn = card.querySelector('.flip-card-btn');
        let isFlipped = false;
        
        if (flipBtn) {
            flipBtn.addEventListener('click', function() {
                isFlipped = !isFlipped;
                
                if (isFlipped) {
                    card.classList.add('flipped');
                    flipBtn.textContent = 'Back to Overview';
                } else {
                    card.classList.remove('flipped');
                    flipBtn.textContent = 'Learn More';
                }
            });
        }
        
        // Add keyboard support
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                const flipBtn = card.querySelector('.flip-card-btn');
                if (flipBtn && document.activeElement === flipBtn) {
                    event.preventDefault();
                    flipBtn.click();
                }
            }
        });
    });
}

// Testimonial carousel
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonials');
    if (!carousel) return;
    
    const testimonials = carousel.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let intervalId;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function startCarousel() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            intervalId = setInterval(nextTestimonial, 5000);
        }
    }
    
    function stopCarousel() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Auto-play testimonials
    startCarousel();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
    
    // Pause when carousel is not visible
    const carouselObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCarousel();
            } else {
                stopCarousel();
            }
        });
    });
    
    carouselObserver.observe(carousel);
}

// Form enhancements
function initFormEnhancements() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Add real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Handle form submission
        form.addEventListener('submit', function(event) {
            const isValid = validateForm(this);
            
            if (!isValid) {
                event.preventDefault();
                const firstError = this.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    const field = firstError.previousElementSibling;
                    field.focus();
                }
            }
        });
    });
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `${field.previousElementSibling.textContent.replace(' *', '')} is required.`;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)\.]{10,}$/;
        if (!phoneRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Update error display
    if (errorElement) {
        errorElement.textContent = errorMessage;
        field.setAttribute('aria-invalid', !isValid);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
        field.setAttribute('aria-invalid', 'false');
    }
}

function validateForm(form) {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                setTimeout(() => {
                    targetElement.focus({
                        preventScroll: true
                    });
                }, 500);
            }
        });
    });
}

// Accessibility enhancements
function initAccessibilityEnhancements() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.card-hover, .service-card, .team-member');
    
    interactiveElements.forEach(element => {
        // Make cards focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard interaction
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const link = this.querySelector('a, .cta-button');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Announce dynamic content changes
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Monitor accordion state changes for screen readers
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const sectionName = this.textContent.trim();
            
            setTimeout(() => {
                if (isExpanded) {
                    announceToScreenReader(`${sectionName} section collapsed`);
                } else {
                    announceToScreenReader(`${sectionName} section expanded`);
                }
            }, 100);
        });
    });
    
    // Focus management for modal-like interactions
    let lastFocusedElement = null;
    
    // Mobile menu focus trap
    const mobileMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                lastFocusedElement = document.activeElement;
                
                // Focus first interactive element in menu
                setTimeout(() => {
                    const firstLink = mobileMenu.querySelector('a, button');
                    if (firstLink) {
                        firstLink.focus();
                    }
                }, 100);
            } else {
                // Restore focus
                if (lastFocusedElement) {
                    lastFocusedElement.focus();
                    lastFocusedElement = null;
                }
            }
        });
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Reset any mobile menu state on resize
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768 && navMenu && navToggle) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Handle print functionality
window.addEventListener('beforeprint', function() {
    // Expand all accordion items for printing
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach(content => {
        content.style.maxHeight = 'none';
        content.style.overflow = 'visible';
    });
});

window.addEventListener('afterprint', function() {
    // Restore accordion state after printing
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.maxHeight = '';
            content.style.overflow = '';
        }
    });
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Log performance metrics for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', function() {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                console.log('DOM content loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
            }
        });
    }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Service Worker registration (optional for future PWA features)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
