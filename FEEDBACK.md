# Iteration Log — colourcraft-estimate LP

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
