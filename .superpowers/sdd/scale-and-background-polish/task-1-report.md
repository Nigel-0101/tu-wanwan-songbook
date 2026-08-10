# Task 1 report: approved visual proportions

## Changed files

- `tests/songbook.test.mjs`: replaced the prior side-art and logo scale assertions; added page backdrop, no-grid, pale hero circle, subtle hero ring, 1500 px side-art hiding, and source/dist stylesheet-parity assertions.
- `.superpowers/sdd/scale-and-background-polish/task-1-report.md`: this report.

No production files were changed.

## Command run

```powershell
& 'C:\Users\NIGEL\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'tests\songbook.test.mjs'
```

## Expected failure output

```text
AssertionError [ERR_ASSERTION]: standee art uses the approved large side-art scale
at tests/songbook.test.mjs:43:8
code: 'ERR_ASSERTION'
expected: /\.side-art\{[^}]*top:414px[^}]*width:clamp\(440px,28vw,600px\)[^}]*object-fit:contain/
Node.js v24.14.0
```

The failure is expected against the old CSS, which still specifies `width:clamp(220px,14vw,300px)`. The remaining new assertions likewise describe behavior absent from the old stylesheet: the old `.site:before` still references `var(--backdrop)` and the hero pseudo-elements are hidden.

## Self-review

- Kept the existing checks for 50 songs, five pages, no click effects, no ON AIR badge, no notice, and the 1500 px responsive guard.
- Used the real stylesheet read by the existing Node test; added no mocks or test-only production helpers.
- Confirmed the test fails for the intended missing visual change rather than a test-loading error.
- Confirmed the test reads `dist/client/css/base.css` and reaches the old visual-value failure, proving the current source and distribution stylesheets match before the pending implementation.
- Confirmed the 1500 px guard assertion requires both the site padding and `.side-art{display:none!important}` in that same media query.
- Confirmed `git diff --check f3d183d..HEAD` reports no whitespace errors after the review cleanup.
- Did not modify production files.

## Commit hash

Initial visual-lock test commit: `acfdd9e93abf2c6e17a504407426c5ed1ef1aaf9`
Review-fix test commit: `7f7bb86ca99de5eaf30663540b550082ef96cd45`

## Concerns

The suite intentionally remains red until the follow-on CSS implementation lands. The Node runner stops at the first missing proportion assertion, so its output demonstrates the expected old-value failure while the additional assertions remain pending for the implementation task.
