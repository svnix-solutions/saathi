/** 94 Pay advances: approve or refuse with the partner's earnings in view. */
import React, { useMemo, useState } from 'react';
import { Av, Modal, Pager, Tag, useAdmin, type TagTone } from '../shell';
import { decisions } from '@/data/decisions';
import { Btn, Columns, Field, inr } from './ui';

type Status = 'To approve' | 'Repaying' | 'Repaid' | 'Refused';
type Adv = { id: string; name: string; asked: number; weeks: number; usual: number; owes: number; status: Status; weekly: number[]; earlier: string; rating: number };
const initial: Adv[] = [
  { id: 'sd', name: 'Sunita D.', asked: 2000, weeks: 4, usual: 2750, owes: 0, status: 'To approve', weekly: [78, 86, 70, 92, 88, 100], earlier: '1 · repaid on time', rating: 4.8 },
  { id: 'ab', name: 'Anita B.', asked: 3000, weeks: 8, usual: 1500, owes: 500, status: 'To approve', weekly: [60, 100, 45, 70, 38, 52], earlier: '1 · still repaying', rating: 4.1 },
  { id: 'rm', name: 'Rekha M.', asked: 3000, weeks: 8, usual: 3300, owes: 1875, status: 'Repaying', weekly: [90, 94, 88, 100, 96, 92], earlier: '2 · repaid on time', rating: 4.7 },
  { id: 'kr', name: 'Kavita R.', asked: 1000, weeks: 4, usual: 2500, owes: 250, status: 'Repaying', weekly: [84, 80, 90, 86, 100, 88], earlier: 'None', rating: 4.6 },
  { id: 'mt', name: 'Meena T.', asked: 2000, weeks: 4, usual: 2100, owes: 0, status: 'Repaid', weekly: [92, 100, 80, 86, 74, 70], earlier: '1 · repaid on time', rating: 4.3 },
];
const tone: Record<Status, TagTone> = { 'To approve': 'y', Repaying: 'n', Repaid: 'x', Refused: 'x' };
const LIMIT = 3000;
type F = 'requests' | 'repaying' | 'repaid';

export function Advances() {
  const { go, toast } = useAdmin();
  const [list, setList] = useState(initial);
  const [f, setF] = useState<F>('requests');
  const [sel, setSel] = useState('sd');
  const [refusing, setRefusing] = useState(false);
  const [reason, setReason] = useState('');
  const [out, setOut] = useState(18500);

  const cur = list.find((a) => a.id === sel) ?? list[0];
  const match = (a: Adv, k: F) => k === 'requests' ? a.status === 'To approve' : k === 'repaying' ? a.status === 'Repaying' : a.status === 'Repaid' || a.status === 'Refused';
  const rows = useMemo(() => list.filter((a) => match(a, f)), [list, f]);
  const requests = list.filter((a) => a.status === 'To approve').length;
  const repaying = 7 + list.filter((a) => a.status === 'Repaying').length;
  const perWeek = Math.round(cur.asked / cur.weeks);
  const share = Math.round((perWeek / cur.usual) * 100);
  const within = cur.asked <= LIMIT && cur.owes === 0 && share <= 25;
  const why = cur.owes > 0 ? `already owes ${inr(cur.owes)}` : share > 25 ? `repayment would be ${share}% of a usual week` : `asks above ${inr(LIMIT)}`;

  const approve = () => {
    setList((l) => l.map((a) => a.id === cur.id ? { ...a, status: 'Repaying', owes: a.owes + a.asked } : a)); setOut((o) => o + cur.asked);
    toast(`${inr(cur.asked)} sent to ${cur.name}. ${inr(perWeek)} comes back from each ${decisions.partner.payoutDay} payout.`);
    const next = list.find((a) => a.id !== cur.id && a.status === 'To approve'); if (next) setSel(next.id);
  };
  const refuse = () => {
    if (!reason.trim()) return toast('Write the reason the partner will see');
    setList((l) => l.map((a) => a.id === cur.id ? { ...a, status: 'Refused' } : a)); setRefusing(false); setReason('');
    toast(`Refused. ${cur.name} has been told why.`);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Pay advances</div><div className="m">{requests} request{requests === 1 ? '' : 's'} · repaid from weekly payouts, no interest</div></div>
      <div className="lft tabsel">
        {([['requests', `Requests ${requests}`], ['repaying', `Being repaid ${repaying}`], ['repaid', 'Repaid 14']] as [F, string][]).map(([k, l]) =>
          k === f ? <span key={k} className="tag n">{l}</span> : <span key={k} className="s m" onClick={() => { setF(k); const first = list.find((a) => match(a, k)); if (first) setSel(first.id); }}>{l}</span>)}
      </div></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      <div className="card"><div className="m">Out on advance</div><div className="stat">{inr(out)}</div></div>
      <div className="card"><div className="m">Being repaid</div><div className="stat">{repaying} partners</div></div>
      <div className="card"><div className="m">Due back this Monday</div><div className="stat">₹4,250</div></div>
      <div className="card"><div className="m">Repaid late, ever</div><div className="stat">0</div></div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <table>
          <thead><tr><th>Partner</th><th>Asked for</th><th>Pay back over</th><th>Usual week</th><th>Already owes</th><th>Status</th></tr></thead>
          <tbody>{rows.map((a) => (
            <tr key={a.id} className={`clk ${a.id === cur.id ? 'on' : ''}`} onClick={() => setSel(a.id)}>
              <td><span className="lft"><Av sm face={a.id} /><b>{a.name}</b></span></td><td>{inr(a.asked)}</td><td>{a.weeks} weeks</td><td>{inr(a.usual)}</td><td>{inr(a.owes)}</td>
              <td><Tag tone={tone[a.status]}>{a.status}</Tag></td></tr>))}
            {!rows.length && <tr><td colSpan={6} className="m">Nothing here.</td></tr>}
          </tbody>
        </table>
        <Pager text="Page 1 of 3 · 5 rows per page" />
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: cur.id, name: cur.name })}><Av face={cur.id} /><div>
          <div className="h2" style={{ fontSize: 15 }}>{cur.name} {cur.status === 'To approve' ? `asks for ${inr(cur.asked)}` : `· ${inr(cur.asked)} advance`}</div>
          <div className="s m">Pay back {inr(perWeek)} a week for {cur.weeks} weeks</div></div></div>
          {cur.status !== 'To approve' && <Tag tone={tone[cur.status]}>{cur.status}</Tag>}</div>
        <div className="h2">Earned in the last 6 weeks</div>
        <Columns height={84} gap={10} bars={cur.weekly.map((h, i) => ({ h, color: i === 5 ? 'var(--green)' : 'var(--mint)', title: inr(Math.round((cur.usual * h) / 90)) }))} />
        <div style={{ display: 'grid', gap: 7 }}>
          <div className="row"><span className="m">Usual week</span><b>{inr(cur.usual)}</b></div>
          <div className="row"><span className="m">Repayment as share of a week</span><b style={share > 25 ? { color: 'var(--red)' } : undefined}>{share}%</b></div>
          <div className="row"><span className="m">Earlier advances</span><b>{cur.earlier}</b></div>
          <div className="row"><span className="m">Rating</span><b>{cur.rating}</b></div>
        </div>
        {within
          ? <div className="card sel s" style={{ padding: '9px 11px' }}><b>Within the limit.</b> Up to {inr(LIMIT)} for partners with 6 steady weeks. A slow week lowers that week's repayment.</div>
          : <div className="card s" style={{ padding: '9px 11px', background: 'var(--yellow)', border: 0 }}><b>Over the limit:</b> {why}. Approving needs a reason in the note.</div>}
        <div className="g2 end">
          <Btn o style={{ padding: 9 }} disabled={cur.status !== 'To approve'} onClick={() => setRefusing(true)}>Refuse with a reason</Btn>
          <Btn style={{ padding: 10 }} disabled={cur.status !== 'To approve'} onClick={approve}>Approve {inr(cur.asked)}</Btn>
        </div>
      </div>
    </div>

    <Modal open={refusing} onClose={() => setRefusing(false)} title={`Refuse ${cur.name}'s request`}
      actions={<><Btn o onClick={() => setRefusing(false)}>Cancel</Btn><Btn red onClick={refuse}>Refuse</Btn></>}>
      <div className="lft" style={{ flexWrap: 'wrap', gap: 6 }}>
        {['Finish repaying the current advance first', 'Earnings not steady for 6 weeks yet', 'Above the ₹3,000 limit'].map((r) => <span key={r} className="tag x clk" onClick={() => setReason(r)}>{r}</span>)}
      </div>
      <Field label="Reason the partner will see"><textarea className="inp" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
      <div className="s m">Offer a smaller amount instead? They can ask again with a lower figure.</div>
    </Modal>
  </>;
}
