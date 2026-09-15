# Quantum × Intelligence

An English-language research portfolio for Inhoe Koo, with a white-and-blue visual system and an interactive atom at its center.

## Content

The six orbits cover About me, Publications, Vision & goals, Education, Research, and Beyond the lab. Hover or keyboard focus displays a preview; activation opens a detail dialog. Three featured research projects have their own detail views.

The September 2026 update draws on the supplied CV (September 1) and statement of purpose (September 13):

- Quantum simulation beyond classical reach; joint design of algorithms and hardware.
- The long-term aspiration to become an independent scholar and professor.
- Superconducting RF research at SNU, JSAP 2026, and CASH submitted to IEEE QCNC 2027.
- Updated teaching dates, STEM dates, education status, and links from the CV.

The source PDFs are not included in the website. Application-specific faculty fit and reference contact information are not part of the public narrative. Aspirations are described as future goals; submitted work is labeled as submitted. Existing dated research posts are retained as archival writing.

## Editing

| File | Purpose |
| --- | --- |
| `index.html` | Homepage content, six orbit sections, and three research details |
| `assets/orbit/style.css` | Layout, typography, color, and responsive styles |
| `assets/orbit/app.js` | Dialog routing, history, hover previews, and animation |
| `assets/orbit/favicon.svg` | Atom favicon |
| `_pages/about.md` | Standalone About page; keep in sync with homepage profile |
| `_layouts/orbit.html` | Shared frame for legacy Jekyll pages |
| `_layouts/page.html`, `_layouts/post.html` | Page and research article layouts |
| `.github/workflows/pages.yml` | Build and deployment workflow for `master` |
| `DEPLOYMENT.md` | GitHub Pages setup instructions |

Google Fonts supplies Manrope and DM Sans, with system-font fallbacks. The atom uses SVG and JavaScript without a graphics library. The homepage is static HTML; existing posts and the standalone About page use Jekyll.

## Interaction and accessibility

Deep links, browser history, keyboard navigation, touch, Escape-to-close, focus containment and restoration, pause/resume, reduced-motion preference, and no-JavaScript content fallback are supported. Animation stops while the atom is offscreen, the tab is inactive, or a dialog is open.

## Validation status

Browser checks cover all menus and research details, history and reload, keyboard and touch, motion settings, local assets, and layouts from 320 to 1440 pixels. The local environment has no Ruby/Jekyll runtime, so a complete Jekyll build and actual GitHub Pages deployment remain unverified. The included workflow performs that build on GitHub before deployment. No remote push or deployment has been performed.
