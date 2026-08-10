# Scale and Background Polish Design

## Goal

Refine the current single blue songbook theme by removing the page grid, making the side character art much more prominent, restoring the circular backing behind the hero chibi, and slightly enlarging the brand logo.

## Approved Layout

- Remove the blue-pink grid from the page's lowest background layer. Keep the generated watercolor background and its faint rabbit, lace, flower, moon, ribbon, and carrot motifs.
- Increase both transparent side standees from a maximum width of about 300 px to about 600 px.
- Allow the enlarged standees to extend slightly behind the central cards. The standees remain below the hero and catalog card layers, so they cannot cover text, filters, buttons, or the song table.
- Restore a pale blue circular backing behind the hero chibi, including subtle concentric ring details.
- Enlarge the brand logo by approximately 25 percent, from a maximum width of 380 px to about 475 px.
- Keep the streamer name, description, schedule, and buttons in their current positions. The title must remain on one line.
- At viewport widths of 1500 px or below, hide the large side standees and reclaim the side gutters for the songbook content.

## Implementation Boundaries

- Keep all 50 songs, five-page pagination, search, filters, random selection, copy formatting, capsule animation, and Q-version cursor behavior unchanged.
- Do not restore mouse click animations, the ON AIR badge, or the removed left-side notice.
- Apply the same source changes to `dist/client` before publishing.

## Verification

- Automated CSS assertions confirm the grid is absent, standees use a 600 px maximum width, the hero circle is visible, and the logo uses a 475 px maximum width.
- Desktop visual checks cover the current wide layout and a medium viewport below the 1500 px breakpoint.
- Source and `dist/client` copies must have identical hashes.
- GitHub Pages must build successfully and the public page must load the updated CSS and retain five page buttons.
