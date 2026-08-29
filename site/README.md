# IEEE Computer Society — Kerala Chapter · Redesign Concept

A fresh, awards-tier concept for **cs.ieeekerala.org**, built to win approval for a full redesign.
This is a **presentation prototype** — the front-end experience is real and interactive; content is illustrative.

## How to view
The animations use CDN libraries (GSAP, Lenis) and a web font, so run it over a local server
(not `file://`) for a clean demo:

```bash
cd site
python -m http.server 8123
# then open http://localhost:8123
```

Requires an internet connection for the GSAP/Lenis CDN + the Google Fonts web fonts.

## The experience (scroll top → bottom)
1. **Preloader** — spinning globe mark, amber halo, animated word-stack + progress, then an ink curtain wipe.
2. **Hero** — a right-to-left carousel of real event photos drifting behind a huge editorial headline
   *"Four **decades** of Computing."* (accent serif = Italiana).
3. **Pinned story** — the visual **locks**; scrolling drives six chapters
   (*40+ years of legacy → a community of builders → hands-on, always → where ideas get shipped →
   voices that lead → beyond the screen*). Each chapter swaps the locked image with a glow crossfade.
4. **Convergence** — the images **scatter, converge into a glowing bubble**, then burst and **unfold into
   a right-to-left grid carousel** of the gallery.
5. **What we do** — asymmetric glass/amber pillar grid · **Stats** counters · **Events** · **CTA** · footer.

## Design language
- **Type (all open licence, served from Google Fonts):** `Anybody` (editorial display — its width axis
  covers the condensed and wide cuts), `Italiana` (display-serif flourish, used sparingly),
  `Urbanist` (UI/body).
- **Palette:** brand amber `#F5A623` + darker `#D07E0C` / `#8A5406`, warm **off-white paper `#F3ECDE`**
  (never plain white), warm near-black ink. Full **light + dark** theming via the sun/moon toggle (top-right),
  light is the default.
- **Feel:** modern glassmorphism, non-generic rounded frames, tasteful glow, brand-aligned amber energy —
  tuned to read as premium to students, millennials and senior professionals alike.

## Structure
```
site/
├─ index.html          # all sections
├─ css/style.css       # design system + components
├─ js/main.js          # preloader, GSAP/ScrollTrigger choreography, theme toggle
└─ assets/
   └─ img/             # web-optimised event photos + logo
                       # (no fonts/ — Anybody, Italiana and Urbanist load from Google Fonts)
```

### Presenter test hooks (query params)
- `?nopreload` — skip the preloader
- `?test` — disable smooth-scroll inertia (useful when jumping to a section)

_Concept only — not the final site._
