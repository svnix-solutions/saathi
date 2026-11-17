/** 95 On a tablet and a phone: mock layouts rendered inside the page; their buttons work locally. */
import React, { useState } from 'react';
import { Av, I, Modal, Tag, useAdmin, type IconName } from '../shell';
import { Btn } from './ui';

const railIcons: IconName[] = ['home', 'list', 'pin', 'shield', 'bolt', 'user', 'star', 'wallet', 'call', 'key'];
const railLabels = ['Dashboard', 'Bookings', 'Live map', 'Safety', 'Automation', 'Customers', 'Ratings', 'Payouts', 'Support', 'Team'];
const cardRow: React.CSSProperties = { padding: '9px 11px' };
const smBtn: React.CSSProperties = { padding: '6px 11px', fontSize: 12 };

type Attn = { key: string; title: string; sub: string; subPhone: string; titlePhone: string; red?: boolean; btn: string };
const attention: Attn[] = [
  { key: 'sos', title: 'Emergency alert', titlePhone: 'Emergency alert', sub: 'Customer · Block C · 2 min ago', subPhone: 'Block C · 2 min ago', red: true, btn: 'Open' },
  { key: 'assign', title: '2 bookings have no partner', titlePhone: '2 bookings, no partner', sub: '#2042 waiting 4 min · #2045 waiting 1 min', subPhone: 'Waiting up to 4 min', btn: 'Assign' },
  { key: 'signups', title: '3 partner sign-ups to check', titlePhone: '3 sign-ups to check', sub: 'Aadhaar, PAN and references', subPhone: 'Aadhaar and PAN', btn: 'Review' },
  { key: 'testimonials', title: '3 testimonials to approve', titlePhone: '3 testimonials to approve', sub: 'Not shown until approved', subPhone: 'Not shown until approved', btn: 'Review' },
];

export function SmallScreens() {
  const { go, toast } = useAdmin();
  const [rail, setRail] = useState(0);
  const [done, setDone] = useState<Record<string, string>>({});
  const [tab, setTab] = useState(0);
  const [assigned, setAssigned] = useState<string | null>(null);
  const [pickPartner, setPickPartner] = useState('rm');
  const [cancel, setCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const act = (a: Attn, from: 'tablet' | 'phone') => {
    if (a.key === 'assign') { setAssigned(null); setCancelled(false); toast(from === 'tablet' ? 'Opened #2042 on the phone mock →' : 'Opened booking #2042'); return; }
    if (a.key === 'sos') { setDone((d) => ({ ...d, sos: 'Team on it' })); toast('Emergency alert opened · calling customer'); return; }
    setDone((d) => ({ ...d, [a.key]: 'Reviewed' })); toast(a.key === 'signups' ? '3 sign-ups opened for review' : '3 testimonials opened for review');
  };
  const attnBtn = (a: Attn, from: 'tablet' | 'phone') => done[a.key]
    ? <Tag tone="n">{done[a.key]}</Tag>
    : <button type="button" className={`btn ${a.red ? '' : 'o'}`} style={{ ...smBtn, ...(a.red ? { background: 'var(--red)' } : {}) }} onClick={() => act(a, from)}>{a.btn}</button>;
  const partners = [
    { id: 'rm', name: 'Rekha M.', sub: '0.6 km · free in 10 min' },
    { id: 'mt', name: 'Meena T.', sub: '1.8 km · online now' },
    { id: 'kr', name: 'Kavita R.', sub: '1.1 km · busy till 11:40' },
  ];
  const noPartner = assigned ? 1 : 2;

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>On a tablet and a phone</div>
      <div className="m">On a tablet the menu shrinks to icons. On a phone it moves to a bar at the bottom, cards stack, and seeing what needs attention and assigning a partner come first.</div></div>
      <div className="lft"><Btn o onClick={() => go('dashboard')}>Open full dashboard</Btn></div></div>
    <div className="phones">
      {/* tablet */}
      <div>
        <div style={{ width: 610, height: 600, border: '8px solid var(--ink)', borderRadius: 26, background: 'var(--bg)', overflow: 'hidden', display: 'flex', boxShadow: '0 34px 60px -28px rgba(7,63,51,.45)' }}>
          <div style={{ width: 58, background: 'var(--green-d)', color: '#cfe5dd', padding: '14px 9px', display: 'flex', flexDirection: 'column', gap: 4, flex: 'none' }}>
            <svg width="34" height="34" style={{ margin: '0 auto 10px' }} aria-hidden="true"><use href="#mark" /></svg>
            {railIcons.map((ic, i) => (
              <span key={ic} title={railLabels[i]} className="clk" onClick={() => { setRail(i); if (i) toast(`${railLabels[i]} (tablet layout)`); }}
                style={{ display: 'grid', placeItems: 'center', height: 38, borderRadius: 10, ...(rail === i ? { background: '#0f6b57', color: '#fff' } : {}) }}><I n={ic} /></span>
            ))}
          </div>
          <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 11, minWidth: 0, overflow: 'auto' }}>
            <div className="row"><div className="h" style={{ fontSize: 19 }}>{railLabels[rail]}</div><Tag tone="n">All zones</Tag></div>
            {rail === 0 ? <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9 }}>
                <div className="card" style={{ padding: 9 }}><div className="s m">In progress</div><b style={{ fontSize: 19 }}>14</b></div>
                <div className="card" style={{ padding: 9 }}><div className="s m">Online</div><b style={{ fontSize: 19 }}>37</b></div>
                <div className="card" style={{ padding: 9, borderColor: 'var(--red)' }}><div className="s" style={{ color: 'var(--red)' }}>No partner</div><b style={{ fontSize: 19 }}>{noPartner}</b></div>
                <div className="card" style={{ padding: 9 }}><div className="s m">Today</div><b style={{ fontSize: 19 }}>₹18,640</b></div>
              </div>
              <div className="h2">Needs attention</div>
              {attention.map((a) => (
                <div key={a.key} className="card row" style={{ ...cardRow, ...(a.red ? { borderColor: 'var(--red)' } : {}) }}>
                  <div><b style={a.red ? { color: 'var(--red)' } : undefined}>{a.key === 'assign' && assigned ? '1 booking has no partner' : a.title}</b>
                    <div className="s m">{a.key === 'assign' && assigned ? '#2045 waiting 1 min' : a.sub}</div></div>
                  {attnBtn(a, 'tablet')}
                </div>
              ))}
              <div className="h2">Live bookings</div>
              <div className="card s" style={{ ...cardRow, display: 'grid', gap: 7 }}>
                <div className="row"><span>#2041 · Nitin K. · General · Sunita D.</span><Tag tone="g">In progress</Tag></div><div className="hr" />
                <div className="row"><span>#2043 · Arjun P. · Dishes · Rekha M.</span><Tag>On the way</Tag></div>
                {assigned && <><div className="hr" /><div className="row"><span>#2042 · Meera S. · Kitchen &amp; bath · {assigned}</span><Tag>On the way</Tag></div></>}
              </div>
            </> : (
              <div className="card m" style={{ padding: 16 }}>
                {railLabels[rail]} uses the same screen as on a desk. Tables scroll sideways.
                <div style={{ marginTop: 10 }}><span className="lnk" onClick={() => setRail(0)}>Back to dashboard</span></div>
              </div>
            )}
          </div>
        </div>
        <div className="cap">Tablet · icon menu<span>Same screens, menu folded to icons, tables scroll sideways</span></div>
      </div>

      {/* phone: dashboard */}
      <div className="pw"><div className="ph">
        <div className="top"><div className="row"><div><div className="s" style={{ opacity: .8 }}>Saathi admin</div><div className="h">{['Dashboard', 'Bookings', 'Safety', 'More'][tab]}</div></div><Av sm face="ad" /></div></div>
        <div className="scr" style={{ gap: 9 }}>
          {tab === 0 ? <>
            <div className="g2">
              <div className="card"><div className="s m">In progress</div><div className="h">14</div></div>
              <div className="card" style={{ borderColor: 'var(--red)' }}><div className="s" style={{ color: 'var(--red)' }}>No partner</div><div className="h">{noPartner}</div></div>
            </div>
            <div className="h2">Needs attention</div>
            {attention.slice(0, 3).map((a) => (
              <div key={a.key} className="card row" style={{ ...cardRow, ...(a.red ? { borderColor: 'var(--red)' } : {}) }}>
                <div><b style={a.red ? { color: 'var(--red)' } : undefined}>{a.key === 'assign' && assigned ? '1 booking, no partner' : a.titlePhone}</b><div className="s m">{a.key === 'assign' && assigned ? 'Waiting 1 min' : a.subPhone}</div></div>
                {attnBtn(a, 'phone')}
              </div>
            ))}
          </> : tab === 1 ? <>
            {[['#2041', 'Nitin K. · General', 'In progress', 'g'], ['#2043', 'Arjun P. · Dishes', 'On the way', 'y'], ['#2042', 'Meera S. · Kitchen & bath', assigned ? 'On the way' : cancelled ? 'Cancelled' : 'Searching', assigned ? 'y' : cancelled ? 'x' : 'r']].map(([id, t, s, tn]) => (
              <div key={id} className="card row" style={cardRow}><div><b>{id}</b><div className="s m">{t}</div></div><Tag tone={tn as any}>{s}</Tag></div>))}
          </> : tab === 2 ? <>
            <div className="card" style={{ ...cardRow, borderColor: 'var(--red)' }}><b style={{ color: 'var(--red)' }}>Emergency alert</b><div className="s m">Block C · 2 min ago</div>
              <div className="g2" style={{ marginTop: 8 }}><button type="button" className="btn o" style={smBtn} onClick={() => toast('Calling customer…')}>Call</button><button type="button" className="btn" style={{ ...smBtn, background: 'var(--red)' }} onClick={() => go('safety')}>Open</button></div></div>
          </> : <>
            {['Live map', 'Customers', 'Ratings', 'Payouts', 'Support', 'Team'].map((l) => (
              <div key={l} className="card row clk" style={cardRow} onClick={() => toast(`${l} opens the full page`)}><b>{l}</b><I n="chevron" /></div>))}
          </>}
        </div>
        <div className="tabs">
          {([['home', 'Home'], ['list', 'Bookings'], ['shield', 'Safety'], ['key', 'More']] as [IconName, string][]).map(([ic, l], i) => (
            <div key={l} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}><I n={ic} />{l}</div>))}
        </div>
      </div><div className="cap">Phone · dashboard<span>Alerts first, menu in a bottom bar</span></div></div>

      {/* phone: assign */}
      <div className="pw"><div className="ph">
        <div className="scr" style={{ gap: 9 }}>
          <div className="lft"><span className="clk" onClick={() => setTab(0)}><I n="back" /></span><span className="h2">Booking #2042</span>
            {assigned ? <Tag tone="g">Assigned</Tag> : cancelled ? <Tag tone="x">Cancelled</Tag> : <Tag tone="r">Searching 4 min</Tag>}</div>
          <div className="card"><div className="row"><b>Meera S. · Block A</b><b>₹516</b></div><div className="s m">Kitchen &amp; bathroom scrub · 2 hr · now</div></div>
          <div className="h2">{assigned ? 'Assigned partner' : 'Nearest partners'}</div>
          {partners.filter((p) => !assigned || p.name === assigned).map((p) => (
            <div key={p.id} className={`card row clk ${pickPartner === p.id ? 'sel' : ''}`} style={cardRow} onClick={() => setPickPartner(p.id)}>
              <div className="lft"><Av sm face={p.id} /><div><b>{p.name}</b><div className="s m">{assigned ? 'On the way · 10 min' : p.sub}</div></div></div>
              {assigned ? <Tag tone="g">Assigned</Tag> : cancelled ? null :
                <button type="button" className={`btn ${pickPartner === p.id ? '' : 'o'}`} style={pickPartner === p.id ? { padding: '7px 12px', fontSize: 12 } : { padding: '6px 12px', fontSize: 12 }}
                  onClick={(e) => { e.stopPropagation(); setAssigned(p.name); setPickPartner(p.id); toast(`${p.name} assigned to #2042`); }}>Assign</button>}
            </div>
          ))}
          <div className="g2 end">
            <button type="button" className="btn o" style={{ padding: 10 }} onClick={() => toast('Calling Meera S.…')}>Call customer</button>
            {assigned ? <button type="button" className="btn o" style={{ padding: 10 }} onClick={() => { setAssigned(null); toast('Unassigned. Searching again.'); }}>Change</button>
              : <button type="button" className="btn o" style={{ padding: 10, color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setCancel(true)} disabled={cancelled}>Cancel</button>}
          </div>
        </div>
      </div><div className="cap">Phone · assign a partner<span>The one job most often done away from a desk</span></div></div>
    </div>

    <Modal open={cancel} onClose={() => setCancel(false)} title="Cancel booking #2042?"
      actions={<><Btn o onClick={() => setCancel(false)}>Keep searching</Btn><Btn red onClick={() => { setCancelled(true); setCancel(false); toast('Booking cancelled. Meera gets a full refund.'); }}>Cancel booking</Btn></>}>
      <div className="m">Meera S. is refunded ₹516 in full and gets a sorry message.</div>
    </Modal>
  </>;
}
