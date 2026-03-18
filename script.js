// ─── GSAP Tunnel Camera Effect ────────────────────────────────────────────────
// Gentle entrance / exit that never fully hides content so background stays visible
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate individual timeline cards for stagger entry
    document.querySelectorAll('.tunnel-section .timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
            { y: 45, opacity: 0, scale: 0.96 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.85,
                delay: (i % 3) * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate section titles
    document.querySelectorAll('.tunnel-section .section-title').forEach((title) => {
        gsap.fromTo(title,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate project cards
    document.querySelectorAll('.tunnel-section .project-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 50, opacity: 0, scale: 0.93 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.9,
                delay: (i % 3) * 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// ─── Work Experience: Slide in from right on scroll ──────────────────────────
(function initWorkAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('.work-card').forEach((card, i) => {
        gsap.fromTo(
            card,
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.75,
                delay: i * 0.08,             // slight cascade between cards
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });
})();

// ─── Education Section: Cards fade-up + tags stagger ─────────────────────────
(function initEducationAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Cards (edu-card) fade up
    const eduCards = document.querySelectorAll('.edu-card');
    if (eduCards.length) {
        gsap.fromTo(
            eduCards,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.75,
                ease: 'power2.out',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '#resume',
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            }
        );
    }

    // Each edu-tags group: stagger the individual pill tags
    document.querySelectorAll('.edu-tags').forEach((group, gi) => {
        const tags = group.querySelectorAll('.edu-tag');
        gsap.fromTo(
            tags,
            { y: 8, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.04,              // 40ms between each tag
                scrollTrigger: {
                    trigger: group,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
})();

// ─── Skills: Tech Badge Pill Grid stagger on scroll ──────────────────────────
(function initSkillsAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const pills = document.querySelectorAll('.skill-pill');
    if (!pills.length) return;

    gsap.fromTo(
        pills,
        { y: 16, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.06,              // 60ms between each pill — clean cascade
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 78%',
                toggleActions: 'play none none none',
            },
        }
    );
})();

// About Section Read More Toggle
function toggleAbout() {
    const expanded = document.getElementById('aboutExpanded');
    const btn = document.getElementById('readMoreBtn');
    const label = document.getElementById('readMoreLabel');
    if (!expanded) return;

    const isOpen = expanded.classList.contains('open');
    expanded.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    label.textContent = isOpen ? 'Read More' : 'Read Less';
}

// Generate Sparkles for the Hero Overlay
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('sparkles-container');
    if (!container) return;
    
    // Create 75 random sparkling stars
    for (let i = 0; i < 75; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position, size, and animation delay
        const size = Math.random() * 2.5 + 1; // 1px to 3.5px
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        
        // Random twinkle duration and delay
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.animationDelay = `${delay}s`;
        
        // Vary the opacity
        sparkle.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(sparkle);
    }
});

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
const navbar = document.querySelector('.web3-nav');
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
const navLinks = document.querySelectorAll('.nav-links-centered a');

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

// ============================================
// PROJECTS ANIMATIONS
// ============================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Animate Featured Projects (Stagger fade up)
    gsap.from('.featured-card', {
        scrollTrigger: {
            trigger: '.featured-grid',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Animate Other Work Projects (Stagger fade up)
    gsap.from('.other-grid .project-card', {
        scrollTrigger: {
            trigger: '.other-grid',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

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

// ─── Terminal Easter Egg ───────────────────────────────────────────────────────
const terminal = {
    output: null,
    input: null,
    body: null,
    isTyping: false,

    commands: {
        help: "Available commands:\n<span style='color:#00ff41'>help, skills, experience, projects, hire, fun, arsenal, clear, whoami</span>",
        skills: "Power BI · SQL · Python · DAX · Azure · FastAPI · React · LangGraph · OpenAI API · Supabase",
        experience: "Cloudnine IT Services (2025 - Present)\nSouthern Housing (2023 - 2024)\nFiverr (2021 - 2022)\nGlorydale (2021 - 2022)",
        projects: "<a href='#projects' style='color:#00d4ff; text-decoration:underline;'>Cascade AI</a>\n<a href='#projects' style='color:#00d4ff; text-decoration:underline;'>AXIO</a>\n<a href='#projects' style='color:#00d4ff; text-decoration:underline;'>Savora</a>\n<a href='#projects' style='color:#00d4ff; text-decoration:underline;'>Silver Lining</a>",
        hire: "Smart move. Reach me at aryansubhash20@gmail.com — let's build something.",
        fun: "I once built an entire AI healthcare system in 48 hours for a hackathon. Still running.",
        arsenal: "We go again. Always. ⚽🔴",
        whoami: "Aryan Subhash. Analyst by profession. AI builder by passion."
    },

    init() {
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
        this.body = document.getElementById('terminalBody');

        if (!this.output || !this.input) return;

        // Ensure focus stays on input when clicking terminal
        this.body.addEventListener('click', () => {
            // Only focus if text is not being selected
            if (window.getSelection().toString() === '') {
                this.input.focus();
            }
        });

        this.input.addEventListener('keydown', (e) => this.handleInput(e));

        // Initial boot sequence observer (run once when scrolled into view)
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.disconnect();
                setTimeout(() => this.bootSequence(), 500);
            }
        }, { threshold: 0.5 });
        
        const termSection = document.getElementById('game');
        if (termSection) observer.observe(termSection);
    },

    async bootSequence() {
        this.input.disabled = true;
        await this.typeLines([
            "> Initialising Aryan's system...",
            "> Access granted. Type 'help' to explore."
        ]);
        this.input.disabled = false;
        this.input.focus();
    },

    async handleInput(e) {
        if (e.key !== 'Enter' || this.isTyping) return;

        const val = this.input.value.trim();
        if (!val) return;

        // Echo command
        const promptLine = document.createElement('div');
        promptLine.innerHTML = `<span style="color:#00ff41">aryan@portfolio:~$</span> ${val}`;
        this.output.appendChild(promptLine);
        
        this.input.value = '';
        this.input.disabled = true;
        this.scrollToBottom();

        const lowerVal = val.toLowerCase();

        if (lowerVal === 'clear') {
            this.output.innerHTML = '';
        } else {
            const response = this.commands[lowerVal] || `command not found: ${val}. Type 'help' for available commands.`;
            // Split by newline if it's a multiline string
            const lines = response.split('\n');
            await this.typeLines(lines, 30);
        }

        this.input.disabled = false;
        this.input.focus();
        this.scrollToBottom();
    },

    async typeLines(lines, delayPerLine = 300) {
        this.isTyping = true;
        for (let i = 0; i < lines.length; i++) {
            const lineDiv = document.createElement('div');
            lineDiv.innerHTML = lines[i];
            this.output.appendChild(lineDiv);
            this.scrollToBottom();
            
            if (i < lines.length - 1) {
                await new Promise(r => setTimeout(r, delayPerLine));
            }
        }
        this.isTyping = false;
    },

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }
};

window.addEventListener('load', () => {
    terminal.init();
});

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

// ==========================================
// 3D Background Setup (Three.js WebGL + GLSL Shader)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // We use an Orthographic camera and a plane to run a full-screen GLSL Fragment Shader
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: false, antialias: false });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_scroll: { value: 0.0 }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform float u_scroll;

            // Simple 3D noise function for the swirling cosmic dust
            float hash(vec3 p) {
                p  = fract( p*0.3183099+.1 );
                p *= 17.0;
                return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
            }

            float noise(in vec3 x) {
                vec3 i = floor(x);
                vec3 f = fract(x);
                f = f*f*(3.0-2.0*f);
                return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                               mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                           mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                               mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
            }

            // Fractal Brownian Motion (FBM) for complex cloudy textures
            float fbm(vec3 p) {
                float f = 0.0;
                float w = 0.5;
                for (int i = 0; i < 5; i++) {
                    f += w * noise(p);
                    p *= 2.0;
                    w *= 0.5;
                }
                return f;
            }

            void main() {
                // Normalize pixel coordinates
                vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

                // Adjust time based on scroll to "dive" into the vortex
                float t = u_time * 0.4 + (u_scroll * 0.005);
                
                // Get polar coordinates (radius and angle)
                float r = length(uv);
                float angle = atan(uv.y, uv.x);
                
                // The Vortex Twist: angle changes based on distance (closer to center = drastically more twisted)
                // This creates the massive black hole spiral effect
                float twist = 2.0 / (r + 0.1);
                angle -= twist + t;
                
                // Convert back to cartesian coordinates after twisting
                vec2 twistedUV = vec2(cos(angle), sin(angle)) * r;

                // Generate volumetric gas clouds
                // We sample 3D FBM noise using our twisted 2D UVs and time (Z)
                vec3 noisePos = vec3(twistedUV * 3.0, t * 1.5);
                
                // Layer multiple frequencies of noise
                float n1 = fbm(noisePos);
                float n2 = fbm(noisePos * 2.0 + vec3(10.0));
                
                // Combine masks to create wispy, tearing gas
                float gas = smoothstep(0.2, 0.8, n1 * n2 * 2.0);
                
                // Create the Black Hole event horizon masking
                // Completely black in the dead center
                float blackHole = smoothstep(0.1, 0.4, r);
                
                // The Accretion Disk glow (brightest just outside the black hole)
                float accretionDisk = smoothstep(0.0, 0.2, r) * smoothstep(0.8, 0.2, r);

                // Colors matches the EOS reference (deep blue/cyan/white)
                vec3 deepSpace = vec3(0.01, 0.05, 0.15);
                vec3 cyanGlow = vec3(0.1, 0.7, 1.0);
                vec3 hotWhite = vec3(0.9, 0.95, 1.0);

                // Build the final color
                vec3 color = deepSpace * gas;
                color += cyanGlow * gas * accretionDisk * 2.0;
                color += hotWhite * pow(gas * accretionDisk, 3.0) * 4.0;
                
                // Apply the black hole mask to eat all light at the center
                color *= blackHole;

                // Subtle background stars moving along the twist
                float starNoise = hash(vec3(floor(angle * 10.0), floor(r * 10.0), floor(t * 0.1)));
                float star = pow(starNoise, 100.0) * blackHole;
                color += vec3(star);

                // Optional: slight vignette at the very edges of the screen
                color *= smoothstep(1.5, 0.5, r);

                gl_FragColor = vec4(color, 1.0);
            }
        `
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Resize Handler
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    });

    // Scroll Handler affecting vortex velocity/depth
    window.addEventListener('scroll', () => {
        uniforms.u_scroll.value = window.scrollY;
    });

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    }
    
    animate();
});
