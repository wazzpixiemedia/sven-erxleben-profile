# Sven Erxleben — Homepage (New Concept)

A completely new homepage concept for **sven-erxleben.de**, built around Sven's
personal executive brand rather than an agency template. All factual content
(services, statistics, milestones, FAQ, blog posts, contact data) is carried over
from the existing site; the structure, layout system and visual language are new.

## Files

```
index.html                  the homepage
assets/css/style.css        design system + all section styles
assets/js/main.js           interactions (no dependencies, ~200 lines)
assets/images/              portrait, client logos, blog thumbnails
```

No build step, no framework. Open `index.html` through any static server.

```bash
python3 -m http.server 4173
```

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0B1220` | primary type, dark sections |
| `--ink-900` | `#070B14` | AI section, final CTA |
| `--slate` | `#57616F` | body copy |
| `--blue` | `#0A66C2` | LinkedIn-referenced accent |
| `--mist` | `#F5F6F8` | alternate section ground |
| `--line` | `#E2E5EA` | hairline dividers |

* **Type** — Inter Tight (display), Inter (body), IBM Plex Mono (labels, indices, numbers).
* **Shape** — 1px radii throughout. No rounded cards; structure comes from hairlines and whitespace.
* **Rhythm** — section padding `clamp(88px, 10.5vw, 168px)`, container `1360px`.
* **Blue is an accent only** — the LinkedIn panel is the single saturated surface on the page.

## Page structure

1. **Nav** — hairline bar, wordmark + role, scroll-progress rail, full-screen indexed mobile menu
2. **Hero** — editorial split: label, large statement, lede, dual CTA / portrait with stamp and follower chip
3. **Credibility strip** — four numbers divided by vertical hairlines, animated count-up
4. **LinkedIn** — saturated blue panel with the brand line, facts row and profile CTA, portrait tucked beside it
5. **AI visibility** — dark section, interface-inspired panel with a typed query and six AI systems
6. **Expertise** — sticky heading against nine indexed rows, typography instead of cards
7. **Clients** — restrained logo wall, logos flattened to a single ink silhouette
8. **Statement** — "Sichtbarkeit ist kein Zufall." as full-width breathing space
9. **About** — sticky portrait with the "Unternehmer seit 1998" badge, pull-quote, fact list
10. **Timeline** — six large year anchors on a thin horizontal rail (vertical on mobile)
11. **Process** — three columns, `01 / 02 / 03`
12. **FAQ** — numbered rows with thin dividers, single-open accordion
13. **Journal** — one large featured article plus two supporting entries
14. **Final CTA** — "20 Minuten Klarheit" on dark, contact details beside it
15. **Footer** — dark four-column with navigation, contact, LinkedIn and legal

## Interactions

Scroll reveals, image wipe-ins, number count-ups, underline animations, a gentle hero
parallax and a typed query line in the AI section. Everything is disabled under
`prefers-reduced-motion`, and the counters carry their final values in the markup so the
page is correct without JavaScript.

## Notes

* Mobile is designed, not stacked: the hero, statistics grid, AI rows, timeline and
  footer each have their own mobile composition.
* LinkedIn's public profile is login-gated, so the brand direction was taken from the
  positioning and follower count published on the current site.
* Client logos ship in mixed colours (some white artwork, some dark). They are normalised
  in CSS to one ink silhouette; Eurobox ships on an opaque plate and is handled separately
  via `.is-plate`.
