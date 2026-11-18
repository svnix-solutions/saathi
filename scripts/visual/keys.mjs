// Writes keys.json: every route of every app, read from the route tables (no server needed).
import fs from 'node:fs';
const root = new URL('../../src/apps/', import.meta.url);
const read = (app) => Object.keys(Object.fromEntries(
  [...fs.readFileSync(new URL(`${app}/navigation/routeTable.ts`, root), 'utf8').matchAll(/^\s+"([^"]+)": \{ release/gm)].map((m) => [m[1], 1])));
const keys = { customer: read('customer'), partner: read('partner'), admin: read('admin') };
fs.writeFileSync(new URL('./keys.json', import.meta.url), JSON.stringify(keys));
console.log(Object.fromEntries(Object.entries(keys).map(([k, v]) => [k, v.length])));
