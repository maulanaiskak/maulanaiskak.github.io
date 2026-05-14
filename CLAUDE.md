# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Run local dev server (live reload)
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

## Architecture

This is a Jekyll static site deployed to GitHub Pages (`maulanaiskak.github.io`). It uses the `minima` theme as a base with heavily customized Sass and layouts.

**Content is data-driven** — all resume content lives in `_data/*.yml`:
- `_data/experience.yml` — work history
- `_data/projects.yml` — portfolio projects
- `_data/skills.yml` — skills with proficiency levels (0–100)
- `_data/education.yml` — education

**Rendering pipeline:**
- `_layouts/home.html` wraps `_layouts/default.html`
- `index.md` uses `layout: default` and includes section partials via `{% include %}`
- Each section is a partial in `_includes/` (e.g. `experience.html`, `projects.html`) that loops over its corresponding `_data/*.yml`

**Styles:** Custom Sass in `_sass/` — `_base.scss`, `_layout.scss`, `_animations.scss`, `_responsive.scss`. Entry point is `assets/css/styles.scss` which imports `_sass/main.scss`.

**JS:** Single file `assets/js/main.js` handles typed-text animation, scroll effects, and contact form via Formspree.

## Key conventions

- To update resume content, edit only the relevant `_data/*.yml` file — no HTML changes needed.
- Skill levels are integers 0–100 rendered as progress bars.
- The certification in `skills.yml` has a `link` field; other skill items do not.
- `index.md` contains the hero and contact sections directly (not via includes), since those don't have data counterparts.
