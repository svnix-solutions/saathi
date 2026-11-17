/** 93 Damage claims: photos and visit facts, approve with an amount or reject with a reason. */
import React, { useMemo, useState } from 'react';
import { Modal, Pager, Tag, useAdmin, type TagTone } from '../shell';
import { Btn, Field, inr } from './ui';

type Status = 'To decide' | 'Over 1 day' | 'Paid' | 'Rejected';
type Claim = {
  id: string; customer: string; custId: string; what: string; claimed: number; reported: string; status: Status; paid?: number; reason?: string; plus?: boolean;
  visit: string; when: string; custFacts: string; partnerFacts: string;
};
const initial: Claim[] = [
  { id: '2041', customer: 'Nitin K.', custId: 'nk', what: 'Glass jar, kitchen shelf', claimed: 450, reported: 'Today', status: 'To decide', visit: 'General · 1 hr · Sunita D.', when: '2 hr after the visit, inside 24 hr', custFacts: '9 visits · no earlier claims', partnerFacts: '142 visits · no earlier claims' },
  { id: '2008', customer: 'Meera S.', custId: 'ms', what: 'Bathroom mirror, cracked', claimed: 1800, reported: 'Yesterday', status: 'To decide', visit: 'Kitchen & bath · 2 hr · Meena T.', when: '5 hr after the visit, inside 24 hr', custFacts: '3 visits · no earlier claims', partnerFacts: '96 visits · 1 earlier claim' },
  { id: '1977', customer: 'Farah A.', custId: 'fa', what: 'Mop handle', claimed: 220, reported: '2 days ago', status: 'Over 1 day', visit: 'General · 1 hr · Lata S.', when: '1 hr after the visit, inside 24 hr', custFacts: '14 visits · no earlier claims', partnerFacts: '61 visits · no earlier claims', plus: true },
  { id: '1950', customer: 'Priya N.', custId: 'pn', what: 'Ceramic plate', claimed: 300, reported: '12 Nov', status: 'Paid', paid: 300, visit: 'Dishes · 1 hr · Rekha M.', when: '30 min after the visit', custFacts: '6 visits · no earlier claims', partnerFacts: '188 visits · no earlier claims' },
  { id: '1921', customer: 'Rohan G.', custId: 'rg', what: 'Phone screen', claimed: 6000, reported: '10 Nov', status: 'Rejected', reason: 'Phone was not part of the visit area', visit: 'General · 1.5 hr · Geeta K.', when: '2 days after the visit, after 24 hr', custFacts: '4 visits · 1 earlier claim', partnerFacts: '77 visits · 2 earlier claims' },
];
const tone = (c: Claim): TagTone => c.status === 'Over 1 day' ? 'r' : c.status === 'Paid' ? 'n' : c.status === 'Rejected' ? 'x' : 'y';
const label = (c: Claim) => c.status === 'Paid' ? `Paid ${inr(c.paid ?? c.claimed)}` : c.status;
const COVER = 2000, COVER_PLUS = 10000;

type F = 'decide' | 'approved' | 'rejected';

export function Claims() {
  const { go, toast } = useAdmin();
  const [list, setList] = useState(initial);
  const [f, setF] = useState<F>('decide');
  const [sel, setSel] = useState('2041');
  const cur = list.find((c) => c.id === sel) ?? list[0];
  const [amt, setAmt] = useState(String(cur.claimed));
  const [to, setTo] = useState<'wallet' | 'bank'>('wallet');
  const [photo, setPhoto] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');

  const open = (c: Claim) => c.status === 'To decide' || c.status === 'Over 1 day';
  const counts = { decide: list.filter(open).length, approved: 4 + list.filter((c) => c.status === 'Paid').length, rejected: list.filter((c) => c.status === 'Rejected').length };
  const rows = useMemo(() => list.filter((c) => f === 'decide' ? open(c) : f === 'approved' ? c.status === 'Paid' : c.status === 'Rejected'), [list, f]);
  const pick = (c: Claim) => { setSel(c.id); setAmt(String(c.paid ?? c.claimed)); };
  const cap = cur.plus ? COVER_PLUS : COVER;
  const n = parseInt(amt, 10) || 0;
  const decided = !open(cur);

  const approve = () => {
    if (!n) return toast('Enter the amount to pay');
    if (n > cap) return toast(`Cover is up to ${inr(cap)} per visit`);
    setList((l) => l.map((c) => c.id === cur.id ? { ...c, status: 'Paid', paid: n } : c));
    toast(`${inr(n)} paid to ${cur.customer.split(' ')[0]}'s ${to === 'wallet' ? 'wallet' : 'bank account'}`);
    const next = list.find((c) => c.id !== cur.id && open(c)); if (next) pick(next);
  };
  const reject = () => {
    if (!reason.trim()) return toast('Write the reason the customer will see');
    setList((l) => l.map((c) => c.id === cur.id ? { ...c, status: 'Rejected', reason: reason.trim() } : c));
    setRejecting(false); setReason(''); toast(`Claim #${cur.id} rejected. ${cur.customer} has been told why.`);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Damage claims</div><div className="m">{counts.decide} to decide · cover up to {inr(COVER)} per visit, {inr(COVER_PLUS)} with Plus</div></div>
      <div className="lft tabsel">
        {([['decide', `To decide ${counts.decide}`], ['approved', `Approved ${counts.approved}`], ['rejected', `Rejected ${counts.rejected}`]] as [F, string][]).map(([k, l]) =>
          k === f ? <span key={k} className="tag n">{l}</span> : <span key={k} className="s m" onClick={() => { setF(k); const first = list.find((c) => k === 'decide' ? open(c) : k === 'approved' ? c.status === 'Paid' : c.status === 'Rejected'); if (first) pick(first); }}>{l}</span>)}
      </div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <table>
          <thead><tr><th>Visit</th><th>Customer</th><th>What was damaged</th><th>Claimed</th><th>Reported</th><th>Status</th></tr></thead>
          <tbody>{rows.map((c) => (
            <tr key={c.id} className={`clk ${c.id === cur.id ? 'on' : ''}`} onClick={() => pick(c)}>
              <td>#{c.id}</td><td>{c.customer}</td><td>{c.what}</td><td>{inr(c.claimed)}</td><td>{c.reported}</td><td><Tag tone={tone(c)}>{label(c)}</Tag></td></tr>))}
            {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
          </tbody>
        </table>
        <Pager text={`Page 1 of 2 · 5 rows per page`} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>#{cur.id} · {cur.what}</span><b>{inr(cur.claimed)}</b></div>
          <div className="g3">{['Photo 1', 'Photo 2', "Helper's photo"].map((p) => <div key={p} className="photo s" onClick={() => setPhoto(p)}>{p}</div>)}</div>
          <div style={{ display: 'grid', gap: 7 }}>
            <div className="row"><span className="m">Visit</span><b>{cur.visit}</b></div>
            <div className="row"><span className="m">Reported</span><b>{cur.when}</b></div>
            <div className="row"><span className="m">Customer</span><b className="lnk" onClick={() => go('customerDetail', { id: cur.custId })}>{cur.custFacts}</b></div>
            <div className="row"><span className="m">Partner</span><b>{cur.partnerFacts}</b></div>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>Decide</span>{decided && <Tag tone={tone(cur)}>{label(cur)}</Tag>}</div>
          {decided ? <>
            <div className="s m">{cur.status === 'Paid' ? `Paid to the customer's wallet. Logged against visit #${cur.id}.` : `Reason given: ${cur.reason}`}</div>
          </> : <>
            <div className="h2">Amount to pay</div>
            <div className="lft inp" style={{ fontSize: 13, padding: '8px 11px', gap: 4, ...(n > cap ? { borderColor: 'var(--red)' } : {}) }}>₹
              <input style={{ border: 0, outline: 'none', font: 'inherit', flex: 1, background: 'transparent' }} inputMode="numeric" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ''))} /></div>
            {n > cap && <div className="s" style={{ color: 'var(--red)' }}>Above the {inr(cap)} cover{cur.plus ? ' (Plus)' : ''}.</div>}
            <div className="g2"><div className={`pill ${to === 'wallet' ? 'sel' : ''}`} onClick={() => setTo('wallet')}>To wallet</div><div className={`pill ${to === 'bank' ? 'sel' : ''}`} onClick={() => setTo('bank')}>To bank</div></div>
            <div className="s m">This is not taken from the partner's pay. Repeated claims against one partner show on their quality page.</div>
          </>}
          <div className="g2 end">
            <Btn o red style={{ padding: 9 }} disabled={decided} onClick={() => setRejecting(true)}>Reject with a reason</Btn>
            <Btn style={{ padding: 10 }} disabled={decided} onClick={approve}>Approve and pay</Btn>
          </div>
        </div>
      </div>
    </div>

    <Modal open={!!photo} onClose={() => setPhoto(null)} title={`#${cur.id} · ${photo}`}>
      <div className="photo" style={{ height: 260, cursor: 'default' }}>{photo}</div>
      <div className="s m">{photo === "Helper's photo" ? 'Taken by the partner at check-out.' : 'Uploaded by the customer with the claim.'}</div>
    </Modal>
    <Modal open={rejecting} onClose={() => setRejecting(false)} title={`Reject claim #${cur.id}`}
      actions={<><Btn o onClick={() => setRejecting(false)}>Cancel</Btn><Btn red onClick={reject}>Reject claim</Btn></>}>
      <div className="lft" style={{ flexWrap: 'wrap', gap: 6 }}>
        {['Reported after 24 hours', 'Item was already damaged in check-in photo', 'Not part of the visit area'].map((r) => <span key={r} className="tag x clk" onClick={() => setReason(r)}>{r}</span>)}
      </div>
      <Field label="Reason the customer will see"><textarea className="inp" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
    </Modal>
  </>;
}
