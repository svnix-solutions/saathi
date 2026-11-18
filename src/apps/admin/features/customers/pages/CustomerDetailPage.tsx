/** Screen 81 · One customer. */
import React, { useState } from 'react';
import { Av, Button, Field, I, Kpi, KpiGrid, Modal, Pager, Table, TableCard, Tag, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { inr } from '../../../fixtures';
import { decisions } from '@/domain';
import { creditReasons, customers, moneyOf, refundReasons, typeTone, visitsOf, type MoneyEvent, type Visit } from '../data';
import '../customers.css';

export function CustomerDetailPage({ params }: { params: PageParams }) {
  const { go, back, toast } = useAdmin();
  const c = customers.find((x) => x.id === params.id) ?? customers[0];
  const isNitin = c.id === 'nk';
  const [wallet, setWallet] = useState(c.wallet);
  const [blocked, setBlocked] = useState(false);
  const [visits, setVisits] = useState<Visit[]>(() => visitsOf(c));
  const [money, setMoney] = useState<MoneyEvent[]>(() => moneyOf(c));
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
  const saveNote = () => { setNotes((n) => [...n, note.trim()]); setNote(''); toast('Note saved'); };
  const openRefund = (v: Visit) => { setAmt(String(Math.round(v.amount * decisions.customer.badVisitRefund))); setReason('Visit not up to the mark'); setModal({ refund: v }); };
  const tickets = isNitin ? { t: 'No open tickets', s: '1 ticket ever, closed in 15 min' } : { t: 'No open tickets', s: 'No tickets yet' };

  const visitColumns: TableColumn<Visit>[] = [
    { key: 'id', label: 'ID', render: (v) => `#${v.id}` },
    { key: 'date', label: 'Date', render: (v) => v.date },
    { key: 'service', label: 'Service', render: (v) => v.service },
    { key: 'partner', label: 'Partner', render: (v) => v.partner },
    { key: 'rated', label: 'Rated', cell: (v) => ({ className: v.rated === 'Not rated' ? 'm' : '' }), render: (v) => v.rated },
    { key: 'amount', label: 'Amount', render: (v) => <>{inr(v.amount)} {v.refunded && <Tag tone="n">Refunded</Tag>}</> },
  ];

  return <>
    <div className="row">
      <div className="lft cus-ident">
        <span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span>
        <Av face={c.face} size={46} />
        <div><div className="h cus-page-title">{c.name}</div><div className="m">Customer since {c.since} · {c.area}</div></div>
        <Tag tone={typeTone[c.type]}>{c.type}</Tag><Tag tone="n">{c.points >= 300 ? 'Silver' : 'Bronze'} · {c.points} points</Tag>
        {blocked && <Tag tone="r">Blocked</Tag>}
      </div>
      <div className="lft">
        <Button variant="outline" onClick={() => toast(`Calling ${c.name} on ${c.mobile}…`)}>Call</Button>
        <Button variant="outline" onClick={() => { setAmt('100'); setReason('Goodwill'); setModal('credit'); }}>Add wallet credit</Button>
        {blocked ? <Button variant="outline" onClick={() => { setBlocked(false); toast('Account unblocked'); }}>Unblock account</Button>
          : <Button variant="danger-outline" onClick={() => setModal('block')}>Block account</Button>}
      </div>
    </div>
    <KpiGrid>
      <Kpi label="Visits" value={c.visits} />
      <Kpi label="Spent" value={inr(c.spent)} />
      <Kpi label="Average rating given" value={c.rating} />
      <Kpi label="Wallet" value={inr(wallet)} />
    </KpiGrid>
    <div className="cus-body cus-body-detail">
      <div className="card cus-panel">
        <div className="h2 cus-title">Profile</div>
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
        <div className="end cus-notes">
          <div className="h2">Notes</div>
          {notes.map((n, i) => <div key={i} className="s m">{n}</div>)}
          <div className="lft cus-note-row">
            <input className="srch cus-note-input" placeholder="Add a note for the team" value={note} onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && note.trim()) saveNote(); }} />
            <Button size="compact" onClick={() => { if (!note.trim()) return; saveNote(); }}>Add</Button>
          </div>
        </div>
      </div>
      <TableCard title="Visits" right={<span className="s m">Newest first · click a visit to refund</span>} footer={<Pager text="Page 1 of 2 · 6 rows per page" />}>
        <Table columns={visitColumns} rows={visits} rowKey={(v) => v.id} onRowClick={openRefund} />
      </TableCard>
      <div className="cus-side">
        <div className="card">
          <div className="h2 cus-title cus-title-gap">Helpers</div>
          <div className="cus-list-8">
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'sd', name: 'Sunita D.' })}><div className="lft"><Av sm face="sd" /><b>Sunita D.</b></div><Tag>Favourite</Tag></div>
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'rm', name: 'Rekha M.' })}><div className="lft"><Av sm face="rm" /><b>Rekha M.</b></div><span className="s m">2 visits</span></div>
            <div className="row clk" onClick={() => go('partnerDetail', { id: 'gk', name: 'Geeta K.' })}><div className="lft"><Av sm face="gk" /><b>Geeta K.</b></div><Tag tone="r">Blocked</Tag></div>
          </div>
        </div>
        <div className="card cus-fill">
          <div className="h2 cus-title cus-title-gap">Money and problems</div>
          <div className="s cus-list-8">
            {money.map((m, i) => <React.Fragment key={i}><div><b>{m.title}</b><div className="m">{m.sub}</div></div><div className="hr" /></React.Fragment>)}
            <div className="clk" onClick={() => go('support')}><b>{tickets.t}</b><div className="m">{tickets.s}</div></div>
          </div>
        </div>
      </div>
    </div>

    <Modal open={modal === 'credit'} onClose={() => setModal(null)} title={`Add wallet credit for ${c.name}`}
      actions={<><Button variant="outline" onClick={() => setModal(null)}>Cancel</Button><Button onClick={giveCredit}>Add {inr(parseInt(amt, 10) || 0)}</Button></>}>
      <Field label="Amount (₹)"><input className="inp" inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} /></Field>
      <Field label="Reason"><select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
        {creditReasons.map((r) => <option key={r}>{r}</option>)}</select></Field>
      <div className="s m">Credit can be used on the next booking. It is not paid out to the bank.</div>
    </Modal>
    <Modal open={modal === 'block'} onClose={() => setModal(null)} title={`Block ${c.name}?`}
      actions={<><Button variant="outline" onClick={() => setModal(null)}>Cancel</Button><Button variant="danger" onClick={() => { setBlocked(true); setModal(null); toast('Account blocked. Future bookings are cancelled.'); }}>Block account</Button></>}>
      <div className="m">They will not be able to book. Their 1 upcoming visit will be cancelled and the wallet ({inr(wallet)}) is kept.</div>
    </Modal>
    {modal && typeof modal === 'object' && (
      <Modal open onClose={() => setModal(null)} title={`Refund visit #${modal.refund.id}`}
        actions={<><Button variant="outline" onClick={() => setModal(null)}>Cancel</Button><Button onClick={() => refund(modal.refund)} disabled={!!modal.refund.refunded}>Refund to wallet</Button></>}>
        <div className="m">{modal.refund.service} · {modal.refund.partner} · paid {inr(modal.refund.amount)}</div>
        {modal.refund.refunded && <Tag tone="n">Already refunded</Tag>}
        <Field label="Amount (₹)"><input className="inp" inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} /></Field>
        <Field label="Reason"><select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
          {refundReasons.map((r) => <option key={r}>{r}</option>)}</select></Field>
        <div className="s m">{`Bad visits get ${decisions.customer.badVisitRefund * 100}% back by default.`}</div>
      </Modal>
    )}
  </>;
}

export default CustomerDetailPage;
