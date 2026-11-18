/* global document */
// usage: node shoot.mjs <port> <outDir>  — screenshots every route of every app via the Prototype stories
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [port, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const keys = JSON.parse(fs.readFileSync(new URL('./keys.json', import.meta.url)));
const jobs = [
  ...keys.customer.map((r) => ['customer', r, 'testing-route-harness--customer']),
  ...keys.partner.map((r) => ['partner', r, 'testing-route-harness--partner']),
  ...keys.admin.map((r) => ['admin', r, 'testing-route-harness--admin']),
  ['doc', 'brand', 'saathi-brand--brand'], ['doc', 'decisions', 'saathi-decisions--decisions'],
];
// ONLY=app__route,app__route limits the run to those shots
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
if (only) jobs.splice(0, jobs.length, ...jobs.filter(([a, r]) => only.has(`${a}__${r}`)));
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const errs = {};
async function one(job, attempt = 1) {
  const [app, route, id] = job;
  const p = await b.newPage();
  await p.setViewport({ width: app === 'admin' ? 1440 : 420, height: app === 'admin' ? 900 : 700 });
  await p.evaluateOnNewDocument(() => { const T = new Date('2026-11-17T10:00:00+05:30').getTime(); const D = Date; const off = D.now() - T;
    // fixed clock so dates/greetings match between runs
    globalThis.Date = class extends D { constructor(...a) { super(...(a.length ? a : [D.now() - off])); } static now() { return D.now() - off; } }; });
  const pageErrs = [];
  p.on('pageerror', (e) => pageErrs.push(String(e.message).slice(0, 200)));
  const args = app === 'doc' ? '' : `&route=${encodeURIComponent(route)}`;
  await p.goto(`http://localhost:${port}/iframe.html?id=${id}&viewMode=story${args}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));
  // a capture is broken when a chunk failed to load or the root is empty: retry it (up to 3 times)
  const broken = pageErrs.some((m) => /dynamically imported|Failed to fetch/.test(m)) ||
    await p.evaluate(() => !document.querySelector('#storybook-root')?.children.length || document.body.classList.contains('sb-show-errordisplay'));
  if (broken && attempt < 3) { await p.close(); return one(job, attempt + 1); }
  if (pageErrs.length) errs[`${app}/${route}`] = pageErrs;
  await p.screenshot({ path: `${out}/${app}__${route}.png` });
  await p.close();
}
const q = [...jobs];
await Promise.all(Array.from({ length: 4 }, async () => { while (q.length) { const j = q.shift(); try { await one(j); } catch (e) { (errs[j[0] + '/' + j[1]] ??= []).push('SHOOT ' + e.message); } } }));
fs.writeFileSync(`${out}/_errors.json`, JSON.stringify(errs, null, 1));
console.log('shots', jobs.length, 'errors', Object.keys(errs).length);
await b.close();
