/** 6 · Admin partners and pricing. */
import React, { useState } from 'react';
import { Av, Check, I, Modal, PageHead, Pager, Tabs, Toggle, useAdmin } from '../shell';
import { services } from '@/data/decisions';
import { useStore, patchPartner, update, type Partner } from './store';
import { partnerTag, TLink } from './ui';

type F = 'all' | 'online' | 'pending' | 'suspended';
const DOCS = ['Aadhaar and PAN', 'Police verification', 'Training completed'];

export function PartnersPage() {
  const { go, toast } = useAdmin();
  const partners = useStore((s) => s.partners);
  const [f, setF] = useState<F>('all');
  const [selId, setSelId] = useState('sd');
  const [confirm, setConfirm] = useState<null | 'suspend' | 'reject'>(null);
  const [live, setLive] = useState<Record<string, boolean>>({ general: true, kitchenBath: true, dishes: true, laundry: true, custom: false });

  const pending = partners.filter((p) => p.status === 'pending').length;
  const suspended = partners.filter((p) => p.status === 'suspended').length;
  const online = 37 + partners.filter((p) => p.status === 'online' || p.status === 'job').length - 3;
  const rows = partners.filter((p) =>
    f === 'all' ? true : f === 'online' ? p.status === 'online' || p.status === 'job' : p.status === f);
  const sel = partners.find((p) => p.id === selId) ?? partners[0];
  const docsDone = sel.docs.filter(Boolean).length;

  const clickRow = (p: Partner) => (p.id === selId ? go('partnerDetail', { id: p.id }) : setSelId(p.id));

  const approve = () => {
    if (docsDone < 3) { toast(`Tick all 3 checks first · ${docsDone} of 3 done`); return; }
    patchPartner(sel.id, { status: 'online', rating: undefined });
    toast(`${sel.name} approved · can take jobs from today`);
  };

  return (
    <>
      <PageHead title="Partners" sub={`${52 + partners.filter((p) => p.status !== 'pending' && p.status !== 'suspended').length - 4} active · ${pending} waiting for approval`}
        actions={<>
          <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast('Exported partners.csv')}>Export</button>
          <button className="btn" style={{ padding: '10px 16px' }} onClick={() => go('signups')}>Add partner</button>
        </>} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ padding: '14px 8px 4px' }}>
          <div style={{ padding: '0 10px 8px' }}>
            <Tabs value={f} onChange={setF} items={[
              { key: 'all', label: 'All 55' }, { key: 'online', label: `Online ${online}` },
              { key: 'pending', label: `Pending ${pending}` }, { key: 'suspended', label: `Suspended ${suspended}` }]} />
          </div>
          <table>
            <thead><tr><th>Partner</th><th>Area</th><th>Status</th><th>Rating</th><th>Jobs / week</th><th>Documents</th><th /></tr></thead>
            <tbody>
              {rows.map((p) => {
                const d = p.docs.filter(Boolean).length;
                return (
                  <tr key={p.id} className="clk" style={p.id === sel.id ? { background: 'var(--mint)' } : undefined} onClick={() => clickRow(p)} title="Click to preview, click again to open">
                    <td><span className="lft"><Av sm face={p.face} /><b>{p.name}</b></span></td>
                    <td>{p.area}</td>
                    <td>{partnerTag[p.status]}</td>
                    {p.rating ? <td>{p.rating}</td> : <td className="m">New</td>}
                    {p.jobs ? <td>{p.jobs}</td> : <td className="m">0</td>}
                    <td>{d === 3 ? <span className="tag n">Verified</span> : <span className="tag">{d} of 3</span>}</td>
                    <td style={{ width: 24 }}><span className="m clk" onClick={(e) => { e.stopPropagation(); go('partnerDetail', { id: p.id }); }}><I n="chevron" style={{ width: 14, height: 14 }} /></span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pager />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="row">
              <div className="lft clk" onClick={() => go('partnerDetail', { id: sel.id })}><Av face={sel.face} /><div><div className="h2" style={{ fontSize: 15 }}>{sel.name}</div>
                <div className="s m">{sel.area} · joined {sel.joined} · {sel.rating ? `${sel.rating} rating` : 'new'}</div></div></div>
              {partnerTag[sel.status]}
            </div>
            <div className="hr" style={{ margin: '10px 0' }} />
            <div style={{ display: 'grid', gap: 7 }}>
              {DOCS.map((label, i) => (
                <div key={label} className="lft">
                  <Check on={sel.docs[i]} onChange={sel.status === 'pending' ? (v) => patchPartner(sel.id, { docs: sel.docs.map((x, k) => (k === i ? v : x)) as Partner['docs'] }) : undefined} />
                  {label}{sel.status === 'pending' && !sel.docs[i] && <span className="s m">· tick when checked</span>}
                </div>
              ))}
            </div>
            <div className="g2" style={{ marginTop: 12 }}>
              {sel.status === 'pending' ? <>
                <button className="btn" style={{ padding: 9, opacity: docsDone < 3 ? 0.6 : 1 }} onClick={approve}>Approve</button>
                <button className="btn o" style={{ padding: 9, color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setConfirm('reject')}>Reject</button>
              </> : sel.status === 'suspended' ? <>
                <button className="btn o" style={{ padding: 9 }} onClick={() => go('partnerDetail', { id: sel.id })}>View jobs</button>
                <button className="btn" style={{ padding: 9 }} onClick={() => { patchPartner(sel.id, { status: 'offline' }); toast(`${sel.name} can take jobs again`); }}>Lift suspension</button>
              </> : <>
                <button className="btn o" style={{ padding: 9 }} onClick={() => go('partnerDetail', { id: sel.id })}>View jobs</button>
                <button className="btn o" style={{ padding: 9, color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setConfirm('suspend')}>Suspend</button>
              </>}
            </div>
          </div>
          <div className="card" style={{ flex: 1, padding: '14px 8px 4px' }}>
            <div className="row" style={{ padding: '0 10px 6px' }}><span className="h2" style={{ fontSize: 15 }}>Services &amp; pricing</span><TLink onClick={() => go('services')}>Edit</TLink></div>
            <table>
              <thead><tr><th>Service</th><th>₹ / 30 min</th><th>Live</th></tr></thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <td className="clk" onClick={() => go('services', { id: s.id })}>{s.name}</td>
                    <td className="clk" onClick={() => go('services', { id: s.id })}>{s.per30}</td>
                    <td><Toggle on={live[s.id]} onChange={(v) => { setLive({ ...live, [s.id]: v }); toast(`${s.name} ${v ? 'is live' : 'hidden from customers'}`); }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal open={confirm === 'suspend'} onClose={() => setConfirm(null)} title={`Suspend ${sel.name}?`}
        actions={<>
          <button className="btn o sm" onClick={() => setConfirm(null)}>Keep active</button>
          <button className="btn r sm" onClick={() => { patchPartner(sel.id, { status: 'suspended' }); setConfirm(null); toast(`${sel.name} suspended · no new jobs`); }}>Suspend</button>
        </>}>
        <div className="m">She will not get new jobs. Jobs already booked with her go back to the team to reassign. She is told why by SMS.</div>
      </Modal>
      <Modal open={confirm === 'reject'} onClose={() => setConfirm(null)} title={`Reject ${sel.name}?`}
        actions={<>
          <button className="btn o sm" onClick={() => setConfirm(null)}>Cancel</button>
          <button className="btn r sm" onClick={() => { const n = sel.name; removePartner(sel.id); setSelId('sd'); setConfirm(null); toast(`${n}'s sign-up rejected`); }}>Reject</button>
        </>}>
        <div className="m">Her documents are kept for 30 days and then deleted. She can apply again later.</div>
      </Modal>
    </>
  );
}

/** Rejected sign-ups leave the list. */
function removePartner(id: string) {
  update((s) => ({ ...s, partners: s.partners.filter((p) => p.id !== id) }));
}
