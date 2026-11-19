// Draws the flat 2D people and service characters as SVG into public/img/2d/.
// Run: node scripts/art/make-2d.mjs
// Every image is a 100×100 square that shows the whole person, so a crop of 100% fits a tile or an avatar.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '../../public/img/2d');
mkdirSync(out, { recursive: true });

/* ---------- palette (matches src/tokens/colors.ts) ---------- */
const C = {
  green: '#0b5d4b', deep: '#08463a', yellow: '#ffc93c', mint: '#e3f1ec', ink: '#0f2620', white: '#ffffff',
  lip: '#8a3b2e', blush: '#e88b73', red: '#c8372d',
};
const SKIN = { a: '#f2c9a5', b: '#e2ad84', c: '#c98f63', d: '#a96c45', e: '#8a5434' };
const HAIR = { black: '#1d1714', brown: '#3b2519', grey: '#b9b3ab', salt: '#77706a' };

/** darken (f < 1) or lighten (f > 1) a hex colour */
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(f < 1 ? v * f : v + (255 - v) * (f - 1))));
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((v) => ch(v).toString(16).padStart(2, '0')).join('');
}

/* ---------- parts ---------- */
const hairBack = {
  long: (h) => `<path d="M29 46C26 22 39 15 50 15C61 15 74 22 71 46C72 60 73 68 77 78L23 78C27 68 28 60 29 46Z" fill="${h}"/>`,
  bun: (h) => `<circle cx="50" cy="17" r="8.5" fill="${h}"/>`,
  braid: (h) => `<path d="M29 44C27 24 39 16 50 16C61 16 73 24 71 44L69 60L31 60Z" fill="${h}"/>`,
};
const hairFront = {
  short: (h) => `<path d="M32.5 43C30.5 27 39 19.5 50 19.5C61 19.5 69.5 27 67.5 43C66 35 61 31 55 30.5C49 33 40 33 35.5 34C34 36.5 33 39.5 32.5 43Z" fill="${h}"/>`,
  side: (h) => `<path d="M32.5 44C30 27 39 19 51 19C62 19 70 27 67.5 43C66.5 35 63 31 58 29C52 32 42 33 36 32.5C34 36 33 40 32.5 44Z" fill="${h}"/>`,
  curly: (h) => `<g fill="${h}"><circle cx="36" cy="33" r="6"/><circle cx="42" cy="26" r="6.5"/><circle cx="50" cy="23.5" r="7"/><circle cx="58" cy="26" r="6.5"/><circle cx="64" cy="33" r="6"/><circle cx="33.5" cy="40" r="4"/><circle cx="66.5" cy="40" r="4"/></g>`,
  balding: (h) => `<path d="M32.5 46C31.5 38 32.5 33 35 31C35 36 35.5 40 36.5 46Z M67.5 46C68.5 38 67.5 33 65 31C65 36 64.5 40 63.5 46Z" fill="${h}"/>`,
  parted: (h) => `<path d="M32.5 44C31.5 27 40 20 50 20C60 20 68.5 27 67.5 44C65.5 34 59 29.5 50.5 28C50 28 49.5 28 49.5 28C41 29.5 34.5 34 32.5 44Z" fill="${h}"/>`,
  fringe: (h) => `<path d="M32.5 44C30.5 26 40 19.5 50 19.5C60 19.5 69.5 26 67.5 44C65 37 63 34 61 32C56 35 46 35.5 39 34C36 36.5 34 40 32.5 44Z" fill="${h}"/>`,
};

function face({ skin, hair, smile = 'soft', brows = true }) {
  const dark = shade(skin, 0.86);
  const eye = C.ink;
  const mouth = smile === 'open'
    ? `<path d="M44 53.5Q50 54.6 56 53.5Q55.2 59.5 50 59.5Q44.8 59.5 44 53.5Z" fill="${C.lip}"/><path d="M45.2 54.2Q50 55.1 54.8 54.2L54.6 55.4Q50 56.2 45.4 55.4Z" fill="#fff"/>`
    : `<path d="M45 54.5Q50 58.4 55 54.5" fill="none" stroke="${C.lip}" stroke-width="1.7" stroke-linecap="round"/>`;
  return `
  <ellipse cx="33" cy="46" rx="3.6" ry="4.6" fill="${dark}"/><ellipse cx="67" cy="46" rx="3.6" ry="4.6" fill="${dark}"/>
  <ellipse cx="50" cy="43" rx="17" ry="19.5" fill="${skin}"/>
  <ellipse cx="42.5" cy="45" rx="1.9" ry="2.3" fill="${eye}"/><ellipse cx="57.5" cy="45" rx="1.9" ry="2.3" fill="${eye}"/>
  <circle cx="43.1" cy="44.3" r=".6" fill="#fff"/><circle cx="58.1" cy="44.3" r=".6" fill="#fff"/>
  ${brows ? `<path d="M39.5 40.2Q42.5 38.6 45.5 39.8M54.5 39.8Q57.5 38.6 60.5 40.2" fill="none" stroke="${hair}" stroke-width="1.5" stroke-linecap="round"/>` : ''}
  <path d="M50 46.5L48.6 50.5Q50 51.3 51.4 50.5" fill="none" stroke="${shade(skin, 0.72)}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="39.5" cy="51.5" rx="2.6" ry="1.5" fill="${C.blush}" opacity=".35"/><ellipse cx="60.5" cy="51.5" rx="2.6" ry="1.5" fill="${C.blush}" opacity=".35"/>
  ${mouth}`;
}

const extras = {
  beard: (h) => `<path d="M33.5 45C33 60 41 66.5 50 66.5C59 66.5 67 60 66.5 45C65 53 62 57.5 57 57.5L43 57.5C38 57.5 35 53 33.5 45Z" fill="${h}"/>`,
  stubble: (h) => `<path d="M34 47C34.5 60 42 65 50 65C58 65 65.5 60 66 47C64 55 60 58.5 50 58.8C40 58.5 36 55 34 47Z" fill="${h}" opacity=".35"/>`,
  moustache: (h) => `<path d="M43 53.2Q46.5 50.6 50 52.2Q53.5 50.6 57 53.2Q53.5 54.4 50 53.6Q46.5 54.4 43 53.2Z" fill="${h}"/>`,
  bigMoustache: (h) => `<path d="M40 54.5Q44 49.8 50 52Q56 49.8 60 54.5Q57.5 53.6 55 54.8Q52 53.4 50 54.4Q48 53.4 45 54.8Q42.5 53.6 40 54.5Z" fill="${h}"/>`,
  glasses: () => `<g fill="none" stroke="${C.ink}" stroke-width="1.4"><circle cx="42.5" cy="45" r="4.6"/><circle cx="57.5" cy="45" r="4.6"/><path d="M47.1 44.6Q50 43.4 52.9 44.6"/></g>`,
  bindi: () => `<circle cx="50" cy="36.8" r="1.3" fill="${C.red}"/>`,
  earrings: () => `<circle cx="33" cy="52" r="1.6" fill="${C.yellow}"/><circle cx="67" cy="52" r="1.6" fill="${C.yellow}"/>`,
  turban: (col) => `<path d="M31 41C29.5 22 40 15 50 15C60 15 70.5 22 69 41C66 33.5 59 30 50 30C41 30 34 33.5 31 41Z" fill="${col}"/><path d="M36 25Q50 31 64 25M33 33Q50 25 67 33" fill="none" stroke="${shade(col, 0.8)}" stroke-width="1.6"/>`,
  dupatta: (col) => `<path d="M27 50C25 26 38 13.5 50 13.5C62 13.5 75 26 73 50C72 41 69 31 50 27C31 31 28 41 27 50Z" fill="${col}"/>`,
  hardHat: () => `<path d="M30 37C30 24 39 17 50 17C61 17 70 24 70 37Z" fill="${C.yellow}"/><rect x="26" y="35" width="48" height="5" rx="2.5" fill="${shade(C.yellow, 0.85)}"/><rect x="47.5" y="17" width="5" height="18" rx="2" fill="${shade(C.yellow, 0.9)}"/>`,
};

/** clothes: shoulders and neck */
function clothes({ skin, wear = 'tee', col = C.green, trim = C.yellow }) {
  const neck = `<path d="M43 58L57 58L58 72L42 72Z" fill="${shade(skin, 0.86)}"/>`;
  const body = `<path d="M10 101C10 83 25 71.5 50 71.5C75 71.5 90 83 90 101Z" fill="${col}"/>`;
  const v = `<path d="M42 71.6L50 81L58 71.6Z" fill="${shade(skin, 0.86)}"/>`;
  switch (wear) {
    case 'apron': // Saathi helper: shirt + green apron with yellow badge
      return neck + `<path d="M10 101C10 83 25 71.5 50 71.5C75 71.5 90 83 90 101Z" fill="${trim}"/>` + v
        + `<path d="M33 101L35 80Q35 77 38 77L62 77Q65 77 65 80L67 101Z" fill="${C.green}"/><path d="M38 77L41 72M62 77L59 72" stroke="${C.green}" stroke-width="3" stroke-linecap="round"/>`
        + `<circle cx="50" cy="88" r="4.6" fill="${C.yellow}"/><path d="M51.7 86.2Q50 85.2 48.6 86.2Q47.8 87.4 50 88Q52.2 88.6 51.4 89.8Q50 90.8 48.3 89.8" fill="none" stroke="${C.green}" stroke-width="1.3" stroke-linecap="round"/>`;
    case 'scrubs':
      return neck + body + `<path d="M41 71.6L50 84L59 71.6Z" fill="${shade(skin, 0.86)}"/><path d="M41 71.6L50 84L59 71.6" fill="none" stroke="${shade(col, 0.8)}" stroke-width="1.6"/>`
        + `<rect x="60" y="86" width="10" height="7" rx="1.5" fill="${shade(col, 0.85)}"/>`;
    case 'collar':
      return neck + body + v + `<path d="M41 71L50 80L44 84L38 74Z M59 71L50 80L56 84L62 74Z" fill="${shade(col, 1.45)}"/><circle cx="50" cy="88" r="1" fill="${shade(col, 0.7)}"/><circle cx="50" cy="94" r="1" fill="${shade(col, 0.7)}"/>`;
    case 'kurta':
      return neck + body + `<path d="M46 71.6L50 76L54 71.6Z" fill="${shade(skin, 0.86)}"/><path d="M50 76L50 92" stroke="${shade(col, 0.75)}" stroke-width="1.4"/><circle cx="50" cy="81" r=".9" fill="${C.yellow}"/><circle cx="50" cy="86" r=".9" fill="${C.yellow}"/>`;
    case 'saree':
      return neck + body + `<path d="M44 71.6L50 78L56 71.6Z" fill="${shade(skin, 0.86)}"/><path d="M60 72.5C70 74 79 80 83 92L72 101L56 101C60 92 62 82 60 72.5Z" fill="${trim}"/><path d="M60 72.5C70 74 79 80 83 92" fill="none" stroke="${C.yellow}" stroke-width="2"/>`;
    case 'blazer':
      return neck + `<path d="M10 101C10 83 25 71.5 50 71.5C75 71.5 90 83 90 101Z" fill="${col}"/><path d="M42 71.6L50 86L58 71.6Z" fill="${trim}"/><path d="M41 71.8L50 92L44 80L38 73Z M59 71.8L50 92L56 80L62 73Z" fill="${shade(col, 0.8)}"/>`;
    default: // tee
      return neck + body + `<path d="M42 71.6Q50 79 58 71.6Z" fill="${shade(skin, 0.86)}"/>`;
  }
}

/** one person, head and shoulders */
function person(p) {
  const h = HAIR[p.hairColor ?? 'black'];
  const back = p.back ? hairBack[p.back](h) : '';
  const cover = p.dupatta ? extras.dupatta(p.dupatta) : '';
  const top = p.turban ? extras.turban(p.turban) : p.hardHat ? extras.hardHat() : p.hair ? hairFront[p.hair](h) : '';
  return [
    cover, back, clothes({ ...p, skin: SKIN[p.skin] }), face({ skin: SKIN[p.skin], hair: h, smile: p.smile }),
    p.stubble ? extras.stubble(h) : '', p.beard ? extras.beard(h) : '',
    p.moustache ? extras[p.moustache === 'big' ? 'bigMoustache' : 'moustache'](h) : '',
    top, p.bindi ? extras.bindi() : '', p.earrings ? extras.earrings() : '', p.glasses ? extras.glasses() : '',
  ].join('');
}

/* ---------- props for the service characters ---------- */
const props = {
  spray: `<g transform="translate(70 66) rotate(8)"><rect x="0" y="9" width="13" height="22" rx="3.5" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><rect x="2.5" y="2" width="8" height="8" rx="1.5" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.2"/><path d="M10.5 4L17 4L17 7L10.5 7" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.2"/><rect x="2" y="16" width="9" height="7" rx="1.5" fill="${C.mint}"/><g fill="${C.green}" opacity=".7"><circle cx="21" cy="3" r="1"/><circle cx="23" cy="6.5" r="1"/><circle cx="21.5" cy="9.5" r=".9"/></g></g>`,
  brush: `<g transform="translate(66 72) rotate(-18)"><rect x="0" y="0" width="24" height="9" rx="3" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.2"/><g stroke="${C.ink}" stroke-width="1.2"><path d="M3 9v6M7 9v6M11 9v6M15 9v6M19 9v6"/></g><circle cx="22" cy="21" r="2.4" fill="${C.mint}"/><circle cx="17" cy="24" r="1.6" fill="${C.mint}"/></g>`,
  plates: `<g transform="translate(64 78)"><ellipse cx="13" cy="16" rx="15" ry="4.2" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="13" cy="11" rx="15" ry="4.2" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="13" cy="6" rx="15" ry="4.2" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="13" cy="6" rx="8" ry="2" fill="${C.mint}"/></g>`,
  shirts: `<g transform="translate(64 78)"><rect x="0" y="10" width="26" height="9" rx="2" fill="${C.yellow}" stroke="${C.ink}" stroke-width="1.2"/><rect x="2" y="2" width="22" height="9" rx="2" fill="${C.white}" stroke="${C.ink}" stroke-width="1.2"/><path d="M9 2L13 6L17 2" fill="none" stroke="${C.ink}" stroke-width="1.2"/></g>`,
  clock: `<g transform="translate(68 72)"><circle cx="11" cy="11" r="11" fill="${C.white}" stroke="${C.ink}" stroke-width="1.4"/><path d="M11 5V11L15.5 13.5" fill="none" stroke="${C.green}" stroke-width="2" stroke-linecap="round"/><circle cx="11" cy="11" r="1.4" fill="${C.ink}"/></g>`,
  wave: (skin) => `<g><path d="M76 98L80 70" stroke="${C.yellow}" stroke-width="10" stroke-linecap="round"/><g transform="translate(80 62) rotate(12)"><rect x="-6" y="-7" width="12" height="13" rx="5" fill="${skin}"/><rect x="-5.5" y="-14" width="3" height="9" rx="1.5" fill="${skin}"/><rect x="-2" y="-16" width="3" height="10" rx="1.5" fill="${skin}"/><rect x="1.5" y="-15" width="3" height="9" rx="1.5" fill="${skin}"/><rect x="5" y="-8" width="3" height="7" rx="1.5" fill="${skin}" transform="rotate(30 6 -4)"/></g><path d="M89 48Q92 52 90 56M93 45Q97 51 94 58" fill="none" stroke="${C.green}" stroke-width="1.5" stroke-linecap="round"/></g>`,
  stethoscope: `<g fill="none" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"><path d="M40 72C38 82 42 90 50 90C58 90 62 82 60 72"/><path d="M50 90V93"/></g><circle cx="50" cy="96" r="3.4" fill="${C.white}" stroke="${C.ink}" stroke-width="1.5"/>`,
  wrench: `<g transform="translate(70 70) rotate(35)"><rect x="4" y="6" width="5.5" height="24" rx="2.5" fill="${C.salt ?? '#7d8a86'}"/><path d="M0 4C0 -1 4 -3 6.8 -3C9.5 -3 13.5 -1 13.5 4L13.5 8L9.8 8L9.8 2L3.8 2L3.8 8L0 8Z" fill="#7d8a86"/></g>`,
  scissors: `<g transform="translate(68 70) rotate(-25)"><g fill="none" stroke="${C.ink}" stroke-width="1.6"><circle cx="4" cy="20" r="4" fill="${C.yellow}"/><circle cx="14" cy="20" r="4" fill="${C.yellow}"/></g><path d="M6 17L16 0M12 17L2 0" stroke="#7d8a86" stroke-width="2.6" stroke-linecap="round"/></g><g transform="translate(20 80) rotate(-12)"><rect x="0" y="0" width="16" height="4" rx="1.5" fill="${C.ink}"/><g stroke="${C.ink}" stroke-width="1.1"><path d="M2 4v4M5 4v4M8 4v4M11 4v4M14 4v4"/></g></g>`,
  gloves: `<g fill="${C.yellow}" stroke="${C.ink}" stroke-width="1"><rect x="18" y="84" width="11" height="13" rx="4"/></g>`,
};

/* ---------- people ---------- */
const people = {
  // service characters (tiles)
  clean: { skin: 'b', hair: 'parted', back: 'bun', wear: 'apron', bindi: true, earrings: true, smile: 'open', prop: props.spray },
  deep: { skin: 'c', hair: 'short', wear: 'apron', moustache: true, smile: 'open', prop: props.brush },
  kitchen: { skin: 'b', hair: 'parted', back: 'bun', wear: 'apron', earrings: true, smile: 'open', prop: props.plates },
  laundry: { skin: 'd', hair: 'side', wear: 'apron', beard: true, prop: props.shirts },
  custom: { skin: 'c', hair: 'fringe', back: 'long', wear: 'apron', earrings: true, smile: 'open', prop: props.clock },
  hero: { skin: 'c', hair: 'parted', back: 'bun', wear: 'apron', bindi: true, earrings: true, smile: 'open', propFn: (s) => props.wave(s) },
  nurse: { skin: 'd', hair: 'parted', back: 'bun', wear: 'scrubs', col: C.green, earrings: true, smile: 'open', prop: props.stethoscope },
  repair: { skin: 'd', hardHat: true, wear: 'collar', col: '#2f6fb0', moustache: true, smile: 'open', prop: props.wrench },
  barber: { skin: 'c', hair: 'side', wear: 'apron', beard: true, moustache: true, prop: props.scissors },

  // faces (avatars) — same gender, age and look as the people in the sample data
  sd: { skin: 'c', hair: 'parted', back: 'bun', wear: 'apron', bindi: true, earrings: true, smile: 'open' },
  rm: { skin: 'b', hair: 'parted', back: 'braid', wear: 'apron', earrings: true, smile: 'open' },
  kr: { skin: 'c', hair: 'fringe', back: 'long', wear: 'apron', earrings: true, smile: 'open' },
  gk: { skin: 'b', hair: 'parted', back: 'bun', hairColor: 'salt', wear: 'saree', col: '#7a4d8c', trim: '#a8326b', bindi: true, glasses: true },
  mt: { skin: 'b', hair: 'side', back: 'long', wear: 'kurta', col: '#2f6fb0', earrings: true, smile: 'open' },
  ms: { skin: 'e', hair: 'parted', back: 'long', wear: 'saree', col: '#c0532b', trim: C.green, bindi: true, earrings: true, smile: 'open' },
  ap: { skin: 'c', hair: 'short', wear: 'collar', col: '#5b7fa6', beard: true, glasses: true, smile: 'open' },
  rg: { skin: 'd', hair: 'balding', hairColor: 'black', wear: 'collar', col: '#c9b48a', moustache: 'big', smile: 'open' },
  fa: { skin: 'c', hair: 'parted', back: 'long', wear: 'kurta', col: '#2c8a74', dupatta: '#2c8a74', earrings: true, smile: 'open' },
  pn: { skin: 'b', hair: 'parted', back: 'long', wear: 'saree', col: '#b8325a', trim: C.yellow, bindi: true, earrings: true },
  st: { skin: 'c', hair: 'curly', wear: 'tee', col: '#3d4f6b', stubble: true, smile: 'open' },
  rv: { skin: 'b', hair: 'side', wear: 'collar', col: '#e8e2d4', moustache: 'big', smile: 'open' },
  ak: { skin: 'c', hair: 'side', wear: 'tee', col: '#b0412e', beard: true, smile: 'open' },
  kd: { skin: 'c', hair: 'parted', back: 'bun', hairColor: 'grey', wear: 'saree', col: '#e9d9b8', trim: '#8a2c2c', bindi: true, glasses: true },
  pv: { skin: 'b', hair: 'side', back: 'long', wear: 'kurta', col: '#d6567a', earrings: true, smile: 'open' },
  ls: { skin: 'c', hair: 'fringe', back: 'long', wear: 'tee', col: '#6d5bb0', earrings: true, smile: 'open' },
  ad: { skin: 'b', hair: 'balding', hairColor: 'grey', wear: 'blazer', col: '#2d3a4a', trim: C.white, moustache: true, glasses: true },
  ol: { skin: 'c', hair: 'fringe', back: 'long', wear: 'blazer', col: C.green, trim: C.white, earrings: true, smile: 'open' },
  ac: { skin: 'd', hair: 'short', hairColor: 'black', wear: 'blazer', col: '#3b3b46', trim: '#dfe7f0', moustache: 'big' },
  au: { skin: 'b', hair: 'side', back: 'long', wear: 'blazer', col: '#7b2f4b', trim: C.white, earrings: true, smile: 'open' },
  s1: { skin: 'c', hair: 'side', wear: 'scrubs', col: '#2f6fb0', beard: true, moustache: true, smile: 'open' },
  s2: { skin: 'b', hair: 'parted', back: 'long', wear: 'tee', col: C.green, earrings: true, smile: 'open' },
  mk: { skin: 'c', hair: 'curly', back: 'long', wear: 'kurta', col: '#e0a43a', earrings: true, smile: 'open' },
  nk: { skin: 'c', hair: 'short', wear: 'collar', col: '#3a7d6a', beard: true, moustache: true, smile: 'open' },
  ab: { skin: 'b', hair: 'parted', back: 'long', wear: 'kurta', col: '#c84a5a', bindi: true, earrings: true, smile: 'open' },
  // Sikh man and woman for Punjab screens (available as faces `hs` and `gp`)
  hs: { skin: 'b', turban: '#1f4e9a', wear: 'kurta', col: '#e9e4d8', beard: true, moustache: true, smile: 'open' },
  gp: { skin: 'b', hair: 'parted', back: 'long', dupatta: '#e6a23c', wear: 'kurta', col: '#e6a23c', earrings: true, smile: 'open' },
};

for (const [name, p] of Object.entries(people)) {
  const prop = p.propFn ? p.propFn(SKIN[p.skin]) : p.prop ?? '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400">${person(p)}${prop}</svg>\n`;
  writeFileSync(join(out, `${name}.svg`), svg);
}
console.log(`wrote ${Object.keys(people).length} images to ${out}`);
