// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Change navbar background when scrolling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Enhanced Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill tags with stagger effect
            if (entry.target.classList.contains('skill-category')) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.animation = `slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s forwards`;
                    }, 100);
                });
            }
            
            // Animate project cards with stagger effect
            if (entry.target.classList.contains('project-card')) {
                const projectsGrid = entry.target.closest('.projects-grid');
                if (projectsGrid) {
                    const allCards = projectsGrid.querySelectorAll('.project-card');
                    const cardIndex = Array.from(allCards).indexOf(entry.target);
                    entry.target.style.animation = `slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${cardIndex * 0.15}s forwards`;
                }
            }
            
            // Animate timeline items
            if (entry.target.classList.contains('timeline-item')) {
                const timeline = entry.target.closest('.timeline');
                if (timeline) {
                    const allItems = timeline.querySelectorAll('.timeline-item');
                    const itemIndex = Array.from(allItems).indexOf(entry.target);
                    entry.target.style.animation = `slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${itemIndex * 0.2}s forwards`;
                }
            }
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Parallax effect on sections
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax on about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection && scrolled > aboutSection.offsetTop - window.innerHeight) {
                const speed = (scrolled - aboutSection.offsetTop + window.innerHeight) * 0.3;
                aboutSection.style.backgroundPositionY = `-${speed}px`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// Project card 3D tilt effect on hover - DISABLED to prevent glitch
// The CSS hover effect is sufficient for a smooth experience

// Form Submission Handler - removed, using EmailJS instead

// Skill tag hover effect with bounce
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.08)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #c9a961 0%, #d4a574 50%, #e6c896 100%);
    z-index: 10001;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(201, 169, 97, 0.5);
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Custom cursor effect
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement('div');
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorOutline);

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-dot, .cursor-outline {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        border-radius: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease, transform 0.15s ease-out;
        z-index: 10000;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #c9a961 0%, #d4a574 100%);
        box-shadow: 0 0 10px rgba(201, 169, 97, 0.6);
    }
    
    .cursor-outline {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(201, 169, 97, 0.4);
    }
    
    @media (hover: hover) and (pointer: fine) {
        .cursor-dot, .cursor-outline {
            opacity: 1;
        }
    }
    
    @media (max-width: 968px) {
        .cursor-dot, .cursor-outline {
            display: none;
        }
    }
    
    /* Hide cursor when over Education section */
    body.in-education .cursor-dot,
    body.in-education .cursor-outline {
        opacity: 0 !important;
        display: none !important;
    }
`;
document.head.appendChild(cursorStyle);

let mouseX = 0, mouseY = 0;
let cursorDotX = 0, cursorDotY = 0;
let cursorOutlineX = 0, cursorOutlineY = 0;

// Track when mouse enters/leaves Education section
const educationSection = document.getElementById('resume');
if (educationSection) {
    educationSection.addEventListener('mouseenter', () => {
        document.body.classList.add('in-education');
    });
    
    educationSection.addEventListener('mouseleave', () => {
        document.body.classList.remove('in-education');
    });
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorDotX += (mouseX - cursorDotX) * 0.8;
    cursorDotY += (mouseY - cursorDotY) * 0.8;
    
    cursorOutlineX += (mouseX - cursorOutlineX) * 0.15;
    cursorOutlineY += (mouseY - cursorOutlineY) * 0.15;
    
    cursorDot.style.left = cursorDotX + 'px';
    cursorDot.style.top = cursorDotY + 'px';
    
    cursorOutline.style.left = cursorOutlineX + 'px';
    cursorOutline.style.top = cursorOutlineY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expand cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-tag, .btn');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Project card click handlers with Google Drive links
const projectCardsClick = document.querySelectorAll('.project-card');
const projectLinks = {
    'network-rail': 'https://drive.google.com/drive/folders/1BsJLbU3wwp6x_HsDhpWfP2p06iBt5eO7?usp=sharing',
    'retail-insight': 'https://drive.google.com/drive/folders/1b1CwM9ydQLgkir6Qgd0GNa1K7Gw7Rwz0?usp=sharing',
    'southern-housing': 'https://drive.google.com/drive/folders/1lUrR8mh9CFlq935bLUeHDYYKILA0COyP?usp=sharing',
    'jp-morgan': 'https://drive.google.com/drive/folders/1dyFLXyGfobFDZ1CO_NQF1Lgd3L93jJFS?usp=sharing',
    'project-sensei': 'https://chatgpt.com/g/g-6906a008c9208191b5ce49f473aed10e-projectsensei-ai',
    'kineticiq': 'https://chatgpt.com/g/g-68f8c5dbb4e88191972bfe3a43de6b21-kinetiq',
    'nudge': 'https://nudgecoach.vercel.app/',
    'urbanfuel': 'https://docs.google.com/spreadsheets/d/1hIV3z_AnTiRE9-ef5n7nuOFHU5YayShWsMixM7evHlI/edit?usp=sharing',
    'pickle': null // Coming soon - no link yet
};

projectCardsClick.forEach(card => {
    card.addEventListener('click', () => {
        const projectType = card.getAttribute('data-project');
        const projectLink = projectLinks[projectType];
        
        if (projectLink) {
            window.open(projectLink, '_blank');
        } else if (projectLink === null) {
            // Pickle - coming soon, do nothing
            return;
        }
    });
    
    // Cursor effect for project cards
    card.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    card.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Add keyframe animations dynamically
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-60px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(animationStyles);

console.log('✨ Portfolio loaded with enhanced animations!');

// Contact Form EmailJS Integration
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.querySelector('span').textContent;
        
        // Change button to loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        emailjs.sendForm('service_vzsx35l', 'template_un2w7fc', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                submitBtn.querySelector('span').textContent = 'Failed. Try Again';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}

// Easter Egg Hunt Game
const easterEggGame = {
    totalStars: 10,
    foundStars: 0,
    starPositions: [],
    gameStarted: false,
    
    init() {
        this.setupButtons();
    },
    
    setupButtons() {
        const yesBtn = document.getElementById('play-yes');
        const noBtn = document.getElementById('play-no');
        
        if (yesBtn) {
            yesBtn.addEventListener('click', () => this.startGame());
        }
        
        if (noBtn) {
            noBtn.addEventListener('click', () => this.declineGame());
        }
    },
    
    startGame() {
        if (this.gameStarted) return;
        
        this.gameStarted = true;
        
        // Hide prompt, show game content
        const prompt = document.getElementById('game-prompt');
        const content = document.getElementById('game-content');
        
        if (prompt) prompt.style.display = 'none';
        if (content) content.classList.remove('hidden');
        
        // Create stars after a short delay
        setTimeout(() => {
            this.createStars();
            this.updateScore();
        }, 500);
    },
    
    declineGame() {
        const prompt = document.getElementById('game-prompt');
        if (prompt) {
            prompt.innerHTML = '<p class="prompt-question" style="color: var(--gold-color);">Maybe next time! 😊</p>';
        }
    },
    
    createStars() {
        // Define sections where eggs can appear (excluding 'home')
        const sections = [
            'about', 'resume', 'work', 
            'projects', 'skills'
        ];
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (!section) return;
            
            // Calculate how many eggs per section (distribute evenly)
            const starsPerSection = Math.floor(this.totalStars / sections.length);
            const extraStars = index < (this.totalStars % sections.length) ? 1 : 0;
            const starsToPlace = starsPerSection + extraStars;
            
            for (let i = 0; i < starsToPlace; i++) {
                this.createStar(section);
            }
        });
    },
    
    createStar(section) {
        const star = document.createElement('div');
        star.className = 'easter-egg-star';
        star.innerHTML = '🥚';
        star.setAttribute('role', 'button');
        star.setAttribute('aria-label', 'Hidden golden egg');
        
        // Random position within the section
        const sectionRect = section.getBoundingClientRect();
        const randomTop = Math.random() * 80 + 10; // 10-90% from top
        const randomLeft = Math.random() * 90 + 5; // 5-95% from left
        
        star.style.top = `${randomTop}%`;
        star.style.left = `${randomLeft}%`;
        
        // Add click handler
        star.addEventListener('click', () => this.collectStar(star));
        
        section.style.position = 'relative';
        section.appendChild(star);
    },
    
    collectStar(star) {
        if (star.classList.contains('collected')) return;
        
        star.classList.add('collected');
        this.foundStars++;
        this.updateScore();
        
        // Play collection sound effect (visual feedback)
        star.style.pointerEvents = 'none';
        
        setTimeout(() => {
            star.remove();
        }, 600);
        
        // Check if all stars collected
        if (this.foundStars === this.totalStars) {
            this.showCompletionMessage();
        }
    },
    
    updateScore() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `${this.foundStars}/${this.totalStars}`;
        }
    },
    
    showCompletionMessage() {
        const messageBox = document.getElementById('completion-message');
        const messageText = document.getElementById('completion-text');
        
        if (messageBox && messageText) {
            let message = '';
            
            if (this.foundStars === this.totalStars) {
                message = `You found ${this.foundStars}/${this.totalStars} golden eggs — looks like you pay attention to detail! 👀 This skill is exactly what makes great work happen.`;
            }
            
            messageText.textContent = message;
            messageBox.classList.remove('hidden');
            
            // Scroll to show the message
            messageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
};

// Initialize the game when page loads
window.addEventListener('load', () => {
    easterEggGame.init();
});

// Skills Section Toggle
const skillsToggleBtn = document.getElementById('skills-toggle-btn');
const skillsFullList = document.getElementById('skills-full-list');

if (skillsToggleBtn && skillsFullList) {
    skillsToggleBtn.addEventListener('click', () => {
        skillsFullList.classList.toggle('hidden');
        skillsToggleBtn.classList.toggle('active');
        
        const btnText = skillsToggleBtn.querySelector('span');
        if (skillsFullList.classList.contains('hidden')) {
            btnText.textContent = 'Show Full Skill List';
        } else {
            btnText.textContent = 'Hide Full Skill List';
        }
    });
}

// Resume Download Handler
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = 'documents/Aryan_Subhash_Resume.pdf';
        link.download = 'Aryan_Subhash_Resume.pdf';
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
