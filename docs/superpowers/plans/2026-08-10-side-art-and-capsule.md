# Side Art and Capsule Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the newly added decorative overlays, enlarge complete side character art, and show the shared capsule animation after every song copy.

**Architecture:** Keep the current static HTML/CSS/JavaScript structure. CSS owns the clean layout and complete side-art sizing; `page.js` owns a single reusable capsule function called by both random selection and row-copy handlers.

**Tech Stack:** HTML, CSS, browser JavaScript, Node assertion tests, Python image-alpha test.

## Global Constraints

- Preserve all three themes, 50 songs, filters, and five-page pagination.
- Keep full character proportions without stretching or cropping the subject.
- Keep side art hidden below the existing desktop breakpoint.
- Every copied order uses `点歌 歌名（歌手）`.

---

### Task 1: Clean layout and larger complete side art

**Files:**
- Modify: `tests/songbook.test.mjs`
- Modify: `css/base.css`
- Modify: `css/themes.css`
- Modify: `dist/client/css/base.css`
- Modify: `dist/client/css/themes.css`

**Interfaces:**
- Consumes: existing `.side-art`, `.hero-copy`, and `.catalog` selectors.
- Produces: decoration-free content cards and full-height, object-contained side art.

- [ ] **Step 1: Write failing assertions**

Assert that obsolete `--hero-decor`, `--catalog-decor`, `.hero-copy:before`, and `.catalog:before` output is absent; assert that `.side-art` uses a larger desktop width and `object-fit:contain`.

- [ ] **Step 2: Run the test and verify failure**

Run `node tests/songbook.test.mjs`; expect failure because current decoration selectors and theme variables still exist.

- [ ] **Step 3: Implement the CSS change**

Remove the four decoration pseudo-elements and theme strings. Size side art to the available side gutter with a desktop width near the gutter width, a viewport-based height, `object-fit:contain`, and centered bottom alignment.

- [ ] **Step 4: Mirror CSS and verify**

Copy the two source stylesheets to `dist/client/css/`, run the Node test, and expect PASS.

### Task 2: Shared capsule feedback for copied songs

**Files:**
- Modify: `tests/songbook.test.mjs`
- Modify: `js/page.js`
- Modify: `dist/client/js/page.js`

**Interfaces:**
- Consumes: `formatOrder(song)` and the existing `.selection-capsule` element.
- Produces: `showSelectionCapsule(text)` used by random selection and row copy.

- [ ] **Step 1: Write a failing assertion**

Assert that the copy handler calls `showSelectionCapsule(order)` after a successful clipboard operation and that the random handler calls the same function.

- [ ] **Step 2: Run the test and verify failure**

Run `node tests/songbook.test.mjs`; expect failure because copy currently updates only the notice.

- [ ] **Step 3: Implement the shared function**

Extract the existing capsule restart logic into `showSelectionCapsule(text)`. Call it with the formatted order from both event paths, forcing reflow so repeated clicks restart the animation.

- [ ] **Step 4: Mirror JavaScript and verify**

Copy `js/page.js` to `dist/client/js/page.js`, run the Node and cursor-alpha tests, and expect both to pass.

### Task 3: Package and publish

**Files:**
- Update: `outputs/tu-wanwan-songbook-preview.zip`
- Package: `work/tu-wanwan-site-v5.tar.gz`

**Interfaces:**
- Consumes: validated committed source and `dist/` build.
- Produces: versioned downloadable archive and the updated production site.

- [ ] **Step 1: Run final verification**

Run the Node test, cursor-alpha test, archive-content validation, and source diff check.

- [ ] **Step 2: Commit exact source**

Commit only tracked project changes and leave unrelated generated research assets untouched.

- [ ] **Step 3: Package and publish**

Create the ZIP and deployment archive from the committed state, push that commit, save a new Sites version, deploy it, and poll until success.

- [ ] **Step 4: Open the deployed blue route**

Open `https://tu-wanwan-songbook.kongbai0101.chatgpt.site/blue/` in Codex after deployment succeeds.
