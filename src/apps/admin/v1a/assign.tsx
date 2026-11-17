/** 73 · Admin assign and track a booking (params: { id }). */
import React, { useEffect, useState } from 'react';
import { Av, I, Modal, Tag, Toggle, useAdmin } from '../shell';
import { useStore, patchBooking, inr, type Booking } from './store';
import { BookingTag, SmBtn, TLink } from './ui';

type Near = { id: string; name: string; face: string; info: string; blocked?: 'Declined' | 'Blocked' };
const NEAR: Near[] = [
  { id: 'rm', name: 'Rekha M.', face: 'rm', info: '0.6 km · free in 10 min · 4.6' },
  { id: 'mt', name: 'Meena T.', face: 'mt', info: '1.8 km · online now · 4.5' },
  { id: 'kr', name: 'Kavita R.', face: 'kr', info: '1.1 km · on a job till 11:40 · 4.9' },
  { id: 'ab', name: 'Anita B.', face: 'ab', info: '0.9 km · declined this job', blocked: 'Declined' },
  { id: 'gk', name: 'Geeta K.', face: 'gk', info: '0.4 km · suspended', blocked: 'Blocked' },
];
const WIDER: Near[] = [
  { id: 'sd', name: 'Sunita D.', face: 'sd', info: '2.4 km · free at 12:00 · 4.8' },
  { id: 'pv', name: 'Pooja V.', face: 'pv', info: '2.9 km · online now · new' },
];

/** Details shown in the middle column (the design shows #2042; #2045 is filled in the same style). */
const DETAIL: Record<string, { face: string; addr: string; job: string; note: string; history: [string, string][]; prefer: string; timeline: [string, string, 'ok' | 'bad' | 'wait'][] }> = {
  '2042': {
    face: 'ms', addr: 'Flat 12, Block A · 3 visits before', job: 'Kitchen & bathroom scrub · 2 hr · now',
    note: 'Bathrooms, kitchen slab, fridge. Note: "Guests coming at 2 pm."',
    timeline: [['11:02', 'Booked and paid by UPI', 'ok'], ['11:02', 'Sent to 3 partners within 1.5 km', 'ok'], ['11:03', 'Anita B. declined', 'bad'],
      ['11:04', 'Pooja V. and Lata S. did not answer', 'bad'], ['11:06', 'Still searching · customer told "finding your helper"', 'wait']],
    history: [['#1971 · Kitchen & bath · Kavita R.', '5 / 5'], ['#1902 · General · Rekha M.', '4 / 5'], ['#1844 · Dishes · Anita B.', '4 / 5']],
    prefer: 'Never cancelled. Prefers Kavita R., who is on a job until 11:40.',
  },
  '2045': {
    face: 'rg', addr: 'House 7, Block D · 1 visit before', job: 'Hourly custom help · 3 hr · now',
    note: 'Cupboards, balcony and dishes. Note: "Moving out on Friday."',
    timeline: [['11:05', 'Booked and paid by UPI', 'ok'], ['11:05', 'Sent to 2 partners within 1.5 km', 'ok'], ['11:06', 'Still searching · only 2 partners online in Block D', 'wait']],
    history: [['#1950 · General · Sunita D.', '5 / 5']],
    prefer: 'Never cancelled. No favourite partner yet.',
  },
};

function Step({ k }: { k: 'ok' | 'bad' | 'wait' }) {
  if (k === 'ok') return <span className="cb on"><I n="check" /></span>;
  if (k === 'bad') return <span className="cb" style={{ borderColor: 'var(--red)' }} />;
  return <span className="cb" style={{ borderColor: 'var(--yellow)', background: 'var(--yellow)' }} />;
}

export function AssignPage({ params }: { params: Record<string, any> }) {
  const { go, toast } = useAdmin();
  const bookings = useStore((s) => s.bookings);
  const [id, setId] = useState<string>(String(params.id ?? '2042').replace('#', ''));
  const [pick, setPick] = useState('rm');
  const [wide, setWide] = useState(false);
  const [extra, setExtra] = useState(false);
  const [cancel, setCancel] = useState(false);
  useEffect(() => { if (params.id) setId(String(params.id).replace('#', '')); }, [params.id]);
  useEffect(() => { setPick('rm'); setWide(false); setExtra(false); }, [id]);

  const b = bookings.find((x) => x.id === id) ?? bookings[0];
  const d = DETAIL[b.id] ?? {
    face: '', addr: `${b.area} · regular customer`, job: `${b.service} · ${b.time}`, note: 'No note from the customer.',
    timeline: [[b.time, 'Booked and paid by ' + b.paidBy, 'ok'], ...(b.partner ? [[b.time, `${b.partner} accepted`, 'ok']] : [])] as [string, string, 'ok'][],
    history: [], prefer: 'Never cancelled.',
  };
  const searching = bookings.filter((x) => x.status === 'searching');
  const byHand = bookings.filter((x) => x.byHand);
  const near = wide ? [...NEAR, ...WIDER] : NEAR;
  const free = b.status === 'searching';

  const assign = (n: Near) => {
    patchBooking(b.id, { status: 'way', partner: n.name, byHand: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) });
    toast(`${n.name} assigned to #${b.id}${extra ? ' · ₹30 extra offered' : ''} · customer told by SMS`);
    const next = searching.find((x) => x.id !== b.id);
    if (next) setTimeout(() => setId(next.id), 900);
  };

  const Item = ({ x, right, sub }: { x: Booking; right: React.ReactNode; sub: string }) => (
    <div className={`card clk ${x.id === b.id ? 'sel' : ''}`} style={{ padding: '9px 11px' }} onClick={() => setId(x.id)}>
      <div className="row"><b>#{x.id} · {x.customer}</b>{right}</div><div className="s m">{sub}</div>
    </div>
  );

  return (
    <>
      <div className="row">
        <div className="lft" style={{ gap: 12 }}>
          <span className="ic clk" onClick={() => go('bookings')} role="button" aria-label="All bookings"><I n="back" /></span>
          <div className="h" style={{ fontSize: 22 }}>Booking #{b.id}</div>
          {free ? <Tag tone="r">Searching {b.waitMin} min</Tag> : b.byHand ? <Tag tone="g">Assigned · {b.partner}</Tag> : <BookingTag b={b} list />}
        </div>
        <div className="lft">
          <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => toast(`Calling ${b.customer} · +91 98••• ••034`)}>Call customer</button>
          {b.status !== 'cancelled' && b.status !== 'done' && b.status !== 'refunded'
            ? <button className="btn o" style={{ padding: '9px 16px', color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => setCancel(true)}>Cancel and refund</button>
            : null}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.2fr 1.3fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15 }}>Needs a partner</div>
          {searching.map((x) => <Item key={x.id} x={x} right={<Tag tone="r">{x.waitMin} min</Tag>} sub={`${x.service} · ${x.area}`} />)}
          {!searching.length && <div className="card s m" style={{ padding: '9px 11px' }}>Every booking has a partner.</div>}
          <div className="h2" style={{ fontSize: 15, marginTop: 6 }}>Starting soon</div>
          {bookings.filter((x) => x.status === 'scheduled').map((x) => <Item key={x.id} x={x} right={<Tag tone="n">{x.when}</Tag>} sub={`${x.service.split(' · ')[0]} · ${x.service.split(' · ')[1]} · ${x.partner}`} />)}
          <div className="card" style={{ padding: '9px 11px' }}><div className="row"><b>#2048 · Nitin K.</b><Tag tone="n">Tue 8 am</Tag></div><div className="s m">Plan · General · Sunita D.</div></div>
          <div className="h2" style={{ fontSize: 15, marginTop: 6 }}>Assigned by hand today</div>
          {byHand.map((x) => <Item key={x.id} x={x} right={<Tag tone="x">{x.byHand}</Tag>} sub={`Found in ${x.waitMin} min · ${x.partner}`} />)}
          <div className="card" style={{ padding: '9px 11px' }}><div className="row"><b>#2017 · Kiran D.</b><Tag tone="x">9:40 am</Tag></div><div className="s m">Found in 6 min · Meena T.</div></div>
          <div className="card" style={{ padding: '9px 11px' }}><div className="row"><b>#1998 · Asha P.</b><Tag tone="x">8:15 am</Tag></div><div className="s m">Found in 4 min · Rekha M.</div></div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="row">
            <div className="lft clk" onClick={() => go('customerDetail', { name: b.customer })}><Av face={d.face || undefined} initials={b.customer.split(' ').map((w) => w[0]).join('')} />
              <div><div className="h2" style={{ fontSize: 15 }}>{b.customer}</div><div className="s m">{d.addr}</div></div></div>
            <b style={{ fontSize: 16 }}>{inr(b.amount)}</b>
          </div>
          <div className="hr" />
          <div><b>{d.job}</b><div className="s m">{d.note}</div></div>
          <div className="hr" />
          <div className="h2">What happened</div>
          <div style={{ display: 'grid', gap: 9 }} className="s">
            {d.timeline.filter(([, , k]) => free || k !== 'wait').map(([t, txt, k], i) => (
              <div key={i} className="lft" style={{ alignItems: 'flex-start' }}><Step k={k} /><div><b>{t}</b> · {txt}</div></div>
            ))}
            {b.byHand && <div className="lft" style={{ alignItems: 'flex-start' }}><Step k="ok" /><div><b>{b.byHand}</b> · Assigned by hand to {b.partner} · customer told</div></div>}
            {b.status === 'cancelled' && <div className="lft" style={{ alignItems: 'flex-start' }}><Step k="bad" /><div><b>Now</b> · Cancelled by the team · {inr(b.amount)} refunded to UPI</div></div>}
          </div>
          <div className="hr" />
          <div className="h2">This customer before</div>
          <div style={{ display: 'grid', gap: 6 }} className="s">
            {d.history.map(([l, r]) => <div key={l} className="row"><span>{l}</span><b>{r}</b></div>)}
            {!d.history.length && <span className="m">First visit.</span>}
          </div>
          <div className="s m">{d.prefer}</div>
          {free && (
            <div className="card row end" style={{ padding: '9px 11px' }}>
              <div><b>Offer ₹30 extra to partners</b><div className="s m">Paid by Saathi, not the customer</div></div>
              <Toggle on={extra} onChange={(v) => { setExtra(v); toast(v ? 'Partners nearby now see +₹30 on this job' : 'Extra offer removed'); }} />
            </div>
          )}
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>Nearest partners</span>
            {free && <TLink onClick={() => { setWide(!wide); toast(wide ? 'Back to 1.5 km' : 'Searching up to 3 km · 2 more partners'); }}>{wide ? 'Back to 1.5 km' : 'Widen to 3 km'}</TLink>}</div>
          {free ? near.map((n) => (
            <div key={n.id} className={`card row ${n.blocked ? '' : 'clk'} ${pick === n.id && !n.blocked ? 'sel' : ''}`} style={{ padding: '10px 11px', ...(n.blocked ? { opacity: 0.6 } : {}) }}
              onClick={() => !n.blocked && setPick(n.id)}>
              <div className="lft"><Av sm face={n.face} /><div><b>{n.name}</b><div className="s m">{n.info}</div></div></div>
              {n.blocked ? <Tag tone={n.blocked === 'Declined' ? 'x' : 'r'}>{n.blocked}</Tag>
                : <button className={`btn ${pick === n.id ? '' : 'o'}`} style={{ padding: pick === n.id ? '7px 14px' : '6px 14px', fontSize: 12 }}
                  onClick={(e) => { e.stopPropagation(); assign(n); }}>Assign</button>}
            </div>
          )) : (
            <div className="card sel" style={{ padding: '12px 11px', display: 'grid', gap: 6 }}>
              {b.partner ? <>
                <div className="lft"><Av sm face={NEAR.concat(WIDER).find((n) => n.name === b.partner)?.face ?? 'sd'} /><div><b>{b.partner}</b><div className="s m">{b.status === 'way' ? 'On the way · arrives in about 12 min' : 'On this booking'}</div></div></div>
                <div className="lft" style={{ gap: 6 }}>
                  <SmBtn onClick={() => go('live')}>Track on map</SmBtn>
                  <SmBtn onClick={() => toast(`Calling ${b.partner}`)}>Call partner</SmBtn>
                  {b.status === 'way' && <SmBtn red onClick={() => { patchBooking(b.id, { status: 'searching', partner: undefined, byHand: undefined, waitMin: b.waitMin ?? 1 }); toast(`#${b.id} is back in the queue`); }}>Unassign</SmBtn>}
                </div>
              </> : <div className="m">No partner on this booking.</div>}
            </div>
          )}
          <div className="s m end">{free ? (pick === 'rm' ? 'Rekha is suggested: closest, free soon, and trained for deep cleaning.' : `${near.find((n) => n.id === pick)?.name} picked. Rekha M. is the suggestion: closest and free soon.`) : 'This booking does not need a partner from the team.'}</div>
        </div>
      </div>

      <Modal open={cancel} onClose={() => setCancel(false)} title={`Cancel #${b.id} and refund?`}
        actions={<>
          <button className="btn o sm" onClick={() => setCancel(false)}>Keep booking</button>
          <button className="btn r sm" onClick={() => { patchBooking(b.id, { status: 'cancelled' }); setCancel(false); toast(`#${b.id} cancelled · ${inr(b.amount)} back to ${b.customer} by UPI`); }}>Cancel and refund {inr(b.amount)}</button>
        </>}>
        <div className="m">{b.customer} gets the full {inr(b.amount)} back by {b.paidBy} within 2 hours and an SMS saying sorry. This cannot be undone.</div>
      </Modal>
    </>
  );
}
