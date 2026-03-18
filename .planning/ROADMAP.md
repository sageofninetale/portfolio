# Roadmap: UX-Focused 3D Portfolio

## Overview

A rapid 2-day sprint to transform the existing static portfolio into an immersive, scroll-driven 3D WebGL experience. We will start by laying the 3D foundation, followed by integrating the existing content, and finish by layering in the Easter egg hunt and performance polish.

## Phases

- [ ] **Phase 1: 3D Environment Foundation** - Setup the WebGL canvas, abstract tunnel scene, and scroll-bound camera.
- [ ] **Phase 2: UI & Content Overlay** - Migrate existing text and project cards to float flawlessly over the 3D scene.
- [ ] **Phase 3: Easter Eggs & Polish** - Add the Easter egg game logic and optimize for performance.

## Phase Details

### Phase 1: 3D Environment Foundation
**Goal**: Establish the base 3D interactive layer.
**Depends on**: Nothing (first phase)
**Requirements**: 3D-01, 3D-02, 3D-03
**Success Criteria** (what must be TRUE):
  1. A 3D canvas is visible behind the website body.
  2. Scrolling the page moves the camera or animations within the 3D scene.
**Plans**: 1 plan

Plans:
- [ ] 01-01: Initialize Three.js/WebGL scene and scroll bindings.

### Phase 2: UI & Content Overlay
**Goal**: Ensure the portfolio content is readable and beautifully integrated.
**Depends on**: Phase 1
**Requirements**: UI-01, UI-02, UI-03
**Success Criteria** (what must be TRUE):
  1. User can read "About", "Education", and "Work" sections clearly over the 3D background.
  2. Projects are showcased dynamically within the flow.
  3. Site works on mobile.
**Plans**: 1 plan

Plans:
- [ ] 02-01: Adapt HTML/CSS to work as an overlay on the 3D canvas.

### Phase 3: Easter Eggs & Polish
**Goal**: Finalize the user experience, add gamification, and ensure smooth performance.
**Depends on**: Phase 2
**Requirements**: EGG-01, EGG-02
**Success Criteria** (what must be TRUE):
  1. User can find and click 10 hidden eggs.
  2. A completion message is shown when all eggs are found.
**Plans**: 1 plan

Plans:
- [ ] 03-01: Implement Easter egg logic and perform final QA.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. 3D Foundation | 0/1 | Not started | - |
| 2. Content Overlay | 0/1 | Not started | - |
| 3. QA & Polish | 0/1 | Not started | - |
