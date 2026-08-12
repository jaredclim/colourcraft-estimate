# Decision Log — colourcraft-estimate LP

Purpose: no value on this page is chosen by eye. Anything on it can be traced here.

Sources are marked:
- **[SITE]** — measured off colourcraftpainting.com with Playwright computed styles. Reference page = **/locations/richmond-delta** (closest analogue: a Richmond/Delta service page, and the current ad destination), plus the home hero where the LP uses the home-hero pattern.
- **[DERIVED]** — calculated from a measurement on this page (fold tests, text-fit tests, geometry). The test scripts live in the session scratchpad: `fit.mjs`, `fold_check.mjs`, `settle.mjs`, `extract_tokens.mjs`, `featurebar.mjs`, `rd_structure.mjs`, `nav.mjs`.
- **[BRAND]** — CC brand/vault material or the live site's own copy.
- **[DEPARTURE]** — deliberately different from the site because this is a paid-traffic landing page. All are listed in §6.

---

## 1. Tokens

| Token | Value | Source |
|---|---|---|
| Content wrap | 1280px, 32px gutters | [SITE] |
| Body | Barlow 16px / line-height 26px / `#1A1A1A` | [SITE] |
| Secondary text | `#4A5565` | [SITE] gray-600 |
| Light-on-dark secondary | `rgba(255,255,255,.7)` | [SITE] |
| Gold / dark / off-white / border | `#FFAE00` / `#1A1A1A` / `#F9F8F6` / `#E5E3DF` | [SITE] |
| Gold hover | `#e09900` + `translateY(-1px)` + `0 4px 16px rgba(255,174,0,.4)` | [SITE] btn-primary:hover |
| H2 | Montserrat 30px / 36px / 900 | [SITE] |
| Sub-head (h3 in-section) | 24px / 32px / 900 | [SITE] |
| H3 | 16px / 24px / 900 | [SITE] |
| Eyebrow | Barlow 11px / 700 / ls 1.98px / lh 16.5px / gold | [SITE] |
| Button | Barlow 12px / 700 / ls .96px / uppercase / radius 3px / pad 12×20 | [SITE] |
| Button (large) | 13px / lh 19.5 / ls 1.04 / pad 14×32 | [SITE] |
| Utility bar | text 12px/500 `rgba(26,26,26,.7)`; links 12px/700 | [SITE] measured on the text nodes |
| Feature bar | gold band, items 14px/600, icon gap 8px, padding 16px | [SITE] gold on every location + service page (black is homepage-only) |
| Cards | radius 4px, 1px `#E5E3DF`, no shadow, padding 24px | [SITE] R&D page card |
| Section padding | 64px | [SITE] |
| Measures | 672px hero copy, 768px reading text | [SITE] |
| Icons | Lucide, 24-viewBox, stroke-width 2 | [SITE] uses 58 Lucide SVGs; text glyphs were the biggest visual tell |
| Breakpoints | 1024px (nav), 768px (layout) | [SITE] Tailwind lg / md |
| Anchor offset | 113px | [DERIVED] measured sticky chrome (32 + 81) + 8 |

## 2. Hero

- **Height `min-height:60vh`** — [SITE] the site's own hero rule. [DERIVED] verified at 1440×700, 1512×750, 1512×850, 1728×990 and 390×844: headline, both CTAs and the rating clear the fold on every one, with the feature bar visible beneath (43–108px).
- **H1 64px / lh 64 / w900 / ls −1.28px** — [DERIVED]. The site's home H1 is 96px inside a 672px column, but that headline is 25 characters and ours is 35. Holding the site's 672px column, 64px is the largest size where "Richmond & Delta." stays on one line (renders 647px of 672). 72px wraps to three lines.
- **Scrim** — [SITE] `105deg rgba(0,0,0,.5 / .3 / .05)` on desktop. [DEPARTURE] mobile overrides to a vertical scrim: the horizontal gradient was tuned for a desktop text column and left the gold headline at 2.05:1 contrast on phones.
- **Text-shadow `0 2px 20px rgba(0,0,0,.6)`** — legibility over photography; the scrim alone is insufficient at the lighter end.

## 3. Section order

Hero → feature bar → Our Work → Reviews → Been burned (incl. quote comparison) → Owner → Process → Pricing → FAQ → gold CTA → footer.

Proof (work, reviews) precedes argument because paid traffic arrives cold. The vetting section and the quote-comparison table were merged: they are the same argument (what to demand of any painter) and were previously told twice, ~4,000px apart. Pricing sits late because it answers a question the reader only asks once they believe the work is good, and it now opens with the fixed-price promise and the three real project ranges. Backgrounds alternate white / `#F9F8F6` per [SITE]; the final CTA band is gold per [SITE] (the location page's CTA is gold, not dark).

## 4. Copy

Verbatim from the site: feature bar items, hero eyebrow/sub/"Craftsmanship & Care On Every Project", process step names including "Expert Execution", "Reviews of Colour Craft Painting", the reviews line, the Professional Crews answer, and the final CTA heading. Owner bio condensed from /about with no added facts. Reviews are verbatim Google reviews. Project prices and paint products are the figures published on the site's own project pages ($9,000–$12,000 Steveston, $11,000–$13,000 Tsawwassen, $18,000–$22,000 Seafair).

Removed and why: the Franco warranty review (a single job needing house, deck and fence warranty work reads as a defect story); "a price that doesn't move" as a checklist item (duplicated "itemized written scope" — the fixed-price promise now appears once, in Pricing); the neighbourhood list in the header (ads cover all of Richmond and Delta); durations on project cards (published for only one of three).

## 5. Tracking

- `phone_conversion_callback` rewrites `tel:` hrefs. The css-class swap changes displayed text only, so without this, mobile taps dial the untracked number and record no call conversion.
- `book_cta_click` fires on every CTA. This is an engagement event, not a conversion; the booking conversion needs the DripJobs redirect (see §7).
- gclid / gbraid / wbraid / utm_* pass through to every DripJobs link.
- `?geo=ladner|tsawwassen|steveston|richmond|delta` swaps the H1 for ad-group message match.

## 6. Deliberate departures from the site

1. Menu links open in a new tab (Jared's call: real pages, not anchors; new tab preserves the paid session).
2. CTAs skip `/book` — ads traffic already declares its territory, so the postal router is a removed step.
3. `noindex` — a near-duplicate of the location page would compete with it organically.
4. Mobile sticky call/book bar, and the utility bar hidden on mobile (the sticky bar carries both actions).
5. Mobile hero scrim (accessibility, see §2).
6. Body copy in the process steps is 16px rather than the site's 12px: this audience is 45–70.

## 7. Open, needs Jared

1. Google Business Profile URL, to make 4.9 / 187+ verifiable (every reviewer's top trust gap).
2. DripJobs ads-form config: 13 required fields across 5 steps, "State"/"Zip" labels, internal title "Scheduling - Richmond / Delta", required "How did you hear about us?" that gclid already answers, red validation before typing. Also set its redirect to `/thank-you.html` so bookings can be counted.
3. Deposit / payment terms — the burned buyer's #1 unanswered question. Not invented here.
4. Whether to answer "Do you use subcontractors?" and how. Competitors answer it "no"; ours needs Jared's wording.
5. Real interior project photo + value, before interior ad groups run.
6. Seasonal fall-rain lines: swap around October.
7. Known accessibility deviation inherited from the site: gold `#FFAE00` on white measures 1.86:1 for the small eyebrow labels and stars. Kept for parity; the information they carry is repeated in adjacent dark text. Worth raising sitewide with Brad rather than diverging here.
