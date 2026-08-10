# Scale and Background Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the page grid, double the wide-screen side-art scale, restore the hero chibi circle, and enlarge the logo by about 25 percent without changing songbook behavior.

**Architecture:** Keep the existing static HTML and JavaScript unchanged. Express the approved visual changes as CSS overrides in `css/base.css`, mirror that file to `dist/client/css/base.css`, and protect the behavior with source assertions plus real browser checks.

**Tech Stack:** CSS, Node assertion tests, browser visual inspection, GitHub Pages.

## Global Constraints

- Keep all 50 songs, five-page pagination, search, filters, random selection, copy formatting, capsule animation, and Q-version cursor behavior unchanged.
- Do not restore mouse click animations, the ON AIR badge, or the removed left-side notice.
- At viewport widths of 1500 px or below, hide the large side standees and reclaim the side gutters.
- Source and `dist/client` copies must remain identical.

---

### Task 1: Lock the approved proportions with failing tests

**Files:**
- Modify: `tests/songbook.test.mjs`
- Test: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: the CSS text loaded from `css/base.css`.
- Produces: assertions for the page background, 600 px standees, visible hero circle, 475 px logo, and the 1500 px responsive guard.

- [ ] Replace the old 300 px side-art assertion with `width:clamp(440px,28vw,600px)`.
- [ ] Add an assertion that `.site:before` uses `page-bg.png` without `var(--backdrop)` or a repeating grid layer.
- [ ] Replace the hidden-ring assertion with assertions for a pale circular `.hero-art:before` and a subtle `.hero-art:after` ring.
- [ ] Replace the 380 px logo assertion with `width:clamp(350px,30vw,475px)`.
- [ ] Run `C:\Users\NIGEL\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe tests\songbook.test.mjs` and verify the new assertions fail for the expected old values.

### Task 2: Implement the wide-screen visual scale

**Files:**
- Modify: `css/base.css`
- Modify: `dist/client/css/base.css`
- Test: `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: existing `assets/page-bg.png`, transparent side standees, hero chibi, and brand logo.
- Produces: updated wide-screen CSS with unchanged HTML and JavaScript behavior.

- [ ] Set the lowest page layer to a solid near-white fallback plus `page-bg.png`, with no grid-generating gradient or theme backdrop.
- [ ] Set `.side-art` to `width:clamp(440px,28vw,600px)`, keep `z-index:1`, and preserve `.hero,.catalog` at `z-index:2` so artwork cannot cover content.
- [ ] Restore the hero chibi backing using a pale blue circular fill on `.hero-art:before` and a faint dashed concentric border on `.hero-art:after`; do not restore spin animation.
- [ ] Set `.brand-logo` to `width:clamp(350px,30vw,475px)` and adjust only its right-side reservation enough to prevent overlap.
- [ ] Preserve `@media(max-width:1500px)` with `.side-art{display:none!important}` and the existing title `white-space:nowrap` rule.
- [ ] Copy `css/base.css` to `dist/client/css/base.css` and compare SHA-256 hashes.
- [ ] Run the Node test and verify it passes.

### Task 3: Verify and publish

**Files:**
- Commit: `css/base.css`, `dist/client/css/base.css`, `tests/songbook.test.mjs`

**Interfaces:**
- Consumes: the verified local tree.
- Produces: a new `main` commit and completed GitHub Pages build.

- [ ] Run the Node songbook test, Python alpha test, `git diff --check`, and source/dist hash comparison.
- [ ] Inspect the page at a 2048 px desktop viewport and a viewport below 1500 px; verify the enlarged art stays below cards, the title stays on one line, and medium screens hide the art.
- [ ] Commit only the three intended tracked files.
- [ ] Publish with `work/publish-github.ps1`, wait for the GitHub Pages status `built`, and load the public URL with a cache-busting query.
- [ ] Verify online that five page buttons remain, no click-effect layers exist, and the computed logo and side-art widths use the new rules.
