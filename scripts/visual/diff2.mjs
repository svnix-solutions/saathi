// usage: node diff2.mjs <newDir> <baseDir...>  — prints shots that differ from EVERY baseline: "name<TAB>minPixels"
import fs from 'node:fs'; import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
const [nw, ...bases] = process.argv.slice(2);
const px = (a, b) => { if (!fs.existsSync(a) || !fs.existsSync(b)) return 1e9; const A = PNG.sync.read(fs.readFileSync(a)), B = PNG.sync.read(fs.readFileSync(b));
  if (A.width !== B.width || A.height !== B.height) return 1e9; return pixelmatch(A.data, B.data, null, A.width, A.height, { threshold: 0.1 }); };
for (const f of fs.readdirSync(bases[0]).filter((f) => f.endsWith('.png'))) {
  const n = Math.min(...bases.map((b) => px(`${b}/${f}`, `${nw}/${f}`)));
  if (n > 0) console.log(`${f.replace('.png', '')}\t${n}`);
}
