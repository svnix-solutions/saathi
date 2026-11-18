/* global document, NodeFilter */
// usage: node untranslated.mjs <port> <out.json> — renders every customer and partner route in Hindi and in Punjabi
// and lists visible text that is still English (Latin letters). Brand and product words are allowed.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [port, out] = process.argv.slice(2);
const keys = JSON.parse(fs.readFileSync(new URL('./keys.json', import.meta.url)));
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
// words that stay in Latin script in the design's Hindi screens
const ALLOW = /^(Saathi|Saathi Partner|UPI|OTP|SMS|ID|PAN|IFSC|BHK|WhatsApp|Plus|Google Pay|PhonePe|Paytm|HDFC|SBI|ICICI|Visa|Mastercard|English|हिन्दी|ਪੰਜਾਬੀ|am|pm|km|m|min|hr|AM|PM|BP|QR|PIN|GST|UPI ID|[A-Z]{1,3}|#?\d[\d\s:.,/₹%+×x-]*)$/;
const jobs = [];
for (const loc of ['hi', 'pa']) for (const app of ['customer', 'partner']) for (const r of keys[app]) if (!only || only.has(`${app}__${r}`)) jobs.push({ app, r, loc });
const b = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const res = {};
async function one(job, attempt = 1) {
  const { app, r, loc } = job;
  const p = await b.newPage();
  await p.setViewport({ width: 420, height: 700 });
  await p.goto(`http://localhost:${port}/iframe.html?id=testing-route-harness--${app}&viewMode=story&route=${encodeURIComponent(r)}&globals=locale:${loc}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((x) => setTimeout(x, 700));
  const texts = await p.evaluate(() => {
    const frame = document.querySelector('[data-testid="phone-screen"]');
    if (!frame) return null;
    const out = new Set();
    const walk = document.createTreeWalker(frame, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) { const t = n.textContent.trim(); if (t) out.add(t); }
    for (const el of frame.querySelectorAll('input,textarea')) if (el.placeholder) out.add(el.placeholder.trim());
    return [...out];
  });
  await p.close();
  if (texts === null) { if (attempt < 3) return one(job, attempt + 1); (res[`${app}__${r}`] ??= {})[loc] = ['NO FRAME']; return; }
  // drop allowed words (brands, codes, units) from a string, then flag it if any Latin word is left
  const WORDS = /\b(Saathi Partner|Saathi|UPI ID|UPI|OTP|SMS|ID|PAN|IFSC|BHK|WhatsApp|AutoPay|Plus|Google Pay|PhonePe|Paytm|HDFC|SBI|ICICI|Visa|Mastercard|State Bank of India|English|am|pm|km|min|hr|BP|QR|PIN|GST|[A-Z]{2,}[0-9]*|[A-Z0-9]{4,}(-[A-Z0-9]+)*|[\w.]+@[\w.]+)\b/g;
  const english = texts.filter((t) => !ALLOW.test(t) && /[A-Za-z]{2,}/.test(t.replace(WORDS, '')));
  if (english.length) (res[`${app}__${r}`] ??= {})[loc] = english;
}
const q = [...jobs];
await Promise.all(Array.from({ length: 5 }, async () => { while (q.length) { const j = q.shift(); try { await one(j); } catch (e) { (res[`${j.app}__${j.r}`] ??= {})[j.loc] = ['ERROR ' + e.message.slice(0, 80)]; } } }));
fs.writeFileSync(out, JSON.stringify(res, null, 1, ));
const count = (loc) => Object.values(res).reduce((n, v) => n + (v[loc]?.length ?? 0), 0);
console.log(`${jobs.length} renders. English strings left — Hindi: ${count('hi')} on ${Object.values(res).filter((v) => v.hi).length} screens; Punjabi: ${count('pa')} on ${Object.values(res).filter((v) => v.pa).length} screens`);
await b.close();
