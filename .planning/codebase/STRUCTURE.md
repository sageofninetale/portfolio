# Directory Structure

## Repository Layout
```
/
├── index.html        # Main and only HTML view
├── styles.css        # Global stylesheet (2200+ lines)
├── script.js         # Global JavaScript logic
├── images/           # Static image assets
├── documents/        # Downloadable assets (e.g., Resume PDF)
├── .planning/        # GSD planning state and codebase maps
└── STACK/INTEGRATIONS/...
```

## Organization Logic
- A fully flat structure for source code.
- Assets are separated into logical folders (`images`, `documents`).
- The JavaScript logic is bundled in a single file instead of modular ES6 imports due to the lack of a build tool.
