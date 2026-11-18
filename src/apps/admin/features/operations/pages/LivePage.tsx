/** 74 · Admin live map and attendance. */
import React, { useState } from 'react';
import { Av, Button, I, Kpi, KpiGrid, Pager, TableCard, Tabs, Tag } from '../../../ui';
import { useAdmin } from '../../../session';
import { MapLegend } from '../components/MapLegend';
import { useUpdatedAgo } from '../hooks/useUpdatedAgo';
import { ATTENDANCE, DOTS, LIVE_KPIS, MAX_CHECKIN_METRES, type AttendanceFilter, type DotTone, type LiveDay } from '../data';
import { matchAttendance } from '../filters';
import '../operations.css';

const dotClass: Record<DotTone, string> = { job: '', travel: 'ops-dot-travel', look: 'ops-dot-look' };

export function LivePage() {
  const { go, toast } = useAdmin();
  const [day, setDay] = useState<LiveDay>('today');
  const [f, setF] = useState<AttendanceFilter>('all');
  const [focus, setFocus] = useState('sd');
  const ago = useUpdatedAgo();

  const k = LIVE_KPIS[day];
  const rows = ATTENDANCE.filter((r) => matchAttendance(f, r));
  const fd = DOTS.find((d) => d.id === focus);

  return (
    <>
      <div className="row">
        <div className="lft ops-title-group"><div className="h ops-title">Live and attendance</div>
          {day === 'today' ? <Tag tone="g">Live · updated {ago} sec ago</Tag> : <Tag tone="x">{day === 'yesterday' ? 'Sunday 15 November' : '10 to 16 November'}</Tag>}</div>
        <div className="lft s">
          <Tabs value={day} onChange={setDay} items={[{ key: 'today', label: 'Today' }, { key: 'yesterday', label: 'Yesterday' }, { key: 'week', label: 'This week' }]} />
          <Button variant="outline" size="lg" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => toast('Exported attendance.csv')}>Export</Button>
        </div>
      </div>
      <KpiGrid>
        <Kpi label="On a job now" value={day === 'today' ? k[0] : '—'} />
        <Kpi label={day === 'today' ? 'Checked in today' : 'Check-ins'} value={k[1]} onClick={() => setF('all')} />
        <Kpi label="Late check-ins" value={k[2]} onClick={() => setF('late')} />
        <Kpi label="Selfie or location did not match" value={k[3]} tone="alert" onClick={() => setF('bad')} />
      </KpiGrid>
      <div className="ops-live-grid">
        <div className="card ops-map-card">
          <div className="map ops-map">
            <i className="ops-road-a" /><i className="ops-road-b" />
            <i className="ops-road-c" /><i className="ops-road-d" />
            {DOTS.map((d) => (
              <div key={d.id} className={['dot clk', dotClass[d.tone], focus === d.id ? 'ops-dot-focus' : ''].filter(Boolean).join(' ')} title={d.name}
                role="button" aria-label={d.name} style={{ left: d.left, top: d.top }}
                onClick={() => setFocus(d.id)}><I n="user" /></div>
            ))}
            {fd && (
              <div className="card s clk ops-map-popup" style={{ left: `calc(${fd.left} + 4%)`, top: `calc(${fd.top} - 14%)` }}
                onClick={() => go('partnerDetail', { id: fd.id })}><b>{fd.name}</b> · {fd.info}</div>
            )}
          </div>
          <MapLegend />
        </div>
        <TableCard title="Attendance log"
          right={<Tabs value={f} onChange={setF} items={[{ key: 'all', label: `All ${k[1]}` }, { key: 'late', label: `Late ${k[2]}` }, { key: 'bad', label: `Not matched ${k[3]}` }]} />}
          footer={<Pager text={f === 'all' ? 'Page 1 of 3 · 7 rows per page' : `${rows.length} rows`} />}>
          <table>
            <thead><tr><th>Partner</th><th>Job</th><th>Check-in</th><th>Check-out</th><th>Worked</th><th>Selfie</th><th>Location</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={focus === r.id ? 'clk ops-row-focus' : 'clk'}
                  onClick={() => (DOTS.some((d) => d.id === r.id) && focus !== r.id ? setFocus(r.id) : go('partnerDetail', { id: r.id }))}>
                  <td><span className="lft"><Av sm face={r.face} /><b>{r.name}</b></span></td>
                  <td>{r.job}</td>
                  <td>{r.inT}{r.late ? <> <Tag style={{ padding: '1px 7px' }}>{r.late} late</Tag></> : null}</td>
                  {r.live ? <td className="m">On job</td> : <td>{r.out}</td>}
                  {r.live ? <td className="m">{r.worked}</td> : <td>{r.worked}</td>}
                  <td>{r.selfie ? <Tag tone="n">Matched</Tag> : <Tag tone="r">Not matched</Tag>}</td>
                  <td>{r.loc > MAX_CHECKIN_METRES ? <Tag tone="r">{r.loc} m away</Tag> : <Tag tone="n">{r.loc} m</Tag>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>
    </>
  );
}

export default LivePage;
