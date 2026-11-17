/** 75 Ratings and quality: every low rating is a case to assign and close. */
import React, { useMemo, useState } from 'react';
import { Av, Kpi, Modal, Pager, Tabs, Tag, useAdmin, type TagTone } from '../shell';
import { BarRow, Btn, CardHead, Field, KPI_GRID } from './ui';
import { customers } from './customers';

type Status = 'Act now' | 'Calling' | 'Fixed' | 'Contested' | 'Closed';
type Case = { id: string; customer: string; partner: string; stars: number; reason: string; wants: string; status: Status; owner?: string };
const tone: Record<Status, TagTone> = { 'Act now': 'r', Calling: 'y', Fixed: 'n', Contested: 'x', Closed: 'x' };

const initialCases: Case[] = [
  { id: '2031', customer: 'Sameer T.', partner: 'Geeta K.', stars: 1, reason: 'Work unfinished', wants: 'Helper sent back', status: 'Act now' },
  { id: '2019', customer: 'Priya N.', partner: 'Anita B.', stars: 2, reason: 'Came late', wants: 'Refund ₹79', status: 'Act now' },
  { id: '2027', customer: 'Rohan G.', partner: 'Geeta K.', stars: 2, reason: 'Rude behaviour', wants: 'Call me', status: 'Calling', owner: 'Support 1' },
  { id: '2008', customer: 'Meera S.', partner: 'Meena T.', stars: 2, reason: 'Something damaged', wants: 'Call me', status: 'Calling', owner: 'Support 2' },
  { id: '2002', customer: 'Farah A.', partner: 'Lata S.', stars: 2, reason: 'Work unfinished', wants: 'Helper sent back', status: 'Fixed', owner: 'Ops lead' },
  { id: '1996', customer: 'Arjun P.', partner: 'Sunita D.', stars: 3, reason: 'Balcony missed', wants: 'Nothing asked', status: 'Contested' },
];
const reviews = [
  { id: '2041', customer: 'Nitin K.', partner: 'Sunita D.', stars: 4, text: 'Good, a little rushed at the end.' },
  { id: '2040', customer: 'Farah A.', partner: 'Sunita D.', stars: 5, text: 'Spotless, on time as always.' },
  { id: '2038', customer: 'Aisha K.', partner: 'Meena T.', stars: 5, text: 'Very careful with the plants.' },
  { id: '2036', customer: 'Ravi V.', partner: 'Rekha M.', stars: 5, text: 'Folded everything neatly.' },
  { id: '2031', customer: 'Sameer T.', partner: 'Geeta K.', stars: 1, text: 'Left halfway, kitchen not done.' },
  { id: '2029', customer: 'Kunal D.', partner: 'Geeta K.', stars: 3, text: 'OK work.' },
];
const partnerReports = [
  { id: '2033', partner: 'Kavita R.', customer: 'Rohan G.', what: 'Asked for work not booked (car wash)', status: 'Warned customer' },
  { id: '2017', partner: 'Rekha M.', customer: 'Sameer T.', what: 'Kept waiting at the gate 12 min', status: 'Open' },
];
const team = ['Support 1', 'Support 2', 'Ops lead', 'Admin'];

type View = 'low' | 'all' | 'contested' | 'partner';

export function Ratings() {
  const { go, toast } = useAdmin();
  const [view, setView] = useState<View>('low');
  const [cases, setCases] = useState(initialCases);
  const [open, setOpen] = useState<Case | null>(null);
  const [owner, setOwner] = useState(team[0]);
  const [slip, setSlip] = useState<Record<string, string>>({});

  const waiting = cases.filter((c) => c.status === 'Act now' || c.status === 'Calling').length;
  const shown = useMemo(() => view === 'contested' ? cases.filter((c) => c.status === 'Contested') : cases, [cases, view]);
  const update = (id: string, patch: Partial<Case>, msg: string) => {
    setCases((cs) => cs.map((c) => c.id === id ? { ...c, ...patch } : c)); setOpen(null); toast(msg);
  };
  const custId = (name: string) => customers.find((c) => c.name === name)?.id;

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Ratings and quality</div><div className="m">Week of 9 to 15 November</div></div>
      <Tabs value={view} onChange={setView} items={[{ key: 'low', label: 'Low ratings' }, { key: 'all', label: 'All reviews' }, { key: 'contested', label: 'Contested' }, { key: 'partner', label: 'Partner reports' }]} />
    </div>
    <div style={KPI_GRID}>
      <Kpi label="Average rating" value="4.6" />
      <Kpi label="Visits rated" value="438" sub="of 812" />
      <Kpi label="1 and 2 star ratings" value="9" red onClick={() => setView('low')} />
      <Kpi label="Waiting for us to act" value={waiting} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        {view === 'all' ? <>
          <CardHead title="All reviews" right={<span className="s m">Newest first</span>} />
          <table>
            <thead><tr><th>Visit</th><th>Customer</th><th>Partner</th><th>Stars</th><th>Review</th></tr></thead>
            <tbody>{reviews.map((r) => (
              <tr key={r.id} className="clk" onClick={() => { const id = custId(r.customer); id && go('customerDetail', { id }); }}>
                <td>#{r.id}</td><td>{r.customer}</td><td>{r.partner}</td><td><b>{r.stars}</b> / 5</td><td className="m">{r.text}</td></tr>))}
            </tbody>
          </table>
        </> : view === 'partner' ? <>
          <CardHead title="Partner reports about customers" right={<span className="s m">Partners can report a visit too</span>} />
          <table>
            <thead><tr><th>Visit</th><th>Partner</th><th>Customer</th><th>What happened</th><th>Status</th></tr></thead>
            <tbody>{partnerReports.map((r) => (
              <tr key={r.id} className="clk" onClick={() => toast(`Report on #${r.id} opened in Support`)}>
                <td>#{r.id}</td><td>{r.partner}</td><td>{r.customer}</td><td>{r.what}</td><td><Tag tone={r.status === 'Open' ? 'y' : 'n'}>{r.status}</Tag></td></tr>))}
            </tbody>
          </table>
        </> : <>
          <CardHead title={view === 'contested' ? 'Contested ratings' : 'Low ratings to close'} right={<span className="s m">Oldest first · click a row to act</span>} />
          <table>
            <thead><tr><th>Visit</th><th>Customer</th><th>Partner</th><th>Stars</th><th>Reason</th><th>Customer wants</th><th>Status</th></tr></thead>
            <tbody>{shown.map((c) => (
              <tr key={c.id} className="clk" onClick={() => { setOwner(c.owner ?? team[0]); setOpen(c); }}>
                <td>#{c.id}</td><td>{c.customer}</td><td>{c.partner}</td><td><b>{c.stars}</b> / 5</td><td>{c.reason}</td>
                <td className={c.wants === 'Nothing asked' ? 'm' : ''}>{c.wants}</td><td><Tag tone={tone[c.status]}>{c.status}</Tag></td></tr>))}
              {!shown.length && <tr><td colSpan={7} className="m">Nothing here.</td></tr>}
            </tbody>
          </table>
        </>}
        <Pager text="Page 1 of 3 · 6 rows per page" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Partners slipping</div>
          <div style={{ display: 'grid', gap: 9 }}>
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'gk', name: 'Geeta K.' })}><Av sm face="gk" /><div><b>Geeta K.</b><div className="s m">3.1 · 3 complaints</div></div></div><Tag tone="r">Suspended</Tag></div><div className="hr" />
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'ab', name: 'Anita B.' })}><Av sm face="ab" /><div><b>Anita B.</b><div className="s m">4.1 · late 4 times</div></div></div>
              {slip.ab ? <Tag tone="n">{slip.ab}</Tag> : <Btn o sm onClick={() => { setSlip((s) => ({ ...s, ab: 'Lesson booked' })); toast('Punctuality lesson booked for Anita B., Thursday 4 pm'); }}>Give lesson</Btn>}</div><div className="hr" />
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'mt', name: 'Meena T.' })}><Av sm face="mt" /><div><b>Meena T.</b><div className="s m">4.3 · down from 4.6</div></div></div>
              {slip.mt ? <Tag tone="n">{slip.mt}</Tag> : <Btn o sm onClick={() => { setSlip((s) => ({ ...s, mt: 'Called' })); toast('Calling Meena T.…'); }}>Call</Btn>}</div>
          </div>
          <div className="s m" style={{ marginTop: 8 }}>Steps: call, then lesson, then pause. Below 4.2 is caught here.</div>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 10 }}>Why ratings were low</div>
          <div style={{ display: 'grid', gap: 9 }} className="s">
            <BarRow label="Work unfinished" value="4" pct={100} />
            <BarRow label="Came late" value="3" pct={75} />
            <BarRow label="Rude behaviour" value="1" pct={25} />
            <BarRow label="Something damaged" value="1" pct={25} />
          </div>
        </div>
      </div>
    </div>

    {open && (
      <Modal open onClose={() => setOpen(null)} title={`Case #${open.id} · ${open.stars} star${open.stars > 1 ? 's' : ''}`}
        actions={<>
          <Btn o onClick={() => update(open.id, { status: 'Contested' }, `#${open.id} marked contested`)}>Mark contested</Btn>
          <Btn o onClick={() => update(open.id, { status: 'Calling', owner }, `#${open.id} assigned to ${owner}`)}>Assign</Btn>
          <Btn onClick={() => update(open.id, { status: 'Closed' }, `Case #${open.id} closed`)}>Close case</Btn>
        </>}>
        <div className="card" style={{ display: 'grid', gap: 6 }}>
          <div className="row"><span className="m">Customer</span><b className="lnk" onClick={() => { const id = custId(open.customer); setOpen(null); id && go('customerDetail', { id }); }}>{open.customer}</b></div>
          <div className="row"><span className="m">Partner</span><b>{open.partner}</b></div>
          <div className="row"><span className="m">Reason</span><b>{open.reason}</b></div>
          <div className="row"><span className="m">Customer wants</span><b>{open.wants}</b></div>
          <div className="row"><span className="m">Status</span><Tag tone={tone[open.status]}>{open.status}</Tag></div>
        </div>
        <Field label="Assign to"><select className="inp" value={owner} onChange={(e) => setOwner(e.target.value)}>{team.map((t) => <option key={t}>{t}</option>)}</select></Field>
        <div className="lft" style={{ gap: 8 }}>
          <Btn o sm onClick={() => update(open.id, { status: 'Fixed', owner }, `${open.partner.split(' ')[0]}'s replacement is on the way for #${open.id}`)}>Send helper back</Btn>
          <Btn o sm onClick={() => update(open.id, { status: 'Fixed', owner }, `₹79 refunded to ${open.customer}'s wallet`)}>Refund ₹79</Btn>
          <Btn o sm onClick={() => toast(`Calling ${open.customer}…`)}>Call customer</Btn>
        </div>
      </Modal>
    )}
  </>;
}
