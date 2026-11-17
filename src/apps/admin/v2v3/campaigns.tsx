/** 78 Campaigns and messages: compose, send, see results; customer-protection rules apply. */
import React, { useMemo, useState } from 'react';
import { Modal, Pager, Tabs, Tag, useAdmin, type TagTone } from '../shell';
import { decisions } from '@/data/decisions';
import { Btn, CardHead, Field, TogRow, inr } from './ui';

type Camp = {
  id: number; name: string; to: string; who: 'customers' | 'partners'; by: string; reached: number | null; booked: string | null;
  status: string; tone: TagTone; message: string; rate?: string; brought?: string; cost?: string;
};
const initial: Camp[] = [
  { id: 1, name: 'Come back, ₹50 off', to: 'Not booked in 30 days', who: 'customers', by: 'WhatsApp', reached: 412, booked: '58', status: 'Running', tone: 'g',
    message: 'Hi Meera, your home misses us. Here is **₹50 off** your next Saathi visit, valid till Sunday. Reply BOOK to get a helper in 15 minutes.', rate: '14%', brought: '₹6,264', cost: 'Cost so far: ₹2,900 in discounts and ₹330 in messages.' },
  { id: 2, name: 'Try a monthly plan', to: '3+ visits, no plan', who: 'customers', by: 'App alert', reached: 236, booked: '19', status: 'Running', tone: 'g',
    message: 'Same helper, same time, every day. Save 10% with a Saathi monthly plan.', rate: '8%', brought: '₹28,400', cost: 'Cost so far: ₹2,840 in discounts. App alerts are free.' },
  { id: 3, name: 'Busy-hour pay, Block D', to: 'Partners near Block D', who: 'partners', by: 'App alert', reached: 14, booked: '6 online', status: 'Running', tone: 'g',
    message: 'Extra ₹20 a visit in Block D from 8 to 10 am tomorrow. Go online to get jobs.', rate: '43%', brought: '6 partners', cost: 'Cost so far: ₹240 in extra pay.' },
  { id: 4, name: 'Diwali deep clean', to: 'All customers', who: 'customers', by: 'WhatsApp + SMS', reached: null, booked: null, status: 'Sat 9 am', tone: 'n',
    message: 'Diwali is coming! Book a kitchen & bath scrub this week and get ₹100 off with DIWALI.' },
  { id: 5, name: 'Sector 34 is open', to: 'Waitlist, Sector 34', who: 'customers', by: 'SMS', reached: null, booked: null, status: '1 Dec', tone: 'n',
    message: 'Saathi is now in Sector 34. Get a helper at your door in 15 minutes. ₹50 off your first visit with FIRST50.' },
  { id: 6, name: 'Rate your last visit', to: 'Unrated visits', who: 'customers', by: 'App alert', reached: 801, booked: '322 rated', status: 'Ended', tone: 'x',
    message: 'How was your visit? Tap to rate your helper. It takes 5 seconds.', rate: '40%', brought: '322 ratings', cost: 'App alerts are free.' },
];
const audiences: { label: string; who: Camp['who']; size: number }[] = [
  { label: 'All customers', who: 'customers', size: 1284 },
  { label: 'Not booked in 30 days', who: 'customers', size: 412 },
  { label: '3+ visits, no plan', who: 'customers', size: 236 },
  { label: 'New this week', who: 'customers', size: 112 },
  { label: 'All partners', who: 'partners', size: 148 },
  { label: 'Partners near Block D', who: 'partners', size: 14 },
];
const channels = ['App alert', 'WhatsApp', 'SMS'] as const;
const msgCost: Record<string, number> = { 'App alert': 0, WhatsApp: 0.8, SMS: 0.25 };

/** Quiet hours from decisions ('9 pm to 8 am'). */
const inQuietHours = (d = new Date()) => d.getHours() >= 21 || d.getHours() < 8;
const bold = (s: string) => s.split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <React.Fragment key={i}>{p}</React.Fragment>));

type Who = 'all' | 'customers' | 'partners';

export function Campaigns() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initial);
  const [who, setWho] = useState<Who>('all');
  const [sel, setSel] = useState(1);
  const [rules, setRules] = useState({ max: true, quiet: true, agreed: true, lang: true });
  const [compose, setCompose] = useState(false);
  const [d, setD] = useState({ name: '', audience: audiences[1].label, ch: ['WhatsApp'] as string[], message: '', when: 'now' as 'now' | 'later', at: 'Sat 9 am' });

  const rows = useMemo(() => list.filter((c) => who === 'all' || c.who === who), [list, who]);
  const cur = list.find((c) => c.id === sel) ?? list[0];
  const running = list.filter((c) => c.status === 'Running').length;
  const scheduled = list.filter((c) => c.tone === 'n').length;
  const aud = audiences.find((a) => a.label === d.audience)!;
  const quietNow = rules.quiet && d.when === 'now' && inQuietHours();
  const est = Math.round(aud.size * (rules.agreed && aud.who === 'customers' ? 0.82 : 1));
  const cost = d.ch.reduce((s, c) => s + msgCost[c] * est, 0);

  const send = () => {
    if (!d.name.trim()) return toast('Give the campaign a name');
    if (!d.ch.length) return toast('Pick at least one channel');
    if (!d.message.trim()) return toast('Write the message');
    const id = Math.max(...list.map((c) => c.id)) + 1;
    const later = d.when === 'later' || quietNow;
    const c: Camp = { id, name: d.name.trim(), to: d.audience, who: aud.who, by: d.ch.join(' + '), reached: later ? null : est, booked: later ? null : '0',
      status: later ? (quietNow && d.when === 'now' ? '8 am' : d.at) : 'Running', tone: later ? 'n' : 'g', message: d.message.trim(),
      rate: '0%', brought: '₹0', cost: `Cost so far: ${inr(Math.round(cost))} in messages.` };
    setList((l) => [c, ...l]); setSel(id); setWho('all'); setCompose(false);
    toast(quietNow ? `Quiet hours (${decisions.ops.quietHours}): held, sends at 8 am` : later ? `Scheduled for ${d.at}` : `Sent to ${est} people`);
  };
  const sendNow = (c: Camp) => {
    if (rules.quiet && inQuietHours()) return toast(`Quiet hours (${decisions.ops.quietHours}). It will go at 8 am.`);
    const size = audiences.find((a) => a.label === c.to)?.size ?? 300;
    setList((l) => l.map((x) => x.id === c.id ? { ...x, status: 'Running', tone: 'g', reached: size, booked: '0', rate: '0%', brought: '₹0', cost: 'Cost so far: ₹0.' } : x)); toast(`${c.name} sent to ${size} people`);
  };
  const stop = (c: Camp) => { setList((l) => l.map((x) => x.id === c.id ? { ...x, status: 'Ended', tone: 'x' } : x)); toast(`${c.name} stopped`); };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Campaigns</div><div className="m">{running} running · {scheduled} scheduled</div></div>
      <Btn onClick={() => { setD({ name: '', audience: audiences[1].label, ch: ['WhatsApp'], message: '', when: 'now', at: 'Sat 9 am' }); setCompose(true); }}>New campaign</Btn></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <CardHead title="All campaigns" right={<Tabs value={who} onChange={setWho} items={[{ key: 'all', label: 'All' }, { key: 'customers', label: 'Customers' }, { key: 'partners', label: 'Partners' }]} />} />
        <table>
          <thead><tr><th>Campaign</th><th>Sent to</th><th>By</th><th>Reached</th><th>Booked</th><th>Status</th></tr></thead>
          <tbody>{rows.map((c) => (
            <tr key={c.id} className={`clk ${c.id === cur.id ? 'on' : ''}`} onClick={() => setSel(c.id)}>
              <td><b>{c.name}</b></td><td>{c.to}</td><td>{c.by}</td>
              <td className={c.reached === null ? 'm' : ''}>{c.reached ?? 'Not sent'}</td><td className={c.booked === null || /\D/.test(c.booked) ? 'm' : ''}>{c.booked ?? 'Not sent'}</td>
              <td><Tag tone={c.tone}>{c.status}</Tag></td></tr>))}
          </tbody>
        </table>
        <Pager text="Page 1 of 3 · 6 rows per page" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>{cur.name}</span><Tag tone={cur.tone}>{cur.status}</Tag></div>
          <div className="bub" style={{ marginTop: 10, maxWidth: '100%' }}>{bold(cur.message)}</div>
          {cur.reached !== null ? <>
            <div className="g3" style={{ marginTop: 12, textAlign: 'center' }}>
              <div><div className="stat" style={{ fontSize: 22 }}>{cur.reached}</div><div className="s m">Reached</div></div>
              <div><div className="stat" style={{ fontSize: 22 }}>{cur.rate}</div><div className="s m">{cur.who === 'partners' ? 'Went online' : 'Booked'}</div></div>
              <div><div className="stat" style={{ fontSize: 22 }}>{cur.brought}</div><div className="s m">Brought in</div></div>
            </div>
            <div className="s m" style={{ marginTop: 8 }}>{cur.cost}</div>
            {cur.status === 'Running' && <div style={{ marginTop: 10 }}><Btn o sm red onClick={() => stop(cur)}>Stop campaign</Btn></div>}
          </> : <>
            <div className="s m" style={{ marginTop: 10 }}>Scheduled for {cur.status} · {cur.by} · {cur.to}</div>
            <div className="lft" style={{ marginTop: 10 }}><Btn sm onClick={() => sendNow(cur)}>Send now</Btn><Btn o sm red onClick={() => stop(cur)}>Cancel</Btn></div>
          </>}
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div className="h2" style={{ fontSize: 15 }}>Rules that protect customers</div>
          <TogRow label={`At most ${decisions.ops.maxOffersPerWeek} offers a week per person`} on={rules.max} onChange={(v) => setRules({ ...rules, max: v })} /><div className="hr" />
          <TogRow label="No messages after 9 pm or before 8 am" on={rules.quiet} onChange={(v) => setRules({ ...rules, quiet: v })} /><div className="hr" />
          <TogRow label="Only people who agreed to offers" on={rules.agreed} onChange={(v) => setRules({ ...rules, agreed: v })} /><div className="hr" />
          <TogRow label="Send in the person's own language" on={rules.lang} onChange={(v) => setRules({ ...rules, lang: v })} />
        </div>
      </div>
    </div>

    <Modal open={compose} onClose={() => setCompose(false)} title="New campaign"
      actions={<><Btn o onClick={() => setCompose(false)}>Cancel</Btn><Btn onClick={send}>{d.when === 'later' ? 'Schedule' : quietNow ? 'Send at 8 am' : `Send to ${est}`}</Btn></>}>
      <Field label="Name"><input className="inp" placeholder="e.g. Weekend deep clean" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></Field>
      <Field label="Audience"><select className="inp" value={d.audience} onChange={(e) => setD({ ...d, audience: e.target.value })}>
        {audiences.map((a) => <option key={a.label} value={a.label}>{a.label} · {a.size}</option>)}</select></Field>
      <div className="fld"><span className="h2">Send by</span>
        <div className="g3">{channels.map((c) => <div key={c} className={`pill ${d.ch.includes(c) ? 'sel' : ''}`} onClick={() => setD({ ...d, ch: d.ch.includes(c) ? d.ch.filter((x) => x !== c) : [...d.ch, c] })}>{c}</div>)}</div></div>
      <Field label="Message"><textarea className="inp" rows={3} placeholder="Hi {name}, …" value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} /></Field>
      <div className="fld"><span className="h2">When</span>
        <div className="g2"><div className={`pill ${d.when === 'now' ? 'sel' : ''}`} onClick={() => setD({ ...d, when: 'now' })}>Now</div><div className={`pill ${d.when === 'later' ? 'sel' : ''}`} onClick={() => setD({ ...d, when: 'later' })}>Later</div></div>
        {d.when === 'later' && <select className="inp" value={d.at} onChange={(e) => setD({ ...d, at: e.target.value })}>{['Tomorrow 9 am', 'Sat 9 am', 'Sun 10 am', '1 Dec'].map((o) => <option key={o}>{o}</option>)}</select>}
      </div>
      <div className="card sel s" style={{ padding: '9px 11px' }}>
        About <b>{est}</b> people{rules.agreed && aud.who === 'customers' ? ' who agreed to offers' : ''} · message cost about <b>{inr(Math.round(cost))}</b>.
        {rules.quiet && <div style={{ marginTop: 4 }}>{quietNow ? <b>It is quiet hours ({decisions.ops.quietHours}), so this waits until 8 am.</b> : `Quiet hours ${decisions.ops.quietHours}: nothing is sent then.`}</div>}
        {rules.max && aud.who === 'customers' && <div style={{ marginTop: 4 }}>People who already got {decisions.ops.maxOffersPerWeek} offers this week are skipped.</div>}
      </div>
    </Modal>
  </>;
}
