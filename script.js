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

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form?.querySelector('.form-submit');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            alert(`Thank you ${data.name}! Your message has been sent. I'll get back to you soon at ${data.email}.`);
            
            // Reset form
            form.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Add smooth reveal animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.project-card, .achievement-card, .skill-item, .contact-card, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });
}

// Add parallax effect to hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.3;
        }
    });
}

// Add cursor trail effect (optional, subtle)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Interactive Code Window Tabs
function initCodeTabs() {
    const tabs = document.querySelectorAll('.window-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.querySelector(`.tab-content[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Interactive Splash Screen with Moving START Button
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const startButton = document.getElementById('startButton');
    
    if (!splashScreen || !startButton) return;
    
    let buttonPosition = { x: 50, y: 50 }; // Percentage positions
    let isMoving = false;
    let lastMoveTime = 0;
    let moveCount = 0;
    
    // Set initial position (bottom center - ticket button stays at bottom)
    startButton.style.position = 'absolute';
    startButton.style.left = '50%';
    startButton.style.bottom = '60px';
    startButton.style.transform = 'translateX(-50%)';
    
    // Make button move when mouse approaches (but less aggressively)
    document.addEventListener('mousemove', (e) => {
        if (isMoving) return;
        
        const now = Date.now();
        // Throttle movement - only check every 100ms
        if (now - lastMoveTime < 100) return;
        lastMoveTime = now;
        
        const rect = startButton.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
        );
        
        // Only move if mouse is very close (80px) and button hasn't moved too many times
        // After 3 moves, stop moving so user can click
        if (distance < 80 && !isMoving && moveCount < 3) {
            isMoving = true;
            moveCount++;
            
            // Calculate new random position (keep at bottom, only move horizontally)
            const newX = Math.random() * 70 + 15; // 15% to 85%
            
            buttonPosition.x = newX;
            
            startButton.style.left = `${buttonPosition.x}%`;
            startButton.style.bottom = '60px';
            startButton.style.transition = 'all 0.4s ease-out';
            
            setTimeout(() => {
                isMoving = false;
                startButton.style.transition = '';
                
                // After 2 seconds of no movement, reset move count
                setTimeout(() => {
                    if (moveCount >= 3) {
                        moveCount = 0;
                    }
                }, 2000);
            }, 400);
        }
    });
    
    // Handle button click
    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        splashScreen.style.transition = 'opacity 0.6s ease-out, visibility 0.6s ease-out';
        splashScreen.classList.add('hidden');
        document.body.classList.add('loaded');
    });
    
    // Also allow clicking even if button is moving
    startButton.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}

// Expand/Collapse Project Cards
function initProjectExpand() {
    const projectCards = document.querySelectorAll('.compact-project-card');
    
    projectCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        if (!expandBtn) return;
        
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = card.getAttribute('data-expanded') === 'true';
            card.setAttribute('data-expanded', !isExpanded);
        });
        
        // Also allow clicking the card itself
        card.addEventListener('click', (e) => {
            if (e.target !== expandBtn && !expandBtn.contains(e.target)) {
                const isExpanded = card.getAttribute('data-expanded') === 'true';
                card.setAttribute('data-expanded', !isExpanded);
            }
        });
    });
}

// Neural Network Connections
function initNeuralNetwork() {
    const svg = document.getElementById('neuralSVG');
    if (!svg) return;
    
    const container = document.querySelector('.neural-network-container');
    if (!container) return;
    
    const neuronNodes = document.querySelectorAll('.network-node');
    
    if (neuronNodes.length === 0) return;
    
    // Set SVG dimensions
    const containerRect = container.getBoundingClientRect();
    svg.setAttribute('width', containerRect.width);
    svg.setAttribute('height', containerRect.height);
    
    // No gradient needed for black and white design
    
    // Get creator core center position
    const creatorCore = document.getElementById('creatorCore');
    if (!creatorCore) return;
    
    const coreRect = creatorCore.getBoundingClientRect();
    const containerRect2 = container.getBoundingClientRect();
    // Connect from center of the core
    const creatorX = coreRect.left + coreRect.width / 2 - containerRect2.left;
    const creatorY = coreRect.top + coreRect.height / 2 - containerRect2.top;
    
    // Draw curved connections from creator figure to project nodes (4 corners)
    neuronNodes.forEach((node, index) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left + nodeRect.width / 2 - containerRect2.left;
        const nodeY = nodeRect.top + nodeRect.height / 2 - containerRect2.top;
        
        // Determine connection point based on position
        let startX = creatorX;
        let startY = creatorY;
        
        // Top nodes connect from upper body, bottom nodes from lower body
        if (nodeY < creatorY) {
            // Top nodes - connect from upper body/chest
            startY = creatorY - 30;
        } else {
            // Bottom nodes - connect from lower body/waist
            startY = creatorY + 30;
        }
        
        // Calculate control points for smooth curved path (X pattern)
        const dx = nodeX - startX;
        const dy = nodeY - startY;
        
        // Create curved bezier path with crossing effect
        const controlX1 = startX + dx * 0.4;
        const controlY1 = startY + dy * 0.3;
        const controlX2 = startX + dx * 0.6;
        const controlY2 = startY + dy * 0.7;
        
        // Base connection line (subtle)
        const basePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${nodeX} ${nodeY}`;
        basePath.setAttribute('d', pathData);
        basePath.setAttribute('class', 'connection-line');
        svg.appendChild(basePath);
        
        // Energy current flowing along the path
        const energyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        energyPath.setAttribute('d', pathData);
        energyPath.setAttribute('class', 'energy-line');
        energyPath.style.animationDelay = `${index * 0.25}s`;
        svg.appendChild(energyPath);
        
        // Energy particle (bright spot traveling)
        const particlePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        particlePath.setAttribute('d', pathData);
        particlePath.setAttribute('class', 'energy-particle');
        particlePath.style.animationDelay = `${index * 0.25 + 0.6}s`;
        svg.appendChild(particlePath);
        
        // Add hover effect to nodes
        node.addEventListener('mouseenter', () => {
            energyPath.style.strokeWidth = '5';
            energyPath.style.filter = 'drop-shadow(0 0 12px rgba(34, 197, 94, 1))';
            particlePath.style.strokeWidth = '6';
            basePath.style.opacity = '0.7';
        });
        
        node.addEventListener('mouseleave', () => {
            energyPath.style.strokeWidth = '4';
            energyPath.style.filter = 'drop-shadow(0 0 8px rgba(34, 197, 94, 1))';
            particlePath.style.strokeWidth = '5';
            basePath.style.opacity = '0.5';
        });
    });
    
    // Update on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            svg.innerHTML = '';
            initNeuralNetwork();
        }, 250);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initSplashScreen();
    initCodeTyping();
    initCodeTabs();
    initContactForm();
    initRevealAnimations();
    initParallax();
    setTimeout(() => {
        initNeuralNetwork();
    }, 500);
    initProjectExpand();
    // initCursorEffect(); // Uncomment for cursor effect
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

