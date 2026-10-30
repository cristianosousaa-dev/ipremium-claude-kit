---
name: design
description: "Reference design language for UI work: clean, premium, quiet. Distilled from BOOKLIN's own system (near-white surfaces, one accent, neutral ink primary buttons, light type weights, depth as rings of light, real product previews, formal PT-PT). Use BEFORE designing any website, landing page, app screen, component, email or deck as the quality bar and structural reference. It is NOT a skin: adapt palette, type and shape to each project's brand, and do not copy BOOKLIN's blue or fonts by default."
---

# iPremium design reference: quality bar, not a template

Clean, premium, quiet. Content is the hero, the chrome stays out of its way, one accent marks
where you are, nothing shouts. This file records **why** BOOKLIN looks the way it does, so any
project can reach the same level of polish in its own colours.

Lesson from applying this reference to another project: the quality is right, but it does **not**
have to use those colours or follow that design strictly. Treat it as a reference.

Source of truth for BOOKLIN itself: the BOOKLIN repository (`docs/design/`, `globals.css`). Here they are principles, not values.

## How to use it

1. **Take the principles, not the pixels.** Section "Principles" is portable to every project.
2. **Derive the identity from the project:** its brand, audience and category. If there is a
   logo or guide, that decides the accent and the type; otherwise choose deliberately and write
   the choice down in `PRODUCT.md`.
3. **Vary on purpose.** The failure to avoid is every project coming out the same. Before
   building, change at least two axes from the table below compared with the last thing built.
4. **BOOKLIN's own values** (blue `#0038FF`, Mona Sans, Martian Mono) are for BOOKLIN. Elsewhere
   they are a worked example, not a default.

## Principles (portable)

- **Restraint.** One accent colour, used for links, the current item and small marks. Everything
  else is a neutral ladder. The primary action is a neutral ink fill, so the accent stays scarce.
- **Hierarchy by type and space,** not by boxes, borders or decoration. Light weights, tight
  display type, generous whitespace, one idea per section.
- **Depth as rings of light.** Hairlines and soft layered shadows, never heavy outlines. In dark
  mode, hairlines of light replace shadows.
- **Facts in a second voice.** Dates, times, numbers and labels in a mono (or another clearly
  different face) with tabular figures.
- **The product is the hero.** Previews are real (recordings, true screenshots) or an honest
  illustration labelled as such. Never an HTML redrawing passed off as the app.
- **Nothing decorative moves on its own.** What moves is the product, or the user's action.
  No drifting colour, aurora, glints or gradient text. Entrances are CSS, static without it.
- **One statement, one primary action,** one quiet secondary. Short headline, the second
  sentence may carry the accent, solid, never a gradient.
- **Neutrals with a temperature.** A cool or warm tint in the greys makes them feel designed;
  pick the temperature that suits the accent.
- **Both themes are designed,** not inverted by filter. Contrast is measured in each.
- **Honest copy.** Says only what the product does; demo data is labelled; no invented
  statistics or testimonials.

## What to vary per project

| Axis | BOOKLIN does | Vary by |
|---|---|---|
| Accent hue | Electric cobalt `#0038FF` | The brand. Not blue by default, and not the category's reflex colour |
| Neutral temperature | Cool, a breath of blue | Warm, neutral or cool to suit the accent |
| Type | Mona Sans (wide display) + Martian Mono | Any pairing of one confident sans (or serif) + one mono; check the licence |
| Corner language | Soft 20px cards in the app, **square** tiles on the landing | Square, softly rounded or pill; pick one and hold it |
| Atmosphere | Mist-blue to paper with 3.5% grain | Flat, a tinted wash, a darker register, photographic; match the brand |
| Density | Airy | Dense for tools, airy for marketing |
| Close | Navy band lit from below | A deep tone from the brand's own palette |

If two pages built with this reference share palette, type **and** corners, change something.

## BOOKLIN reference values

A worked example of the structure (neutral ladder + one accent + signals + radii + depth + motion).
Use verbatim only for BOOKLIN.

```css
:root{
  color-scheme: light dark;
  --canvas:#FAFAFA;  --paper:#FFFFFF;
  --surface-2:#F5F5F6; --surface-3:#EEEFF1;
  --line:#ECEDF0; --line-strong:#DEE0E4; --line-heavy:#C0C3C9;
  /* --ink-4 is the lightest grey allowed for small text (4.98:1 on canvas) */
  --ink-0:#0C0D10; --ink-1:#16181C; --ink-2:#34383F; --ink-3:#585D66; --ink-4:#686D76; --ink-5:#A0A4AB;
  --brand:#0038FF; --brand-deep:#002CCC; --brand-subtle:#EEF2FF; --brand-fg:#0A165A;
  --success:#15803D; --warn:#A16207; --danger:#B91C1C;
  --r-xs:4px; --r-sm:6px; --r-md:9px; --r-lg:10px; --r-xl:12px; --r-2xl:14px; --r-card:20px;
  --shadow-card: inset 0 1px 0 #fff, 0 0 0 1px rgb(12 13 16/.045), 0 2px 4px -2px rgb(12 13 16/.05),
                 0 12px 24px -12px rgb(12 13 16/.08), 0 32px 64px -32px rgb(12 13 16/.14);
  --ease-out:cubic-bezier(.16,1,.3,1); --ease-ios:cubic-bezier(.32,.72,0,1);
  --font-sans:"Mona Sans",-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
  --font-mono:"Martian Mono",ui-monospace,SFMono-Regular,monospace;
}
@media (prefers-color-scheme:dark){:root{
  --canvas:#0A0B0D; --paper:#131418; --surface-2:#1A1B20; --surface-3:#212328;
  --line:#24262C; --line-strong:#34373E;
  --ink-0:#F4F5F7; --ink-1:#E4E5E9; --ink-2:#C8CBD1; --ink-3:#A4A8B0; --ink-4:#92969F; --ink-5:#7C818B;
  --brand:#5D80FF; --brand-deep:#5D80FF; --brand-subtle:#181E3A; --brand-fg:#C7D2FF;
  --success:#4ADE80; --warn:#FBBF24; --danger:#F87171;
  --shadow-card: inset 0 1px 0 rgb(255 255 255/.05), 0 0 0 1px rgb(255 255 255/.06),
                 0 2px 4px -2px rgb(0 0 0/.4), 0 16px 32px -16px rgb(0 0 0/.55);
}}
```

Landing atmosphere tokens (BOOKLIN `.lp`): mist `#C3D3E6` to `#DBE3EC` to paper `#F4F5F7`,
foreground `#0A0C10`, tile `rgb(255 255 255/.72)` with a lit inner edge, navy `#040A17` /
`#0B2049` / `#2A4FA6`. On dark, the accent is lifted for text (`#3D66FF` landing, `#5D80FF` app).

Fonts outside Next:
`https://fonts.googleapis.com/css2?family=Mona+Sans:wdth,wght@75..125,200..900&family=Martian+Mono:wght@300;400&display=swap`

## Patterns worth reusing

**Type scale:** display weight ~500, slightly wide (`font-stretch` 106–108% when the face has
it), `letter-spacing` -0.04 to -0.045em, line-height ~1.0, `text-wrap: balance`; body 380–400 at
16px / 1.55; kicker in mono 10–11px, uppercase, 0.08–0.16em tracking.

**Surfaces:** a top-level card has no border and one soft layered shadow; a card inside a card
flattens to a hairline tile. Floating chrome (app bar, tab bar) sits 10–12px off the edges,
frosted (`backdrop-filter: blur(18px) saturate(1.8)`). Navy or deep-tone panels for data and
the closing call, lit from below.

**Controls:** primary is neutral ink with inverted text in dark; secondary is paper with a
hairline ring; inputs have a visible 2–3px accent focus ring. Landing buttons can be a square
label plus a separate arrow cell (the arrow slides through and a wipe fills the label on
hover, `:active` is `scale(.97)` at 160ms). One sliding indicator for segmented controls and menus.

**Landing composition:** mist-to-paper atmosphere, static film grain, square tiles with depth,
uppercase mono labels, a deep closing band, the wordmark as a faint footer watermark.

**Motion:** ease `cubic-bezier(.16,1,.3,1)` or `(.32,.72,0,1)`; UI feedback ≤ 300ms; only
`transform` and `opacity`; scroll-driven entrances where supported; loops dissolve onto their
first frame; autoplay has a pause control; reduced motion shows the last frame.

## Voice

Formal, professional PT-PT is BOOKLIN's register: third-person nouns, no "você", no casual
forms, no emojis. Default to it for Portuguese products unless the project's own voice says
otherwise. Never advertise a plan-gated or conditional feature as universal.

## Avoid

Gradient text · drifting colour or aurora · glints · a dark night-sky hero · HTML-redrawn
app screens · the category's reflex palette (cream and brown for coffee, green for wellness…) ·
rows of identical rounded cards in symmetric sections · heavy outlines · decoration that
competes with the product · reusing the BOOKLIN wordmark, logo or claims on another brand.

## Accessibility floor

WCAG 2.2 AA in both themes, measured. Lightest small-text grey ≥ 4.5:1. Visible focus on every
control. Touch targets ≥ 44px. Semantic HTML first. Reduced motion respected.

## Before delivering

- [ ] Identity derived from this project's brand, not copied from BOOKLIN
- [ ] Differs from the last build on at least two axes (accent, type, corners, atmosphere)
- [ ] One accent; primary buttons neutral; accent only as link, current state or mark
- [ ] Light and dark checked, contrast measured
- [ ] Nothing decorative moves; reduced motion respected
- [ ] Copy honest, in the right register, no emojis, no invented facts
- [ ] Checked at 360, 768 and 1280px
