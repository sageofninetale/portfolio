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

// ============================================
// PROJECTS BENTO GRID + MODAL SYSTEM
// ============================================

// Centralized project data array (10 projects total with complete details)
const projectsData = [
    {
        id: 'network-rail',
        title: 'Route Performance: Delay Insights',
        category: 'DATA/BI',
        client: 'Network Rail',
        tags: ['data'],
        details: [
            'Built comprehensive dashboard tracking station accessibility improvements across UK railway network',
            'Created interactive visualizations of compliance metrics and project timelines',
            'Developed regional performance indicators for infrastructure modernization initiatives',
            'Automated reporting system reducing manual analysis time by 70%'
        ],
        tools: ['Power BI', 'SQL', 'Python', 'Excel'],
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2148&auto=format&fit=crop',
        sizeClass: 'bento-span-2x1',
        liveUrl: null,
        moreUrl: 'https://drive.google.com/drive/folders/1BsJLbU3wwp6x_HsDhpWfP2p06iBt5eO7?usp=sharing'
    },
    {
        id: 'retail-insight',
        title: 'Sales, Cancellations & Margins',
        category: 'DATA/BI',
        client: 'Retail Insight',
        tags: ['data'],
        details: [
            'Advanced analytics platform for retail performance optimization',
            'Integrated sales forecasting with 92% accuracy using time-series models',
            'Customer segmentation analysis driving targeted marketing campaigns',
            'Inventory management optimization reducing stockouts by 35%'
        ],
        tools: ['Tableau', 'SQL', 'Python', 'R'],
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: null,
        moreUrl: 'https://drive.google.com/drive/folders/1b1CwM9ydQLgkir6Qgd0GNa1K7Gw7Rwz0?usp=sharing'
    },
    {
        id: 'southern-housing',
        title: 'AI Chatbot: Human-Centric Approach',
        category: 'AI/ML',
        client: 'Southern Housing Group',
        tags: ['ai'],
        details: [
            'Designed AI chatbot for tenant support with natural language understanding',
            'Measured tenant satisfaction and property maintenance efficiency metrics',
            'Delivered actionable insights for affordable housing management',
            'Achieved 85% first-contact resolution rate with 24/7 availability'
        ],
        tools: ['OpenAI API', 'Python', 'NLP', 'Azure'],
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: null,
        moreUrl: 'https://drive.google.com/drive/folders/1lUrR8mh9CFlq935bLUeHDYYKILA0COyP?usp=sharing'
    },
    {
        id: 'jp-morgan',
        title: 'Crypto & Mutual Funds as Inflation Hedges',
        category: 'FINANCE',
        client: 'JP Morgan Chase',
        tags: ['finance'],
        details: [
            'Enterprise risk assessment framework analyzing portfolio diversification',
            'Created predictive models for credit risk evaluation using machine learning',
            'Developed automated reporting systems for regulatory compliance',
            'Analyzed market volatility patterns across 50+ asset classes'
        ],
        tools: ['Python', 'R', 'SQL', 'Excel', 'Bloomberg Terminal'],
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
        sizeClass: 'bento-span-2x1',
        liveUrl: null,
        moreUrl: 'https://drive.google.com/drive/folders/1dyFLXyGfobFDZ1CO_NQF1Lgd3L93jJFS?usp=sharing'
    },
    {
        id: 'nudge',
        title: 'Nudge — AI Habit Tracker',
        category: 'AI/ML',
        client: 'Personal Project',
        tags: ['ai', 'web'],
        details: [
            'AI-powered fitness and wellness coaching platform with personalized recommendations',
            'Built workout tracking system with progress analytics and goal monitoring',
            'Developed nutrition planning features with calorie and macro tracking',
            'Implemented ML models for habit formation prediction and motivation triggers'
        ],
        tools: ['Next.js', 'OpenAI API', 'Supabase', 'Tailwind CSS'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: 'https://nudgecoach.vercel.app/',
        moreUrl: null
    },
    {
        id: 'urbanfuel',
        title: '7-Year Financial Forecasting Model',
        category: 'FINANCE',
        client: 'UrbanFuel Coffee Ltd',
        tags: ['finance', 'data'],
        details: [
            'Built comprehensive 7-year financial projection model for coffee chain expansion',
            'Carbon footprint tracking and sustainability metrics dashboard',
            'Analyzed environmental impact data to optimize eco-friendly delivery routes',
            'Revenue forecasting with scenario analysis for 15+ locations'
        ],
        tools: ['Excel', 'Python', 'Tableau', 'SQL'],
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: null,
        moreUrl: 'https://docs.google.com/spreadsheets/d/1hIV3z_AnTiRE9-ef5n7nuOFHU5YayShWsMixM7evHlI/edit?usp=sharing'
    },
    {
        id: 'kineticiq',
        title: 'KineticIQ — AI for Physiotherapists',
        category: 'AI/ML',
        client: 'Healthcare AI',
        tags: ['ai', 'web'],
        details: [
            'Performance analytics platform for athletes and physiotherapy coaches',
            'Developed biomechanics tracking using computer vision and pose estimation',
            'Built injury prevention models with predictive risk scoring',
            'Training optimization algorithms improving recovery time by 25%'
        ],
        tools: ['OpenAI GPT-4', 'Python', 'TensorFlow', 'React'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: 'https://chatgpt.com/g/g-68f8c5dbb4e88191972bfe3a43de6b21-kinetiq',
        moreUrl: null
    },
    {
        id: 'project-sensei',
        title: 'Project Sensei AI — Dev Agent',
        category: 'WEB',
        client: 'Personal Project',
        tags: ['ai', 'web'],
        details: [
            'Intelligent project management assistant built on ChatGPT platform',
            'Helps teams with task planning, deadline tracking, and resource allocation',
            'Automated progress reporting through natural language interactions',
            'Integrated with GitHub, Jira, and Slack for seamless workflow'
        ],
        tools: ['OpenAI GPT-4', 'Node.js', 'API Integration'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: 'https://chatgpt.com/g/g-6906a008c9208191b5ce49f473aed10e-projectsensei-ai',
        moreUrl: null
    },
    {
        id: 'savora',
        title: 'Savora — The Smart Way to Eat',
        category: 'AI/ML',
        client: 'Savora (Personal Product)',
        tags: ['ai', 'web'],
        description: 'AI-powered nutrition and meal intelligence platform that personalises meals based on ingredients, dietary goals, and time.',
        details: [
            'Detects ingredients from fridge photos or manual input',
            'Supports multiple cuisines (Indian, Japanese, Chinese, Mediterranean, etc.)',
            'Allows dietary preferences (gym-ready, healthy, vegan, veg, clean eating)',
            'Generates meals based on available time (15, 25, 35 minutes)',
            'Calculates calories, protein, fats, and nutrition breakdown',
            'Provides step-by-step cooking instructions',
            'Allows refreshing individual recipes without restarting'
        ],
        tools: ['Next.js', 'OpenAI API', 'Vercel', 'Tailwind CSS'],
        image: 'images/logos/savora-landing.png',
        sizeClass: 'bento-span-2x1',
        liveUrl: 'https://savora-479460496934.us-west1.run.app/',
        moreUrl: null
    },
    {
        id: 'portfolio-site',
        title: 'Interactive Portfolio Website',
        category: 'WEB',
        client: 'Personal Project',
        tags: ['web'],
        details: [
            'Modern portfolio showcasing data analytics and AI projects',
            'Interactive visualizations with smooth animations and transitions',
            'Engaging Easter egg game built with vanilla JavaScript',
            'Responsive design with custom CSS and performance optimization'
        ],
        tools: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'GitHub Pages'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        sizeClass: 'bento-medium',
        liveUrl: 'https://sageofninetale.github.io/portfolio/#home',
        moreUrl: 'https://github.com/sageofninetale/portfolio'
    }
];

// DOM elements
const bentoGrid = document.getElementById('bentoGrid');
const filterButtons = document.querySelectorAll('.filter-chip');

let currentFilter = 'all';

// Filter projects based on category
function getFilteredProjects() {
    if (currentFilter === 'all') {
        return projectsData;
    }
    return projectsData.filter(project => project.tags.includes(currentFilter));
}

// Render bento grid with embedded expand content INSIDE each tile
function renderBentoGrid() {
    const filtered = getFilteredProjects();
    
    if (filtered.length === 0) {
        bentoGrid.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); grid-column: 1/-1; padding: 2rem;">No projects found in this category.</p>';
        return;
    }
    
    bentoGrid.innerHTML = filtered.map((project, index) => {
        const categoryLabel = project.category === 'data' ? 'DATA/BI' : 
                             project.category === 'ai' ? 'AI/ML' : 
                             project.category === 'finance' ? 'FINANCE' : 'WEB';
        
        const bullets = project.details.slice(0, 6).map(detail => 
            `<li>${detail}</li>`
        ).join('');
        
        // Helper to check if value exists and is non-empty
        const hasText = (v) => typeof v === 'string' && v.trim().length > 0;
        
        // Conditional button rendering - only show if URL exists
        const liveBtn = hasText(project.liveUrl) 
            ? `<a href="${project.liveUrl}" target="_blank" class="project-expand-btn primary">
                 <i class="fas fa-external-link-alt"></i> Live Demo
               </a>`
            : '';
        
        const caseBtn = hasText(project.moreUrl)
            ? `<a href="${project.moreUrl}" target="_blank" class="project-expand-btn secondary">
                 <i class="fas fa-file-alt"></i> Case Study
               </a>`
            : '';
        
        // Only render actions container if at least one button exists
        const actionsHtml = (liveBtn || caseBtn) 
            ? `<div class="project-expand-actions">
                 ${liveBtn}
                 ${caseBtn}
               </div>`
            : '';
        
        // Conditional description rendering - only if field exists
        const descHtml = hasText(project.description) 
            ? `<p class="project-expand-desc">${project.description}</p>`
            : '';
        
        return `
        <div class="bento-tile ${project.sizeClass}" 
             data-id="${project.id}"
             data-category="${project.category}"
             role="button"
             aria-expanded="false"
             aria-label="View ${project.title} details"
             tabindex="0">
            <img src="${project.image}" alt="${project.title}" class="bento-bg" loading="lazy">
            <div class="bento-overlay"></div>
            <div class="bento-label">
                <h4>${project.title}</h4>
                <span class="bento-category">${categoryLabel}</span>
            </div>
            <div class="project-expand-content">
                <button class="project-expand-close" aria-label="Close details">
                    <i class="fas fa-times"></i>
                </button>
                <div class="project-expand-inner">
                    <div class="project-expand-header">
                        <span class="project-expand-company">${project.client}</span>
                        <h3 class="project-expand-title">${project.title}</h3>
                        <span class="project-expand-category">${categoryLabel}</span>
                        ${descHtml}
                    </div>
                    <div class="project-expand-body">
                        <ul class="project-expand-bullets">
                            ${bullets}
                        </ul>
                        ${actionsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    // Attach event listeners
    attachProjectListeners();
}

// Toggle card expansion (expand WITHIN the card itself)
function toggleCard(tile) {
    const isExpanded = tile.classList.contains('is-expanded');
    
    // Close all other cards first
    document.querySelectorAll('.bento-tile.is-expanded').forEach(t => {
        if (t !== tile) {
            t.classList.remove('is-expanded');
            t.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Toggle clicked card
    if (isExpanded) {
        tile.classList.remove('is-expanded');
        tile.setAttribute('aria-expanded', 'false');
    } else {
        tile.classList.add('is-expanded');
        tile.setAttribute('aria-expanded', 'true');
    }
}

// Attach event listeners to all tiles
function attachProjectListeners() {
    const tiles = bentoGrid.querySelectorAll('.bento-tile');
    
    tiles.forEach(tile => {
        // Main tile click (but not on expand content or buttons)
        tile.addEventListener('click', (e) => {
            // Ignore clicks on close button or action buttons
            if (e.target.closest('.project-expand-close') || 
                e.target.closest('.project-expand-btn')) {
                return;
            }
            // Ignore clicks inside expanded content
            if (tile.classList.contains('is-expanded') && 
                e.target.closest('.project-expand-inner')) {
                return;
            }
            toggleCard(tile);
        });
        
        // Keyboard support
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(tile);
            }
        });
        
        // Close button
        const closeBtn = tile.querySelector('.project-expand-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                tile.classList.remove('is-expanded');
                tile.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// Close all expanded cards
function closeAllCards() {
    document.querySelectorAll('.bento-tile.is-expanded').forEach(tile => {
        tile.classList.remove('is-expanded');
        tile.setAttribute('aria-expanded', 'false');
    });
}

// ESC key closes all expanded cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllCards();
    }
});

// Filter button handlers
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update filter
        const newFilter = button.getAttribute('data-filter');
        
        // Close all expanded cards when filtering
        closeAllCards();
        
        currentFilter = newFilter;
        renderBentoGrid();
    });
    
    // Keyboard support for filters
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// Initialize on page load
renderBentoGrid();

// ============================================
// END PROJECTS SYSTEM
// ============================================

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
