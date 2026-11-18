/** Screen 75 · Ratings and quality: every low rating is a case to assign and close. */
import React, { useMemo, useState } from 'react';
import { Av, BarRow, Button, CardHead, Field, Kpi, KpiGrid, Modal, PageHead, Pager, Table, TableCard, Tabs, Tag, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { customerIdByName } from '../../customers';
import {
  caseOwners, caseTone, initialCases, lowRatingReasons, partnerReports, reviews,
  type PartnerReport, type RatingCase, type Review,
} from '../data';
import '../quality.css';

type View = 'low' | 'all' | 'contested' | 'partner';

export function RatingsPage() {
  const { go, toast } = useAdmin();
  const [view, setView] = useState<View>('low');
  const [cases, setCases] = useState(initialCases);
  const [open, setOpen] = useState<RatingCase | null>(null);
  const [owner, setOwner] = useState(caseOwners[0]);
  const [slip, setSlip] = useState<Record<string, string>>({});

  const waiting = cases.filter((c) => c.status === 'Act now' || c.status === 'Calling').length;
  const shown = useMemo(() => view === 'contested' ? cases.filter((c) => c.status === 'Contested') : cases, [cases, view]);
  const update = (id: string, patch: Partial<RatingCase>, msg: string) => {
    setCases((cs) => cs.map((c) => c.id === id ? { ...c, ...patch } : c)); setOpen(null); toast(msg);
  };
  const openCustomer = (name: string) => { const id = customerIdByName(name); if (id) go('customerDetail', { id }); };

  const reviewColumns: TableColumn<Review>[] = [
    { key: 'visit', label: 'Visit', render: (r) => `#${r.id}` },
    { key: 'customer', label: 'Customer', render: (r) => r.customer },
    { key: 'partner', label: 'Partner', render: (r) => r.partner },
    { key: 'stars', label: 'Stars', render: (r) => <><b>{r.stars}</b> / 5</> },
    { key: 'review', label: 'Review', cell: () => ({ className: 'm' }), render: (r) => r.text },
  ];
  const reportColumns: TableColumn<PartnerReport>[] = [
    { key: 'visit', label: 'Visit', render: (r) => `#${r.id}` },
    { key: 'partner', label: 'Partner', render: (r) => r.partner },
    { key: 'customer', label: 'Customer', render: (r) => r.customer },
    { key: 'what', label: 'What happened', render: (r) => r.what },
    { key: 'status', label: 'Status', render: (r) => <Tag tone={r.status === 'Open' ? 'y' : 'n'}>{r.status}</Tag> },
  ];

  return <>
    <PageHead title="Ratings and quality" sub="Week of 9 to 15 November"
      actions={<Tabs value={view} onChange={setView} items={[{ key: 'low', label: 'Low ratings' }, { key: 'all', label: 'All reviews' }, { key: 'contested', label: 'Contested' }, { key: 'partner', label: 'Partner reports' }]} />} />
    <KpiGrid>
      <Kpi label="Average rating" value="4.6" />
      <Kpi label="Visits rated" value="438" sub="of 812" />
      <Kpi label="1 and 2 star ratings" value="9" tone="alert" onClick={() => setView('low')} />
      <Kpi label="Waiting for us to act" value={waiting} />
    </KpiGrid>
    <div className="qua-body qua-body-ratings">
      <TableCard footer={<Pager text="Page 1 of 3 · 6 rows per page" />}>
        {view === 'all' ? <>
          <CardHead title="All reviews" right={<span className="s m">Newest first</span>} />
          <Table columns={reviewColumns} rows={reviews} rowKey={(r) => r.id} onRowClick={(r) => openCustomer(r.customer)} />
        </> : view === 'partner' ? <>
          <CardHead title="Partner reports about customers" right={<span className="s m">Partners can report a visit too</span>} />
          <Table columns={reportColumns} rows={partnerReports} rowKey={(r) => r.id} onRowClick={(r) => toast(`Report on #${r.id} opened in Support`)} />
        </> : <>
          <CardHead title={view === 'contested' ? 'Contested ratings' : 'Low ratings to close'} right={<span className="s m">Oldest first · click a row to act</span>} />
          <table>
            <thead><tr><th>Visit</th><th>Customer</th><th>Partner</th><th>Stars</th><th>Reason</th><th>Customer wants</th><th>Status</th></tr></thead>
            <tbody>{shown.map((c) => (
              <tr key={c.id} className="clk" onClick={() => { setOwner(c.owner ?? caseOwners[0]); setOpen(c); }}>
                <td>#{c.id}</td><td>{c.customer}</td><td>{c.partner}</td><td><b>{c.stars}</b> / 5</td><td>{c.reason}</td>
                <td className={c.wants === 'Nothing asked' ? 'm' : ''}>{c.wants}</td><td><Tag tone={caseTone[c.status]}>{c.status}</Tag></td></tr>))}
              {!shown.length && <tr><td colSpan={7} className="m">Nothing here.</td></tr>}
            </tbody>
          </table>
        </>}
      </TableCard>
      <div className="qua-side">
        <div className="card">
          <div className="h2 qua-title qua-title-gap">Partners slipping</div>
          <div className="qua-list-9">
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'gk', name: 'Geeta K.' })}><Av sm face="gk" /><div><b>Geeta K.</b><div className="s m">3.1 · 3 complaints</div></div></div><Tag tone="r">Suspended</Tag></div><div className="hr" />
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'ab', name: 'Anita B.' })}><Av sm face="ab" /><div><b>Anita B.</b><div className="s m">4.1 · late 4 times</div></div></div>
              {slip.ab ? <Tag tone="n">{slip.ab}</Tag> : <Button variant="outline" size="compact" onClick={() => { setSlip((s) => ({ ...s, ab: 'Lesson booked' })); toast('Punctuality lesson booked for Anita B., Thursday 4 pm'); }}>Give lesson</Button>}</div><div className="hr" />
            <div className="row"><div className="lft clk" onClick={() => go('partnerDetail', { id: 'mt', name: 'Meena T.' })}><Av sm face="mt" /><div><b>Meena T.</b><div className="s m">4.3 · down from 4.6</div></div></div>
              {slip.mt ? <Tag tone="n">{slip.mt}</Tag> : <Button variant="outline" size="compact" onClick={() => { setSlip((s) => ({ ...s, mt: 'Called' })); toast('Calling Meena T.…'); }}>Call</Button>}</div>
          </div>
          <div className="s m qua-foot">Steps: call, then lesson, then pause. Below 4.2 is caught here.</div>
        </div>
        <div className="card qua-fill">
          <div className="h2 qua-title qua-title-gap10">Why ratings were low</div>
          <div className="s qua-list-9">
            {lowRatingReasons.map((r) => <BarRow key={r.label} label={r.label} value={r.value} pct={r.pct} />)}
          </div>
        </div>
      </div>
    </div>

    {open && (
      <Modal open onClose={() => setOpen(null)} title={`Case #${open.id} · ${open.stars} star${open.stars > 1 ? 's' : ''}`}
        actions={<>
          <Button variant="outline" onClick={() => update(open.id, { status: 'Contested' }, `#${open.id} marked contested`)}>Mark contested</Button>
          <Button variant="outline" onClick={() => update(open.id, { status: 'Calling', owner }, `#${open.id} assigned to ${owner}`)}>Assign</Button>
          <Button onClick={() => update(open.id, { status: 'Closed' }, `Case #${open.id} closed`)}>Close case</Button>
        </>}>
        <div className="card qua-facts">
          <div className="row"><span className="m">Customer</span><b className="lnk" onClick={() => { setOpen(null); openCustomer(open.customer); }}>{open.customer}</b></div>
          <div className="row"><span className="m">Partner</span><b>{open.partner}</b></div>
          <div className="row"><span className="m">Reason</span><b>{open.reason}</b></div>
          <div className="row"><span className="m">Customer wants</span><b>{open.wants}</b></div>
          <div className="row"><span className="m">Status</span><Tag tone={caseTone[open.status]}>{open.status}</Tag></div>
        </div>
        <Field label="Assign to"><select className="inp" value={owner} onChange={(e) => setOwner(e.target.value)}>{caseOwners.map((t) => <option key={t}>{t}</option>)}</select></Field>
        <div className="lft">
          <Button variant="outline" size="compact" onClick={() => update(open.id, { status: 'Fixed', owner }, `${open.partner.split(' ')[0]}'s replacement is on the way for #${open.id}`)}>Send helper back</Button>
          <Button variant="outline" size="compact" onClick={() => update(open.id, { status: 'Fixed', owner }, `₹79 refunded to ${open.customer}'s wallet`)}>Refund ₹79</Button>
          <Button variant="outline" size="compact" onClick={() => toast(`Calling ${open.customer}…`)}>Call customer</Button>
        </div>
      </Modal>
    )}
  </>;
}

export default RatingsPage;
