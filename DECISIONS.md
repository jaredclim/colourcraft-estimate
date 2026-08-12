# Decision Log — colourcraft-estimate LP

Every value on this page traces to one of three sources:
- **[SITE]** — extracted from colourcraftpainting.com with Playwright computed styles (not eyeballed from a screenshot). Extraction scripts: `scratchpad/extract_tokens.mjs`, `featurebar.mjs`, `rd_structure.mjs`, `nav.mjs`.
- **[EVIDENCE]** — measured on this page (fold tests, render tests) or taken from verified CC material (vault brand files, live reviews, About page bio).
- **[STRATEGY]** — a deliberate departure from the site, because this is a paid-traffic landing page. Every departure is named and justified here; there are only five.

Reference page for structure = **/locations/richmond-delta**, because it is the closest analogue (a Richmond/Delta service page) and the current ad destination.

---

## 1. Design tokens

| Token | Value | Source |
|---|---|---|
| Content wrap | max-width 1280px, padding 0 32px | [SITE] R&D page wrapper |
| Body font | Barlow 16px, `#1A1A1A` | [SITE] all 6 pages sampled |
| Heading font | Montserrat | [SITE] all pages |
| Gold | `#FFAE00` (rgb 255,174,0) | [SITE] buttons, eyebrows, bars, CTA section |
| Dark | `#1A1A1A` (rgb 26,26,26) | [SITE] body text, dark sections, footer |
| Dark alt | `#2A2A2A` | [SITE] reviews/our-work band |
| Off-white | `#F9F8F6` (rgb 249,248,246) | [SITE] alternating section bg |
| Card border | `1px solid #E5E3DF`, radius 4px, **no shadow** | [SITE] R&D page card |
| Section padding | 64px top/bottom (reviews band 56px) | [SITE] R&D page sections |
| H2 major | Montserrat 30px / 36px line-height / weight 900 | [SITE] R&D "Professional Painting in Richmond & Delta" |
| H2 sub | 24px / 32px / 900 | [SITE] R&D "Communities We Serve" |
| H3 | 16px / 24px / 900 | [SITE] R&D process steps |
| Eyebrow | Barlow 11px / 700 / letter-spacing 1.98px / gold / uppercase | [SITE] "ABOUT THIS LOCATION", "PORTFOLIO", "CUSTOMER REVIEWS" |
| Button | Barlow 12px / 700 / ls 0.96px / uppercase / bg gold / text `#1A1A1A` / radius 3px / padding 12px 20px | [SITE] FREE ESTIMATE button, identical on all 6 pages |
| Button (hero size) | same tokens, padding 16px 28px, 13px | [STRATEGY] hero CTAs need larger tap targets on a paid LP; tokens otherwise unchanged |

**Previously arbitrary, now corrected:** wrap was 1200/24 → 1280/32. Body 17px → 16px. Section padding 92px → 64px. Off-white `#F9F6F1` → `#F9F8F6`. Cards had a drop shadow the site does not use. Buttons were Montserrat 13.5px → Barlow 12px. Eyebrow was Montserrat → Barlow.

## 2. Section order and backgrounds

Order follows the site's own persuasion sequence on the R&D page (context → proof → process → questions → ask), with proof pulled earlier because paid traffic arrives cold and decides fast.

| # | Section | Background | Why here |
|---|---|---|---|
| 1 | Hero | photo + dark scrim | [SITE] home hero pattern |
| 2 | Feature bar | **gold** | [SITE] gold on every location/service page |
| 3 | Our Work | white | [EVIDENCE] proof before claims; competitor teardown showed no rival shows priced local jobs |
| 4 | Reviews | `#F9F8F6` | [SITE] alternation |
| 5 | Been burned | white | [EVIDENCE] research doorway: the market's #1 emotion is prior bad experience |
| 6 | Owner | `#F9F8F6` | answers "who is accountable" right after the fear section |
| 7 | Our Process | white | [SITE] R&D page has this exact section, same 4 steps |
| 8 | Pricing | `#F9F8F6` | [EVIDENCE] biggest search cluster; Hemlock is the only competitor answering it |
| 9 | Quote comparison | white | teaches the vetting standard our quote passes |
| 10 | FAQ | `#F9F8F6` | [SITE] R&D page ends with FAQ before the CTA |
| 11 | Final CTA | **gold** | [SITE] R&D page final CTA is gold, not dark |
| 12 | Footer | `#1A1A1A` | [SITE] |

## 3. Hero sizing

- **Height: `clamp(460px, calc(100svh - 205px), 700px)`** — [EVIDENCE] fixed heights push the fold off small laptops. 205px = utility bar + header + ~65px of the feature bar deliberately left visible to signal scroll. Verified at 1440×700, 1512×750, 1512×850, 1728×990, 390×844: headline, both CTAs and the rating clear the fold in every case. Range lands between the site's location hero (540px) and home hero (921px).
- **H1 size: chosen by measurement, not taste.** The home H1 is 96px for a 25-character line; ours is 35 characters, so the same value overflows. Selected the largest size that still yields two balanced lines inside the 1280 wrap while clearing the fold at 1440×700 — see the render test in §7.

## 4. Copy decisions

| Element | Decision | Source |
|---|---|---|
| H1 "House Painters in Richmond & Delta." | Geo + service match to the ad keyword | [EVIDENCE] message match; Quality Score relevance |
| Sub "Expert painters. Clear pricing. 2-year warranty." | verbatim | [SITE] home hero |
| "Craftsmanship & Care On Every Project" | verbatim | [SITE] home hero |
| Feature bar items | verbatim | [SITE] location/service pages |
| Process steps: Free Estimate / Plan & Prepare / Expert Execution / Final Walkthrough | verbatim, including "Expert Execution" (was wrongly "Paint & Communicate") | [SITE] R&D page |
| Reviews line "4.9 ★ average across 187+ verified Google reviews" | verbatim | [SITE] R&D reviews band |
| Owner bio | condensed from the About page, no invented facts | [SITE] /about |
| Review quotes | verbatim from live Google reviews | [EVIDENCE] site reviews page |
| Project prices | published project-page ranges only | [EVIDENCE] site project pages |

## 5. The five deliberate departures from the site

1. **Menu links open in a new tab.** [STRATEGY] Jared's call: menu items go to real pages like Pro Works, not on-page anchors. New tab keeps the paid session alive while satisfying that.
2. **CTAs skip `/book`.** [STRATEGY] The site's buttons go to the postal-code router; ads traffic already declares its territory, so we link straight to the Richmond & Delta form. Removes one step from the paid path.
3. **No `/book` postal field in the hero.** Same reason.
4. **noindex.** [STRATEGY] A near-duplicate of the location page would compete with it in organic search.
5. **Mobile sticky call/book bar.** [STRATEGY] Not a site pattern, but the highest-evidence mobile conversion element and invisible on desktop.

## 6. Removed, with reasons

- **Franco warranty-honoured review** — removed. Jared: reads as a red flag, since one job needed house, deck and fence warranty work.
- **"A price that doesn't move" from the burned checklist** — removed as a checklist item; it duplicated "itemized written quote". Replaced with **who actually shows up** (Professional Crews, a brand promise). The fixed-price point still lives once, in the pricing promise callout.
- **Embedded DripJobs form** — removed. Jared rejected the embedded-form look on the Basecoat site.
- **Neighbourhood list in the header** — removed. Ads target all of Richmond and Delta; naming four areas excludes the rest.
- **"Our Quote Promise" nav item** — removed. It pointed at a single paragraph.
- **Cabinet/interior strip in pricing** — removed as a bolted-on block; interiors now covered in copy and FAQ.

## 7. Render tests run before shipping

See `scratchpad/fold_check.mjs` (5 viewports) and `scratchpad/h1_test.mjs` (headline sizing).
