/** 71 · Admin payouts, offers and support (support ticket list is its own page, `support`). */
import React, { useState } from 'react';
import { Av, Check, Kpi, Modal, PageHead, Pager, Tabs, Tag, Toggle, useAdmin } from '../shell';
import { useStore, setPayouts, inr, type PayoutStatus, type Ticket } from './store';
import { payoutTag, SmBtn, TLink } from './ui';

type F = 'all' | 'toApprove' | 'hold';

export function ticketTag(t: Ticket) {
  if (t.status === 'closed') return <Tag tone="x">Closed</Tag>;
  if (t.status === 'answered') return <Tag tone="x">Answered</Tag>;
  if (t.status === 'passed') return <Tag tone="n">With ops lead</Tag>;
  if (t.refundAsk && !t.refunded) return <Tag tone="r">Refund?</Tag>;
  return <Tag>Open</Tag>;
}

export function PayoutsPage() {
  const { go, toast } = useAdmin();
  const payouts = useStore((s) => s.payouts);
  const tickets = useStore((s) => s.tickets);
  const [f, setF] = useState<F>('all');
  const [picked, setPicked] = useState<string[]>([]);
  const [confirmAll, setConfirmAll] = useState(false);
  const [codes, setCodes] = useState({ FIRST50: true, PLAN10: true, DIWALI: false });

  const rows = payouts.filter((p) => (f === 'all' ? true : p.status === f));
  const total = (id: string) => { const p = payouts.find((x) => x.id === id)!; return p.earnings + p.tips; };
  const unpaidSample = payouts.filter((p) => p.status !== 'paid').reduce((a, p) => a + p.earnings + p.tips, 0);
  const due = 112480 - (10920 - unpaidSample); // ₹1,12,480 while the 5 sample rows are unpaid; drops as rows are paid
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'passed').length;
  const approvedCount = payouts.filter((p) => p.status === 'approved').length;

  const setStatus = (ids: string[], st: PayoutStatus) => setPayouts((ps) => ps.map((p) => (ids.includes(p.id) ? { ...p, status: st } : p)));
  const pickedTotal = picked.reduce((a, id) => a + total(id), 0);
  const act = (st: PayoutStatus, msg: string) => { setStatus(picked, st); toast(`${picked.length} ${picked.length === 1 ? 'payout' : 'payouts'} ${msg}`); setPicked([]); };

  return (
    <>
      <PageHead title="Payouts" sub="Week of 9 to 15 November · paid every Monday"
        actions={<>
          <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast('Downloaded payouts-9-15-nov.xlsx')}>Download sheet</button>
          <button className="btn" style={{ padding: '10px 16px', opacity: approvedCount ? 1 : 0.5 }} onClick={() => (approvedCount ? setConfirmAll(true) : toast('No approved payouts left to pay'))}>Pay all approved</button>
        </>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <Kpi label="Due this Monday" value={inr(due)} />
        <Kpi label="Tips passed on" value="₹6,350" />
        <Kpi label="Active offer codes" value={Object.values(codes).filter(Boolean).length} onClick={() => go('offers')} />
        <Kpi label="Open support tickets" value={openTickets} red={openTickets > 0} onClick={() => go('support')} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ padding: '14px 8px 4px' }}>
          <div className="row" style={{ padding: '0 10px 8px' }}>
            <span className="h2" style={{ fontSize: 15 }}>Partner payouts</span>
            <Tabs value={f} onChange={(k) => { setF(k); setPicked([]); }} items={[
              { key: 'all', label: 'All 52' },
              { key: 'toApprove', label: `To approve ${payouts.filter((p) => p.status === 'toApprove').length}` },
              { key: 'hold', label: `On hold ${payouts.filter((p) => p.status === 'hold').length}` }]} />
          </div>
          {picked.length > 0 && (
            <div className="card sel row" style={{ margin: '0 4px 8px', padding: '8px 11px' }}>
              <span><b>{picked.length} selected</b> · {inr(pickedTotal)}</span>
              <span className="lft" style={{ gap: 6 }}>
                <SmBtn onClick={() => act('approved', 'approved')}>Approve</SmBtn>
                <SmBtn onClick={() => act('hold', 'put on hold')}>Hold</SmBtn>
                <SmBtn solid onClick={() => act('paid', `marked paid · ${inr(pickedTotal)}`)}>Mark paid</SmBtn>
              </span>
            </div>
          )}
          <table>
            <thead><tr><th style={{ width: 30 }}><Check on={rows.length > 0 && rows.every((r) => picked.includes(r.id))} onChange={(v) => setPicked(v ? rows.filter((r) => r.status !== 'paid').map((r) => r.id) : [])} /></th>
              <th>Partner</th><th>Jobs</th><th>Earnings</th><th>Tips</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((p) => {
                const on = picked.includes(p.id);
                const toggle = () => (p.status === 'paid' ? toast(`${p.name} was paid on Monday 9 Nov`) : setPicked(on ? picked.filter((x) => x !== p.id) : [...picked, p.id]));
                return (
                  <tr key={p.id} className="clk" style={on ? { background: 'var(--mint)' } : undefined} onClick={toggle}>
                    <td onClick={(e) => e.stopPropagation()}><Check on={on} onChange={toggle} /></td>
                    <td><span className="lft"><Av sm face={p.face} /><b>{p.name}</b></span></td>
                    <td>{p.jobs}</td><td>{inr(p.earnings)}</td><td>{inr(p.tips)}</td><td><b>{inr(p.earnings + p.tips)}</b></td>
                    <td>{payoutTag[p.status]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pager text="Page 1 of 3 · 6 rows per page" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card" style={{ padding: '14px 8px 4px' }}>
            <div className="row" style={{ padding: '0 10px 6px' }}><span className="h2" style={{ fontSize: 15 }}>Offer codes</span><TLink onClick={() => go('offers')}>New code</TLink></div>
            <table>
              <thead><tr><th>Code</th><th>Offer</th><th>Used</th><th>Live</th></tr></thead>
              <tbody>
                {([['FIRST50', '₹50 off first visit', 312], ['PLAN10', '10% off monthly plan', 41], ['DIWALI', '₹100 off deep clean', 96]] as const).map(([c, o, u]) => (
                  <tr key={c}><td><b>{c}</b></td><td>{o}</td><td>{u}</td>
                    <td><Toggle on={codes[c]} onChange={(v) => { setCodes({ ...codes, [c]: v }); toast(`${c} ${v ? 'is live' : 'switched off'}`); }} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card" style={{ flex: 1 }}>
            <div className="row" style={{ marginBottom: 8 }}><span className="h2" style={{ fontSize: 15 }}>Support tickets</span><TLink onClick={() => go('support')}>See all</TLink></div>
            <div style={{ display: 'grid', gap: 9 }}>
              {tickets.filter((t) => t.id !== 'T-315').map((t, i, arr) => (
                <React.Fragment key={t.id}>
                  <div className="row clk" onClick={() => go('ticket', { id: t.id })}>
                    <div><b>{t.title}</b><div className="s m">{t.from} · {t.ref} · {t.age === 'yesterday' ? 'yesterday' : `${t.age} ago`}</div></div>
                    {ticketTag(t)}
                  </div>
                  {i < arr.length - 1 && <div className="hr" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal open={confirmAll} onClose={() => setConfirmAll(false)} title="Pay all approved?"
        actions={<>
          <button className="btn o sm" onClick={() => setConfirmAll(false)}>Not now</button>
          <button className="btn sm" onClick={() => {
            const ids = payouts.filter((p) => p.status === 'approved').map((p) => p.id);
            setStatus(ids, 'paid'); setConfirmAll(false); setPicked([]);
            toast(`${ids.length} payouts sent by UPI · partners get an SMS`);
          }}>Pay now</button>
        </>}>
        <div className="m">{approvedCount} approved payouts on this page ({inr(payouts.filter((p) => p.status === 'approved').reduce((a, p) => a + p.earnings + p.tips, 0))}) go to partners’ UPI today. Payouts to approve or on hold are not paid.</div>
      </Modal>
    </>
  );
}

/** Support ticket list (the support part of design 71, as a full page). Rows open `ticket`. */
type TF = 'all' | 'open' | 'refund' | 'answered';
export function SupportPage() {
  const { go, toast } = useAdmin();
  const tickets = useStore((s) => s.tickets);
  const [f, setF] = useState<TF>('all');
  const open = tickets.filter((t) => t.status === 'open' || t.status === 'passed');
  const rows = tickets.filter((t) =>
    f === 'all' ? true : f === 'open' ? t.status === 'open' || t.status === 'passed'
      : f === 'refund' ? t.refundAsk && !t.refunded && t.status !== 'closed' : t.status === 'answered' || t.status === 'closed');
  return (
    <>
      <PageHead title="Support" sub={`${open.length} open · oldest unanswered first · first reply within 10 minutes`}
        actions={<>
          <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => go('claims')}>Damage claims</button>
          <button className="btn" style={{ padding: '10px 16px' }} onClick={() => toast('New ticket: pick a customer or partner first')}>New ticket</button>
        </>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <Kpi label="Open tickets" value={open.length} red={open.length > 0} />
        <Kpi label="First reply today" value="4 min" sub="target 10" />
        <Kpi label="Refunds today" value={inr(79 + tickets.reduce((a, t) => a + (t.refunded ?? 0), 0))} />
        <Kpi label="Solved this week" value="38" />
      </div>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <div className="row" style={{ padding: '0 10px 8px' }}>
          <span className="h2" style={{ fontSize: 15 }}>Tickets</span>
          <Tabs value={f} onChange={setF} items={[
            { key: 'all', label: `All ${tickets.length}` }, { key: 'open', label: `Open ${open.length}` },
            { key: 'refund', label: 'Refund asked' }, { key: 'answered', label: 'Answered' }]} />
        </div>
        <table>
          <thead><tr><th>Ticket</th><th>Problem</th><th>From</th><th>Person</th><th>Booking</th><th>Waiting</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="clk" onClick={() => go('ticket', { id: t.id })}>
                <td><b>#{t.id}</b></td><td>{t.title}</td><td>{t.from}</td>
                <td><span className="lft"><Av sm face={t.face} />{t.who}</span></td>
                <td>{t.ref}</td><td className="m">{t.age}</td><td>{ticketTag(t)}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={7} className="m" style={{ textAlign: 'center', padding: 24 }}>No tickets here.</td></tr>}
          </tbody>
        </table>
        <Pager text={`${rows.length} tickets`} />
      </div>
    </>
  );
}
