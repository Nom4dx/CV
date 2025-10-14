// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 75,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
        
        // Add active class to nav links based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        }
    });
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.content-card, .skill-card, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            contactForm.innerHTML = `
                <div class="alert alert-success">
                    <h4>Message Sent!</h4>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
            `;
        });
    }
    
    // Add cybersecurity-themed decorative elements
    const addCyberDecorations = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            // Add cyber grid to alternating sections
            if (index % 2 === 0) {
                const cyberGrid = document.createElement('div');
                cyberGrid.classList.add('cyber-grid');
                section.appendChild(cyberGrid);
            }
            
            // Add circuit patterns to some sections
            if (index % 3 === 0) {
                const cyberCircuit = document.createElement('div');
                cyberCircuit.classList.add('cyber-circuit');
                cyberCircuit.style.top = Math.random() * 70 + '%';
                cyberCircuit.style.left = Math.random() * 70 + '%';
                cyberCircuit.style.top = Math.random() * 70 + '%';
                cyberCircuit.style.left = Math.random() * 70 + '%';
                section.appendChild(cyberCircuit);
            }
        });
    };
    
    // Add decorations after page load
    window.addEventListener('load', addCyberDecorations);
    
    // Add glow effect to cards
    const cards = document.querySelectorAll('.content-card, .skill-card, .project-card');
    cards.forEach(card => {
        card.classList.add('glow-effect');
    });
    
    // Typing effect for hero section
    const heroText = document.querySelector('.hero-section h1');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Add counter animation for skills
    const startCounters = function() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    };
    
    // Initialize counters when they come into view
    const observeCounters = function() {
        const countersSection = document.querySelector('#skills');
        
        if (countersSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startCounters();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(countersSection);
        }
    };
    
    // Initialize counter observation
    observeCounters();
    
    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Add particle background effect
    const createParticles = function() {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particles-container');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 1-3px
            const size = Math.random() * 2 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.position = 'absolute';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Styling
            particle.style.backgroundColor = 'rgba(0, 188, 212, 0.7)';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px rgba(0, 188, 212, 0.5)';
            
            // Animation
            particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
            
            particleContainer.appendChild(particle);
        }
        
        // Add keyframes for the animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize particles
    createParticles();
    
    // Add digital clock to footer
    const addDigitalClock = function() {
        const clockContainer = document.createElement('div');
        clockContainer.classList.add('digital-clock');
        clockContainer.style.fontSize = '0.9rem';
        clockContainer.style.color = 'var(--text-muted)';
        clockContainer.style.marginTop = '10px';
        
        const footer = document.querySelector('.footer .col-md-6:last-child');
        if (footer) {
            footer.appendChild(clockContainer);
            
            const updateClock = function() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                
                clockContainer.textContent = `${hours}:${minutes}:${seconds} UTC${now.getTimezoneOffset() / -60 > 0 ? '+' : ''}${now.getTimezoneOffset() / -60}`;
            };
            
            // Update clock immediately and then every second
            updateClock();
            setInterval(updateClock, 1000);
        }
    };
    
    // Initialize digital clock
    addDigitalClock();
});