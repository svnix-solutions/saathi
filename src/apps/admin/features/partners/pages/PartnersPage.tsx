/** Design page 6 · Admin partners and pricing. */
import React, { useState } from 'react';
import { Av, Button, Check, I, Modal, PageHead, Pager, StatusTag, TableCard, Tabs, Tag, TextLink, Toggle } from '../../../ui';
import { useAdmin } from '../../../session';
import { useStore, patchPartner, type Partner } from '../../../fixtures';
import { services } from '@/domain';
import { PARTNER_CHECKS, LIVE_SERVICES } from '../data';
import { removePartner } from '../actions';
import '../partners.css';

type Filter = 'all' | 'online' | 'pending' | 'suspended';

export function PartnersPage() {
  const { go, toast } = useAdmin();
  const partners = useStore((s) => s.partners);
  const [f, setF] = useState<Filter>('all');
  const [selId, setSelId] = useState('sd');
  const [confirm, setConfirm] = useState<null | 'suspend' | 'reject'>(null);
  const [live, setLive] = useState<Record<string, boolean>>(LIVE_SERVICES);

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
          <Button variant="outline" onClick={() => toast('Exported partners.csv')}>Export</Button>
          <Button onClick={() => go('signups')}>Add partner</Button>
        </>} />
      <div className="prt-body prt-body-partners">
        <TableCard footer={<Pager />} head={
          <div className="prt-head">
            <Tabs value={f} onChange={setF} items={[
              { key: 'all', label: 'All 55' }, { key: 'online', label: `Online ${online}` },
              { key: 'pending', label: `Pending ${pending}` }, { key: 'suspended', label: `Suspended ${suspended}` }]} />
          </div>}>
          <table>
            <thead><tr><th>Partner</th><th>Area</th><th>Status</th><th>Rating</th><th>Jobs / week</th><th>Documents</th><th /></tr></thead>
            <tbody>
              {rows.map((p) => {
                const d = p.docs.filter(Boolean).length;
                return (
                  <tr key={p.id} className={p.id === sel.id ? 'clk on' : 'clk'} onClick={() => clickRow(p)} title="Click to preview, click again to open">
                    <td><span className="lft"><Av sm face={p.face} /><b>{p.name}</b></span></td>
                    <td>{p.area}</td>
                    <td><StatusTag kind="partner" status={p.status} /></td>
                    {p.rating ? <td>{p.rating}</td> : <td className="m">New</td>}
                    {p.jobs ? <td>{p.jobs}</td> : <td className="m">0</td>}
                    <td>{d === 3 ? <Tag tone="n">Verified</Tag> : <Tag>{d} of 3</Tag>}</td>
                    <td className="prt-chev-cell">
                      <span className="m clk" role="button" aria-label={`Open ${p.name}`} onClick={(e) => { e.stopPropagation(); go('partnerDetail', { id: p.id }); }}>
                        <I n="chevron" className="prt-chev" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableCard>
        <div className="prt-side">
          <div className="card">
            <div className="row">
              <div className="lft clk" onClick={() => go('partnerDetail', { id: sel.id })}><Av face={sel.face} /><div><div className="h2 prt-title">{sel.name}</div>
                <div className="s m">{sel.area} · joined {sel.joined} · {sel.rating ? `${sel.rating} rating` : 'new'}</div></div></div>
              <StatusTag kind="partner" status={sel.status} />
            </div>
            <div className="hr prt-rule" />
            <div className="prt-list">
              {PARTNER_CHECKS.map((label, i) => (
                <div key={label} className="lft">
                  <Check on={sel.docs[i]} onChange={sel.status === 'pending' ? (v) => patchPartner(sel.id, { docs: sel.docs.map((x, k) => (k === i ? v : x)) as Partner['docs'] }) : undefined} />
                  {label}{sel.status === 'pending' && !sel.docs[i] && <span className="s m">· tick when checked</span>}
                </div>
              ))}
            </div>
            <div className="g2 prt-actions">
              {sel.status === 'pending' ? <>
                <Button size="lg" style={{ padding: 9, opacity: docsDone < 3 ? 0.6 : 1 }} onClick={approve}>Approve</Button>
                <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => setConfirm('reject')}>Reject</Button>
              </> : sel.status === 'suspended' ? <>
                <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => go('partnerDetail', { id: sel.id })}>View jobs</Button>
                <Button size="lg" style={{ padding: 9 }} onClick={() => { patchPartner(sel.id, { status: 'offline' }); toast(`${sel.name} can take jobs again`); }}>Lift suspension</Button>
              </> : <>
                <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => go('partnerDetail', { id: sel.id })}>View jobs</Button>
                <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => setConfirm('suspend')}>Suspend</Button>
              </>}
            </div>
          </div>
          <TableCard style={{ flex: 1 }} head={
            <div className="row prt-head-tight"><span className="h2 prt-title">Services &amp; pricing</span><TextLink onClick={() => go('services')}>Edit</TextLink></div>}>
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
          </TableCard>
        </div>
      </div>

      <Modal open={confirm === 'suspend'} onClose={() => setConfirm(null)} title={`Suspend ${sel.name}?`}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setConfirm(null)}>Keep active</Button>
          <Button variant="danger" size="sm" onClick={() => { patchPartner(sel.id, { status: 'suspended' }); setConfirm(null); toast(`${sel.name} suspended · no new jobs`); }}>Suspend</Button>
        </>}>
        <div className="m">She will not get new jobs. Jobs already booked with her go back to the team to reassign. She is told why by SMS.</div>
      </Modal>
      <Modal open={confirm === 'reject'} onClose={() => setConfirm(null)} title={`Reject ${sel.name}?`}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setConfirm(null)}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={() => { const n = sel.name; removePartner(sel.id); setSelId('sd'); setConfirm(null); toast(`${n}'s sign-up rejected`); }}>Reject</Button>
        </>}>
        <div className="m">Her documents are kept for 30 days and then deleted. She can apply again later.</div>
      </Modal>
    </>
  );
}

export default PartnersPage;
