# Portfolio Website - Copilot Instructions

## Project Overview
Single-page professional portfolio showcasing data analytics work experience, featuring a vanilla JavaScript interactive "Easter Egg Hunt" game. No frameworks—just HTML, CSS (custom properties), and vanilla JS with EmailJS integration.

## Architecture & Structure

### Core Files
- **`index.html`** - Single-page structure with semantic sections: `#home`, `#about`, `#resume`, `#work`, `#projects`, `#skills`, `#game`, `#contact`
- **`script.js`** - Vanilla JS handling navigation, animations, form submission (EmailJS), and game logic
- **`styles.css`** - CSS custom properties (`--gold-color`, `--dark-bg`, etc.) with responsive breakpoints at 968px and 640px
- **`documents/`** - Contains `Aryan_Subhash_Resume.pdf` for download
- **`images/logos/`** - Project company logos displayed in cards

### Key Design Patterns

**Color System**: Gold accent theme (`#c9a961`) throughout. Dark mode only (`#1a1a1a` backgrounds, `#e8e8e8` text).

**Section Layout**: Alternating `.section` and `.alt-bg` classes with consistent left-border styling (`border-left: 1px solid rgba(201, 169, 97, 0.3)`) on cards, timelines, and contact items.

**Animations**: Use `.animate-on-scroll` class with IntersectionObserver triggering `.visible` state. Staggered animations for project cards, timeline items, and skill tags via JS.

**Navigation**: Fixed navbar with smooth scroll anchors. Mobile: hamburger toggle activates off-canvas menu at `top: 70px`.

## Critical Developer Workflows

### Local Development
```bash
# Serve locally (no build step needed)
python3 -m http.server 8000
# Or use VS Code Live Server extension
```

### Form Testing (EmailJS)
- Service ID: `service_vzsx35l` | Template ID: `template_un2w7fc`
- Initialized in `<head>` with public key `GADf-xMuzZIn7NMgV`
- Test by submitting contact form - check EmailJS dashboard for delivery

### Game Logic
Easter Egg Hunt initializes on "Yes" button click:
1. `easterEggGame.createStars()` distributes 10 eggs across sections (excludes `#home`)
2. Eggs positioned randomly within each section using `position: absolute` with `%` values
3. Collection tracked in `foundStars` counter; completion triggers message at 10/10

## Project-Specific Conventions

### Styling Consistency
- **No box-shadows on cards** - Use `transparent` backgrounds with `border-left` accents
- **Button styling** - Transparent background, gold border (`rgba(201, 169, 97, 0.5)`), hover adds 10% background fill
- **Timeline items** - Education uses grid layout for list items; Work uses vertical list with `•` bullets

### JavaScript Patterns
- **Cursor tracking**: Custom cursor with dot + outline, position interpolated via `requestAnimationFrame`
- **Scroll progress**: Dynamic width-based progress bar (`position: fixed; top: 0`) calculating `scrollY / scrollHeight`
- **Project card clicks**: Hardcoded links in `projectLinks` object mapping `data-project` attributes to Google Drive URLs

### Animation Timing
- Stagger delay: `index * 0.15s` for project cards, `index * 0.2s` for timeline items
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy effect, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for smooth

## Integration Points

### EmailJS (Contact Form)
Form submission in `script.js`:
```javascript
emailjs.sendForm('service_vzsx35l', 'template_un2w7fc', this)
```
Fields: `from_name`, `from_email`, `subject`, `message`. Button states: loading → success/error → reset after 3s.

### External Dependencies
- **Font Awesome 6.4.0** - Social icons, section headers (`<i class="fas fa-*">`)
- **EmailJS Browser 4.x** - CDN loaded in `<head>`, auto-initialized
- **Simple Analytics** - Privacy-first analytics script at bottom of `<body>`

### Analytics
Uses Simple Analytics (privacy-first, no cookies):
```html
<script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

## Common Tasks & Examples

### Adding a New Project
1. Add logo to `images/logos/` (80x80px optimal)
2. Insert card in `.projects-grid` with `data-project="unique-id"`:
```html
<div class="project-card animate-on-scroll" data-project="new-project">
    <div class="project-logo"><img src="images/logos/NewLogo.png" alt=""></div>
    <div class="project-info">
        <span class="project-company">Company Name</span>
        <h3>Project Title</h3>
        <p>Description...</p>
        <div class="project-meta">
            <span class="project-type">Category</span>
            <span class="view-project">View Project <i class="fas fa-arrow-right"></i></span>
        </div>
    </div>
</div>
```
3. Add link to `projectLinks` object in `script.js`:
```javascript
'new-project': 'https://link-to-project.com'
```

### Adding a Timeline Entry (Work/Education)
Insert before closing `.timeline` in respective section:
```html
<div class="timeline-item animate-on-scroll">
    <div class="timeline-dot"></div>
    <div class="timeline-content">
        <div class="timeline-date">Month Year - Month Year</div>
        <h3>Organization Name</h3>
        <h4>Role Title</h4>
        <ul class="timeline-list">
            <li>Achievement or responsibility</li>
        </ul>
    </div>
</div>
```

### Adding Skills
Add to appropriate `.skill-category` in `#skills`:
```html
<span class="skill-tag">New Skill</span>
```

## Testing Checklist
- [ ] Mobile menu toggle works (hamburger at 968px breakpoint)
- [ ] All section anchors scroll smoothly with offset for fixed navbar
- [ ] EmailJS form submission shows loading → success/error states
- [ ] Easter Egg Hunt: 10 eggs spawn, click collection works, completion message triggers
- [ ] Project cards open correct links in new tabs
- [ ] Resume download triggers correctly from About section
- [ ] Scroll progress bar animates (check at top of viewport)
- [ ] Animations trigger on scroll (test with slow scroll through sections)

## Performance Notes
- No build process; files served as-is
- Hero background uses `background-attachment: fixed` - may cause performance issues on mobile (consider removing for mobile)
- Custom cursor hidden on mobile/touch devices via media query
- Animations use `will-change: transform` for hardware acceleration on interactive elements

## Important Gotchas
- **Don't add IDs to eggs dynamically** - Game uses direct DOM manipulation, IDs not needed
- **EmailJS public key is exposed** - Normal for client-side; rate limits enforced server-side
- **Project links hardcoded** - No CMS; edit `projectLinks` object directly in JS
- **No TypeScript/linting** - Keep vanilla JS conventions (no semi-colons inconsistent, but maintain existing style)
- **Section positioning** - All sections except hero need `position: relative` for absolute-positioned eggs

## Quick Reference
**Primary brand color**: `#c9a961` (gold)  
**Breakpoints**: 968px (tablet), 640px (mobile)  
**Font stack**: Inter, system fonts  
**EmailJS Service**: `service_vzsx35l`  
**Target sections for new content**: `#work`, `#projects`, `#skills`
