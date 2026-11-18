/** 76 Smart operations: assignment rules, tomorrow's forecast, unusual activity. */
import React, { useState } from 'react';
import { decisions } from '@/domain';
import { Button, Columns, Kpi, KpiGrid, Modal, PageHead, Tag, TogRow } from '../../../ui';
import { useAdmin } from '../../../session';
import { EXPECTED_BOOKINGS, FORECAST, HOURS, SHORT_BY, initialAlerts, initialRules, shortColor, type AssignRules, type UnusualAlert } from '../data';
import '../automation.css';

export function SmartPage() {
  const { go, toast } = useAdmin();
  const [auto, setAuto] = useState(true);
  const [rules, setRules] = useState(initialRules);
  const [hour, setHour] = useState<number | undefined>();
  const [busyPay, setBusyPay] = useState(false);
  const [messaged, setMessaged] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [held, setHeld] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [confirmPause, setConfirmPause] = useState(false);

  const r = (k: keyof AssignRules) => (v: boolean) => { setRules({ ...rules, [k]: v }); toast(`Rule ${v ? 'on' : 'off'}. Applies to new bookings.`); };
  const resolve = (id: string, msg: string) => { setAlerts((a) => a.filter((x) => x.id !== id)); toast(msg); };
  const doAction = (_a: UnusualAlert, act: string) => {
    if (act === 'Hold payout') { setHeld(true); toast('Payout for job #2038 held until reviewed'); }
    else if (act === 'Call partner') toast('Calling Meena T.…');
    else if (act === 'See both photos') setPhotos(true);
    else if (act === 'Review account') go('customerDetail', { id: 'st' });
  };

  return <>
    <PageHead title="Smart operations" sub="Rules, forecast and alerts"
      actions={<>{auto ? <Tag tone="g">Auto-assign on</Tag> : <Tag tone="r">Auto-assign paused</Tag>}
        {auto ? <Button variant="outline" onClick={() => setConfirmPause(true)}>Pause auto-assign</Button> : <Button onClick={() => { setAuto(true); toast('Auto-assign is back on'); }}>Turn auto-assign on</Button>}</>} />
    <KpiGrid>
      <Kpi label="Assigned automatically today" value={auto ? '94%' : '—'} />
      <Kpi label="Average time to find a partner" value="41 sec" />
      <Kpi label="Bookings expected tomorrow" value="128" />
      <Kpi label="Alerts to review" value={alerts.length} tone={alerts.length > 0 ? 'alert' : 'default'} />
    </KpiGrid>
    <div className="auto-grid">
      <div className="card auto-col auto-rules" style={{ opacity: auto ? 1 : 0.55 }}>
        <div className="h2 auto-heading">How a partner is chosen</div>
        <TogRow label="Customer's favourite first" on={rules.fav} onChange={r('fav')} /><div className="hr" />
        <TogRow label={`Then nearest who can arrive in ${decisions.ops.arrivalPromiseMin} min`} on={rules.near} onChange={r('near')} /><div className="hr" />
        <TogRow label="Prefer rating 4.5 and above" on={rules.rating} onChange={r('rating')} /><div className="hr" />
        <TogRow label="Match the customer's language" on={rules.lang} onChange={r('lang')} /><div className="hr" />
        <TogRow label="Share jobs fairly across partners" on={rules.fair} onChange={r('fair')} /><div className="hr" />
        <TogRow label="Raise partner pay when no one accepts" on={rules.raise} onChange={r('raise')} />
        <div className="s m end">{auto ? `If no one accepts in ${decisions.ops.handToTeamAfterMin} minutes, the booking goes to the team to assign by hand.` : 'Paused: every booking goes to the team to assign by hand.'}</div>
      </div>
      <div className="card auto-col">
        <div className="row"><span className="h2 auto-heading">Tomorrow, by hour</span>
          <span className="s m">{hour === undefined ? 'Expected bookings vs partners available' : `${HOURS[hour]}: ${EXPECTED_BOOKINGS[hour]} bookings${SHORT_BY[hour] ? ` · short by ${SHORT_BY[hour]}` : ' · enough partners'}`}</span></div>
        <Columns flex gap={8} picked={hour} onPick={(i) => setHour(hour === i ? undefined : i)}
          bars={FORECAST.map((h, i) => ({ h, color: busyPay && (i === 2 || i === 3) ? 'var(--yellow)' : shortColor(i), title: `${HOURS[i]} · ${EXPECTED_BOOKINGS[i]} bookings` }))} />
        <div className="row s m auto-axis"><span>6 am</span><span>9 am</span><span>12 pm</span><span>3 pm</span><span>6 pm</span></div>
        <div className="hr auto-divider" />
        <div className="auto-shortfalls">
          <div className="row"><div><b>8 to 10 am · short by {busyPay ? '2' : '9'} partners</b><div className="s m">{busyPay ? `+₹${decisions.partner.busyHourExtra} a visit offered · 7 accepted` : 'Mostly Block D and Sector 18'}</div></div>
            {busyPay ? <Tag tone="n">Busy-hour pay on</Tag> : <Button size="compact" onClick={() => { setBusyPay(true); toast(`+₹${decisions.partner.busyHourExtra} a visit offered for 8 to 10 am`); }}>Offer busy-hour pay</Button>}</div>
          <div className="row"><div><b>3 to 4 pm · short by 3 partners</b><div className="s m">Block C</div></div>
            {messaged ? <Tag tone="n">22 partners messaged</Tag> : <Button size="compact" variant="outline" onClick={() => { setMessaged(true); toast('Message sent to 22 partners near Block C'); }}>Message partners</Button>}</div>
        </div>
      </div>
      <div className="card auto-col auto-alerts">
        <div className="h2 auto-heading">Unusual activity</div>
        {alerts.map((a) => (
          <div key={a.id} className={`card auto-alert ${a.level === 'High' ? 'auto-alert-high' : ''}`}>
            <div className="row"><b>{a.title}</b><Tag tone={a.level === 'High' ? 'r' : 'y'}>{a.level}</Tag></div>
            <div className="s m">{a.text}</div>
            <div className="s lft auto-alert-actions">
              {a.actions.map((act, i) => <React.Fragment key={act}>{i > 0 && <span className="m">·</span>}
                <span className="lnk" role="button" onClick={() => doAction(a, act)}>{act === 'Hold payout' && held ? 'Payout held' : act}</span></React.Fragment>)}
              <span className="m auto-spacer" />
              <span className="lnk m auto-dismiss" role="button" onClick={() => resolve(a.id, 'Marked as fine. Alert closed.')}>Dismiss</span>
            </div>
          </div>
        ))}
        {!alerts.length && <div className="card m auto-alert">Nothing to review. Nice.</div>}
        <div className="s m end">Alerts suggest; a person always decides.</div>
      </div>
    </div>

    <Modal open={confirmPause} onClose={() => setConfirmPause(false)} title="Pause auto-assign?"
      actions={<><Button variant="outline" onClick={() => setConfirmPause(false)}>Keep it on</Button><Button variant="danger" onClick={() => { setAuto(false); setConfirmPause(false); toast('Auto-assign paused. The team assigns every booking.'); }}>Pause</Button></>}>
      <div className="m">Every new booking will wait for someone in the team to assign a partner. Customers may wait longer than 15 minutes.</div>
    </Modal>
    <Modal open={photos} onClose={() => setPhotos(false)} title="Job #2029 · Geeta K."
      actions={<><Button variant="outline" onClick={() => { setPhotos(false); resolve('selfie', 'Same person. Alert closed.'); }}>Same person</Button>
        <Button variant="danger" onClick={() => { setPhotos(false); resolve('selfie', 'Geeta K. paused and payout held for #2029'); }}>Not the same · pause partner</Button></>}>
      <div className="g2">
        <div><div className="photo auto-photo">Profile photo</div><div className="s m auto-caption">From sign-up, Aug 2026</div></div>
        <div><div className="photo auto-photo">Check-in selfie</div><div className="s m auto-caption">Today, 9:02 am · match 38%</div></div>
      </div>
    </Modal>
  </>;
}

export default SmartPage;
