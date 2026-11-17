/** 91 One partner */
import React, { useState } from 'react';
import { Av, I, Modal, Toggle, useAdmin } from '../shell';
import { decisions } from '../../../data/decisions';

type Doc = { label: string; status: string; ok: boolean; detail: string };
const docs0: Doc[] = [
  { label: 'Aadhaar ···· 4821', status: 'Verified', ok: true, detail: 'Front and back photos checked on 14 Oct 2026 by Ops lead. Name and face match.' },
  { label: 'PAN ······234F', status: 'Verified', ok: true, detail: 'ABCDE1234F · name matches Aadhaar. Checked 14 Oct 2026.' },
  { label: 'Police verification', status: 'Till Oct 2027', ok: true, detail: 'Certificate from Sector 20 police station, issued 20 Oct 2026, valid for one year.' },
  { label: 'Bank · SBI ···· 4821', status: 'Verified', ok: true, detail: 'Account holder: Sunita Devi · IFSC SBIN0001234 · ₹1 test deposit confirmed.' },
  { label: 'Training', status: '2 of 5 lessons', ok: false, detail: 'Done: 1 Welcome and safety, 2 General cleaning. Left: 3 Kitchen & bath, 4 Laundry care, 5 Talking to customers.' },
];
const jobs = [
  ['#2041', 'Today 11:08', 'General · 1 hr', 'Nitin K.', 'On time', '4 / 5', '₹126'],
  ['#2012', '14 Nov', 'General · 1 hr', 'Nitin K.', 'On time', '5 / 5', '₹126'],
  ['#1990', '13 Nov', 'Laundry · 1.5 hr', 'Farah A.', 'On time', '5 / 5', '₹214'],
  ['#1987', '13 Nov', 'General · 1 hr', 'Nitin K.', '4 min late', '5 / 5', '₹126'],
  ['#1971', '12 Nov', 'Kitchen & bath · 2 hr', 'Meera S.', 'On time', '5 / 5', '₹412'],
  ['#1960', '12 Nov', 'Dishes · 30 min', 'Arjun P.', 'On time', '', '₹63'],
];
const older = [
  ['#1944', '11 Nov', 'General · 1 hr', 'Ritu S.', 'On time', '5 / 5', '₹126'],
  ['#1931', '11 Nov', 'Dishes · 1 hr', 'Arjun P.', 'On time', '5 / 5', '₹126'],
  ['#1920', '10 Nov', 'General · 1.5 hr', 'Nitin K.', 'On time', '4 / 5', '₹190'],
  ['#1902', '9 Nov', 'Laundry · 1 hr', 'Farah A.', '6 min late', '5 / 5', '₹142'],
  ['#1896', '8 Nov', 'General · 1 hr', 'Sameer T.', 'On time', '3 / 5', '₹126'],
  ['#1880', '8 Nov', 'General · 1 hr', 'Nitin K.', 'On time', '5 / 5', '₹126'],
];

export function PartnerDetail({ params }: { params: Record<string, any> }) {
  const { toast, go, back } = useAdmin();
  const name: string = params.name ?? 'Sunita Devi';
  const short = name.split(' ')[0];
  const [paused, setPaused] = useState(false);
  const [pauseOpen, setPauseOpen] = useState(false);
  const [reason, setReason] = useState('Low rating, needs a lesson');
  const [doc, setDoc] = useState<Doc | null>(null);
  const [docs, setDocs] = useState(docs0);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const [can, setCan] = useState({ general: true, dishes: true, laundry: true });
  const [notes, setNotes] = useState<{ t: string; d: string }[]>([]);
  const [noteDraft, setNoteDraft] = useState('');
  const rows = page === 1 ? jobs : older;

  return <>
    <div className="row"><div><div className="lft" style={{ gap: 12 }}>
      <span className="ic clk" onClick={back} aria-label="Back"><I n="back" /></span>
      <Av face="sd" initials="SD" size={46} />
      <div><div className="h" style={{ fontSize: 22 }}>{name}</div><div className="m">Partner ID {params.id ?? 'KP-0142'} · Block C · joined Oct 2026</div></div>
      {paused ? <span className="tag r">Paused</span> : <span className="tag g">On a job</span>}<span className="tag">Top rated</span></div></div>
      <div className="lft">
        <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast(`Calling ${name} on 98111 20034…`)}>Call</button>
        <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => setMsgOpen(true)}>Message</button>
        {paused
          ? <button className="btn" style={{ padding: '9px 16px' }} onClick={() => { setPaused(false); toast(`${short} can take jobs again`); }}>Unpause</button>
          : <button className="btn o" style={{ padding: '9px 16px', color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setPauseOpen(true)}>Suspend</button>}
      </div></div>

    {paused && <div className="card s" style={{ padding: '9px 12px', borderColor: 'var(--red)', background: '#fdf1ef' }}><b style={{ color: 'var(--red)' }}>Paused.</b> {short} gets no new jobs. Reason: {reason}. Her current job finishes as normal.</div>}

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
      <div className="card clk" onClick={() => go('ratings')}><div className="m">Customer rating</div><div className="stat">4.8</div></div>
      <div className="card"><div className="m">Arrived on time</div><div className="stat">96%</div></div>
      <div className="card"><div className="m">Jobs finished</div><div className="stat">99%</div></div>
      <div className="card clk" onClick={() => go('payouts')}><div className="m">Earned this week</div><div className="stat">₹2,846</div></div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '.95fr 1.4fr .95fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="h2" style={{ fontSize: 15 }}>Profile</div>
        <div style={{ display: 'grid', gap: 7 }}>
          <div className="row"><span className="m">Mobile</span><b>98111 20034</b></div>
          <div className="row"><span className="m">Email</span><b>sunita.devi@example.com</b></div>
          <div className="row"><span className="m">Languages</span><b>Hindi, Punjabi</b></div>
          <div className="row"><span className="m">Emergency contact</span><b>Ravi · 98111 45678</b></div>
        </div>
        <div className="hr" /><div className="h2">Documents</div>
        <div style={{ display: 'grid', gap: 7 }}>
          {docs.map((d) => (
            <div className="row clk" key={d.label} onClick={() => setDoc(d)}><span className="m" style={{ textDecoration: 'underline dotted' }}>{d.label}</span><b><span className={`tag ${d.ok ? 'n' : ''}`}>{d.status}</span></b></div>))}
        </div>
        <div className="hr" /><div className="h2">References</div>
        <div className="s m">Kamla Devi (neighbour) and Ramesh Kumar (past employer), both confirmed by code.</div>
      </div>

      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <div className="row" style={{ padding: '0 10px 8px' }}><span className="h2" style={{ fontSize: 15 }}>Recent jobs</span><span className="s m">142 in total</span></div>
        <table><tbody>
          <tr><th>ID</th><th>When</th><th>Service</th><th>Customer</th><th>Check-in</th><th>Rated</th><th>Earned</th></tr>
          {rows.map((r) => (
            <tr key={r[0]} className="clk" onClick={() => go('assign', { id: r[0].slice(1) })}>
              <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5] || <span className="m">Not rated</span>}</td><td>{r[6]}</td>
            </tr>))}
        </tbody></table>
        <div className="pg"><span>Page {page} of 24 · 6 rows per page</span><span>
          <span className="clk" onClick={() => setPage(1)}>‹</span>
          {[1, 2, 3].map((n) => (n === page ? <b key={n}>{n}</b> : <span key={n} className="clk" onClick={() => n <= 2 ? setPage(n) : toast('Older jobs are not in this prototype')}>{n}</span>))}
          <span className="clk" onClick={() => setPage(2)}>›</span></span></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Can be sent for</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="row"><span>General cleaning</span><Toggle on={can.general} onChange={(v) => { setCan({ ...can, general: v }); toast(v ? 'Can be sent for General cleaning' : 'No more General cleaning jobs'); }} /></div>
            <div className="row"><span>Dishes &amp; meal prep</span><Toggle on={can.dishes} onChange={(v) => { setCan({ ...can, dishes: v }); toast(v ? 'Can be sent for Dishes & meal prep' : 'No more Dishes & meal prep jobs'); }} /></div>
            <div className="row"><span>Laundry &amp; organizing</span><Toggle on={can.laundry} onChange={(v) => { setCan({ ...can, laundry: v }); toast(v ? 'Can be sent for Laundry & organizing' : 'No more Laundry jobs'); }} /></div>
            <div className="row"><span>Kitchen &amp; bathroom scrub</span><span className="s m clk" onClick={() => toast(`Lesson 3 reminder sent to ${short}`)} style={{ textDecoration: 'underline dotted' }}>Needs lesson 3</span></div>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 0 }}>Notes and problems</div>
          <div style={{ display: 'grid', gap: 8 }} className="s">
            {notes.map((n, i) => <React.Fragment key={i}><div><b>Note</b><div className="m">{n.d} · {n.t}</div></div><div className="hr" /></React.Fragment>)}
            <div className="clk" onClick={() => go('ratings')}><b>Review contested</b><div className="m">#1996 · "Balcony was missed" · 8 Nov</div></div><div className="hr" />
            <div><b>Favourite of 12 customers</b><div className="m">Monthly plan helper for Nitin K.</div></div><div className="hr" />
            <div><b>Works</b><div className="m">Mon to Sat · mornings and midday</div></div>
          </div>
          <div className="lft end" style={{ gap: 6 }}>
            <input className="inp" style={{ padding: '7px 10px' }} placeholder="Add a note" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && noteDraft.trim()) { setNotes([{ t: 'just now', d: noteDraft.trim() }, ...notes]); setNoteDraft(''); } }} />
            <button className="btn sm" onClick={() => { if (!noteDraft.trim()) return; setNotes([{ t: 'just now', d: noteDraft.trim() }, ...notes]); setNoteDraft(''); toast('Note added'); }}>Add</button>
          </div>
        </div>
      </div>
    </div>

    <Modal open={!!doc} onClose={() => setDoc(null)} title={doc?.label ?? ''}
      actions={doc && <>{doc.ok
        ? <button className="btn o sm" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => { setDocs((ds) => ds.map((x) => (x.label === doc.label ? { ...x, ok: false, status: 'Asked again' } : x))); setDoc(null); toast(`SMS sent to ${short}: upload ${doc.label.split(' ')[0]} again`); }}>Ask again</button>
        : <button className="btn o sm" onClick={() => { setDoc(null); toast(`Reminder sent to ${short}`); }}>Send reminder</button>}
        <button className="btn sm" onClick={() => setDoc(null)}>Close</button></>}>
      {doc && <>
        {!doc.label.startsWith('Training') && <div style={{ height: 170, borderRadius: 14, background: 'var(--mint)', display: 'grid', placeItems: 'center', color: 'var(--green)', textAlign: 'center' }} className="s"><div><I n={doc.label.startsWith('Bank') ? 'wallet' : 'cam'} style={{ width: 30, height: 30 }} /><div>{doc.label}</div><div className="m">{name}</div></div></div>}
        <div className="row"><span className="s m">Status</span><span className={`tag ${doc.ok ? 'n' : ''}`}>{doc.status}</span></div>
        <div className="s">{doc.detail}</div>
      </>}
    </Modal>

    <Modal open={pauseOpen} onClose={() => setPauseOpen(false)} title={`Pause ${name}?`}
      actions={<><button className="btn o sm" onClick={() => setPauseOpen(false)}>Keep active</button><button className="btn r sm" onClick={() => { setPaused(true); setPauseOpen(false); toast(`${short} is paused · SMS sent with the reason`); }}>Pause partner</button></>}>
      <div className="s m">She stops getting new jobs at once. Money already earned is still paid on {decisions.partner.payoutDay}.</div>
      <select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
        {['Low rating, needs a lesson', 'Document expired', 'Safety complaint being checked', 'Asked for a break'].map((r) => <option key={r}>{r}</option>)}
      </select>
    </Modal>

    <Modal open={msgOpen} onClose={() => setMsgOpen(false)} title={`Message ${short}`}
      actions={<><button className="btn o sm" onClick={() => setMsgOpen(false)}>Cancel</button><button className="btn sm" onClick={() => { if (!msg.trim()) { toast('Write a message'); return; } setMsgOpen(false); setMsg(''); toast(`Sent to ${short} in the Saathi Partner app`); }}>Send</button></>}>
      <textarea className="inp" rows={3} placeholder="Shown in her app, read out in Hindi if she prefers" value={msg} onChange={(e) => setMsg(e.target.value)} autoFocus />
    </Modal>
  </>;
}
