/** 73 · Admin assign and track a booking (params: { id }). */
import React, { useEffect, useState } from 'react';
import { Av, Button, I, Modal, StatusTag, Tag, TextLink, Toggle } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { useStore, patchBooking, inr } from '../../../fixtures';
import { QueueItem } from '../components/QueueItem';
import { TimelineMark } from '../components/TimelineMark';
import { DETAIL, NEAR, STATIC_BY_HAND, STATIC_SCHEDULED, WIDER, type BookingDetail, type NearPartner } from '../data';
import '../operations.css';

export function AssignPage({ params }: { params: PageParams }) {
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
  const d: BookingDetail = DETAIL[b.id] ?? {
    face: '', addr: `${b.area} · regular customer`, job: `${b.service} · ${b.time}`, note: 'No note from the customer.',
    timeline: [[b.time, 'Booked and paid by ' + b.paidBy, 'ok'], ...(b.partner ? [[b.time, `${b.partner} accepted`, 'ok']] : [])] as [string, string, 'ok'][],
    history: [], prefer: 'Never cancelled.',
  };
  const searching = bookings.filter((x) => x.status === 'searching');
  const byHand = bookings.filter((x) => x.byHand);
  const near = wide ? [...NEAR, ...WIDER] : NEAR;
  const free = b.status === 'searching';

  const assign = (n: NearPartner) => {
    patchBooking(b.id, { status: 'way', partner: n.name, byHand: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }) });
    toast(`${n.name} assigned to #${b.id}${extra ? ' · ₹30 extra offered' : ''} · customer told by SMS`);
    const next = searching.find((x) => x.id !== b.id);
    if (next) setTimeout(() => setId(next.id), 900);
  };

  return (
    <>
      <div className="row">
        <div className="lft ops-title-group">
          <span className="ic clk" onClick={() => go('bookings')} role="button" aria-label="All bookings"><I n="back" /></span>
          <div className="h ops-title">Booking #{b.id}</div>
          {free ? <Tag tone="r">Searching {b.waitMin} min</Tag>
            : b.byHand ? <Tag tone="g">Assigned · {b.partner}</Tag>
              : <StatusTag kind="booking" status={b.status} waitMin={b.waitMin} when={b.when} refunded={b.refunded} list />}
        </div>
        <div className="lft">
          <Button variant="outline" onClick={() => toast(`Calling ${b.customer} · +91 98••• ••034`)}>Call customer</Button>
          {b.status !== 'cancelled' && b.status !== 'done' && b.status !== 'refunded'
            ? <Button variant="danger-outline" onClick={() => setCancel(true)}>Cancel and refund</Button>
            : null}
        </div>
      </div>
      <div className="ops-assign-grid">
        <div className="card ops-queue">
          <div className="h2 ops-heading">Needs a partner</div>
          {searching.map((x) => <QueueItem key={x.id} id={x.id} customer={x.customer} selected={x.id === b.id} onPick={() => setId(x.id)}
            right={<Tag tone="r">{x.waitMin} min</Tag>} sub={`${x.service} · ${x.area}`} />)}
          {!searching.length && <div className="card s m ops-item">Every booking has a partner.</div>}
          <div className="h2 ops-heading ops-subhead">Starting soon</div>
          {bookings.filter((x) => x.status === 'scheduled').map((x) => <QueueItem key={x.id} id={x.id} customer={x.customer} selected={x.id === b.id} onPick={() => setId(x.id)}
            right={<Tag tone="n">{x.when}</Tag>} sub={`${x.service.split(' · ')[0]} · ${x.service.split(' · ')[1]} · ${x.partner}`} />)}
          {STATIC_SCHEDULED.map((x) => <QueueItem key={x.id} id={x.id} customer={x.customer} right={<Tag tone="n">{x.tag}</Tag>} sub={x.sub} />)}
          <div className="h2 ops-heading ops-subhead">Assigned by hand today</div>
          {byHand.map((x) => <QueueItem key={x.id} id={x.id} customer={x.customer} selected={x.id === b.id} onPick={() => setId(x.id)}
            right={<Tag tone="x">{x.byHand}</Tag>} sub={`Found in ${x.waitMin} min · ${x.partner}`} />)}
          {STATIC_BY_HAND.map((x) => <QueueItem key={x.id} id={x.id} customer={x.customer} right={<Tag tone="x">{x.tag}</Tag>} sub={x.sub} />)}
        </div>

        <div className="card ops-detail">
          <div className="row">
            <div className="lft clk" onClick={() => go('customerDetail', { name: b.customer })}><Av face={d.face || undefined} initials={b.customer.split(' ').map((w) => w[0]).join('')} />
              <div><div className="h2 ops-heading">{b.customer}</div><div className="s m">{d.addr}</div></div></div>
            <b className="ops-amount">{inr(b.amount)}</b>
          </div>
          <div className="hr" />
          <div><b>{d.job}</b><div className="s m">{d.note}</div></div>
          <div className="hr" />
          <div className="h2">What happened</div>
          <div className="s ops-timeline">
            {d.timeline.filter(([, , k]) => free || k !== 'wait').map(([t, txt, k], i) => (
              <div key={i} className="lft ops-step"><TimelineMark kind={k} /><div><b>{t}</b> · {txt}</div></div>
            ))}
            {b.byHand && <div className="lft ops-step"><TimelineMark kind="ok" /><div><b>{b.byHand}</b> · Assigned by hand to {b.partner} · customer told</div></div>}
            {b.status === 'cancelled' && <div className="lft ops-step"><TimelineMark kind="bad" /><div><b>Now</b> · Cancelled by the team · {inr(b.amount)} refunded to UPI</div></div>}
          </div>
          <div className="hr" />
          <div className="h2">This customer before</div>
          <div className="s ops-history">
            {d.history.map(([l, r]) => <div key={l} className="row"><span>{l}</span><b>{r}</b></div>)}
            {!d.history.length && <span className="m">First visit.</span>}
          </div>
          <div className="s m">{d.prefer}</div>
          {free && (
            <div className="card row end ops-item">
              <div><b>Offer ₹30 extra to partners</b><div className="s m">Paid by Saathi, not the customer</div></div>
              <Toggle on={extra} onChange={(v) => { setExtra(v); toast(v ? 'Partners nearby now see +₹30 on this job' : 'Extra offer removed'); }} />
            </div>
          )}
        </div>

        <div className="card ops-nearby">
          <div className="row"><span className="h2 ops-heading">Nearest partners</span>
            {free && <TextLink onClick={() => { setWide(!wide); toast(wide ? 'Back to 1.5 km' : 'Searching up to 3 km · 2 more partners'); }}>{wide ? 'Back to 1.5 km' : 'Widen to 3 km'}</TextLink>}</div>
          {free ? near.map((n) => (
            <div key={n.id} className={['card row ops-partner', n.blocked ? 'ops-partner-blocked' : 'clk', pick === n.id && !n.blocked ? 'sel' : ''].filter(Boolean).join(' ')}
              onClick={() => !n.blocked && setPick(n.id)}>
              <div className="lft"><Av sm face={n.face} /><div><b>{n.name}</b><div className="s m">{n.info}</div></div></div>
              {n.blocked ? <Tag tone={n.blocked === 'Declined' ? 'x' : 'r'}>{n.blocked}</Tag>
                : <button type="button" className={`btn ops-assign-btn ${pick === n.id ? '' : 'o'}`}
                  onClick={(e) => { e.stopPropagation(); assign(n); }}>Assign</button>}
            </div>
          )) : (
            <div className="card sel ops-assigned">
              {b.partner ? <>
                <div className="lft"><Av sm face={NEAR.concat(WIDER).find((n) => n.name === b.partner)?.face ?? 'sd'} /><div><b>{b.partner}</b><div className="s m">{b.status === 'way' ? 'On the way · arrives in about 12 min' : 'On this booking'}</div></div></div>
                <div className="lft ops-actions">
                  <Button size="xs" variant="outline" onClick={() => go('live')}>Track on map</Button>
                  <Button size="xs" variant="outline" onClick={() => toast(`Calling ${b.partner}`)}>Call partner</Button>
                  {b.status === 'way' && <Button size="xs" variant="danger-outline" onClick={() => { patchBooking(b.id, { status: 'searching', partner: undefined, byHand: undefined, waitMin: b.waitMin ?? 1 }); toast(`#${b.id} is back in the queue`); }}>Unassign</Button>}
                </div>
              </> : <div className="m">No partner on this booking.</div>}
            </div>
          )}
          <div className="s m end">{free ? (pick === 'rm' ? 'Rekha is suggested: closest, free soon, and trained for deep cleaning.' : `${near.find((n) => n.id === pick)?.name} picked. Rekha M. is the suggestion: closest and free soon.`) : 'This booking does not need a partner from the team.'}</div>
        </div>
      </div>

      <Modal open={cancel} onClose={() => setCancel(false)} title={`Cancel #${b.id} and refund?`}
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setCancel(false)}>Keep booking</Button>
          <Button variant="danger" size="sm" onClick={() => { patchBooking(b.id, { status: 'cancelled' }); setCancel(false); toast(`#${b.id} cancelled · ${inr(b.amount)} back to ${b.customer} by UPI`); }}>Cancel and refund {inr(b.amount)}</Button>
        </>}>
        <div className="m">{b.customer} gets the full {inr(b.amount)} back by {b.paidBy} within 2 hours and an SMS saying sorry. This cannot be undone.</div>
      </Modal>
    </>
  );
}

export default AssignPage;
