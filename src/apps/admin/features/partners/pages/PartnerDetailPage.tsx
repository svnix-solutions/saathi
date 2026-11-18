/** Screen 91 · One partner. */
import React, { useState } from 'react';
import { Av, Button, I, Kpi, KpiGrid, Modal, Table, TableCard, Tag, TogRow, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { decisions } from '@/domain';
import { olderJobs, partnerDocs, pauseReasons, recentJobs, type JobRow, type PartnerDoc } from '../data';
import { JobsPager } from '../components/JobsPager';
import '../partners.css';

const jobColumns: TableColumn<JobRow>[] = [
  { key: 'id', label: 'ID', render: (r) => r[0] },
  { key: 'when', label: 'When', render: (r) => r[1] },
  { key: 'service', label: 'Service', render: (r) => r[2] },
  { key: 'customer', label: 'Customer', render: (r) => r[3] },
  { key: 'checkin', label: 'Check-in', render: (r) => r[4] },
  { key: 'rated', label: 'Rated', render: (r) => r[5] || <span className="m">Not rated</span> },
  { key: 'earned', label: 'Earned', render: (r) => r[6] },
];

export function PartnerDetailPage({ params }: { params: PageParams }) {
  const { toast, go, back } = useAdmin();
  const name: string = params.name ?? 'Sunita Devi';
  const short = name.split(' ')[0];
  const [paused, setPaused] = useState(false);
  const [pauseOpen, setPauseOpen] = useState(false);
  const [reason, setReason] = useState(pauseReasons[0]);
  const [doc, setDoc] = useState<PartnerDoc | null>(null);
  const [docs, setDocs] = useState(partnerDocs);
  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [page, setPage] = useState(1);
  const [can, setCan] = useState({ general: true, dishes: true, laundry: true });
  const [notes, setNotes] = useState<{ t: string; d: string }[]>([]);
  const [noteDraft, setNoteDraft] = useState('');
  const rows = page === 1 ? recentJobs : olderJobs;

  const addNote = () => { setNotes([{ t: 'just now', d: noteDraft.trim() }, ...notes]); setNoteDraft(''); };

  return <>
    <div className="row"><div><div className="lft prt-ident">
      <span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span>
      <Av face="sd" initials="SD" size={46} />
      <div><div className="h prt-page-title">{name}</div><div className="m">Partner ID {params.id ?? 'KP-0142'} · Block C · joined Oct 2026</div></div>
      {paused ? <Tag tone="r">Paused</Tag> : <Tag tone="g">On a job</Tag>}<Tag>Top rated</Tag></div></div>
      <div className="lft">
        <Button variant="outline" onClick={() => toast(`Calling ${name} on 98111 20034…`)}>Call</Button>
        <Button variant="outline" onClick={() => setMsgOpen(true)}>Message</Button>
        {paused
          ? <Button style={{ padding: '9px 16px' }} onClick={() => { setPaused(false); toast(`${short} can take jobs again`); }}>Unpause</Button>
          : <Button variant="danger-outline" onClick={() => setPauseOpen(true)}>Suspend</Button>}
      </div></div>

    {paused && <div className="card s prt-paused"><b>Paused.</b> {short} gets no new jobs. Reason: {reason}. Her current job finishes as normal.</div>}

    <KpiGrid>
      <Kpi label="Customer rating" value="4.8" onClick={() => go('ratings')} />
      <Kpi label="Arrived on time" value="96%" />
      <Kpi label="Jobs finished" value="99%" />
      <Kpi label="Earned this week" value="₹2,846" onClick={() => go('payouts')} />
    </KpiGrid>

    <div className="prt-body prt-body-detail">
      <div className="card prt-panel">
        <div className="h2 prt-title">Profile</div>
        <div className="prt-list">
          <div className="row"><span className="m">Mobile</span><b>98111 20034</b></div>
          <div className="row"><span className="m">Email</span><b>sunita.devi@example.com</b></div>
          <div className="row"><span className="m">Languages</span><b>Hindi, Punjabi</b></div>
          <div className="row"><span className="m">Emergency contact</span><b>Ravi · 98111 45678</b></div>
        </div>
        <div className="hr" /><div className="h2">Documents</div>
        <div className="prt-list">
          {docs.map((d) => (
            <div className="row clk" key={d.label} onClick={() => setDoc(d)}><span className="m prt-dotted">{d.label}</span><b><Tag tone={d.ok ? 'n' : 'y'}>{d.status}</Tag></b></div>))}
        </div>
        <div className="hr" /><div className="h2">References</div>
        <div className="s m">Kamla Devi (neighbour) and Ramesh Kumar (past employer), both confirmed by code.</div>
      </div>

      <TableCard title="Recent jobs" right={<span className="s m">142 in total</span>}
        footer={<JobsPager page={page} onPage={setPage} onUnavailable={() => toast('Older jobs are not in this prototype')} />}>
        <Table columns={jobColumns} rows={rows} rowKey={(r) => r[0]} onRowClick={(r) => go('assign', { id: r[0].slice(1) })} />
      </TableCard>

      <div className="prt-side">
        <div className="card">
          <div className="h2 prt-title prt-title-gap">Can be sent for</div>
          <div className="prt-list-8">
            <TogRow label="General cleaning" on={can.general} onChange={(v) => { setCan({ ...can, general: v }); toast(v ? 'Can be sent for General cleaning' : 'No more General cleaning jobs'); }} />
            <TogRow label="Dishes & meal prep" on={can.dishes} onChange={(v) => { setCan({ ...can, dishes: v }); toast(v ? 'Can be sent for Dishes & meal prep' : 'No more Dishes & meal prep jobs'); }} />
            <TogRow label="Laundry & organizing" on={can.laundry} onChange={(v) => { setCan({ ...can, laundry: v }); toast(v ? 'Can be sent for Laundry & organizing' : 'No more Laundry jobs'); }} />
            <div className="row"><span>Kitchen &amp; bathroom scrub</span><span className="s m clk prt-dotted" onClick={() => toast(`Lesson 3 reminder sent to ${short}`)}>Needs lesson 3</span></div>
          </div>
        </div>
        <div className="card prt-panel prt-fill">
          <div className="h2 prt-title">Notes and problems</div>
          <div className="s prt-list-8">
            {notes.map((n, i) => <React.Fragment key={i}><div><b>Note</b><div className="m">{n.d} · {n.t}</div></div><div className="hr" /></React.Fragment>)}
            <div className="clk" onClick={() => go('ratings')}><b>Review contested</b><div className="m">#1996 · &quot;Balcony was missed&quot; · 8 Nov</div></div><div className="hr" />
            <div><b>Favourite of 12 customers</b><div className="m">Monthly plan helper for Nitin K.</div></div><div className="hr" />
            <div><b>Works</b><div className="m">Mon to Sat · mornings and midday</div></div>
          </div>
          <div className="lft end prt-note-row">
            <input className="inp prt-note-input" placeholder="Add a note" value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && noteDraft.trim()) addNote(); }} />
            <Button size="sm" onClick={() => { if (!noteDraft.trim()) return; addNote(); toast('Note added'); }}>Add</Button>
          </div>
        </div>
      </div>
    </div>

    <Modal open={!!doc} onClose={() => setDoc(null)} title={doc?.label ?? ''}
      actions={doc && <>{doc.ok
        ? <Button variant="danger-outline" size="sm" onClick={() => { setDocs((ds) => ds.map((x) => (x.label === doc.label ? { ...x, ok: false, status: 'Asked again' } : x))); setDoc(null); toast(`SMS sent to ${short}: upload ${doc.label.split(' ')[0]} again`); }}>Ask again</Button>
        : <Button variant="outline" size="sm" onClick={() => { setDoc(null); toast(`Reminder sent to ${short}`); }}>Send reminder</Button>}
        <Button size="sm" onClick={() => setDoc(null)}>Close</Button></>}>
      {doc && <>
        {!doc.label.startsWith('Training') && <div className="s prt-preview prt-preview-doc"><div><I n={doc.label.startsWith('Bank') ? 'wallet' : 'cam'} className="prt-doc-icon" /><div>{doc.label}</div><div className="m">{name}</div></div></div>}
        <div className="row"><span className="s m">Status</span><Tag tone={doc.ok ? 'n' : 'y'}>{doc.status}</Tag></div>
        <div className="s">{doc.detail}</div>
      </>}
    </Modal>

    <Modal open={pauseOpen} onClose={() => setPauseOpen(false)} title={`Pause ${name}?`}
      actions={<><Button variant="outline" size="sm" onClick={() => setPauseOpen(false)}>Keep active</Button><Button variant="danger" size="sm" onClick={() => { setPaused(true); setPauseOpen(false); toast(`${short} is paused · SMS sent with the reason`); }}>Pause partner</Button></>}>
      <div className="s m">She stops getting new jobs at once. Money already earned is still paid on {decisions.partner.payoutDay}.</div>
      <select className="inp" value={reason} onChange={(e) => setReason(e.target.value)}>
        {pauseReasons.map((r) => <option key={r}>{r}</option>)}
      </select>
    </Modal>

    <Modal open={msgOpen} onClose={() => setMsgOpen(false)} title={`Message ${short}`}
      actions={<><Button variant="outline" size="sm" onClick={() => setMsgOpen(false)}>Cancel</Button><Button size="sm" onClick={() => { if (!msg.trim()) { toast('Write a message'); return; } setMsgOpen(false); setMsg(''); toast(`Sent to ${short} in the Saathi Partner app`); }}>Send</Button></>}>
      <textarea className="inp" rows={3} placeholder="Shown in her app, read out in Hindi if she prefers" value={msg} onChange={(e) => setMsg(e.target.value)} autoFocus />
    </Modal>
  </>;
}

export default PartnerDetailPage;
