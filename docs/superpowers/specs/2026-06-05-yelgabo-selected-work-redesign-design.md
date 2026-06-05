# Selected Work Redesign + Case-Study Subpages — Design Spec

**Date:** 2026-06-05
**Site:** yelgabo.com (static HTML + one CSS file, GitHub Pages, no build step)
**Produced by:** design council (Designer + Senior Designer/Art Director + UX), 3-round deliberation.

## Problem
The current "Selected Work" section is a flat 2×2 grid of near-identical white cards. Owner feedback: **"too plain / flat"** and **"cramped / poor hierarchy."** Chosen direction: **refined editorial** — keep the minimal black-on-cream Manrope language, but elevate it. Each project also needs a **full case-study subpage** (problem → approach → screenshots → tech → outcome).

## Owner decisions (locked)
1. **Folio numerals:** SHOW them, large but dim (weight 300, `--ink-dim`).
2. **Browser-chrome titlebar:** KEEP, understated — monochrome dots + mono URL pill, on true screenshots only (kimbo, job-fraud); suppressed on the claude-sync poster.
3. **anki-srs subpage second visual:** ADD a labelled CSS "review card" mock (representative, never faked product).

## 1. Concept
Refined editorial elevation: trade the flat grid for a sequence of **full-width alternating feature rows** where each project's real screenshot is the hero. One understated `.browser-frame` normalizes four mismatched assets into one authored set; one per-project accent (drawn from each real UI) appears only as hairline + text. Through-line: **more air AND more presence at once.**

## 2. Homepage "Selected Work"
- Replace grid with four `.feature` rows inside `--page` (1080px). Each row = 2-col grid: **media 7fr / text 5fr (~58/42), column-gap 64px**. Alternate sides via `order` on `:nth-child(even)`; DOM stays text-first for a11y. **104px** between rows, ~96px section padding-block. Text column `align-self:center`.
- Section header above row 1: kicker "SELECTED WORK", a one-line framing sentence at `--reading`, page-width 1px hairline.
- **Fixes flat:** oversized dim folio numeral (`clamp ~2.25–3.25rem`, weight 300, tabular, `--ink-dim`) + 2px×48px accent rule; ~1.6× title→body scale jump; large real screenshots; L/R zig-zag.
- **Fixes cramped:** full-width rows, 104px air, 64px gap, ~38ch measure.
- **Typography:** Manrope. Title `clamp(1.75rem, 4vw, 2.5rem)`/700 (800 reserved for page H1). Tagline 1.125rem/500 `--ink`. Blurb 1rem/400/1.6 `--ink-muted`, ~38ch, ≤2 lines. Accent kicker 0.72rem/600/0.12em/uppercase in accent. Spec line 0.8125rem/500 `--ink-muted`, 1px-divided fields.
- **Accent system (spice only, ~5% coverage, never a fill):** scoped via `style="--proj:#…"` on the row; used only in kicker, "View case study →" link/arrow, folio rule, faint resting frame border. Tokens: kimbo `#b3122d`, job-fraud `#2563eb`, anki-srs `#16a34a`, claude-sync `#4f46e5`. Page `--accent` stays ink.
- **Click target (a11y):** row is NOT an anchor. "View case study →" link carries a stretched `::after` over the row; Live/GitHub are sibling links at higher z-index. Pure CSS.
- **Motion:** reuse `.reveal` IO — row enters opacity + 12px translateY ~0.5s ease-out, text staggered ~80ms after media. Hover: frame lifts 2px + deeper shadow, arrow nudges 4px, folio dim→accent. `prefers-reduced-motion`: opacity-only, no lift.
- **Order:** kimbo (boldest, slightly larger media share), job-fraud, anki-srs, claude-sync.
- **Responsive:** ≤860px single column, frame ABOVE text every row (`order:initial` reset so even rows don't invert scan order), gap 56px. ≤720px folio smaller, frame 16/11. ≤420px chrome dots hidden, padding 20px.

## 3. Imagery system
- One `.browser-frame`: `--surface` bg, radius 14px, 1px border `color-mix(--proj 35%, --border)`, shadow `0 1px 2px rgba(0,0,0,.04), 0 24px 48px -24px rgba(0,0,0,.18)`. Image at locked aspect, `object-fit:cover`, hand-tuned `object-position`.
- **Aspect:** default 16/10; 16/9 variant for job-fraud (table chips not decapitated). Consistency = chrome + width + radius + border, not one rigid aspect.
- **Titlebar (optional):** ~30px bar, three monochrome `--ink-dim` dots + mono domain pill. On real screenshots only (kimbo, job-fraud). Suppressed on poster/diagram tiles.
- **Crops:** kimbo `top left` on dark `#0a0a0a` inner bg (content is top-left; center is void); job-fraud `top`; anki `top left` tight to headline+green word+buttons (empty grey must never show).
- **claude-sync fallback:** never the bare sign-in wall. `.browser-frame--poster` (titlebar suppressed): `assets/icon-1024.png` ~96–120px centered on faint indigo field `color-mix(--proj 6%, --surface)`, 13px mono caption "end-to-end encrypted · Windows + macOS · read-only web."
- **Absolute rule:** no raw `<img>` outside the frame, on either page.

## 4. Case-study subpage template
Static files `/work/<project>.html`, sharing the one stylesheet. Accent set once on `<body class="proj-…" style="--proj:#…">`. Two-track width: prose `--reading` (720px), figures/strips break out to `--page` (1080px).

Ordered sections:
1. **Sticky mini-nav** — "← All work" left, project name + accent dot right, blurred (~56px).
2. **Hero** — folio + 2px accent rule, title `clamp(2.5rem,6vw,4rem)`/800, one-line positioning statement, accent kicker.
3. **At-a-glance meta strip** — Role · Year · Stack · Status, 1px-divided fields, accent value highlights.
4. **Lead figure** — best shot in `.browser-frame`, breaks to `--page`.
5. **Problem** — prose `--reading`, kicker "01 PROBLEM".
6. **Approach** — prose + optional inline framed detail shots, "02 APPROACH".
7. **Screenshots** — framed gallery to `--page`, captions `--ink-dim`. Content budget, not uniform: kimbo/job-fraud 2 shots; thin projects fewer/labelled.
8. **Tech stack** — accent-tinted chip row grouped Frontend / Backend / Infra.
9. **Outcome** — prose by default; 2-col stat-card ONLY where a real verifiable number exists (job-fraud "3460 scored"). Never invent vanity stats.
10. **Footer** — prev/next project nav (folio+title mini-row), then global footer.

Responsive: figures full-bleed-minus-gutter ≤860px; meta strip 2×2 ≤560px; single-column; sticky nav persists.

## 5. CSS inventory (new/changed)
**Tokens (`:root`):** `--feature-gap:104px`, `--proj` (fallback `--ink`), `--frame-radius:14px`, `--frame-shadow`, `--measure:38ch`.
**Classes:** `.work` + `.work-intro`; `.feature` (+ `:nth-child(even)` order-swap, reset ≤860px); `.feature__media/__text/__folio/__rule/__kicker/__title/__tagline/__blurb/__spec/__cta` (stretched `::after`)/`__links` (higher z); `.browser-frame` (+ `__bar/__dots/__url/__img`, modifiers `--dark`, `--wide`, `--poster`); `.poster`; subpage: `body[class^="proj-"]` scoping, `.subnav`, `.case-hero`, `.meta-strip`/`__field`, `.section-kicker` waypoint, `.figure`/`__caption`, `.stack-chips`, `.case-nav`; `.flow-diagram` (CSS encrypt→sync→decrypt for claude-sync). Extend `.reveal` with stagger delay + reduced-motion override.
Reuse `--page`, `--reading`, `--gutter`, `.link-cta`, existing `.reveal` script + breakpoints. No new architecture.

## 6. Per-project notes
- **kimbo** — `#b3122d`; lead row, larger media share; frame `--dark`, `object-position:top left`, titlebar shown. Dark-on-cream = deliberate contrast moment. Real stat: "0 build dependencies."
- **job-fraud** — `#2563eb`; frame `--wide` (16/9), `object-position:top`, titlebar shown. Strongest asset; honest stat card "3460 scored."
- **anki-srs** — `#16a34a`; landing shot cropped tight `top left`; subpage adds labelled CSS "review card" mock.
- **claude-sync** — `#4f46e5`; `.browser-frame--poster` (icon + indigo field + caption); subpage uses pure-CSS encrypt→sync→decrypt diagram. "You can't see the contents" IS the story; real GitHub link present.
