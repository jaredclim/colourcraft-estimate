// Assembles every page from one layout + one stylesheet + shared partials.
//
// Why a build step: eight pages that each carry their own copy of the header,
// footer and 450 lines of CSS drift apart the moment one is edited. Here the
// shared parts exist once. The CSS is INLINED into each page at build time
// rather than linked, so the pages stay single-request for paid traffic while
// still having a single source of truth.
//
// Usage: node build.mjs   (writes .html files to the project root)

import { readFileSync, writeFileSync, readdirSync } from 'fs';
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

// Nav is defined once here so every page shows the same items in the same order,
// and so the current page can be marked without hand-editing each file.
const NAV = [
  { label: 'Exterior Painting',    href: '/exterior-painting.html',    group: 'Services' },
  { label: 'Interior Painting',    href: '/interior-painting.html',    group: 'Services' },
  { label: 'Deck & Fence Painting',href: '/deck-fence-painting.html',  group: 'Services' },
  { label: 'Our Work',             href: '/our-work.html' },
  { label: 'Reviews',              href: '/reviews.html' },
  { label: 'Why Us',               href: '/why-us.html' },
  { label: 'Contact',              href: '/contact.html' },
];

function buildNav(currentHref) {
  const services = NAV.filter(n => n.group === 'Services');
  const top = NAV.filter(n => !n.group);
  const isCurrent = h => h === currentHref ? ' aria-current="page" class="is-current"' : '';
  const serviceOpen = services.some(s => s.href === currentHref) ? ' is-current' : '';
  return `<nav class="nav">
        <div class="nav-drop">
          <button type="button" class="nav-trigger${serviceOpen}" aria-expanded="false">Services<svg class="ic" width="12" height="12" aria-hidden="true"><use href="#ic-chevdown"/></svg></button>
          <div class="nav-menu">
            ${services.map(s => `<a href="${s.href}"${isCurrent(s.href)}>${s.label}</a>`).join('\n            ')}
          </div>
        </div>
        ${top.map(n => `<a href="${n.href}"${isCurrent(n.href)}>${n.label}</a>`).join('\n        ')}
      </nav>`;
}

function buildMobileNav(currentHref) {
  const all = [...NAV.filter(n => n.group === 'Services'), ...NAV.filter(n => !n.group)];
  return all.map(n => `<a href="${n.href}"${n.href === currentHref ? ' class="is-current"' : ''}>${n.label}</a>`).join('\n      ');
}

const meta = (src, key, fallback = '') => {
  const m = src.match(new RegExp(`<!--${key}:\\s*([\\s\\S]*?)-->`));
  return m ? m[1].trim() : fallback;
};

const pages = readdirSync(join(root, 'src/pages')).filter(f => f.endsWith('.html'));
let built = 0;

for (const file of pages) {
  const src = read(`src/pages/${file}`);
  const outName = file;
  const href = '/' + file;
  const title = meta(src, 'TITLE');
  const desc  = meta(src, 'DESC');
  if (!title || !desc) throw new Error(`${file}: missing TITLE or DESC comment`);

  const body = src.replace(/<!--[A-Z]+:[\s\S]*?-->\n?/g, '').trim();

  const html = layout
    .replace('{{TITLE}}', title)
    .replace('{{DESC}}', desc)
    .replace('{{CSS}}', css)
    .replace('{{ICONS}}', icons)
    .replace('{{HEADER}}', header.replace('{{NAV}}', buildNav(href)).replace('{{MOBILE_NAV}}', buildMobileNav(href)))
    .replace('{{BODY}}', body)
    .replace('{{FOOTER}}', footer)
    .replace('{{STICKY}}', sticky)
    .replace('{{SCRIPTS}}', scripts);

  if (html.includes('{{')) throw new Error(`${outName}: unreplaced slot ${html.match(/\{\{[A-Z_]+\}\}/)}`);
  writeFileSync(join(root, outName), html);
  built++;
  console.log(`built ${outName.padEnd(28)} ${(html.length / 1024).toFixed(1)} KB`);
}
console.log(`\n${built} page(s) built from 1 stylesheet + 1 layout.`);
