// usage: node compare.mjs <newDir> <baseDir...> [--write <diffDir>]
// Prints the shots that differ from EVERY baseline as "name<TAB>pixels"; with --write, saves red-marked diff PNGs.
import fs from 'node:fs'; import { PNG } from 'pngjs'; import pixelmatch from 'pixelmatch';
const args = process.argv.slice(2);
const w = args.indexOf('--write'); const out = w >= 0 ? args.splice(w, 2)[1] : null;
if (out) fs.mkdirSync(out, { recursive: true });
const [nw, ...bases] = args;
const px = (a, b) => { if (!fs.existsSync(a) || !fs.existsSync(b)) return 1e9; const A = PNG.sync.read(fs.readFileSync(a)), B = PNG.sync.read(fs.readFileSync(b));
  if (A.width !== B.width || A.height !== B.height) return 1e9; return pixelmatch(A.data, B.data, null, A.width, A.height, { threshold: 0.1 }); };
for (const f of fs.readdirSync(bases[0]).filter((f) => f.endsWith('.png'))) {
  const n = Math.min(...bases.map((b) => px(`${b}/${f}`, `${nw}/${f}`)));
  if (n > 0) {
    console.log(`${f.replace('.png', '')}\t${n}`);
    if (out && fs.existsSync(`${nw}/${f}`)) {
      const A = PNG.sync.read(fs.readFileSync(`${bases[0]}/${f}`)), B = PNG.sync.read(fs.readFileSync(`${nw}/${f}`));
      if (A.width === B.width && A.height === B.height) { const D = new PNG({ width: A.width, height: A.height });
        pixelmatch(A.data, B.data, D.data, A.width, A.height, { threshold: 0.1 }); fs.writeFileSync(`${out}/${f}`, PNG.sync.write(D)); }
    }
  }
}
