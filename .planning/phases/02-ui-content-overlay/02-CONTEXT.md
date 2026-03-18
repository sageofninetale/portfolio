# Phase 2: UI & Content Overlay - Context

**Status:** Ready for planning
**Source:** User explicit request

<domain>
## Phase Boundary
Integrate the rest of the portfolio sections (About, Education, Work, Contact) into the new Web3-style dark aesthetic established in the hero section. Apply immersive scroll-driven animations to all content blocks.
</domain>

<decisions>
## Implementation Decisions

### Visual Aesthetic
- The entire site must precisely match the new hero section's Web3 dark aesthetic (e.g., pure black backgrounds, glowing UI borders, frosted glass).
- Font family `Outfit` must be used for all primary headings, and `General Sans` for body text.
- Re-style existing content (cards, timelines, text) to look premium, modern, and aligned with the space/vortex background.

### Interaction & Motion (CRITICAL)
- **Tunnel/Camera Motion Effect:** The user specifically requested bringing back the "tunnel effect or camera motion effect" because it felt amazing.
- Since the background is now a 2D looping video, this effect must be applied to the *DOM elements themselves* using CSS/JS (e.g., GSAP ScrollTrigger or Intersection Observer). 
- As the user scrolls, sections and cards should scale up from the center (e.g., `transform: scale(0.8) translateZ(-100px)` to `scale(1) translateZ(0)`), creating a parallax "flying through space" or "tunnel" feeling for the content layers over the video.

</decisions>
