# Layered Songbook Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blue songbook avatar and 50-song dataset, then rebuild the hero and catalog as responsive three-layer illustrated frames and publish the verified result to GitHub Pages.

**Architecture:** Keep the existing static HTML/CSS/JavaScript application and its interaction API. Add focused raster assets for the AI-generated avatar medallion and layered decorative frame, keep content as accessible HTML above those assets, and derive all filters and pagination from the 362-row CSV dataset.

**Tech Stack:** Static HTML5, CSS, browser JavaScript, CommonJS-compatible data module, Node.js assertion tests, AI-generated PNG assets, GitHub Pages.

## Global Constraints

- Use all 362 CSV records and keep 10 songs per page.
- Keep copy text exactly `点歌 歌名（歌手）`.
- Keep the existing Q-version cursor and do not add mouse click animation.
- Remove `BLUE BUNNY SONG ROOM`, live-room digits, and the blue cross-grid overlay.
- Use `09:00–12:00` and `18:00–22:00`.
- The avatar medallion background must be AI-generated and displayed through a mask.
- Source files and `dist/client` mirrors must remain identical.

---

### Task 1: Dataset and scalable pagination

**Files:**
- Modify: `tests/songbook.test.mjs`
- Modify: `data/songs.js`
- Modify: `js/page.js`
- Mirror: `dist/client/data/songs.js`
- Mirror: `dist/client/js/page.js`

**Interfaces:**
- Consumes: CSV columns `编号`, `歌名`, `歌手`, `语言`, `曲风`, `点歌类型`.
- Produces: `TUWANWAN_SONGS: Array<{id,title,artist,language,genre,type}>` and compact page buttons rendered by `renderPages`.

- [ ] Add failing assertions for 362 records, first and last CSV records, 37 pages, dynamic count, and compact pagination.
- [ ] Run `npm test` and confirm the old 50-song expectations fail.
- [ ] Convert every CSV record into the existing `songs.js` object schema without changing source text.
- [ ] Update page rendering to show nearby page numbers plus first/last navigation instead of all 37 buttons.
- [ ] Mirror data and script files to `dist/client`, then run `npm test`.
- [ ] Commit the dataset and pagination change.

### Task 2: AI visual assets and avatar replacement

**Files:**
- Create: `assets/avatar-cup.png`
- Create: `assets/avatar-medallion.png`
- Create: `assets/layered-frame.png`
- Create: `assets/layered-ornaments.png`
- Mirror: corresponding files under `dist/client/assets/`
- Modify: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: supplied transparent avatar PNG and the approved blue/pink/lavender moon-rabbit art direction.
- Produces: transparent avatar, AI-generated circular medallion background, irregular frame backdrop, and transparent top ornaments.

- [ ] Add failing asset-presence and HTML-reference assertions.
- [ ] Copy the supplied avatar unchanged into the project.
- [ ] Generate an image-only pastel medallion background with moon, cloud, floral and carrot motifs and no person or text.
- [ ] Generate bottom-frame and transparent top-ornament assets with cloud/lace curves, stars, flowers, carrot, rabbit ears and bows; exclude ribbons from the bottom layer.
- [ ] Inspect the generated assets for clean edges, usable transparency and visual consistency.
- [ ] Mirror assets to `dist/client` and run the asset assertions.
- [ ] Commit the new visual assets.

### Task 3: Layered hero and updated profile information

**Files:**
- Modify: `blue/index.html`
- Modify: `css/base.css`
- Modify: `css/themes.css`
- Mirror: `dist/client/blue/index.html`
- Mirror: `dist/client/css/base.css`
- Mirror: `dist/client/css/themes.css`
- Modify: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: `avatar-cup.png`, `avatar-medallion.png`, `layered-frame.png`, `layered-ornaments.png`.
- Produces: semantic `.hero` content with background frame layer, inset content layer and pointer-transparent ornament layer.

- [ ] Add failing assertions for removed top line, new avatar, updated labels/times, AI medallion, four-item desktop row and no grid overlay.
- [ ] Remove the top-line markup and replace the hero image reference.
- [ ] Update live-room copy and both time labels.
- [ ] Add frame and ornament layer elements with decorative images marked empty-alt and pointer-inert.
- [ ] Restyle hero content so title is vertically balanced and Logo is slightly larger without overlap.
- [ ] Apply the AI medallion as a masked layer behind the new transparent avatar.
- [ ] Remove the theme ornament overlay that produces the blue grid.
- [ ] Mirror source changes, run tests, and verify wide, 1500px and phone layouts.
- [ ] Commit the hero redesign.

### Task 4: Layered catalog frame and interaction regression

**Files:**
- Modify: `blue/index.html`
- Modify: `css/base.css`
- Mirror: `dist/client/blue/index.html`
- Mirror: `dist/client/css/base.css`
- Modify: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: the same frame and ornament asset system as the hero.
- Produces: `.catalog` with visible outer frame, inset content surface, overlapping decorative layer and unaffected controls.

- [ ] Add failing assertions for the three catalog layers, pointer-inert ornaments, closed bottom panel and overflow safety.
- [ ] Add bottom, middle and top layer structure while retaining current catalog content IDs.
- [ ] Inset the middle surface enough to expose the irregular outer frame on all four sides.
- [ ] Place top ornaments around corners, title and lower edge without covering interactive elements.
- [ ] Remove the fixed 900px minimum that causes exposed bottom background and let content determine height.
- [ ] Add responsive reductions that hide nonessential ornaments on small screens and prevent horizontal scrolling.
- [ ] Mirror files, run tests, and exercise search, filters, paging, random selection and copying.
- [ ] Commit the catalog redesign.

### Task 5: Final verification and GitHub Pages publication

**Files:**
- Modify only if verification finds a defect.

**Interfaces:**
- Consumes: completed source and mirrored distribution.
- Produces: a published GitHub Pages build at `/tu-wanwan-songbook/blue/`.

- [ ] Run `npm test` and `git diff --check`.
- [ ] Compare source/distribution hashes for every changed mirrored file.
- [ ] Serve the site locally and visually inspect desktop and mobile breakpoints, the 362-song flow and all interactions.
- [ ] Review the final diff for unrelated or untracked user files and leave them untouched.
- [ ] Commit any verification fixes, publish tracked files with the existing GitHub publication workflow, and wait for Pages deployment.
- [ ] Open the public URL with a cache-busting query, verify the updated avatar, times, data count, layering and interactions, then report the live result.
