# Architecture

## System Design
- **Pattern:** Static Single Page Website / Portfolio
- **Layers:**
  - **Structure (View):** `index.html` defines the semantic layout and section containers.
  - **Presentation:** `styles.css` handles all visual design, responsive layouts (media queries), and CSS animations.
  - **Behavior (Controller):** `script.js` manages DOM manipulation, event listening, scroll tracking, and specific interactive widgets (like the Bento Grid project filtering and the Easter Egg game).

## Data Flow
- **State Management:** Local variables in `script.js` (e.g., `currentFilter`, `projectsData`, `easterEggGame.foundStars`).
- **Data Rendering:** Project cards are dynamically generated from the `projectsData` array and injected into the `.bento-grid` DOM element via `innerHTML`.
- **Form Submission:** Handled client-side via EmailJS API.

## Entry Points
- The sole entry point is `index.html`.
