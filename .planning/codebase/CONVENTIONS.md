# Coding Conventions

## CSS Patterns
- Uses CSS Custom Properties (`:root`) for theming, colors, and layout constraints.
- Employs a BEM-like (Block Element Modifier) naming convention loosely (`.project-expand-btn`, `.bento-tile`).
- Extensive use of hardware-accelerated animations (`transform`, `opacity`) and CSS grid/flexbox for layout.

## JavaScript Patterns
- Uses modern ES6 syntax (const, let, arrow functions, template literals).
- Relies on direct DOM manipulation using `document.querySelector` and `document.getElementById`.
- Event listeners are attached globally on `DOMContentLoaded` or inline execution upon script load.
- Uses `IntersectionObserver` for scroll-triggered animations.

## HTML Patterns
- Semantic HTML tags (`<nav>`, `<section>`, `<footer>`).
- Heavy use of anchor links (`#id`) for single-page scrolling navigation.
