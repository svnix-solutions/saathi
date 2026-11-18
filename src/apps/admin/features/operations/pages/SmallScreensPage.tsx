/** 95 On a tablet and a phone: mock layouts rendered inside the page; their buttons work locally. */
import React, { useState } from 'react';
import { Av, Button, I, Modal, PageHead, Tag, type TagTone } from '../../../ui';
import { useAdmin } from '../../../session';
import { ATTENTION, PHONE_MORE, PHONE_PARTNERS, PHONE_TABS, PHONE_TITLES, RAIL_ICONS, RAIL_LABELS, type Attention } from '../data';
import '../operations.css';

type Device = 'tablet' | 'phone';

export function SmallScreensPage() {
  const { go, toast } = useAdmin();
  const [rail, setRail] = useState(0);
  const [done, setDone] = useState<Record<string, string>>({});
  const [tab, setTab] = useState(0);
  const [assigned, setAssigned] = useState<string | null>(null);
  const [pickPartner, setPickPartner] = useState('rm');
  const [cancel, setCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const act = (a: Attention, from: Device) => {
    if (a.key === 'assign') { setAssigned(null); setCancelled(false); toast(from === 'tablet' ? 'Opened #2042 on the phone mock →' : 'Opened booking #2042'); return; }
    if (a.key === 'sos') { setDone((d) => ({ ...d, sos: 'Team on it' })); toast('Emergency alert opened · calling customer'); return; }
    setDone((d) => ({ ...d, [a.key]: 'Reviewed' })); toast(a.key === 'signups' ? '3 sign-ups opened for review' : '3 testimonials opened for review');
  };
  const attnBtn = (a: Attention, from: Device) => done[a.key]
    ? <Tag tone="n">{done[a.key]}</Tag>
    : <Button size="lg" variant={a.red ? 'danger' : 'outline'} className="ops-mini-btn" onClick={() => act(a, from)}>{a.btn}</Button>;
  const noPartner = assigned ? 1 : 2;
  const phoneBookings: [string, string, string, TagTone][] = [
    ['#2041', 'Nitin K. · General', 'In progress', 'g'],
    ['#2043', 'Arjun P. · Dishes', 'On the way', 'y'],
    ['#2042', 'Meera S. · Kitchen & bath', assigned ? 'On the way' : cancelled ? 'Cancelled' : 'Searching', assigned ? 'y' : cancelled ? 'x' : 'r'],
  ];

  return <>
    <PageHead title="On a tablet and a phone"
      sub="On a tablet the menu shrinks to icons. On a phone it moves to a bar at the bottom, cards stack, and seeing what needs attention and assigning a partner come first."
      actions={<Button variant="outline" onClick={() => go('dashboard')}>Open full dashboard</Button>} />
    <div className="phones">
      {/* tablet */}
      <div>
        <div className="ops-tablet">
          <div className="ops-rail">
            <svg width="34" height="34" className="ops-rail-mark" aria-hidden="true"><use href="#mark" /></svg>
            {RAIL_ICONS.map((ic, i) => (
              <span key={ic} title={RAIL_LABELS[i]} role="button" aria-label={RAIL_LABELS[i]}
                className={`clk ops-rail-item ${rail === i ? 'ops-rail-on' : ''}`}
                onClick={() => { setRail(i); if (i) toast(`${RAIL_LABELS[i]} (tablet layout)`); }}><I n={ic} /></span>
            ))}
          </div>
          <div className="ops-tablet-body">
            <div className="row"><div className="h">{RAIL_LABELS[rail]}</div><Tag tone="n">All zones</Tag></div>
            {rail === 0 ? <>
              <div className="ops-mini-kpis">
                <div className="card ops-mini-kpi"><div className="s m">In progress</div><b>14</b></div>
                <div className="card ops-mini-kpi"><div className="s m">Online</div><b>37</b></div>
                <div className="card ops-mini-kpi ops-alert-card"><div className="s ops-alert-text">No partner</div><b>{noPartner}</b></div>
                <div className="card ops-mini-kpi"><div className="s m">Today</div><b>₹18,640</b></div>
              </div>
              <div className="h2">Needs attention</div>
              {ATTENTION.map((a) => (
                <div key={a.key} className={`card row ops-item ${a.red ? 'ops-alert-card' : ''}`}>
                  <div><b className={a.red ? 'ops-alert-text' : undefined}>{a.key === 'assign' && assigned ? '1 booking has no partner' : a.title}</b>
                    <div className="s m">{a.key === 'assign' && assigned ? '#2045 waiting 1 min' : a.sub}</div></div>
                  {attnBtn(a, 'tablet')}
                </div>
              ))}
              <div className="h2">Live bookings</div>
              <div className="card s ops-item ops-live-list">
                <div className="row"><span>#2041 · Nitin K. · General · Sunita D.</span><Tag tone="g">In progress</Tag></div><div className="hr" />
                <div className="row"><span>#2043 · Arjun P. · Dishes · Rekha M.</span><Tag>On the way</Tag></div>
                {assigned && <><div className="hr" /><div className="row"><span>#2042 · Meera S. · Kitchen &amp; bath · {assigned}</span><Tag>On the way</Tag></div></>}
              </div>
            </> : (
              <div className="card m ops-tablet-note">
                {RAIL_LABELS[rail]} uses the same screen as on a desk. Tables scroll sideways.
                <div className="ops-spaced"><span className="lnk" role="button" onClick={() => setRail(0)}>Back to dashboard</span></div>
              </div>
            )}
          </div>
        </div>
        <div className="cap">Tablet · icon menu<span>Same screens, menu folded to icons, tables scroll sideways</span></div>
      </div>

      {/* phone: dashboard */}
      <div className="pw"><div className="ph">
        <div className="top"><div className="row"><div><div className="s ops-dim">Saathi admin</div><div className="h">{PHONE_TITLES[tab]}</div></div><Av sm face="ad" /></div></div>
        <div className="scr ops-phone-scr">
          {tab === 0 ? <>
            <div className="g2">
              <div className="card"><div className="s m">In progress</div><div className="h">14</div></div>
              <div className="card ops-alert-card"><div className="s ops-alert-text">No partner</div><div className="h">{noPartner}</div></div>
            </div>
            <div className="h2">Needs attention</div>
            {ATTENTION.slice(0, 3).map((a) => (
              <div key={a.key} className={`card row ops-item ${a.red ? 'ops-alert-card' : ''}`}>
                <div><b className={a.red ? 'ops-alert-text' : undefined}>{a.key === 'assign' && assigned ? '1 booking, no partner' : a.titlePhone}</b><div className="s m">{a.key === 'assign' && assigned ? 'Waiting 1 min' : a.subPhone}</div></div>
                {attnBtn(a, 'phone')}
              </div>
            ))}
          </> : tab === 1 ? <>
            {phoneBookings.map(([id, t, s, tn]) => (
              <div key={id} className="card row ops-item"><div><b>{id}</b><div className="s m">{t}</div></div><Tag tone={tn}>{s}</Tag></div>))}
          </> : tab === 2 ? <>
            <div className="card ops-item ops-alert-card"><b className="ops-alert-text">Emergency alert</b><div className="s m">Block C · 2 min ago</div>
              <div className="g2 ops-spaced-sm">
                <Button size="lg" variant="outline" className="ops-mini-btn" onClick={() => toast('Calling customer…')}>Call</Button>
                <Button size="lg" variant="danger" className="ops-mini-btn" onClick={() => go('safety')}>Open</Button>
              </div></div>
          </> : <>
            {PHONE_MORE.map((l) => (
              <div key={l} className="card row clk ops-item" onClick={() => toast(`${l} opens the full page`)}><b>{l}</b><I n="chevron" /></div>))}
          </>}
        </div>
        <div className="tabs">
          {PHONE_TABS.map(([ic, l], i) => (
            <div key={l} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}><I n={ic} />{l}</div>))}
        </div>
      </div><div className="cap">Phone · dashboard<span>Alerts first, menu in a bottom bar</span></div></div>

      {/* phone: assign */}
      <div className="pw"><div className="ph">
        <div className="scr ops-phone-scr">
          <div className="lft"><span className="clk" role="button" aria-label="Back" onClick={() => setTab(0)}><I n="back" /></span><span className="h2">Booking #2042</span>
            {assigned ? <Tag tone="g">Assigned</Tag> : cancelled ? <Tag tone="x">Cancelled</Tag> : <Tag tone="r">Searching 4 min</Tag>}</div>
          <div className="card"><div className="row"><b>Meera S. · Block A</b><b>₹516</b></div><div className="s m">Kitchen &amp; bathroom scrub · 2 hr · now</div></div>
          <div className="h2">{assigned ? 'Assigned partner' : 'Nearest partners'}</div>
          {PHONE_PARTNERS.filter((p) => !assigned || p.name === assigned).map((p) => (
            <div key={p.id} className={`card row clk ops-item ${pickPartner === p.id ? 'sel' : ''}`} onClick={() => setPickPartner(p.id)}>
              <div className="lft"><Av sm face={p.id} /><div><b>{p.name}</b><div className="s m">{assigned ? 'On the way · 10 min' : p.sub}</div></div></div>
              {assigned ? <Tag tone="g">Assigned</Tag> : cancelled ? null :
                <Button size="lg" variant={pickPartner === p.id ? 'primary' : 'outline'} className="ops-phone-assign"
                  onClick={(e) => { e.stopPropagation(); setAssigned(p.name); setPickPartner(p.id); toast(`${p.name} assigned to #2042`); }}>Assign</Button>}
            </div>
          ))}
          <div className="g2 end">
            <Button size="lg" variant="outline" className="ops-phone-action" onClick={() => toast('Calling Meera S.…')}>Call customer</Button>
            {assigned ? <Button size="lg" variant="outline" className="ops-phone-action" onClick={() => { setAssigned(null); toast('Unassigned. Searching again.'); }}>Change</Button>
              : <button type="button" className="btn o ops-phone-action ops-phone-cancel" onClick={() => setCancel(true)} disabled={cancelled}>Cancel</button>}
          </div>
        </div>
      </div><div className="cap">Phone · assign a partner<span>The one job most often done away from a desk</span></div></div>
    </div>

    <Modal open={cancel} onClose={() => setCancel(false)} title="Cancel booking #2042?"
      actions={<><Button variant="outline" onClick={() => setCancel(false)}>Keep searching</Button><Button variant="danger" onClick={() => { setCancelled(true); setCancel(false); toast('Booking cancelled. Meera gets a full refund.'); }}>Cancel booking</Button></>}>
      <div className="m">Meera S. is refunded ₹516 in full and gets a sorry message.</div>
    </Modal>
  </>;
}

export default SmallScreensPage;
