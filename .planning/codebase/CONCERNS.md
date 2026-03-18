# Areas of Concern / Tech Debt

## Architecture / Organization
- **Monolithic Files:** `styles.css` is over 2200 lines long, and `script.js` is nearly 1000 lines. As the project scales, maintaining these monolithic files could become difficult without splitting them into modules (e.g., using Vite + ES modules, or SCSS partials).
- **Hardcoded Data:** Project data is hardcoded in `script.js` (`projectsData` array) making content updates require modifying logic rather than a simpler JSON/Markdown file or CMS.

## Performance
- **Image Optimization:** There are numerous high-resolution Unsplash images referenced directly in the project data. Without a framework like Next.js for Image Optimization, these might degrade initial load performance or TTFB.

## Security
- **API Keys in Frontend:** The EmailJS initialization key (`GADf-xMuzZIn7NMgV`) is hardcoded in the frontend. While EmailJS specifically allows this using Domain Restrictions, it is a potential abuse vector if domain validation isn't strictly configured in the EmailJS dashboard. Ensure domain tracking is restricted to production domains.
