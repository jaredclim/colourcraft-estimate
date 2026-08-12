# Source

Pages are assembled by `node build.mjs`, which writes the `.html` files at the
project root. Never edit the root `.html` files directly — they are build output
and will be overwritten.

- `src/css/site.css` — the only stylesheet. Tokens are measured off
  colourcraftpainting.com; see DECISIONS.md.
- `src/layout.html` — the page shell (head, tracking, slots).
- `src/partials/` — header (with nav), footer, sticky mobile bar, icon sprite, scripts.
- `src/pages/*.html` — per-page body content. Each starts with `<!--TITLE: -->`
  and `<!--DESC: -->` comments, which the build reads.

Nav is defined once in `build.mjs` so all pages carry the same items and the
current page is marked automatically.
