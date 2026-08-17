// Assembles every page from one layout + one stylesheet + shared partials,
// once per REGION.
//
// Why a build step: eight pages that each carry their own copy of the header,
// footer and 450 lines of CSS drift apart the moment one is edited. Here the
// shared parts exist once. The CSS is INLINED into each page at build time
// rather than linked, so the pages stay single-request for paid traffic while
// still having a single source of truth.
//
// Why regions: the South Surrey / White Rock ad set needs the same structure as
// Richmond & Delta, but that territory has no photographed projects and no
// separate review profile. So SSWR pages are built from the same source with
// every geography claim either swapped or REMOVED — never relabelled as SSWR.
// Region-specific copy lives in <!--RD-->…<!--/RD--> / <!--SSWR-->…<!--/SSWR-->
// blocks inside the page sources.
//
// Usage: node build.mjs   (writes .html to the project root and to /sswr)

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');

const css      = read('src/css/site.css');
const icons    = read('src/partials/icons.html');
const header   = read('src/partials/header.html');
const footer   = read('src/partials/footer.html');
const sticky   = read('src/partials/sticky.html');
const scripts  = read('src/partials/scripts.html');
const layout   = read('src/layout.html');
const pageend  = read('src/partials/pageend.html');

const SLUGS = ['exterior-painting', 'interior-painting', 'deck-fence-painting', 'our-work', 'reviews', 'why-us', 'contact', 'thank-you'];

const REGIONS = [
  { id: 'rd',   outDir: '',      prefix: '' },
  { id: 'sswr', outDir: 'sswr',  prefix: '/sswr' },
];

// Nav is defined once here so every page shows the same items in the same order,
// and so the current page can be marked without hand-editing each file.
const NAV = [
  { label: 'Exterior Painting',    href: '/exterior-painting',    group: 'Services' },
  { label: 'Interior Painting',    href: '/interior-painting',    group: 'Services' },
  { label: 'Deck & Fence Painting',href: '/deck-fence-painting',  group: 'Services' },
  { label: 'Our Work',             href: '/our-work' },
  { label: 'Reviews',              href: '/reviews' },
  { label: 'Why Us',               href: '/why-us' },
  { label: 'Contact',              href: '/contact' },
];

function buildNav(currentHref, prefix) {
  const services = NAV.filter(n => n.group === 'Services');
  const top = NAV.filter(n => !n.group);
  const P = h => prefix + h;
  const isCurrent = h => h === currentHref ? ' aria-current="page" class="is-current"' : '';
  const serviceOpen = services.some(s => s.href === currentHref) ? ' is-current' : '';
  return `<nav class="nav">
        <div class="nav-drop">
          <button type="button" class="nav-trigger${serviceOpen}" aria-expanded="false">Services<svg class="ic" width="12" height="12" aria-hidden="true"><use href="#ic-chevdown"/></svg></button>
          <div class="nav-menu">
            ${services.map(s => `<a href="${P(s.href)}"${isCurrent(s.href)}>${s.label}</a>`).join('\n            ')}
          </div>
        </div>
        ${top.map(n => `<a href="${P(n.href)}"${isCurrent(n.href)}>${n.label}</a>`).join('\n        ')}
      </nav>`;
}

function buildMobileNav(currentHref, prefix) {
  const all = [...NAV.filter(n => n.group === 'Services'), ...NAV.filter(n => !n.group)];
  return all.map(n => `<a href="${prefix + n.href}"${n.href === currentHref ? ' class="is-current"' : ''}>${n.label}</a>`).join('\n      ');
}

const meta = (src, key, fallback = '') => {
  const m = src.match(new RegExp(`<!--${key}:\\s*([\\s\\S]*?)-->`));
  return m ? m[1].trim() : fallback;
};

// Keep only the blocks belonging to this region.
function resolveRegionBlocks(html, id) {
  const keep = id.toUpperCase();
  const drop = id === 'rd' ? 'SSWR' : 'RD';
  return html
    .replace(new RegExp(`<!--${drop}-->[\\s\\S]*?<!--/${drop}-->\\n?`, 'g'), '')
    .replace(new RegExp(`<!--${keep}-->\\n?`, 'g'), '')
    .replace(new RegExp(`<!--/${keep}-->\\n?`, 'g'), '');
}

// SSWR: swap the territory name, then STRIP every claim that would attach a
// Richmond & Delta fact (reviews, project locations) to South Surrey.
function applySswr(html) {
  let h = html
    .replace(/Richmond &amp; Delta/g, 'South Surrey &amp; White Rock')
    .replace(/Richmond & Delta/g, 'South Surrey & White Rock')
    .replace(/Richmond and Delta/g, 'South Surrey and White Rock');

  // reviews are one Colour Craft profile — never claim they are from this territory
  h = h.replace(/(Google r|r)eviews in South Surrey (&amp; |& |and )White Rock/gi, (m, p1) => p1 + 'eviews')
       .replace(/Google Reviews in South Surrey (&amp; |& |and )White Rock/g, 'Google Reviews');

  // photo alt text and the geo project map carry R&D place names — scrub them
  h = h.replace(/alt="[^"]*"/g, (m) => m
        .replace(/\b(Seafair|Steveston|Tsawwassen|Ladner|North Delta|Richmond|Delta)\b,?\s*/g, '')
        .replace(/\s{2,}/g, ' ').replace(/\s+"/, '"'))
       .replace(/'(Seafair|Steveston|Tsawwassen|Ladner|North Delta|Richmond) &middot; (Richmond|Delta)'/g, "''")
       .replace(/'(Richmond|North Delta)'(?=,\s*'[A-Z])/g, "''");

  // the owner's Richmond upbringing is a Richmond & Delta proof point, not an
  // SSWR one — keep the tenure, drop the birthplace claim
  h = h.replace(/the owner, Jared, who was born and raised in Richmond and has been in the painting industry since 2012/g, 'the owner, Jared')
       .replace(/the owner, Jared, who was born and raised in Richmond/g, 'the owner, Jared')
       .replace(/an owner in Richmond who runs the estimates himself/g, 'an owner who runs the estimates himself')
       .replace(/I was born and raised in Richmond, and I have been building/g, 'I have been building');

  // project cards keep the work, drop the location tag (no SSWR photos exist yet)
  h = h.replace(/\s*<span class="card-tag"[^>]*>[\s\S]*?<\/span>\n?/g, '\n          ');

  // pricing figures come from R&D booked jobs — publish them without a geo claim
  h = h.replace(/A standard full exterior repaint in South Surrey and White Rock runs/g,
                'A standard full exterior repaint runs')
       .replace(/Average project costs in South Surrey &amp; White Rock/g, 'Average project costs');

  // section headings that would imply local projects
  h = h.replace(/Our Work in South Surrey &amp; White Rock/g, 'Our Work')
       .replace(/Recent Exterior Projects in South Surrey &amp; White Rock/g, 'Recent Exterior Projects');

  return h;
}

let built = 0;
for (const region of REGIONS) {
  if (region.outDir) mkdirSync(join(root, region.outDir), { recursive: true });
  const pages = readdirSync(join(root, 'src/pages')).filter(f => f.endsWith('.html'));

  for (const file of pages) {
    const raw = read(`src/pages/${file}`);
    const src = resolveRegionBlocks(raw, region.id);
    const href = file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '');
    const title = meta(src, 'TITLE');
    const desc  = meta(src, 'DESC');
    if (!title || !desc) throw new Error(`${file}: missing TITLE or DESC comment`);

    const noEnd = /<!--NOPAGEEND-->/.test(src);
    const endBlock = resolveRegionBlocks(pageend, region.id);
    const body = src.replace(/<!--[A-Z]+:[\s\S]*?-->\n?/g, '').replace(/<!--NOPAGEEND-->\n?/g, '').trim() + (noEnd ? '' : '\n\n' + endBlock);

    let html = layout
      .replace('{{TITLE}}', title)
      .replace('{{DESC}}', desc)
      .replace('{{CSS}}', css)
      .replace('{{ICONS}}', icons)
      .replace('{{HEADER}}', resolveRegionBlocks(header, region.id).replace('{{NAV}}', buildNav(href, region.prefix)).replace('{{MOBILE_NAV}}', buildMobileNav(href, region.prefix)))
      .replace('{{BODY}}', body)
      .replace('{{FOOTER}}', resolveRegionBlocks(footer, region.id))
      .replace('{{STICKY}}', resolveRegionBlocks(sticky, region.id))
      .replace('{{SCRIPTS}}', resolveRegionBlocks(scripts, region.id));

    if (region.id === 'sswr') {
      html = applySswr(html);
      // keep internal links inside the region
      for (const slug of SLUGS) html = html.replace(new RegExp(`href="/${slug}"`, 'g'), `href="/sswr/${slug}"`);
      html = html.replace(/href="\/"/g, 'href="/sswr/"');
    }

    if (html.includes('{{')) throw new Error(`${file}: unreplaced slot ${html.match(/\{\{[A-Z_]+\}\}/)}`);
    writeFileSync(join(root, region.outDir, file), html);
    built++;
    console.log(`built ${(region.outDir ? region.outDir + '/' : '') + file}`.padEnd(40) + `${(html.length / 1024).toFixed(1)} KB`);
  }
}
console.log(`\n${built} page(s) built across ${REGIONS.length} regions from 1 stylesheet + 1 layout.`);
