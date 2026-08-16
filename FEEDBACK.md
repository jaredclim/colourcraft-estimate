# Iteration Log — colourcraft-estimate LP

## Round 9 — competitor round + live review layer DEPLOYED (2026-08-16 afternoon)

Jared: "make all the improvements based on competitor analysis... It's fine. A municipal licence is true... Can we set it up the same way that we have on our main site, where it's actually pulling live?"

Shipped (commit b0adff9, verified live post-deploy): Round 8's six audit fixes + all five competitor recommendations (GBP-linked review proof everywhere, numeric featurebar chips, fixed-price in service hero proof lines, CTA microcopy, Been burned to slot 2) + the live review layer (api/reviews.js proxy over the parent's GBP-synced feed, data-live hydration sitewide, 5-newest live section on /reviews with avatar photos, relative dates, curated-wall dedupe). Live verification: /api/reviews returns 4.9 / 67 / synced-today with Richard Huang newest; index hero hydrates and links to the Google reviews page; /reviews live section visible, 4 duplicate curated cards auto-removed; zero console errors. "municipally licensed" on why-us confirmed TRUE by Jared — stays. Full decisions detail in DECISIONS.md ("Competitor round + live review layer").

## Round 8 — full-site audit vs competitors + parent site (2026-08-16, fixes staged NOT deployed)

Jared's directive: full scan of every page vs competitors, strategy, and colourcraftpainting.com — indistinguishability bar. Three verification tracks: (1) image audit — all 56 images on all 9 pages contact-sheeted and personally viewed, zero sideways/misoriented; every questioned image (interior set, deck pair, arbor, balusters) traced to the parent site's own asset library (idx.js manifest / live pages), so photo provenance is fully parent-aligned; (2) competitor sweep — Pro Works, WOW 1 DAY, 4C, BestHousePainting, Maple Brothers; (3) parent-site alignment audit incl. the live review API.

Fixed this round (source + rebuilt, awaiting deploy approval):
- Duplicated owner paragraph on index (lines 645-646 class bug) — deleted one.
- Review count 66 -> 67 sitewide (verified against parent /api/trpc/reviews.getAll: Richmond & Delta totalReviews 67, GBP-synced 2026-08-16).
- Sheila Davis full review on /reviews restored to true verbatim ("(things i had elected to do myself)" had been silently elided).
- Footer legal row added for parent parity (© line + Privacy Policy + Accessibility links to parent, new tab — the two legal links are the one deliberate exception to the zero-off-domain-links model).
- Index FAQ no longer claims cabinet painting (no cabinet crew in territory; cabinet estimates go to Brad — paid pages must not promote it).
- g-rd-2 alt corrected ("front elevation" -> "exterior"; photo is not a front elevation).

Flagged for Jared, not changed: "municipally licensed" claim on why-us (parent never claims it; unverified); CTA label drift vs parent ("Book Free Estimate" vs parent's "Schedule Free Estimate" pattern); reviews page's own page-end review strip repeats 3 reviews from the grid above; George Samson 2-word review card (swap candidate: Richard Huang's newest R&D review, on the parent, absent here); em-dash flattening on parent-verbatim sentences (accepted fingerprint — voice ban governs); excerpt cards trim quotes without ellipsis in two places.

## Round 7 — Jared's detailed feedback round (deployed 2026-08-11 night)

Jared's first full review (14 points). Root theme: page must look like OUR site, not a generic LP. Rebuilt to main-site design language: gold utility bar + 76px-logo header clone; neighbourhood list and Quote Promise nav item removed; main-site hero pattern (big two-line H1, gold geo line, big star-rating block); dark icon trust bar; all 3 project cards now true dramatic front-elevation pairs (found Raymond after-06 front beauty shot + Andy charcoal->white transformation in the full photo sets); review labels consistent; burned section redesigned light/on-brand; owner section uses the zoomed headshot Jared emailed Brad July 26 (pulled from cc-gmail); process section cloned from main site (gold circles, connectors, italic accent); pricing redesigned (city-price list + cabinets strip killed, promise became the dark callout inside pricing, compare table own section in bordered card); embedded DripJobs form REMOVED per Jared (Basecoat-embed look) — all CTAs link out with gclid passthrough. Verified live: all images 200, zero broken after full scroll.

Still open from his feedback: nothing structural — remaining items are the standing asks (GBP link, DJ form config, real-data pack).


## Round 6 — presentation elevation (deployed 2026-08-11 night)

**Trigger:** Jared scored the page 60-70% of usable, gap = all four dimensions (visual, photos, copy, structure), bar = better than the main site.

**Applied:** cinematic full-height hero using the site's Richmond craftsman hero shot (finished-home aspiration; crew-van shot moved to a dedicated trust band in the owner section at full width); typography scale up (H1 62px, section H2 44px, 92px section rhythm); taller project imagery with hover lift; editorial review-quote treatment; Steveston card upgraded to the front-garden after; real cabinet-kitchen "Interiors and cabinets too" strip in the cost section (skipped the site's stock-looking interior renders — real-only is the differentiator vs Warline); button depth; booking-frame gold top border. Rejected: stock interior imagery.

**Process fix that caught a repeat:** the verify-after-push rule caught the new jpgs 404ing on production (plain `git add -A` skips *.jpg via the global gitignore — every NEW media asset needs `git add -f`). Fixed within minutes, verified zero broken images live after full scroll.


## Round 5 — FINAL (deployed 2026-08-11 evening)

**Panel:** fresh-eyes avatar review (final-mile) + competitor re-verdict. Competitor verdict: **wins 5 of 6 head-to-heads, ties Hemlock** — and this round closed Hemlock's one remaining edge (pricing education) with the real-ranges list + the vague-vs-real quote comparison table (all rows restate existing verified claims; no invented numbers).

**Applied:** cost section rebuilt (recent-projects price list up top, +2 honest drivers, "How to tell a real quote from a vague one" 5-row table, "Hold every painter to this standard, including us" close); narrative reorder — process above cost so the dollar-anchored CTA sits closest to the booking ask; anchor nav reordered to match page flow; Steveston (true tan→blue transformation) now leads the project grid, Seafair runs as a single hero after (its before/after pair showed no visible change — proof that proves nothing poisons the device); Steveston after recropped onto the house; repetition trimmed (fixed-price 4→2 tellings, no-pressure 6→3); step 01 stopped retelling the estimate mechanics; thank-you.html reframed honestly ("Your estimate request is in / we'll confirm your time" — was claiming "booked / your chosen time"); crew-at-work photo under the process steps; html background #111 (mobile white strip under footer).

**Final state:** 5 deployed versions, 10 independent expert reviews consumed (CRO ×2, competitor judge ×2, avatar panel ×2, design critique, QA verify, 2 research sweeps of 7 sites). Voice scan clean: 0 em-dashes in body copy, "slots" not "spots", no AI filler, stars-first social proof. Stopped iterating because every remaining finding is gated on Jared, not on more review.

**PARKED — needs Jared (in rough priority):**
1. Google Business Profile reviews URL → link the "4.9 across 187+" claim (every reviewer's top trust gap).
2. DripJobs ads-form config batch (one session): duplicate the form for ads; Province/Postal labels (currently "State"/"Zip"); form title shown to clients (currently internal "Scheduling - Richmond / Delta"); "How did you hear about us?" required 15-option dropdown (gclid passthrough already answers it); red validation text visible before typing; powered-by footer; set redirect to https://colourcraft-estimate.vercel.app/thank-you.html.
3. Google Ads: confirm the "Book appointment" conversion URL rule matches thank-you on the LP domain too.
4. Real-data pack (each strengthens the page, none invented meanwhile): Steveston project duration; 1-2 real R&D interior project values (needed before interior ad groups); deposit/payment terms FAQ (the burned shopper's unanswered #1: "how much do I pay and when"); warranty response practice; evening/weekend estimate availability; how to present Chris (Mumtaz's review names him, page only introduces Jared).
5. Seasonal fall-rain lines: swap ~October.
6. Later: ads split-test LP vs location page; estimate.colourcraftpainting.com DNS via Brad; hero/process video (real footage only).

Sacred-Ways-style loop commissioned 2026-08-11: version → full review → capture feedback → improve, ~10 rounds.
Every round scored on 3 criteria:
1. **Competitor superiority** — better than every single competitor (Pro Works, Hemlock, Warline, Holloway, CertaPro, Student Works)?
2. **Brand alignment** — Lovemark (high love × high respect), the 4 brand promises, certainty-over-price, "simply handle it", no colour-expertise claims, no discount positioning.
3. **Conversion optimization** — CTA system, structure, mobile fold, friction, trust hierarchy.

Truth rules in force: no invented claims (no response-time promise, no quote-validity window until Jared decides one, review count only as displayed on live site).

---

## Round 0 — v1 baseline (deployed 2026-08-11)

State: single-file LP, sticky header + anchor nav, hero + dual CTA + trust strip, quote promise block, 3 project cards, 3 R&D reviews, burned-before checklist, cost section, 3 steps, FAQ, final CTA. Known open questions: review count wording ("187+ verified" — verify "verified"), no mobile sticky CTA, phone hidden on mobile.

Research inputs pending: ccsite report, comp_a (Pro Works/Hemlock full), comp_b (Warline/Holloway/CertaPro/StudentWorks full), CRO rubric.

---

## Rounds 1-2 — mechanics + research-driven rebuild (deployed 2026-08-11 pm)

CRO audit of v1: 40/58. Research findings applied:
- **Mechanics (CRO):** mobile sticky CTA bar (call + book), image weight 1.63MB→~700KB + hero preload + lazy-load, CTA microcopy ("about a minute, no obligation"), 2 mid-page CTA strips, phone tappable at every depth.
- **Structural (competitor gap #1):** DripJobs form EMBEDS cleanly (no frame-block headers, verified render) → on-page #book section, all estimate CTAs now scroll to it. No more cross-domain hop. gclid/utm passthrough to iframe src. thank-you.html created on LP domain for future dedicated-ads-form redirect.
- **From own-site review:** van/crew hero (vans = 25%+ revenue recognition per Brand Standards), Montserrat 900 H1, before/after pairs for all 3 projects (site's ready-made slider assets), published project ranges ($16-22K Seafair · $9-13.5K Steveston · $11-13K Tsawwassen), 24-hour written quote promise (grounded: territory page), brand-promise line ("When we give a timeline, we hold to it..."), owner block (Jared photo + since-2012), Franco warranty-honoured proof quote, "The Colour Craft Way" 4-step process, cost reference range $9K-$22K.
- **From competitor teardowns:** review "Praised:" tags (Hemlock pattern), who-paints FAQ (brand-promise framing, no sub exposure), colours-not-chosen FAQ (defuses stall; consistent with no-colour-expertise stance), exterior-timing urgency kept.
- Copy fixes: "spots"→"slots" (copy bank rule), dropped "verified" from review count, em-dash removed from warranty label.

Known open (business decisions, NOT invented): 2-yr vs competitors' 3-yr warranty (Pro Works/Hemlock/Holloway/StudentWorks all claim 3); no offer/discount (deliberate anti-pressure positioning); Google review profile link (need URL from Jared); site 187+ vs /book 200+ count mismatch; dedicated DJ ads form + redirect to LP thank-you.html (Jared action in DripJobs).

---

## Round 3 — first review panel (deployed 2026-08-11 pm)

**Panel results:** CRO re-score 54/58 (from 40/58). Competitor judge verdict: LP now wins or ties all 6 head-to-heads (decisively vs Pro Works/Student Works/Warline-for-R&D; Hemlock's pricing-education depth is the one remaining dimension a competitor owns). Avatar panel: fold passes 5-second test for all 3 personas; hero van photo + Franco warranty quote + published prices + burned-before section flagged as strongest assets.

**Critical catch (CRO + avatar agents independently):** embedded form content is 2,362px desktop / 2,792px mobile but iframe was fixed at 1,750px, hiding the Submit button entirely. Fixed: 2500px desktop / 3050px mobile.

## Round 4 — QA verification + design-kinship pass (deployed 2026-08-11 pm)

**QA verify (live):** all 9 round-3 fixes PASS with measurements — form submit fully visible both viewports (no inner scroll), anchors clear the sticky header, sticky bar hides at #book and returns, iframe loads at 193ms (no lazy), geo swap works (?geo=ladner → "House Painters in Ladner, BC"), mobile header phone visible, book_cta_click fires to Google endpoints, LCP 240ms. Note: total transfer ~10.3MB but ~85% is the DripJobs app + GTM + reCAPTCHA (accepted trade-off for eager form).

**Design critique applied:** uppercase 3px-radius buttons (main-site button language — page previously disagreed with itself), gold top bar on header (first brand-colour moment), eyebrow tracking .16em, section h2 32→38px, hero h1 46→50px + geo-span nowrap (was orphaning "& Delta"), unified 4px radius + lighter shadows, cta-mid gold accent (was invisible white-on-white in cost section), FAQ width to 860px, owner block stacks centered on mobile (was squeezed), mobile hero repositioned 72% so crew face isn't under text, footer seated (logo mark, padding, border, no duplicate phone), dark-section contrast nudges, mobile iframe tail trimmed (3050→2870 per QA measurement). Design agent's "1,500px iframe void" claim rejected — artifact of its blank headless capture; QA's real measurement (138/258px tail) governed.

## Round 3 details

**Applied this round:** scroll-margin on anchors (headings were landing behind sticky header); iframe eager-load (was blank on fast CTA clicks); sticky bar hides while booking section on screen (was covering time chips + pointing at itself); removed all three "about a minute" claims (form = 11 required fields, request not calendar — honest reframe); Raymond before swapped to matching front elevation; interiors surfaced (hero sub + new FAQ) — was exterior-only page for interior-intent clicks; colour guidance lifted from FAQ into step 02; trust-strip echo above booking form; promise band got right-column CTA (was half-empty on desktop); mobile header shows phone instead of a redundant third gold CTA; review location labels made honest (only Mumtaz/Steveston verifiable, others "Google review"); brand-voice pass (removed "holds your place" overclaim, "this season" unverified claim, AI-cute mid-CTA line); book_cta_click gtag event; ?geo=ladner|tsawwassen|steveston|richmond|delta H1 swap for ad-group message match; email fallback under booking form; images resized to display size.
