/* global document, getComputedStyle */
// usage: node overflow.mjs <port> <out.json> — renders every customer and partner route under each launch condition
// (small phone, Hindi, Punjabi, large text) and lists elements that run past the phone's screen or are clipped.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [port, out] = process.argv.slice(2);
const keys = JSON.parse(fs.readFileSync(new URL('./keys.json', import.meta.url)));
const conditions = { small: 'device:small', hi: 'locale:hi', pa: 'locale:pa', large: 'text:1.22', 'small+hi': 'device:small;locale:hi' };
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
const jobs = [];
for (const [cond, g] of Object.entries(conditions)) for (const app of ['customer', 'partner']) for (const r of keys[app])
  if (!only || only.has(`${app}__${r}`)) jobs.push({ app, r, cond, g });
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const res = {};
async function one(job, attempt = 1) {
  const { app, r, cond, g } = job;
  const p = await b.newPage();
  await p.setViewport({ width: 420, height: 700 });
  await p.goto(`http://localhost:${port}/iframe.html?id=testing-route-harness--${app}&viewMode=story&route=${encodeURIComponent(r)}&globals=${g}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((x) => setTimeout(x, 900));
  const issues = await p.evaluate(() => {
    const frame = document.querySelector('[data-testid="phone-screen"]');
    if (!frame) return ['NO FRAME'];
    const fr = frame.getBoundingClientRect(); const inner = { l: fr.left + 8, r: fr.right - 8 };
    const inHScroll = (el) => { for (let e = el.parentElement; e && e !== frame; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return true; } return false; };
    const label = (el) => (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
    // the part of an element you can actually see: its box cut by every clipping ancestor inside the phone
    const visible = (el) => {
      const rc = el.getBoundingClientRect(); let l = rc.left, r = rc.right;
      for (let e = el.parentElement; e && e !== frame; e = e.parentElement) {
        const cs = getComputedStyle(e);
        // only small clipping boxes (image crops, avatars) count; the screen's own scroll view also clips, and must not hide overflow
        if (cs.overflowX !== 'visible') { const k = e.getBoundingClientRect(); if (k.width < inner.r - inner.l - 4) { l = Math.max(l, k.left); r = Math.min(r, k.right); } }
      }
      return { left: l, right: r, width: r - l, height: rc.height };
    };
    const cs0 = (e) => getComputedStyle(e);
    const found = new Map();
    for (const el of frame.querySelectorAll('*')) {
      if (inHScroll(el)) continue;
      const rc = visible(el);
      if (rc.width <= 0 || !rc.height) continue;
      // past the screen edge
      if (rc.right > inner.r + 1.5 || rc.left < inner.l - 1.5) {
        const leaf = ![...el.children].some((c) => { const k = visible(c); return k.width > 0 && (k.right > inner.r + 1.5 || k.left < inner.l - 1.5); });
        if (leaf) found.set(el, `off-screen ${Math.round(Math.max(rc.right - inner.r, inner.l - rc.left))}px: "${label(el)}"`);
      }
      // sticks out of its parent box (e.g. text running past the edge of its card), ignoring absolutely placed things
      const par = el.parentElement; const ps = par && getComputedStyle(par);
      if (par && par !== frame && cs0(el).position !== 'absolute' && ps.overflowX === 'visible') {
        const k = par.getBoundingClientRect();
        if (k.width > 0 && (rc.right > k.right + 1.5 || rc.left < k.left - 1.5) && el.children.length === 0)
          found.set(el, `sticks out of its box ${Math.round(Math.max(rc.right - k.right, k.left - rc.left))}px: "${label(el)}"`);
      }
      // text clipped by its own box (one-line text wider than it is allowed)
      const cs = getComputedStyle(el);
      if (el.children.length === 0 && el.innerText && el.scrollWidth > el.clientWidth + 2 && (cs.overflow === 'hidden' || cs.textOverflow === 'ellipsis' || cs.whiteSpace === 'nowrap'))
        found.set(el, `clipped text: "${label(el)}"`);
    }
    return [...new Set(found.values())];
  });
  await p.close();
  if (issues[0] === 'NO FRAME' && attempt < 3) return one(job, attempt + 1);
  if (issues.length) (res[`${app}__${r}`] ??= {})[cond] = issues;
}
const q = [...jobs];
await Promise.all(Array.from({ length: 5 }, async () => { while (q.length) { const j = q.shift(); try { await one(j); } catch (e) { (res[`${j.app}__${j.r}`] ??= {})[j.cond] = ['ERROR ' + e.message.slice(0, 80)]; } } }));
fs.writeFileSync(out, JSON.stringify(res, null, 1));
const n = Object.keys(res).length;
console.log(`${jobs.length} renders, ${n} screens with problems`);
for (const c of Object.keys(conditions)) console.log(`  ${c}: ${Object.values(res).filter((v) => v[c]).length} screens`);
await b.close();
