// Draws the flat 2D people and service characters as SVG into public/img/2d/.
// Run: node scripts/art/make-2d.mjs
// Every image is a 100×100 square that shows the whole person, so a crop of 100% fits a tile or an avatar.
// The people are Indian: warm brown skin tones, oval faces, almond eyes, kajal, bindi and sindoor, nose studs,
// jhumkas, mangalsutra, gajra, turbans and dupattas, kurtas with band collars and sarees.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '../../public/img/2d');
mkdirSync(out, { recursive: true });

/* ---------- palette (matches src/tokens/colors.ts) ---------- */
const C = {
  green: '#0b5d4b', deep: '#08463a', yellow: '#ffc93c', mint: '#e3f1ec', ink: '#0f2620', white: '#ffffff',
  lip: '#7d3428', lipF: '#a2423a', blush: '#d9775e', red: '#c62828', gold: '#e2a52b',
};
/** Indian skin tones, light wheatish to deep brown */
const SKIN = { a: '#e9bf96', b: '#d6a172', c: '#bf8556', d: '#a06a3f', e: '#7f4f2c' };
const HAIR = { black: '#17110e', brown: '#33221a', grey: '#bdb6ad', salt: '#6f6862' };

/** darken (f < 1) or lighten (f > 1) a hex colour */
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(f < 1 ? v * f : v + (255 - v) * (f - 1))));
  return '#' + [n >> 16, (n >> 8) & 255, n & 255].map((v) => ch(v).toString(16).padStart(2, '0')).join('');
}

/* ---------- head ---------- */
// An oval face that narrows to the chin (not a circle): 32 wide, 44 tall.
const HEAD = 'M34 38C34 26 41 20.5 50 20.5C59 20.5 66 26 66 38C66 50 63 58 57.5 62.5C55 64.6 52.5 65.6 50 65.6C47.5 65.6 45 64.6 42.5 62.5C37 58 34 50 34 38Z';

const hairBack = {
  long: (h) => `<path d="M31 40C30 22 40 15.5 50 15.5C60 15.5 70 22 69 40C69.5 54 71 66 74.5 78L25.5 78C29 66 30.5 54 31 40Z" fill="${h}"/>`,
  bun: (h, p) => `<circle cx="50" cy="16" r="7.5" fill="${h}"/>${p.gajra ? `<g fill="#fff" stroke="${shade('#ffffff', 0.85)}" stroke-width=".4"><circle cx="43.5" cy="13" r="1.6"/><circle cx="45.5" cy="10" r="1.6"/><circle cx="49" cy="8.4" r="1.6"/><circle cx="52.6" cy="9" r="1.6"/><circle cx="55.6" cy="11.2" r="1.6"/><circle cx="57" cy="14.6" r="1.6"/></g>` : ''}`,
  braid: (h) => `<path d="M31.5 42C30.5 23 40 16 50 16C60 16 69.5 23 68.5 42L68 58L32 58Z" fill="${h}"/><g fill="${h}"><ellipse cx="66.5" cy="64" rx="4" ry="5"/><ellipse cx="68" cy="72" rx="4" ry="5"/><ellipse cx="69.5" cy="80" rx="3.6" ry="4.6"/><ellipse cx="70.5" cy="87" rx="3" ry="4"/></g><path d="M69 90L72.5 95" stroke="${C.red}" stroke-width="2" stroke-linecap="round"/>`,
};

const hairFront = {
  // men
  short: (h) => `<path d="M33.6 45C32 27 40 18.6 50.5 18.6C61 18.6 68.5 26 66.4 45L65 45C64.6 37 62.2 32 57.5 29.8C51.5 31.6 43 32.2 37.3 31.6C35.4 35.4 35.1 40 35.1 45Z" fill="${h}"/>`,
  side: (h) => `<path d="M33.6 45C31.6 27 40 18.4 51 18.4C61.5 18.4 68.6 26 66.4 45L65 45C64.8 37 63 32.4 59.5 29.6C54 33.2 44 33.8 37.4 32.6C35.4 36 35.1 40.5 35.1 45Z" fill="${h}"/><path d="M57 21Q53 25 47.5 26.5" fill="none" stroke="${shade(h, 1.35)}" stroke-width=".9" stroke-linecap="round"/>`,
  curly: (h) => `<g fill="${h}"><circle cx="36.5" cy="32" r="5.6"/><circle cx="42" cy="25.5" r="6.2"/><circle cx="50" cy="22.5" r="6.8"/><circle cx="58" cy="25.5" r="6.2"/><circle cx="63.5" cy="32" r="5.6"/><path d="M33.6 45L33.6 34L36.4 34L35.4 45Z M66.4 45L66.4 34L63.6 34L64.6 45Z"/></g>`,
  balding: (h) => `<path d="M33.8 47C33 39 33.6 34 35.6 31.5C35.8 36.5 36.2 41 37 47Z M66.2 47C67 39 66.4 34 64.4 31.5C64.2 36.5 63.8 41 63 47Z" fill="${h}"/>`,
  // women: centre parting, hair framing the face down past the ears
  parted: (h) => `<path d="M50 19.6C40 19.6 33.4 26 33 36C32.6 44 33 50 32.4 57Q34.2 59.2 36 57C35.4 49 35.8 40.5 38.8 33.4C42.3 28.6 46.8 27.4 50 25C53.2 27.4 57.7 28.6 61.2 33.4C64.2 40.5 64.6 49 64 57Q65.8 59.2 67.6 57C67 50 67.4 44 67 36C66.6 26 60 19.6 50 19.6Z" fill="${h}"/><path d="M49 22.4Q50 21.6 51 22.4" fill="none" stroke="${shade(h, 1.4)}" stroke-width=".7"/>`,
  // hair pulled back into a bun or braid: stops at the ears
  pulled: (h) => `<path d="M50 19.6C40 19.6 33.4 26 33.2 36C33 40 33.2 43 33.8 46.4Q35 47.4 36.2 46.4C35.8 41 36.4 36.6 38.8 33.4C42.3 28.6 46.8 27.4 50 25C53.2 27.4 57.7 28.6 61.2 33.4C63.6 36.6 64.2 41 63.8 46.4Q65 47.4 66.2 46.4C66.8 43 67 40 66.8 36C66.6 26 60 19.6 50 19.6Z" fill="${h}"/><path d="M49 22.4Q50 21.6 51 22.4" fill="none" stroke="${shade(h, 1.4)}" stroke-width=".7"/>`,
  sidepart: (h) => `<path d="M44 20C37 21 33.2 27 33 36C32.6 44 33 50 32.4 57Q34.2 59.2 36 57C35.4 48 36 39 39.6 32.6C45 29.6 54 29 61.6 31.4C64.4 38.4 64.6 48 64 57Q65.8 59.2 67.6 57C67 50 67.4 44 67 36C66.6 25 59 19 50 19.4C48 19.5 46 19.7 44 20Z" fill="${h}"/>`,
};

function face(p, skin, h) {
  const dark = shade(skin, 0.85);
  const line = shade(skin, 0.68);
  const woman = !!p.woman;
  const iris = '#2a1a12';
  const eye = (cx, dir) => `<path d="M${cx - 4} 44.4Q${cx} 41.4 ${cx + 4} 44.4Q${cx} 46.9 ${cx - 4} 44.4Z" fill="#fff"/><circle cx="${cx + dir * 0.2}" cy="44.2" r="1.85" fill="${iris}"/><circle cx="${cx + 0.6}" cy="43.5" r=".5" fill="#fff"/>`
    + (dir < 0
      ? `<path d="${woman ? `M${cx - 5.4} 43.2L` : 'M'}${cx - 4.2} 44.4Q${cx} 41.1 ${cx + 4.2} 44.2" fill="none" stroke="${C.ink}" stroke-width="${woman ? 1.25 : 0.9}" stroke-linecap="round"/>`
      : `<path d="M${cx - 4.2} 44.2Q${cx} 41.1 ${cx + 4.2} 44.4${woman ? `L${cx + 5.4} 43.2` : ''}" fill="none" stroke="${C.ink}" stroke-width="${woman ? 1.25 : 0.9}" stroke-linecap="round"/>`);
  const browW = woman ? 0.8 : 1.25;
  const brows = `<path d="M38.4 40.4Q42.4 37.6 46.8 39.4L46.6 ${40.4 + browW * 0.3}Q42.4 ${38.6 + browW}  38.6 ${41 + browW * 0.2}Z" fill="${h}"/><path d="M61.6 40.4Q57.6 37.6 53.2 39.4L53.4 ${40.4 + browW * 0.3}Q57.6 ${38.6 + browW} 61.4 ${41 + browW * 0.2}Z" fill="${h}"/>`;
  const nose = `<path d="M50.4 44.6Q49.4 49.4 47.6 52.1Q49.6 53.7 52.3 52.5" fill="none" stroke="${line}" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `
  <ellipse cx="34.2" cy="45.5" rx="3" ry="4.6" fill="${dark}"/><ellipse cx="65.8" cy="45.5" rx="3" ry="4.6" fill="${dark}"/>
  <path d="${HEAD}" fill="${skin}"/>
  <path d="M38 56Q50 66 62 56Q58 64.5 50 65.5Q42 64.5 38 56Z" fill="${dark}" opacity=".35"/>
  ${eye(42.4, -1)}${eye(57.6, 1)}${brows}${nose}
  <ellipse cx="39.5" cy="52" rx="2.6" ry="1.4" fill="${C.blush}" opacity="${woman ? 0.32 : 0.18}"/><ellipse cx="60.5" cy="52" rx="2.6" ry="1.4" fill="${C.blush}" opacity="${woman ? 0.32 : 0.18}"/>`;
}

function mouth(p) {
  const col = p.woman ? C.lipF : C.lip;
  if (p.smile === 'open') {
    return `<path d="M45.2 56.4Q50 57.5 54.8 56.4Q53.8 61.2 50 61.2Q46.2 61.2 45.2 56.4Z" fill="${col}"/><path d="M46 56.8Q50 57.7 54 56.8L53.8 58Q50 58.8 46.2 58Z" fill="#fff"/>`;
  }
  return `<path d="M45.6 57Q50 60 54.4 57" fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round"/><path d="M47 58.4Q50 60.6 53 58.4Q50 59.3 47 58.4Z" fill="${col}" opacity=".55"/>`;
}

const extras = {
  beard: (h) => `<path d="M34.2 44C34.6 56 39 63.2 44 66.8C46.5 68.4 48.5 69 50 69C51.5 69 53.5 68.4 56 66.8C61 63.2 65.4 56 65.8 44C64.4 52 62 56.6 58 58.8C55.5 57.4 53 57 50 57C47 57 44.5 57.4 42 58.8C38 56.6 35.6 52 34.2 44Z" fill="${h}"/>`,
  fullBeard: (h) => `<path d="M34 42C34 58 38 69 44 73C47 75 49 75.6 50 75.6C51 75.6 53 75 56 73C62 69 66 58 66 42C64.6 51 62 56.6 58 58.6C55.5 57.2 53 56.8 50 56.8C47 56.8 44.5 57.2 42 58.6C38 56.6 35.4 51 34 42Z" fill="${h}"/>`,
  stubble: (h) => `<path d="M34.6 47C35.2 57 40 63.4 44.5 66C47 67.4 48.6 67.6 50 67.6C51.4 67.6 53 67.4 55.5 66C60 63.4 64.8 57 65.4 47C63.6 55 60 58.4 50 58.6C40 58.4 36.4 55 34.6 47Z" fill="${h}" opacity=".3"/>`,
  moustache: (h) => `<path d="M44 55Q47 52.8 50 54.1Q53 52.8 56 55Q53 56.1 50 55.4Q47 56.1 44 55Z" fill="${h}"/>`,
  bigMoustache: (h) => `<path d="M40.6 56.4Q44.4 51.8 50 53.8Q55.6 51.8 59.4 56.4Q57.2 55.2 55 56.5Q52.5 55.2 50 56Q47.5 55.2 45 56.5Q42.8 55.2 40.6 56.4Z" fill="${h}"/>`,
  glasses: () => `<g fill="none" stroke="${C.ink}" stroke-width="1.3"><rect x="37.4" y="40.4" width="10" height="7.6" rx="3"/><rect x="52.6" y="40.4" width="10" height="7.6" rx="3"/><path d="M47.4 43.4Q50 42.2 52.6 43.4M37.4 43L34.6 42.4M62.6 43L65.4 42.4"/></g>`,
  bindi: () => `<circle cx="50" cy="37.2" r="1.25" fill="${C.red}"/>`,
  sindoor: () => `<path d="M50 20.4L50 25.4" stroke="${C.red}" stroke-width="1.3" stroke-linecap="round"/>`,
  noseStud: () => `<circle cx="47.3" cy="51.2" r=".8" fill="${C.gold}"/>`,
  jhumka: () => `<g fill="${C.gold}"><circle cx="33.8" cy="50.6" r="1.1"/><path d="M31.6 52.2Q33.8 50.8 36 52.2L35.2 54.8L32.4 54.8Z"/><circle cx="66.2" cy="50.6" r="1.1"/><path d="M64 52.2Q66.2 50.8 68.4 52.2L67.6 54.8L64.8 54.8Z"/></g>`,
  studs: () => `<circle cx="33.8" cy="50.8" r="1.2" fill="${C.gold}"/><circle cx="66.2" cy="50.8" r="1.2" fill="${C.gold}"/>`,
  tilak: () => `<path d="M50 32.4L50 38.2" stroke="${C.red}" stroke-width="1.6" stroke-linecap="round"/>`,
  mangalsutra: () => `<path d="M43.6 72.4Q50 83 56.4 72.4" fill="none" stroke="${C.ink}" stroke-width="1" stroke-dasharray="1 .8"/><path d="M48.4 79.6L51.6 79.6L50 82.6Z" fill="${C.gold}"/>`,
  turban: (col) => `<path d="M31.6 41C29.8 22 40 13.6 50 13.6C60 13.6 70.2 22 68.4 41C64.6 34.6 58 31.4 50 33.2C42 31.4 35.4 34.6 31.6 41Z" fill="${col}"/><path d="M50 33.2L44 17.4M50 33.2L56 17.4M34.4 32Q42 25 50 33.2Q58 25 65.6 32" fill="none" stroke="${shade(col, 0.78)}" stroke-width="1.4" stroke-linecap="round"/>`,
  dupatta: (col) => `<path d="M27.6 52C26 28 38 12.6 50 12.6C62 12.6 74 28 72.4 52C71.6 62 74 70 78 79L68 79C67 68 68 58 67.2 46C66.6 32 59.6 24.6 50 24.6C40.4 24.6 33.4 32 32.8 46C32 58 33 68 32 79L22 79C26 70 28.4 62 27.6 52Z" fill="${col}"/><path d="M33 46C33.4 32 40.4 24.6 50 24.6C59.6 24.6 66.6 32 67.2 46" fill="none" stroke="${C.gold}" stroke-width="1.2"/>`,
  hardHat: () => `<path d="M30.6 37C30.6 23.6 39 16.6 50 16.6C61 16.6 69.4 23.6 69.4 37Z" fill="${C.yellow}"/><rect x="26.6" y="35" width="46.8" height="5" rx="2.5" fill="${shade(C.yellow, 0.85)}"/><rect x="47.6" y="16.8" width="4.8" height="18" rx="2" fill="${shade(C.yellow, 0.92)}"/>`,
  nurseCap: () => `<path d="M38 24L62 24L60 17Q50 14.6 40 17Z" fill="#fff" stroke="${shade('#ffffff', 0.8)}" stroke-width=".6"/><path d="M48.6 19H51.4M50 17.6V20.4" stroke="${C.red}" stroke-width="1.2"/>`,
};

/** clothes: neck and shoulders */
function clothes({ skin, wear = 'tee', col = C.green, trim = C.yellow }) {
  const nk = shade(skin, 0.85);
  const neck = `<path d="M44.6 60L55.4 60L56.4 72.4L43.6 72.4Z" fill="${nk}"/>`;
  const body = (c) => `<path d="M11 101C11 84 26 72 50 72C74 72 89 84 89 101Z" fill="${c}"/>`;
  switch (wear) {
    case 'apron': // Saathi helper: yellow kurta-style top + green apron with the yellow S badge
      return neck + body(trim) + `<path d="M43 72.2Q50 75.6 57 72.2L56.6 74.4Q50 78 43.4 74.4Z" fill="${shade(trim, 0.85)}"/>`
        + `<path d="M33 101L35 80Q35 77 38 77L62 77Q65 77 65 80L67 101Z" fill="${C.green}"/><path d="M38 77L41.6 72.6M62 77L58.4 72.6" stroke="${C.green}" stroke-width="3" stroke-linecap="round"/>`
        + `<circle cx="50" cy="88" r="4.6" fill="${C.yellow}"/><path d="M51.7 86.2Q50 85.2 48.6 86.2Q47.8 87.4 50 88Q52.2 88.6 51.4 89.8Q50 90.8 48.3 89.8" fill="none" stroke="${C.green}" stroke-width="1.3" stroke-linecap="round"/>`;
    case 'scrubs':
      return neck + body(col) + `<path d="M42 72.2L50 83.6L58 72.2Z" fill="${nk}"/><path d="M42 72.2L50 83.6L58 72.2" fill="none" stroke="${shade(col, 0.78)}" stroke-width="1.6"/><rect x="60" y="86" width="10" height="7" rx="1.5" fill="${shade(col, 0.85)}"/>`;
    case 'collar': // shirt
      return neck + body(col) + `<path d="M43 72L50 81L57 72Z" fill="${nk}"/><path d="M42 71.6L50 80.4L44.6 84.4L38.6 74.6Z M58 71.6L50 80.4L55.4 84.4L61.4 74.6Z" fill="${shade(col, 1.4)}"/><circle cx="50" cy="88" r="1" fill="${shade(col, 0.7)}"/><circle cx="50" cy="94" r="1" fill="${shade(col, 0.7)}"/>`;
    case 'kurta': // band (Nehru) collar and a button placket
      return neck + body(col) + `<path d="M43.2 72.2Q50 75.6 56.8 72.2L56.4 75Q50 78.6 43.6 75Z" fill="${shade(col, 0.82)}"/><path d="M50 77.2L50 93" stroke="${shade(col, 0.74)}" stroke-width="1.3"/><circle cx="50" cy="81" r=".95" fill="${C.gold}"/><circle cx="50" cy="86" r=".95" fill="${C.gold}"/><circle cx="50" cy="91" r=".95" fill="${C.gold}"/>`;
    case 'saree': // blouse + pallu over the left shoulder
      return neck + body(col) + `<path d="M43.6 72.2Q50 79 56.4 72.2Z" fill="${nk}"/><path d="M58 72.6C69 74 78.6 80.4 83 92L73 101L54 101C59 92 61 82 58 72.6Z" fill="${trim}"/><path d="M58 72.6C69 74 78.6 80.4 83 92" fill="none" stroke="${C.gold}" stroke-width="2"/><path d="M60.8 77.6C68 79.6 74.4 84 78.6 91.4" fill="none" stroke="${C.gold}" stroke-width=".8" opacity=".8"/>`;
    case 'blazer':
      return neck + body(col) + `<path d="M43 72L50 86L57 72Z" fill="${trim}"/><path d="M42 72L50 92L44.4 80L38.4 73.4Z M58 72L50 92L55.6 80L61.6 73.4Z" fill="${shade(col, 0.8)}"/>`;
    default: // tee
      return neck + body(col) + `<path d="M43 72.2Q50 79 57 72.2Z" fill="${nk}"/>`;
  }
}

/** one person, head and shoulders */
function person(p) {
  const skin = SKIN[p.skin];
  const h = HAIR[p.hairColor ?? 'black'];
  const top = p.turban ? extras.turban(p.turban) : p.hardHat ? extras.hardHat() : p.hair ? hairFront[p.hair](h) : '';
  return [
    p.dupatta ? extras.dupatta(p.dupatta) : '', p.back ? hairBack[p.back](h, p) : '',
    clothes({ ...p, skin }), p.mangalsutra ? extras.mangalsutra() : '',
    face(p, skin, h),
    p.stubble ? extras.stubble(h) : '', p.beard ? extras.beard(h) : '', p.fullBeard ? extras.fullBeard(h) : '',
    mouth(p),
    p.moustache ? extras[p.moustache === 'big' ? 'bigMoustache' : 'moustache'](h) : '',
    top, p.nurseCap ? extras.nurseCap() : '',
    p.sindoor ? extras.sindoor() : '', p.bindi ? extras.bindi() : '', p.tilak ? extras.tilak() : '',
    p.noseStud ? extras.noseStud() : '', p.jhumka ? extras.jhumka() : p.studs ? extras.studs() : '',
    p.glasses ? extras.glasses() : '',
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
const W = { woman: true };
const people = {
  // service characters (tiles)
  clean: { ...W, skin: 'c', hair: 'pulled', back: 'bun', gajra: true, wear: 'apron', bindi: true, jhumka: true, smile: 'open', prop: props.spray },
  deep: { skin: 'd', hair: 'short', wear: 'apron', moustache: true, smile: 'open', prop: props.brush },
  kitchen: { ...W, skin: 'b', hair: 'parted', back: 'braid', wear: 'apron', bindi: true, noseStud: true, studs: true, smile: 'open', prop: props.plates },
  laundry: { skin: 'd', hair: 'side', wear: 'apron', beard: true, moustache: true, prop: props.shirts },
  custom: { ...W, skin: 'c', hair: 'sidepart', back: 'long', wear: 'apron', studs: true, smile: 'open', prop: props.clock },
  hero: { ...W, skin: 'c', hair: 'pulled', back: 'bun', gajra: true, wear: 'apron', bindi: true, noseStud: true, jhumka: true, smile: 'open', propFn: (s) => props.wave(s) },
  nurse: { ...W, skin: 'd', hair: 'pulled', back: 'bun', wear: 'scrubs', col: C.green, studs: true, smile: 'open', prop: props.stethoscope },
  repair: { skin: 'd', hardHat: true, wear: 'collar', col: '#2f6fb0', moustache: 'big', smile: 'open', prop: props.wrench },
  barber: { skin: 'c', hair: 'side', wear: 'apron', beard: true, moustache: true, prop: props.scissors },

  // faces (avatars) — same gender, age and look as the people in the sample data
  sd: { ...W, skin: 'c', hair: 'pulled', back: 'bun', gajra: true, wear: 'apron', sindoor: true, bindi: true, noseStud: true, jhumka: true, mangalsutra: true, smile: 'open' },
  rm: { ...W, skin: 'b', hair: 'parted', back: 'braid', wear: 'apron', bindi: true, studs: true, smile: 'open' },
  kr: { ...W, skin: 'c', hair: 'sidepart', back: 'long', wear: 'apron', studs: true, smile: 'open' },
  gk: { ...W, skin: 'b', hair: 'pulled', back: 'bun', hairColor: 'salt', wear: 'saree', col: '#7a4d8c', trim: '#a8326b', sindoor: true, bindi: true, glasses: true, mangalsutra: true },
  mt: { ...W, skin: 'b', hair: 'sidepart', back: 'long', wear: 'kurta', col: '#2f6fb0', jhumka: true, smile: 'open' },
  ms: { ...W, skin: 'e', hair: 'parted', back: 'braid', wear: 'saree', col: '#c0532b', trim: C.green, sindoor: true, bindi: true, noseStud: true, jhumka: true, smile: 'open' },
  ap: { skin: 'c', hair: 'short', wear: 'collar', col: '#5b7fa6', beard: true, moustache: true, glasses: true, smile: 'open' },
  rg: { skin: 'd', hair: 'balding', wear: 'kurta', col: '#e8e0cc', moustache: 'big', tilak: true, smile: 'open' },
  fa: { ...W, skin: 'c', hair: 'parted', dupatta: '#2c8a74', back: 'long', wear: 'kurta', col: '#2c8a74', studs: true, smile: 'open' },
  pn: { ...W, skin: 'b', hair: 'parted', back: 'long', wear: 'saree', col: '#b8325a', trim: C.yellow, sindoor: true, bindi: true, noseStud: true, jhumka: true },
  st: { skin: 'c', hair: 'curly', wear: 'tee', col: '#3d4f6b', stubble: true, smile: 'open' },
  rv: { skin: 'b', hair: 'side', wear: 'collar', col: '#e8e2d4', moustache: 'big', smile: 'open' },
  ak: { skin: 'c', hair: 'side', wear: 'tee', col: '#b0412e', beard: true, moustache: true, smile: 'open' },
  kd: { ...W, skin: 'c', hair: 'pulled', back: 'bun', hairColor: 'grey', wear: 'saree', col: '#e9d9b8', trim: '#8a2c2c', bindi: true, glasses: true, studs: true },
  pv: { ...W, skin: 'b', hair: 'sidepart', back: 'long', wear: 'kurta', col: '#d6567a', bindi: true, jhumka: true, smile: 'open' },
  ls: { ...W, skin: 'd', hair: 'parted', back: 'braid', wear: 'tee', col: '#6d5bb0', noseStud: true, studs: true, smile: 'open' },
  ad: { skin: 'b', hair: 'balding', hairColor: 'grey', wear: 'blazer', col: '#2d3a4a', trim: C.white, moustache: true, glasses: true },
  ol: { ...W, skin: 'c', hair: 'sidepart', back: 'long', wear: 'blazer', col: C.green, trim: C.white, studs: true, smile: 'open' },
  ac: { skin: 'd', hair: 'short', wear: 'blazer', col: '#3b3b46', trim: '#dfe7f0', moustache: 'big' },
  au: { ...W, skin: 'b', hair: 'parted', back: 'long', wear: 'blazer', col: '#7b2f4b', trim: C.white, bindi: true, studs: true, smile: 'open' },
  s1: { skin: 'c', hair: 'side', wear: 'scrubs', col: '#2f6fb0', beard: true, moustache: true, smile: 'open' },
  s2: { ...W, skin: 'b', hair: 'parted', back: 'long', wear: 'tee', col: C.green, studs: true, smile: 'open' },
  mk: { ...W, skin: 'c', hair: 'parted', back: 'braid', wear: 'kurta', col: '#e0a43a', bindi: true, jhumka: true, smile: 'open' },
  nk: { skin: 'c', hair: 'short', wear: 'collar', col: '#3a7d6a', beard: true, moustache: true, smile: 'open' },
  ab: { ...W, skin: 'b', hair: 'parted', back: 'long', wear: 'kurta', col: '#c84a5a', bindi: true, noseStud: true, jhumka: true, smile: 'open' },
  // Sikh man and Punjabi woman for Punjab screens (faces `hs` and `gp`)
  hs: { skin: 'b', turban: '#1f4e9a', wear: 'kurta', col: '#e9e4d8', fullBeard: true, moustache: true, smile: 'open' },
  gp: { ...W, skin: 'a', hair: 'parted', back: 'long', dupatta: '#e6a23c', wear: 'kurta', col: '#c2185b', jhumka: true, smile: 'open' },
};

for (const [name, p] of Object.entries(people)) {
  const prop = p.propFn ? p.propFn(SKIN[p.skin]) : p.prop ?? '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="400" height="400">${person(p)}${prop}</svg>\n`;
  writeFileSync(join(out, `${name}.svg`), svg);
}
console.log(`wrote ${Object.keys(people).length} images to ${out}`);
