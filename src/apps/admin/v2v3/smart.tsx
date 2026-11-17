/** 76 Smart operations: assignment rules, tomorrow's forecast, unusual activity. */
import React, { useState } from 'react';
import { Kpi, Modal, Tag, useAdmin } from '../shell';
import { decisions } from '@/data/decisions';
import { Btn, Columns, KPI_GRID, TogRow } from './ui';

const hours = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'];
const forecast = [30, 62, 100, 88, 55, 34, 28, 40, 58, 76, 64, 36];
const bookings = [6, 12, 20, 18, 11, 7, 6, 8, 12, 15, 13, 7];
const short = [0, 0, 5, 4, 0, 0, 0, 0, 0, 3, 0, 0];
const color = (i: number) => (short[i] >= 4 ? 'var(--red)' : short[i] > 0 ? 'var(--yellow)' : 'var(--mint)');

type Alert = { id: string; title: string; level: 'High' | 'Medium'; text: string; actions: string[] };
const initialAlerts: Alert[] = [
  { id: 'loc', title: 'Location looks faked', level: 'High', text: 'Meena T. checked in 410 m from the door, then out after 5 min. Job #2038.', actions: ['Hold payout', 'Call partner'] },
  { id: 'selfie', title: 'Selfie did not match', level: 'High', text: 'Geeta K., job #2029. Someone else may have done the visit.', actions: ['See both photos'] },
  { id: 'refunds', title: 'Many refunds, one customer', level: 'Medium', text: '4 refund requests in 2 weeks from one account.', actions: ['Review account'] },
];

export function Smart() {
  const { go, toast } = useAdmin();
  const [auto, setAuto] = useState(true);
  const [rules, setRules] = useState({ fav: true, near: true, rating: true, lang: true, fair: true, raise: false });
  const [hour, setHour] = useState<number | undefined>();
  const [busyPay, setBusyPay] = useState(false);
  const [messaged, setMessaged] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [held, setHeld] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [confirmPause, setConfirmPause] = useState(false);

  const r = (k: keyof typeof rules) => (v: boolean) => { setRules({ ...rules, [k]: v }); toast(`Rule ${v ? 'on' : 'off'}. Applies to new bookings.`); };
  const resolve = (id: string, msg: string) => { setAlerts((a) => a.filter((x) => x.id !== id)); toast(msg); };
  const doAction = (a: Alert, act: string) => {
    if (act === 'Hold payout') { setHeld(true); toast('Payout for job #2038 held until reviewed'); }
    else if (act === 'Call partner') toast('Calling Meena T.…');
    else if (act === 'See both photos') setPhotos(true);
    else if (act === 'Review account') go('customerDetail', { id: 'st' });
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Smart operations</div><div className="m">Rules, forecast and alerts</div></div>
      <div className="lft">{auto ? <Tag tone="g">Auto-assign on</Tag> : <Tag tone="r">Auto-assign paused</Tag>}
        {auto ? <Btn o onClick={() => setConfirmPause(true)}>Pause auto-assign</Btn> : <Btn onClick={() => { setAuto(true); toast('Auto-assign is back on'); }}>Turn auto-assign on</Btn>}</div></div>
    <div style={KPI_GRID}>
      <Kpi label="Assigned automatically today" value={auto ? '94%' : '—'} />
      <Kpi label="Average time to find a partner" value="41 sec" />
      <Kpi label="Bookings expected tomorrow" value="128" />
      <Kpi label="Alerts to review" value={alerts.length} red={alerts.length > 0} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: auto ? 1 : 0.55 }}>
        <div className="h2" style={{ fontSize: 15 }}>How a partner is chosen</div>
        <TogRow label="Customer's favourite first" on={rules.fav} onChange={r('fav')} /><div className="hr" />
        <TogRow label={`Then nearest who can arrive in ${decisions.ops.arrivalPromiseMin} min`} on={rules.near} onChange={r('near')} /><div className="hr" />
        <TogRow label="Prefer rating 4.5 and above" on={rules.rating} onChange={r('rating')} /><div className="hr" />
        <TogRow label="Match the customer's language" on={rules.lang} onChange={r('lang')} /><div className="hr" />
        <TogRow label="Share jobs fairly across partners" on={rules.fair} onChange={r('fair')} /><div className="hr" />
        <TogRow label="Raise partner pay when no one accepts" on={rules.raise} onChange={r('raise')} />
        <div className="s m end">{auto ? `If no one accepts in ${decisions.ops.handToTeamAfterMin} minutes, the booking goes to the team to assign by hand.` : 'Paused: every booking goes to the team to assign by hand.'}</div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="row"><span className="h2" style={{ fontSize: 15 }}>Tomorrow, by hour</span>
          <span className="s m">{hour === undefined ? 'Expected bookings vs partners available' : `${hours[hour]}: ${bookings[hour]} bookings${short[hour] ? ` · short by ${short[hour]}` : ' · enough partners'}`}</span></div>
        <Columns flex gap={8} picked={hour} onPick={(i) => setHour(hour === i ? undefined : i)}
          bars={forecast.map((h, i) => ({ h, color: busyPay && (i === 2 || i === 3) ? 'var(--yellow)' : color(i), title: `${hours[i]} · ${bookings[i]} bookings` }))} />
        <div className="row s m" style={{ marginTop: 6 }}><span>6 am</span><span>9 am</span><span>12 pm</span><span>3 pm</span><span>6 pm</span></div>
        <div className="hr" style={{ margin: '12px 0' }} />
        <div style={{ display: 'grid', gap: 8 }}>
          <div className="row"><div><b>8 to 10 am · short by {busyPay ? '2' : '9'} partners</b><div className="s m">{busyPay ? `+₹${decisions.partner.busyHourExtra} a visit offered · 7 accepted` : 'Mostly Block D and Sector 18'}</div></div>
            {busyPay ? <Tag tone="n">Busy-hour pay on</Tag> : <Btn sm onClick={() => { setBusyPay(true); toast(`+₹${decisions.partner.busyHourExtra} a visit offered for 8 to 10 am`); }}>Offer busy-hour pay</Btn>}</div>
          <div className="row"><div><b>3 to 4 pm · short by 3 partners</b><div className="s m">Block C</div></div>
            {messaged ? <Tag tone="n">22 partners messaged</Tag> : <Btn o sm onClick={() => { setMessaged(true); toast('Message sent to 22 partners near Block C'); }}>Message partners</Btn>}</div>
        </div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <div className="h2" style={{ fontSize: 15 }}>Unusual activity</div>
        {alerts.map((a) => (
          <div key={a.id} className="card" style={{ padding: '10px 11px', ...(a.level === 'High' ? { borderColor: 'var(--red)' } : {}) }}>
            <div className="row"><b>{a.title}</b><Tag tone={a.level === 'High' ? 'r' : 'y'}>{a.level}</Tag></div>
            <div className="s m">{a.text}</div>
            <div className="s lft" style={{ marginTop: 6, gap: 6 }}>
              {a.actions.map((act, i) => <React.Fragment key={act}>{i > 0 && <span className="m">·</span>}
                <span className="lnk" onClick={() => doAction(a, act)}>{act === 'Hold payout' && held ? 'Payout held' : act}</span></React.Fragment>)}
              <span className="m" style={{ marginLeft: 'auto' }} />
              <span className="lnk m" style={{ color: 'var(--mut)' }} onClick={() => resolve(a.id, 'Marked as fine. Alert closed.')}>Dismiss</span>
            </div>
          </div>
        ))}
        {!alerts.length && <div className="card m" style={{ padding: '10px 11px' }}>Nothing to review. Nice.</div>}
        <div className="s m end">Alerts suggest; a person always decides.</div>
      </div>
    </div>

    <Modal open={confirmPause} onClose={() => setConfirmPause(false)} title="Pause auto-assign?"
      actions={<><Btn o onClick={() => setConfirmPause(false)}>Keep it on</Btn><Btn red onClick={() => { setAuto(false); setConfirmPause(false); toast('Auto-assign paused. The team assigns every booking.'); }}>Pause</Btn></>}>
      <div className="m">Every new booking will wait for someone in the team to assign a partner. Customers may wait longer than 15 minutes.</div>
    </Modal>
    <Modal open={photos} onClose={() => setPhotos(false)} title="Job #2029 · Geeta K."
      actions={<><Btn o onClick={() => { setPhotos(false); resolve('selfie', 'Same person. Alert closed.'); }}>Same person</Btn>
        <Btn red onClick={() => { setPhotos(false); resolve('selfie', 'Geeta K. paused and payout held for #2029'); }}>Not the same · pause partner</Btn></>}>
      <div className="g2">
        <div><div className="photo" style={{ height: 150 }}>Profile photo</div><div className="s m" style={{ marginTop: 4 }}>From sign-up, Aug 2026</div></div>
        <div><div className="photo" style={{ height: 150 }}>Check-in selfie</div><div className="s m" style={{ marginTop: 4 }}>Today, 9:02 am · match 38%</div></div>
      </div>
    </Modal>
  </>;
}
