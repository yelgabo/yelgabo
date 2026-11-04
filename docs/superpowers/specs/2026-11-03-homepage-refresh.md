# Homepage refresh

## Goal

Make the homepage a useful index of Yelnil's projects. Move the long biographical
sections onto a separate page, give the smaller tools a clearer index, and add
btest with the supplied screenshot.

## Decisions

- Preserve the static HTML deployment and existing project URLs.
- Keep Manrope and the site's existing neutral palette: background `#fafaf9`,
  surface `#ffffff`, ink `#0a0a0a`, secondary text `#525252`, border `#e7e5e4`.
  Use btest's amber only as a small project accent.
- Replace the long homepage bio with two plain sentences. Preserve the original
  bio and Impact, Leadership, Influence, Recognition, and Closing sections in
  `background.html`. Link that page from the shared navigation.
- Lead with btest in a wide project row. Put the four existing selected projects
  in a two-column screenshot grid with short descriptions and direct links.
- Keep Tiny things as its own index, split into visualizers and study guides.
  Show a short preview on the homepage. Keep every existing tool link.
- Give the technical post its own writing index and remove it from the tools
  index. Preserve the post and its redirect URLs.
- Add a short btest project page. Ground descriptions in the current local btest
  README. Link the hosted login and public repository. Do not turn the example
  backtest screenshot into a performance claim.

## Alternatives considered

Keeping the alternating feature rows would retain the existing visual system,
but adding another project would make the page longer. Moving every project to a
separate index would shorten the homepage further, but hide the work the visitor
came to see. The compact screenshot grid keeps that work visible. Its desktop and
mobile render will be the bounded test of this choice.

## Layout

Left-align the content. Use the current page width and typography. Project
screenshots carry the visual emphasis; remove repeated folio numbers, slogan-like
taglines, decorative browser bars, and repeated metadata from the homepage.

```text
Name                         Projects / Tiny things / Background
Short introduction
Email / GitHub / LinkedIn / Resume

Projects
btest description            Actual screenshot
Project screenshot           Project screenshot
Name / description / links   Name / description / links
Project screenshot           Project screenshot
Name / description / links   Name / description / links

Tiny things                                  All tools & guides
Three direct tool links

Contact                       Writing / Background
```

## Verification

Check changed pages at desktop and phone widths, including 320px. Check local
links, fragments, image loading, focus visibility, and browser console errors.
Confirm the original biographical text still exists on Background and is absent
from the homepage. Confirm all existing tools and the canonical technical post
remain reachable. Check the btest links and image attribution against the supplied
file and local project docs. Request an independent review of the final changes.
