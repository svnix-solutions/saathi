/** 72 Customers and reports · 81 One customer */
import React, { useMemo, useState } from 'react';
import { Av, I, Modal, Pager, Tabs, Tag, useAdmin, type TagTone } from '../shell';
import { decisions } from '@/data/decisions';
import { BarRow, Btn, CardHead, Columns, Field, KPI_GRID, inr } from './ui';

type CType = 'Plan' | 'Regular' | 'New' | 'Inactive';
export type Customer = {
  id: string; face: string; name: string; area: string; visits: number; spent: number; wallet: number; last: string; type: CType;
  since: string; mobile: string; rating: number; points: number;
};

export const customers: Customer[] = [
  { id: 'nk', face: 'nk', name: 'Nitin K.', area: 'Block C', visits: 9, spent: 1738, wallet: 240, last: 'Today', type: 'Plan', since: 'Oct 2026', mobile: '98765 43210', rating: 4.6, points: 320 },
  { id: 'ms', face: 'ms', name: 'Meera S.', area: 'Block A', visits: 3, spent: 832, wallet: 0, last: 'Today', type: 'Regular', since: 'Oct 2026', mobile: '98110 22841', rating: 4.3, points: 90 },
  { id: 'fa', face: 'fa', name: 'Farah A.', area: 'Sector 18', visits: 14, spent: 3204, wallet: 100, last: 'Today', type: 'Plan', since: 'Sep 2026', mobile: '99582 10377', rating: 4.9, points: 540 },
  { id: 'ap', face: 'ap', name: 'Arjun P.', area: 'Sector 21', visits: 1, spent: 79, wallet: 0, last: 'Today', type: 'New', since: 'Nov 2026', mobile: '98990 61204', rating: 3, points: 10 },
  { id: 'pn', face: 'pn', name: 'Priya N.', area: 'Sector 21', visits: 6, spent: 1106, wallet: 50, last: '12 Nov', type: 'Regular', since: 'Oct 2026', mobile: '97170 44012', rating: 4.4, points: 210 },
  { id: 'st', face: 'st', name: 'Sameer T.', area: 'Block C', visits: 2, spent: 474, wallet: 0, last: '8 Oct', type: 'Inactive', since: 'Sep 2026', mobile: '98183 90551', rating: 2.5, points: 40 },
  { id: 'rg', face: 'rg', name: 'Rohan G.', area: 'Block D', visits: 4, spent: 916, wallet: 0, last: '13 Nov', type: 'Regular', since: 'Oct 2026', mobile: '98710 33620', rating: 3.8, points: 120 },
  { id: 'rv', face: 'rv', name: 'Ravi V.', area: 'Sector 18', visits: 1, spent: 158, wallet: 0, last: 'Yesterday', type: 'New', since: 'Nov 2026', mobile: '99100 72311', rating: 5, points: 10 },
  { id: 'ak', face: 'ak', name: 'Aisha K.', area: 'Block A', visits: 11, spent: 2420, wallet: 80, last: '14 Nov', type: 'Plan', since: 'Sep 2026', mobile: '98112 50908', rating: 4.7, points: 430 },
  { id: 'kd', face: 'kd', name: 'Kunal D.', area: 'Sector 21', visits: 3, spent: 553, wallet: 0, last: '2 Oct', type: 'Inactive', since: 'Aug 2026', mobile: '97111 20480', rating: 4.0, points: 70 },
];

const typeTone: Record<CType, TagTone> = { Plan: 'g', Regular: 'n', New: 'y', Inactive: 'x' };

type Filter = 'all' | 'plan' | 'new' | 'idle';
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const perDay = [101, 95, 108, 116, 121, 141, 130];

export function Customers() {
  const { go, toast } = useAdmin();
  const [f, setF] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const [day, setDay] = useState<number | undefined>();
  const rows = useMemo(() => customers.filter((c) =>
    (f === 'all' || (f === 'plan' && c.type === 'Plan') || (f === 'new' && c.type === 'New') || (f === 'idle' && c.type === 'Inactive'))
    && (!q || (c.name + ' ' + c.area).toLowerCase().includes(q.toLowerCase()))), [f, q]);
  const max = Math.max(...perDay);

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Customers</div><div className="m">Week of 9 to 15 November</div></div>
      <div className="lft"><Btn o onClick={() => toast(`Exported ${rows.length} customers to CSV`)}>Export</Btn></div></div>
    <div style={KPI_GRID}>
      <div className="card kpi clk" onClick={() => setF('all')}><div className="m">Customers</div><div className="stat">1,284</div></div>
      <div className="card kpi clk" onClick={() => setF('plan')}><div className="m">On a monthly plan</div><div className="stat">86</div></div>
      <div className="card kpi clk" onClick={() => setF('new')}><div className="m">New this week</div><div className="stat">112</div></div>
      <div className="card kpi"><div className="m">Booked again within 30 days</div><div className="stat">61%</div></div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <div className="row" style={{ padding: '0 10px 8px' }}>
          <Tabs value={f} onChange={setF} items={[{ key: 'all', label: 'All' }, { key: 'plan', label: 'Plan 86' }, { key: 'new', label: 'New 112' }, { key: 'idle', label: 'Not booked in 30 days' }]} />
          <input className="srch" placeholder="Search name or area" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <table>
          <thead><tr><th>Customer</th><th>Area</th><th>Visits</th><th>Spent</th><th>Wallet</th><th>Last visit</th><th>Type</th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="clk" onClick={() => go('customerDetail', { id: c.id })}>
                <td><span className="lft"><Av sm face={c.face} /><b>{c.name}</b></span></td><td>{c.area}</td><td>{c.visits}</td><td>{inr(c.spent)}</td><td>{inr(c.wallet)}</td><td>{c.last}</td>
                <td><Tag tone={typeTone[c.type]}>{c.type}</Tag></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="m">No customers match.</td></tr>}
          </tbody>
        </table>
        <Pager text={`Page 1 of 3 · ${Math.min(rows.length, 6)} rows per page`} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>Bookings per day</span>
            <span className="s m">{day === undefined ? '812 this week' : `${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day]}: ${perDay[day]} bookings`}</span></div>
          <Columns height={92} picked={day} onPick={(i) => setDay(day === i ? undefined : i)}
            bars={perDay.map((n, i) => ({ h: Math.round((n / max) * 100), color: i >= 5 ? 'var(--green)' : 'var(--mint)', title: `${n} bookings` }))} />
          <div className="row s m" style={{ marginTop: 6, padding: '0 8px' }}>{days.map((d, i) => <span key={i}>{d}</span>)}</div>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 10 }}>Bookings by service</div>
          <div style={{ display: 'grid', gap: 9 }} className="s">
            <BarRow label="General cleaning" value="38%" pct={38} />
            <BarRow label="Dishes & meal prep" value="24%" pct={24} />
            <BarRow label="Kitchen & bath scrub" value="17%" pct={17} />
            <BarRow label="Laundry & organizing" value="12%" pct={12} />
            <BarRow label="Hourly custom help" value="9%" pct={9} />
          </div>
        </div>
      </div>
    </div>
  </>;
}

/* ---------------- 81 one customer ---------------- */
type Visit = { id: string; date: string; service: string; partner: string; rated: string; amount: number; refunded?: boolean };
const nitinVisits: Visit[] = [
  { id: '2041', date: 'Today', service: 'General · 1 hr', partner: 'Sunita D.', rated: '4 / 5', amount: 237 },
  { id: '2012', date: '14 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
  { id: '1987', date: '13 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
  { id: '1960', date: '12 Nov', service: 'Laundry · 1.5 hr', partner: 'Rekha M.', rated: '4 / 5', amount: 267 },
  { id: '1933', date: '11 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: 'Not rated', amount: 158 },
  { id: '1904', date: '10 Nov', service: 'General · 1 hr', partner: 'Sunita D.', rated: '5 / 5', amount: 158 },
];
type Money = { title: string; sub: string };

export function CustomerDetail({ params }: { params: Record<string, any> }) {
  const { go, back, toast } = useAdmin();
  const c = customers.find((x) => x.id === params.id) ?? customers[0];
  const isNitin = c.id === 'nk';
  const [wallet, setWallet] = useState(c.wallet);
  const [blocked, setBlocked] = useState(false);
  const [visits, setVisits] = useState<Visit[]>(() => isNitin ? nitinVisits
    : nitinVisits.slice(0, Math.min(6, c.visits)).map((v, i) => ({ ...v, id: String(2040 - i * 23), date: i === 0 ? c.last : v.date })));
  const [money, setMoney] = useState<Money[]>(isNitin
    ? [{ title: 'Refund ₹79 to wallet', sub: 'Visit #2031 ended early · today' }, { title: 'Referral reward ₹100', sub: 'Meera S. joined · 12 Nov' }]
    : [{ title: 'Welcome offer FIRST50', sub: `First visit · ${c.since}` }]);
  const [notes, setNotes] = useState<string[]>(isNitin ? ['Shared home with 2 flatmates.'] : []);
  const [note, setNote] = useState('');
  const [modal, setModal] = useState<null | 'credit' | 'block' | { refund: Visit }>(null);
  const [amt, setAmt] = useState('100');
  const [reason, setReason] = useState('Goodwill');

  const addMoney = (title: string, sub: string) => setMoney((m) => [{ title, sub }, ...m]);
  const giveCredit = () => {
    const n = Math.max(0, parseInt(amt, 10) || 0);
    if (!n) return toast('Enter an amount');
    setWallet((w) => w + n); addMoney(`Wallet credit ${inr(n)}`, `${reason} · just now by Admin`); setModal(null); toast(`${inr(n)} added to ${c.name}'s wallet`);
  };
  const refund = (v: Visit) => {
    const n = Math.max(0, parseInt(amt, 10) || 0);
    setWallet((w) => w + n); setVisits((vs) => vs.map((x) => x.id === v.id ? { ...x, refunded: true } : x));
    addMoney(`Refund ${inr(n)} to wallet`, `Visit #${v.id} · ${reason} · just now`); setModal(null); toast(`Refunded ${inr(n)} for visit #${v.id}`);
  };
  const tickets = isNitin ? { t: 'No open tickets', s: '1 ticket ever, closed in 15 min' } : { t: 'No open tickets', s: 'No tickets yet' };

  return <>
    <div className="row">
      <div className="lft" style={{ gap: 12 }}>
        <span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span>
        <Av face={c.face} size={46} />
        <div><div className="h" style={{ fontSize: 22 }}>{c.name}</div><div className="m">Customer since {c.since} · {c.area}</div></div>
        <Tag tone={typeTone[c.type]}>{c.type}</Tag><Tag tone="n">{c.points >= 300 ? 'Silver' : 'Bronze'} · {c.points} points</Tag>
        {blocked && <Tag tone="r">Blocked</Tag>}
      </div>
      <div className="lft">
        <Btn o onClick={() => toast(`Calling ${c.name} on ${c.mobile}…`)}>Call</Btn>
        <Btn o onClick={() => { setAmt('100'); setReason('Goodwill'); setModal('credit'); }}>Add wallet credit</Btn>
        {blocked ? <Btn o onClick={() => { setBlocked(false); toast('Account unblocked'); }}>Unblock account</Btn>
          : <Btn o red onClick={() => setModal('block')}>Block account</Btn>}
      </div>
    </div>
    <div style={KPI_GRID}>
      <div className="card"><div className="m">Visits</div><div className="stat">{c.visits}</div></div>
      <div className="card"><div className="m">Spent</div><div className="stat">{inr(c.spent)}</div></div>
      <div className="card"><div className="m">Average rating given</div><div className="stat">{c.rating}</div></div>
      <div className="card"><div className="m">Wallet</div><div className="stat">{inr(wallet)}</div></div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.5fr .9fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="h2" style={{ fontSize: 15 }}>Profile</div>
        <div className="row"><span className="m">Mobile</span><b>{c.mobile}</b></div>
        <div className="row"><span className="m">Language</span><b>{c.area.startsWith('Sector') ? 'Hindi' : 'English'}</b></div>
        <div className="row"><span className="m">Pays with</span><b>{c.type === 'Plan' ? 'UPI AutoPay' : 'UPI'}</b></div>
        <div className="hr" />
        <div className="h2">Home · Flat 204, {c.area}</div>
        <div className="s m">2 BHK · 2 bathrooms · pets at home<br />Gate 2, near the park. Tell the guard flat 204.</div>
        <div className="hr" />
        <div className="h2">Monthly plan</div>
        {c.type === 'Plan'
          ? <div className="s m">Mon to Sat · 8:00 am · 1 hr · General cleaning<br />Regular helper: Sunita D.</div>
          : <div className="s m">No plan yet</div>}
        <div className="end" style={{ display: 'grid', gap: 6 }}>
          <div className="h2">Notes</div>
          {notes.map((n, i) => <div key={i} className="s m">{n}</div>)}
          <div className="lft" style={{ gap: 6 }}>
            <input className="srch" style={{ flex: 1, width: 'auto' }} placeholder="Add a note for the team" value={note} onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && note.trim()) { setNotes((n) => [...n, note.trim()]); setNote(''); toast('Note saved'); } }} />
            <Btn sm onClick={() => { if (!note.trim()) return; setNotes((n) => [...n, note.trim()]); setNote(''); toast('Note saved'); }}>Add</Btn>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <CardHead title="Visits" right={<span className="s m">Newest first · click a visit to refund</span>} />
        <table>
          <thead><tr><th>ID</th><th>Date</th><th>Service</th><th>Partner</th><th>Rated</th><th>Amount</th></tr></thead>
          <tbody>{visits.map((v) => (
            <tr key={v.id} className="clk" onClick={() => { setAmt(String(Math.round(v.amount * decisions.customer.badVisitRefund))); setReason('Visit not up to the mark'); setModal({ refund: v }); }}>
              <td>#{v.id}</td><td>{v.date}</td><td>{v.service}</td><td>{v.partner}</td><td className={v.rated === 'Not rated' ? 'm' : ''}>{v.rated}</td>
              <td>{inr(v.amount)} {v.refunded && <Tag tone="n">Refunded</Tag>}</td>
            </tr>))}
          </tbody>
        </table>
        <Pager text="Page 1 of 2 · 6 rows per page" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Helpers</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'sd', name: 'Sunita D.' })}><div className="lft"><Av sm face="sd" /><b>Sunita D.</b></div><Tag>Favourite</Tag></div>
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'rm', name: 'Rekha M.' })}><div className="lft"><Av sm face="rm" /><b>Rekha M.</b></div><span className="s m">2 visits</span></div>
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'gk', name: 'Geeta K.' })}><div className="lft"><Av sm face="gk" /><b>Geeta K.</b></div><Tag tone="r">Blocked</Tag></div>
          </div>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Money and problems</div>
          <div style={{ display: 'grid', gap: 8 }} className="s">
            {money.map((m, i) => <React.Fragment key={i}><div><b>{m.title}</b><div className="m">{m.sub}</div></div><div className="hr" /></React.Fragment>)}
            <div className="clk" onClick={() => go('support')}><b>{tickets.t}</b><div className="m">{tickets.s}</div></div>
          </div>
        </div>
      </div>
    </div>

    <Modal open={modal === 'credit'} onClose={() => setModal(null)} title={`Add wallet credit for ${c.name}`}
      actions={<><Btn o onClick={() => setModal(null)}>Cancel</Btn><Btn onClick={giveCredit}>Add {inr(parseInt(amt, 10) || 0)}</Btn></>}>
      <Field label="Amount (₹)"><input className="inp" inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} /></Field>
      <Field label="Reason"><select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
        <option>Goodwill</option><option>Late arrival</option><option>Referral reward</option><option>Other</option></select></Field>
      <div className="s m">Credit can be used on the next booking. It is not paid out to the bank.</div>
    </Modal>
    <Modal open={modal === 'block'} onClose={() => setModal(null)} title={`Block ${c.name}?`}
      actions={<><Btn o onClick={() => setModal(null)}>Cancel</Btn><Btn red onClick={() => { setBlocked(true); setModal(null); toast('Account blocked. Future bookings are cancelled.'); }}>Block account</Btn></>}>
      <div className="m">They will not be able to book. Their 1 upcoming visit will be cancelled and the wallet ({inr(wallet)}) is kept.</div>
    </Modal>
    {modal && typeof modal === 'object' && (
      <Modal open onClose={() => setModal(null)} title={`Refund visit #${modal.refund.id}`}
        actions={<><Btn o onClick={() => setModal(null)}>Cancel</Btn><Btn onClick={() => refund(modal.refund)} disabled={!!modal.refund.refunded}>Refund to wallet</Btn></>}>
        <div className="m">{modal.refund.service} · {modal.refund.partner} · paid {inr(modal.refund.amount)}</div>
        {modal.refund.refunded && <Tag tone="n">Already refunded</Tag>}
        <Field label="Amount (₹)"><input className="inp" inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} /></Field>
        <Field label="Reason"><select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
          <option>Visit not up to the mark</option><option>Came late</option><option>Ended early</option><option>Charged twice</option></select></Field>
        <div className="s m">{`Bad visits get ${decisions.customer.badVisitRefund * 100}% back by default.`}</div>
      </Modal>
    )}
  </>;
}
