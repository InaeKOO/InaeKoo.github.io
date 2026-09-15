# Inhoe Koo — Quantum × Intelligence

A personal research portfolio with an interactive atom, portrait, and English-language profile.

## Edit the website

- `index.html`: main page, six orbit sections, and three research details.
- `assets/orbit/style.css`: design, responsive layout, and typography.
- `assets/orbit/app.js`: animation, previews, dialog navigation, and history.
- `images/`: portrait, two research diagrams, and the linked schematic PDF.
- `_pages/about.md`: standalone About page; keep its profile synchronized with the homepage.
- `_posts/`: original research articles, retained at their existing URLs.
- `_layouts/`: shared page and article templates.
- `404.html`: not-found page.
- `_config.yml`, `Gemfile`, and `.github/workflows/pages.yml`: Jekyll and GitHub Pages configuration.

See [DEPLOYMENT.md](DEPLOYMENT.md) for publishing instructions. Copying this cleaned source over an old checkout alone does not remove obsolete files; follow the cleanup step in that guide.

## Local preview

The homepage can be opened directly or served by a static HTTP server. For the complete site, install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve
```

## Accessibility

Keyboard and touch navigation, focus management, deep links, browser history, reduced motion, animation pause, and a no-JavaScript fallback are supported. Portrait and diagram images have alternative text. Google Fonts provides DM Sans and Manrope with system-font fallbacks.

## Content and history

The profile reflects the supplied September 2026 CV and statement of purpose. Source PDFs are not published. Career goals are aspirations; CASH is labeled as submitted to IEEE QCNC 2027. Existing dated research posts remain archival writing.

The previous site used Artem Sheludko's MIT-licensed Zolan theme. Its unused templates, scripts, styles, and demo assets have been removed; personal research articles and images are retained.

## Verification

Browser checks cover desktop and mobile layouts, portrait loading, menu and research navigation, keyboard/touch, deep links, animation controls, and local assets. A full Jekyll build and live deployment have not been run in this environment; the included GitHub Actions workflow builds before publishing.

## QFlowNet figure

The original `images/QFlowNet schematic.pdf` is the source of truth. The inline `QFlowNet-schematic-preview.png` is rendered from that vector PDF at 300 dpi (4000 × 1772 pixels). Both the detail dialog and the archived article use this preview; clicking it opens the original PDF for full-resolution viewing.

To regenerate with Poppler:

```sh
pdftoppm -png -r 300 -singlefile "images/QFlowNet schematic.pdf" "images/QFlowNet-schematic-preview"
```
