import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage();
await p.goto('http://localhost:6008/iframe.html', { waitUntil: 'networkidle0' });
const keys = await p.evaluate(async () => {
  const c = await import('/src/apps/customer/routes.ts');
  const pa = await import('/src/apps/partner/routes.ts');
  const a = await import('/src/apps/admin/routes.ts');
  return { customer: Object.keys(c.customerRoutes), partner: Object.keys(pa.partnerRoutes), admin: Object.keys(a.adminPages) };
});
console.log(JSON.stringify(keys));
await b.close();
