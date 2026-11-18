/** 88 Partner sign-ups */
import React, { useState } from 'react';
import { I, Modal, Tabs, useAdmin } from '../shell';
import { docType, profession, requiredDocs, specializations, type ProfessionId } from '../../../data/professions';

type Status = 'check' | 'filling' | 'sent' | 'approved' | 'rejected';
type Ref = { name: string; phone: string; rel: string; ok: boolean };
type Signup = {
  id: string; name: string; wait: string; late?: boolean; zone: string; note: string; status: Status;
  phone: string; email: string; lang: string; aadhaar: string; pan: string; refs: Ref[]; checks: boolean[]; reason?: string;
  /** the work she signed up for; certificates come from the document rules on the professions page */
  prof: ProfessionId; specs: string[];
};
/** Certificates the work needs, beyond Aadhaar and PAN. */
const certsOf = (s: Signup) => requiredDocs(s.prof, s.specs).filter((r) => r.doc !== 'aadhaar' && r.doc !== 'pan').map((r) => ({ ...docType(r.doc), required: r.required }));
const workOf = (s: Signup) => [profession(s.prof).name, ...s.specs.map((id) => specializations.find((x) => x.id === id)?.name)].join(' · ');

const refsSunita: Ref[] = [
  { name: 'Kamla Devi', phone: '+91 98220 14567', rel: 'neighbour', ok: true },
  { name: 'Ramesh Kumar', phone: '+91 98765 43210', rel: 'past employer', ok: true },
];
const signups0: Signup[] = [
  { id: 'sunita', prof: 'house_help', specs: ['deep_clean'], name: 'Sunita Devi', wait: '2 hr', zone: 'Block C', note: 'all 5 steps done', status: 'check', phone: '+91 98111 20034', email: 'sunita.devi@example.com', lang: 'Hindi', aadhaar: '4821', pan: 'ABCDE1234F', refs: refsSunita, checks: [true, true, true, false] },
  { id: 'pooja', prof: 'nurse', specs: ['elderly'], name: 'Pooja Verma', wait: '5 hr', zone: 'Block A', note: 'all 5 steps done', status: 'check', phone: '+91 98990 31245', email: 'pooja.v@example.com', lang: 'Hindi, English', aadhaar: '7310', pan: 'BQKPV5521L', refs: [{ name: 'Geeta Rawat', phone: '+91 99100 22341', rel: 'neighbour', ok: true }, { name: 'Anil Mehra', phone: '+91 98110 77812', rel: 'past employer', ok: true }], checks: [false, false, false, false] },
  { id: 'lata', prof: 'house_help', specs: [], name: 'Lata Sharma', wait: '1 day', late: true, zone: 'Block D', note: 'PAN photo sent again', status: 'check', phone: '+91 97170 55420', email: 'lata.sharma@example.com', lang: 'Hindi', aadhaar: '1196', pan: 'CMRPS8830K', refs: [{ name: 'Usha Rani', phone: '+91 98180 66120', rel: 'neighbour', ok: true }, { name: 'Vikas Jain', phone: '+91 98731 40021', rel: 'past employer', ok: true }], checks: [false, true, true, false] },
  { id: 'meena', prof: 'house_help', specs: ['cooking'], name: 'Meena Kumari', wait: '', zone: 'Block B', note: '1 of 2 references confirmed', status: 'filling', phone: '+91 96500 11872', email: 'meena.k@example.com', lang: 'Hindi', aadhaar: '5502', pan: '—', refs: [{ name: 'Savita', phone: '+91 98100 22110', rel: 'neighbour', ok: true }, { name: 'Raj Malhotra', phone: '+91 98111 99001', rel: 'past employer', ok: false }], checks: [false, false, false, false] },
  { id: 'asha', prof: 'barber', specs: ['men', 'kids'], name: 'Asha Rani', wait: '', zone: 'Sector 18', note: 'Aadhaar back side missing', status: 'filling', phone: '+91 95600 77341', email: 'asha.rani@example.com', lang: 'Hindi, Punjabi', aadhaar: '—', pan: 'DLPPR2210M', refs: [{ name: 'Kusum', phone: '+91 98720 31010', rel: 'neighbour', ok: true }, { name: 'Neha Arora', phone: '+91 99580 11223', rel: 'past employer', ok: true }], checks: [false, false, false, false] },
  { id: 'rita', prof: 'home_service', specs: ['electrician'], name: 'Rita Kaur', wait: '', zone: 'Sector 21', note: 'Asked: photo not clear', status: 'sent', reason: 'Photo not clear', phone: '+91 98880 41001', email: 'rita.kaur@example.com', lang: 'Punjabi, Hindi', aadhaar: '6634', pan: 'EKKPK4410Q', refs: refsSunita, checks: [false, true, true, false] },
];
const checkLabels = ['Photos are clear and uncut', 'Name matches on both cards', 'Face matches the profile photo', 'Police verification started'];
const reasons = ['Photo not clear', 'Name does not match', 'Card cut off', 'Wrong document'];
const steps = { meena: 'Step 2 of 4', asha: 'Step 3 of 4' } as Record<string, string>;

export function Signups(_: { params: Record<string, any> }) {
  const { toast, go } = useAdmin();
  const [list, setList] = useState(signups0);
  const [tab, setTab] = useState<'check' | 'filling' | 'sent' | 'approved'>('check');
  const [selId, setSelId] = useState('sunita');
  const [why, setWhy] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [reject, setReject] = useState(false);
  const [approvedWeek, setApprovedWeek] = useState(6);
  const sel = list.find((s) => s.id === selId);

  const count = (st: Status) => list.filter((s) => s.status === st).length;
  const update = (id: string, patch: Partial<Signup>) => setList((l) => l.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const nextAfter = (id: string) => list.find((s) => s.status === 'check' && s.id !== id)?.id ?? id;
  const pick = (id: string) => { setSelId(id); setWhy([]); };

  const approve = () => {
    if (!sel) return;
    if (sel.status !== 'check') { toast(sel.status === 'filling' ? `${sel.name} has not finished signing up` : `${sel.name} is not waiting for a check`); return; }
    if (!sel.checks.slice(0, 3).every(Boolean)) { toast('Tick the first three checks before approving'); return; }
    update(sel.id, { status: 'approved', note: 'Approved today' }); setApprovedWeek((n) => n + 1);
    toast(`${sel.name} approved · SMS sent, Home is open for her`); pick(nextAfter(sel.id));
  };
  const askAgain = () => {
    if (!sel) return;
    if (!why.length) { toast('Pick what is wrong first, under “If something is wrong”'); return; }
    update(sel.id, { status: 'sent', note: 'Asked: ' + why.join(', ').toLowerCase(), reason: why.join(', ') });
    toast(`SMS sent to ${sel.name}: ${why.join(', ').toLowerCase()}`); pick(nextAfter(sel.id));
  };

  const Item = ({ s }: { s: Signup }) => {
    const dim = s.status !== 'check';
    return (
      <div className={`card clk ${s.id === selId ? 'sel' : ''}`} style={{ padding: '9px 11px', ...(dim && s.id !== selId ? { opacity: .7 } : {}) }} onClick={() => pick(s.id)}>
        <div className="row"><b>{s.name}</b>
          {s.status === 'check' ? <span className={`tag ${s.late ? 'r' : ''}`}>{s.wait}</span>
            : s.status === 'filling' ? <span className="tag x">{steps[s.id] ?? 'Filling in'}</span>
              : s.status === 'approved' ? <span className="tag g">Approved</span>
                : s.status === 'rejected' ? <span className="tag r">Rejected</span> : <span className="tag">Sent back</span>}
        </div>
        <div className="s m">{s.zone} · {s.note}</div>
      </div>);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Partner sign-ups</div><div className="m">{count('check')} to check · {count('filling')} still filling in · usual time to approve: 1 working day</div></div>
      <Tabs value={tab} onChange={setTab} items={[
        { key: 'check', label: `To check ${count('check')}` }, { key: 'filling', label: `Filling in ${count('filling')}` },
        { key: 'sent', label: `Sent back ${count('sent')}` }, { key: 'approved', label: `Approved this week ${approvedWeek}` }]} /></div>
    <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tab === 'check' && <>
          <div className="h2" style={{ fontSize: 15 }}>Waiting for a check</div>
          {list.filter((s) => s.status === 'check').map((s) => <Item key={s.id} s={s} />)}
          {!count('check') && <div className="s m">All caught up.</div>}
          <div className="h2" style={{ fontSize: 15, marginTop: 6 }}>Still filling in</div>
          {list.filter((s) => s.status === 'filling').map((s) => <Item key={s.id} s={s} />)}
        </>}
        {tab === 'filling' && <><div className="h2" style={{ fontSize: 15 }}>Still filling in</div>{list.filter((s) => s.status === 'filling').map((s) => <Item key={s.id} s={s} />)}</>}
        {tab === 'sent' && <><div className="h2" style={{ fontSize: 15 }}>Sent back</div>{list.filter((s) => s.status === 'sent' || s.status === 'rejected').map((s) => <Item key={s.id} s={s} />)}</>}
        {tab === 'approved' && <><div className="h2" style={{ fontSize: 15 }}>Approved</div>
          {list.filter((s) => s.status === 'approved').map((s) => <Item key={s.id} s={s} />)}
          <div className="s m">{approvedWeek - count('approved')} more earlier this week. <span className="clk" style={{ color: 'var(--green)', fontWeight: 700 }} onClick={() => go('partners')}>See all partners</span></div></>}
        <div className="s m end">Oldest first. Partners cannot see Home or take jobs until approved.</div>
      </div>

      {sel ? <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div className="row"><div><div className="h2" style={{ fontSize: 16 }}>{sel.name}</div><div className="s m">{sel.phone} · {sel.email} · {sel.zone} · {sel.lang}</div><div className="s"><b>Work:</b> {workOf(sel)}</div></div><span className="tag n">Mobile verified</span></div>
        <div className="hr" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {['Aadhaar front', 'Aadhaar back', 'PAN card', ...certsOf(sel).map((c) => c.name)].map((d) => {
            const missing = (d === 'Aadhaar back' && sel.id === 'asha') || (d === 'PAN card' && sel.id === 'meena');
            return (
              <div key={d} className="s clk" onClick={() => missing ? toast(`${d} not uploaded yet`) : setPhoto(d)}
                style={{ height: certsOf(sel).length ? 72 : 92, borderRadius: 11, background: missing ? 'var(--white)' : 'var(--mint)', border: missing ? '1.5px dashed var(--line)' : 0, display: 'grid', placeItems: 'center', color: missing ? 'var(--mut)' : 'var(--green)', textAlign: 'center' }}>
                <div><I n="cam" /><div>{d}</div>{missing && <div>Not uploaded</div>}</div>
              </div>);
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card" style={{ padding: '9px 11px' }}><div className="s m">Aadhaar</div><b style={{ letterSpacing: '.1em' }}>XXXX XXXX {sel.aadhaar}</b><div className="s m">Name on card: {sel.name}</div></div>
          <div className="card" style={{ padding: '9px 11px' }}><div className="s m">PAN</div><b style={{ letterSpacing: '.1em' }}>{sel.pan}</b><div className="s m">Name on card: {sel.name}</div></div>
          {certsOf(sel).map((c) => (
            <div key={c.id} className="card" style={{ padding: '9px 11px' }}><div className="s m">{c.name}{!c.required && ' · optional'}</div>
              <b style={{ letterSpacing: c.asksNumber ? '.1em' : undefined }}>{c.asksNumber ? (c.id === 'nursing_registration' ? 'DNC-2019-04417' : 'WM-DL-88213') : 'Uploaded'}</b>
              <div className="s m">{c.asksExpiry ? 'Valid till Mar 2028' : c.help}</div></div>))}
        </div>
        <div className="h2">Checks</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }} className="s">
          {checkLabels.map((c, i) => (
            <div key={c} className="lft clk" onClick={() => update(sel.id, { checks: sel.checks.map((v, j) => (j === i ? !v : v)) })}>
              <span className={`cb ${sel.checks[i] ? 'on' : ''}`}>{sel.checks[i] && <I n="check" />}</span>{c}
            </div>))}
        </div>
        {sel.status === 'sent' && <div className="card s" style={{ padding: '9px 11px', background: 'var(--yellow)', border: 0 }}><b>Sent back:</b> {sel.reason}. Waiting for the new photo.</div>}
        {sel.status === 'approved' && <div className="card sel s" style={{ padding: '9px 11px' }}><b>Approved.</b> {sel.name} can now see Home and take jobs.</div>}
        <div className="g2 end"><button className="btn o" style={{ padding: 9 }} onClick={askAgain}>Ask for a photo again</button><button className="btn" style={{ padding: 10, opacity: sel.status === 'check' ? 1 : .55 }} onClick={approve}>Approve partner</button></div>
        <div className="s m">Approving sends an SMS and opens Home for the partner. Only the last 4 Aadhaar digits are kept.</div>
      </div> : <div className="card m">Pick a sign-up on the left.</div>}

      {sel && <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card">
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>References</div>
          <div style={{ display: 'grid', gap: 9 }}>
            {sel.refs.map((r, i) => (
              <React.Fragment key={r.name}>{i > 0 && <div className="hr" />}
                <div className="row"><div><b>{r.name}</b><div className="s m">{r.phone} · {r.rel}</div></div>{r.ok ? <span className="tag n">Code confirmed</span> : <span className="tag">Waiting for code</span>}</div>
              </React.Fragment>))}
          </div>
          <button className="btn o" style={{ padding: 8, marginTop: 10, width: '100%' }} onClick={() => toast(`Calling ${sel.refs[0].name} on ${sel.refs[0].phone}…`)}>Call a reference</button>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15 }}>If something is wrong</div>
          <div className="lft" style={{ flexWrap: 'wrap', gap: 6 }}>
            {reasons.map((r) => {
              const on = why.includes(r);
              return <span key={r} className={`pill s clk ${on ? 'sel' : ''}`} style={{ padding: '6px 10px', ...(on ? { borderColor: 'var(--green)', background: 'var(--mint)', color: 'var(--green)' } : {}) }}
                onClick={() => setWhy((w) => (on ? w.filter((x) => x !== r) : [...w, r]))}>{r}</span>;
            })}
          </div>
          <div className="s m">The partner gets an SMS with the reason and uploads only that photo again.</div>
          <button className="btn o end" style={{ padding: 9, color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setReject(true)}>Reject application</button>
        </div>
      </div>}
    </div>

    <Modal open={!!photo} onClose={() => setPhoto(null)} title={`${photo} · ${sel?.name}`} actions={<><button className="btn o sm" onClick={() => { setPhoto(null); setWhy((w) => (w.includes('Photo not clear') ? w : [...w, 'Photo not clear'])); }}>Not clear</button><button className="btn sm" onClick={() => setPhoto(null)}>Looks fine</button></>}>
      <div style={{ height: 220, borderRadius: 14, background: 'var(--mint)', display: 'grid', placeItems: 'center', color: 'var(--green)', textAlign: 'center' }} className="s">
        <div><I n="cam" style={{ width: 34, height: 34 }} /><div style={{ marginTop: 6 }}>{photo}</div><div className="m">{photo === 'PAN card' ? sel?.pan : photo?.startsWith('Aadhaar') ? `XXXX XXXX ${sel?.aadhaar}` : 'Certificate'} · {sel?.name}</div></div>
      </div>
      <div className="s m">Check the photo is sharp, all four corners show, and the name matches the details. A certificate must also show the course or council.</div>
    </Modal>
    <Modal open={reject} onClose={() => setReject(false)} title={`Reject ${sel?.name}?`}
      actions={<><button className="btn o sm" onClick={() => setReject(false)}>Keep</button><button className="btn r sm" onClick={() => {
        if (sel) { update(sel.id, { status: 'rejected', note: 'Rejected' }); toast(`${sel.name} rejected · SMS sent`); pick(nextAfter(sel.id)); }
        setReject(false);
      }}>Reject application</button></>}>
      <div className="s">She will not be able to sign up again with the same Aadhaar for 90 days. Use “Ask for a photo again” if only a photo is wrong.</div>
    </Modal>
  </>;
}
