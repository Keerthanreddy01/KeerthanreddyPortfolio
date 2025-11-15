// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.section, .project-card-large, .achievement-card, .skill-item, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Enhanced typing effect - only name appears
function initCodeTyping() {
    const codeWindow = document.querySelector('.large-code-window');
    if (!codeWindow) return;

    const nameElement = codeWindow.querySelector('.typing-name');
    const fadeLines = codeWindow.querySelectorAll('.fade-in');
    const cursor = codeWindow.querySelector('.cursor-blink');
    
    if (!nameElement) return;

    const name = 'Keerthan Reddy';
    let charIndex = 0;
    let isTyping = false;

    function typeName() {
        if (isTyping) return;
        isTyping = true;

        const typeInterval = setInterval(() => {
            if (charIndex < name.length) {
                nameElement.textContent += name.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                isTyping = false;
                
                // Hide cursor after name is complete
                setTimeout(() => {
                    if (cursor) cursor.style.opacity = '0';
                }, 500);
                
                // Fade in other lines
                setTimeout(() => {
                    fadeLines.forEach((line, index) => {
                        setTimeout(() => {
                            line.style.opacity = '1';
                        }, index * 200);
                    });
                }, 300);
            }
        }, 120);
    }

    // Start typing when code window is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => typeName(), 500);
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (codeWindow) {
        heroObserver.observe(codeWindow);
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initCodeTyping();
});

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Add mobile menu button if screen is small
    if (window.innerWidth <= 768) {
        // Mobile menu functionality can be added here
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add hover effects to cards
document.querySelectorAll('.project-card-large, .achievement-card, .skill-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue && !isNaN(statValue.textContent)) {
                const target = parseInt(statValue.textContent);
                animateCounter(statValue, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.project-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// Add active state to navigation links based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();
}

// Initialize on load
window.addEventListener('load', () => {
    initMobileMenu();
    updateActiveNavLink();
    initScrollProgress();
});

