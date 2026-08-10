# Background and Cursor Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove click effects and visual boxes, unify the hero and page backgrounds, and repair the centered rabbit capsule icon.

**Architecture:** Keep the existing static songbook structure. New raster assets live in `assets/`; CSS controls unified backgrounds and layering; JavaScript retains only cursor following and capsule feedback.

**Tech Stack:** HTML, CSS, browser JavaScript, ImageGen raster assets, Node assertion tests, Python alpha validation, GitHub Pages.

## Global Constraints

- Preserve 50 songs, search, filters, random selection, copy formatting, and five-page pagination.
- Preserve the current single blue theme and public GitHub Pages URL.
- No mouse click animation may remain.
- The side standee must not display a rectangular background.

---

### Task 1: Transparent standee and page background

**Files:**
- Create: `assets/standee-transparent.png`
- Create: `assets/page-bg.png`
- Modify: `css/base.css`
- Test: `tests/cursor_alpha_test.py`
- Test: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: supplied `assets/standee.jpg` and existing pastel background style.
- Produces: alpha standee asset and full-page background asset referenced by CSS.

- [ ] Write failing assertions for alpha standee, `page-bg.png`, and two-thirds side width.
- [ ] Run Node and Python tests and verify the new assertions fail.
- [ ] Generate the new background, create and validate the transparent standee, then update CSS.
- [ ] Run both tests and verify they pass.

### Task 2: Hero, cursor, and capsule cleanup

**Files:**
- Modify: `blue/index.html`
- Modify: `css/base.css`
- Modify: `js/cursor.js`
- Modify: `js/page.js`
- Test: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: existing hero, logo, cursor, notice, and capsule elements.
- Produces: unified hero background, larger logo, cursor-follow-only behavior, hidden notice, and correct rabbit layering.

- [ ] Add failing assertions that click layers and `ON AIR` are absent, the notice is hidden, and rabbit face z-index exceeds the ears.
- [ ] Run the Node test and verify failure.
- [ ] Remove click handlers and prompt markup, unify hero background, enlarge the logo, and fix rabbit z-index.
- [ ] Mirror source files to `dist/client` and rerun tests.

### Task 3: Publish verified update

**Files:**
- Update: tracked source and `dist/client` mirrors.

**Interfaces:**
- Consumes: verified local commit.
- Produces: updated `main` branch and GitHub Pages build.

- [ ] Run full tests and diff validation.
- [ ] Commit only intended tracked and generated assets.
- [ ] Upload the new commit through the authenticated GitHub data API.
- [ ] Poll GitHub Pages until built and verify the public URL returns HTTP 200.
