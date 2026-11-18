// usage: node diff.mjs <dirA> <dirB> <outDir>  — pixel diff of same-named PNGs
import fs from 'node:fs'; import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
const [a, b, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const rows = [];
for (const f of fs.readdirSync(a).filter((f) => f.endsWith('.png'))) {
  if (!fs.existsSync(`${b}/${f}`)) { rows.push([f, 'MISSING']); continue; }
  const A = PNG.sync.read(fs.readFileSync(`${a}/${f}`)), B = PNG.sync.read(fs.readFileSync(`${b}/${f}`));
  if (A.width !== B.width || A.height !== B.height) { rows.push([f, 'SIZE']); continue; }
  const D = new PNG({ width: A.width, height: A.height });
  const n = pixelmatch(A.data, B.data, D.data, A.width, A.height, { threshold: 0.1 });
  if (n > 0) { fs.writeFileSync(`${out}/${f}`, PNG.sync.write(D)); rows.push([f, n]); }
}
rows.sort((x, y) => (typeof y[1] === 'number' ? y[1] : 1e9) - (typeof x[1] === 'number' ? x[1] : 1e9));
console.log(`${rows.length} differing of ${fs.readdirSync(a).filter((f) => f.endsWith('.png')).length}`);
for (const r of rows) console.log(r.join('\t'));
