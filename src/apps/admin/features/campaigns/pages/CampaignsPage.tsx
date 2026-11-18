/** 78 Campaigns and messages: compose, send, see results; customer-protection rules apply. */
import React, { useMemo, useState } from 'react';
import { decisions } from '@/domain';
import { Button, Field, Modal, PageHead, Pager, TableCard, Tabs, Tag, TogRow } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { BoldText } from '../components/BoldText';
import {
  AGREED_SHARE, AUDIENCES, CHANNELS, MSG_COST, SEND_LATER_OPTIONS, emptyDraft, inQuietHours, initialCampaigns,
  type Campaign, type CampaignAudience,
} from '../data';
import '../campaigns.css';

export function CampaignsPage() {
  const { toast } = useAdmin();
  const [list, setList] = useState(initialCampaigns);
  const [who, setWho] = useState<CampaignAudience>('all');
  const [sel, setSel] = useState(1);
  const [rules, setRules] = useState({ max: true, quiet: true, agreed: true, lang: true });
  const [compose, setCompose] = useState(false);
  const [d, setD] = useState(emptyDraft);

  const rows = useMemo(() => list.filter((c) => who === 'all' || c.who === who), [list, who]);
  const cur = list.find((c) => c.id === sel) ?? list[0];
  const running = list.filter((c) => c.status === 'Running').length;
  const scheduled = list.filter((c) => c.tone === 'n').length;
  const aud = AUDIENCES.find((a) => a.label === d.audience)!;
  const quietNow = rules.quiet && d.when === 'now' && inQuietHours();
  const est = Math.round(aud.size * (rules.agreed && aud.who === 'customers' ? AGREED_SHARE : 1));
  const cost = d.ch.reduce((s, c) => s + MSG_COST[c] * est, 0);

  const send = () => {
    if (!d.name.trim()) return toast('Give the campaign a name');
    if (!d.ch.length) return toast('Pick at least one channel');
    if (!d.message.trim()) return toast('Write the message');
    const id = Math.max(...list.map((c) => c.id)) + 1;
    const later = d.when === 'later' || quietNow;
    const c: Campaign = { id, name: d.name.trim(), to: d.audience, who: aud.who, by: d.ch.join(' + '), reached: later ? null : est, booked: later ? null : '0',
      status: later ? (quietNow && d.when === 'now' ? '8 am' : d.at) : 'Running', tone: later ? 'n' : 'g', message: d.message.trim(),
      rate: '0%', brought: '₹0', cost: `Cost so far: ${inr(Math.round(cost))} in messages.` };
    setList((l) => [c, ...l]); setSel(id); setWho('all'); setCompose(false);
    toast(quietNow ? `Quiet hours (${decisions.ops.quietHours}): held, sends at 8 am` : later ? `Scheduled for ${d.at}` : `Sent to ${est} people`);
  };
  const sendNow = (c: Campaign) => {
    if (rules.quiet && inQuietHours()) return toast(`Quiet hours (${decisions.ops.quietHours}). It will go at 8 am.`);
    const size = AUDIENCES.find((a) => a.label === c.to)?.size ?? 300;
    setList((l) => l.map((x) => x.id === c.id ? { ...x, status: 'Running', tone: 'g', reached: size, booked: '0', rate: '0%', brought: '₹0', cost: 'Cost so far: ₹0.' } : x)); toast(`${c.name} sent to ${size} people`);
  };
  const stop = (c: Campaign) => { setList((l) => l.map((x) => x.id === c.id ? { ...x, status: 'Ended', tone: 'x' } : x)); toast(`${c.name} stopped`); };
  const toggleChannel = (c: string) => setD({ ...d, ch: d.ch.includes(c) ? d.ch.filter((x) => x !== c) : [...d.ch, c] });

  return <>
    <PageHead title="Campaigns" sub={<>{running} running · {scheduled} scheduled</>}
      actions={<Button onClick={() => { setD(emptyDraft()); setCompose(true); }}>New campaign</Button>} />
    <div className="camp-grid">
      <TableCard title="All campaigns" right={<Tabs value={who} onChange={setWho} items={[{ key: 'all', label: 'All' }, { key: 'customers', label: 'Customers' }, { key: 'partners', label: 'Partners' }]} />}
        footer={<Pager text="Page 1 of 3 · 6 rows per page" />}>
        <table>
          <thead><tr><th>Campaign</th><th>Sent to</th><th>By</th><th>Reached</th><th>Booked</th><th>Status</th></tr></thead>
          <tbody>{rows.map((c) => (
            <tr key={c.id} className={`clk ${c.id === cur.id ? 'on' : ''}`} onClick={() => setSel(c.id)}>
              <td><b>{c.name}</b></td><td>{c.to}</td><td>{c.by}</td>
              <td className={c.reached === null ? 'm' : ''}>{c.reached ?? 'Not sent'}</td><td className={c.booked === null || /\D/.test(c.booked) ? 'm' : ''}>{c.booked ?? 'Not sent'}</td>
              <td><Tag tone={c.tone}>{c.status}</Tag></td></tr>))}
          </tbody>
        </table>
      </TableCard>
      <div className="camp-stack">
        <div className="card">
          <div className="row"><span className="h2 camp-heading">{cur.name}</span><Tag tone={cur.tone}>{cur.status}</Tag></div>
          <div className="bub camp-preview"><BoldText text={cur.message} /></div>
          {cur.reached !== null ? <>
            <div className="g3 camp-results">
              <div><div className="stat camp-stat">{cur.reached}</div><div className="s m">Reached</div></div>
              <div><div className="stat camp-stat">{cur.rate}</div><div className="s m">{cur.who === 'partners' ? 'Went online' : 'Booked'}</div></div>
              <div><div className="stat camp-stat">{cur.brought}</div><div className="s m">Brought in</div></div>
            </div>
            <div className="s m camp-gap-sm">{cur.cost}</div>
            {cur.status === 'Running' && <div className="camp-gap"><Button size="compact" variant="danger-outline" onClick={() => stop(cur)}>Stop campaign</Button></div>}
          </> : <>
            <div className="s m camp-gap">Scheduled for {cur.status} · {cur.by} · {cur.to}</div>
            <div className="lft camp-gap"><Button size="compact" onClick={() => sendNow(cur)}>Send now</Button><Button size="compact" variant="danger-outline" onClick={() => stop(cur)}>Cancel</Button></div>
          </>}
        </div>
        <div className="card camp-rules">
          <div className="h2 camp-heading">Rules that protect customers</div>
          <TogRow label={`At most ${decisions.ops.maxOffersPerWeek} offers a week per person`} on={rules.max} onChange={(v) => setRules({ ...rules, max: v })} /><div className="hr" />
          <TogRow label="No messages after 9 pm or before 8 am" on={rules.quiet} onChange={(v) => setRules({ ...rules, quiet: v })} /><div className="hr" />
          <TogRow label="Only people who agreed to offers" on={rules.agreed} onChange={(v) => setRules({ ...rules, agreed: v })} /><div className="hr" />
          <TogRow label="Send in the person's own language" on={rules.lang} onChange={(v) => setRules({ ...rules, lang: v })} />
        </div>
      </div>
    </div>

    <Modal open={compose} onClose={() => setCompose(false)} title="New campaign"
      actions={<><Button variant="outline" onClick={() => setCompose(false)}>Cancel</Button><Button onClick={send}>{d.when === 'later' ? 'Schedule' : quietNow ? 'Send at 8 am' : `Send to ${est}`}</Button></>}>
      <Field label="Name"><input className="inp" placeholder="e.g. Weekend deep clean" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></Field>
      <Field label="Audience"><select className="inp" value={d.audience} onChange={(e) => setD({ ...d, audience: e.target.value })}>
        {AUDIENCES.map((a) => <option key={a.label} value={a.label}>{a.label} · {a.size}</option>)}</select></Field>
      <div className="fld"><span className="h2">Send by</span>
        <div className="g3">{CHANNELS.map((c) => <div key={c} role="button" className={`pill ${d.ch.includes(c) ? 'sel' : ''}`} onClick={() => toggleChannel(c)}>{c}</div>)}</div></div>
      <Field label="Message"><textarea className="inp" rows={3} placeholder="Hi {name}, …" value={d.message} onChange={(e) => setD({ ...d, message: e.target.value })} /></Field>
      <div className="fld"><span className="h2">When</span>
        <div className="g2"><div role="button" className={`pill ${d.when === 'now' ? 'sel' : ''}`} onClick={() => setD({ ...d, when: 'now' })}>Now</div><div role="button" className={`pill ${d.when === 'later' ? 'sel' : ''}`} onClick={() => setD({ ...d, when: 'later' })}>Later</div></div>
        {d.when === 'later' && <select className="inp" value={d.at} onChange={(e) => setD({ ...d, at: e.target.value })}>{SEND_LATER_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>}
      </div>
      <div className="card sel s camp-summary">
        About <b>{est}</b> people{rules.agreed && aud.who === 'customers' ? ' who agreed to offers' : ''} · message cost about <b>{inr(Math.round(cost))}</b>.
        {rules.quiet && <div className="camp-gap-xs">{quietNow ? <b>It is quiet hours ({decisions.ops.quietHours}), so this waits until 8 am.</b> : `Quiet hours ${decisions.ops.quietHours}: nothing is sent then.`}</div>}
        {rules.max && aud.who === 'customers' && <div className="camp-gap-xs">People who already got {decisions.ops.maxOffersPerWeek} offers this week are skipped.</div>}
      </div>
    </Modal>
  </>;
}

export default CampaignsPage;
