/** 74 · Admin live map and attendance. */
import React, { useEffect, useState } from 'react';
import { Av, I, Kpi, Pager, Tabs, Tag, useAdmin } from '../shell';

type Dot = { id: string; name: string; left: string; top: string; tone: 'job' | 'travel' | 'look'; info: string };
const DOTS: Dot[] = [
  { id: 'rm', name: 'Rekha M.', left: '22%', top: '20%', tone: 'job', info: 'Sector 21 · #2043 · arriving 11:14' },
  { id: 'kr', name: 'Kavita R.', left: '60%', top: '26%', tone: 'job', info: 'Sector 18 · 12 min left' },
  { id: 'sd', name: 'Sunita D.', left: '40%', top: '52%', tone: 'job', info: 'Block C · 38 min left' },
  { id: 'ab', name: 'Anita B.', left: '76%', top: '60%', tone: 'travel', info: 'Travelling to Sector 21 · 4 pm job' },
  { id: 'pv', name: 'Pooja V.', left: '14%', top: '66%', tone: 'travel', info: 'Travelling · Block A' },
  { id: 'mt', name: 'Meena T.', left: '52%', top: '80%', tone: 'look', info: 'Checked in 410 m from the door' },
];
const toneStyle: Record<Dot['tone'], React.CSSProperties> = {
  job: {}, travel: { background: 'var(--yellow)', color: 'var(--ink)' }, look: { background: 'var(--red)' },
};

type Row = { id: string; name: string; face: string; job: string; inT: string; late?: number; out?: string; worked: string; live?: boolean; selfie: boolean; loc: number };
const ROWS: Row[] = [
  { id: 'sd', name: 'Sunita D.', face: 'sd', job: '#2041', inT: '11:08', worked: '22 min', live: true, selfie: true, loc: 12 },
  { id: 'kr', name: 'Kavita R.', face: 'kr', job: '#2044', inT: '10:12', worked: '1 hr 18', live: true, selfie: true, loc: 8 },
  { id: 'rm', name: 'Rekha M.', face: 'rm', job: '#2040', inT: '8:02', out: '10:05', worked: '2 hr 3', selfie: true, loc: 15 },
  { id: 'ab', name: 'Anita B.', face: 'ab', job: '#2036', inT: '9:42', late: 12, out: '10:40', worked: '58 min', selfie: true, loc: 20 },
  { id: 'mt', name: 'Meena T.', face: 'mt', job: '#2038', inT: '9:15', out: '9:20', worked: '5 min', selfie: true, loc: 410 },
  { id: 'gk', name: 'Geeta K.', face: 'gk', job: '#2029', inT: '7:58', out: '8:55', worked: '57 min', selfie: false, loc: 10 },
  { id: 'pv', name: 'Pooja V.', face: 'pv', job: '#2033', inT: '8:30', out: '9:32', worked: '1 hr 2', selfie: true, loc: 6 },
];
const KPIS = {
  today: [14, 41, 3, 2], yesterday: [0, 46, 4, 1], week: [0, 212, 17, 6],
} as const;

type Day = keyof typeof KPIS;
type F = 'all' | 'late' | 'bad';

export function LivePage() {
  const { go, toast } = useAdmin();
  const [day, setDay] = useState<Day>('today');
  const [f, setF] = useState<F>('all');
  const [focus, setFocus] = useState('sd');
  const [ago, setAgo] = useState(10);
  useEffect(() => { const t = setInterval(() => setAgo((a) => (a >= 30 ? 1 : a + 1)), 1000); return () => clearInterval(t); }, []);

  const k = KPIS[day];
  const bad = (r: Row) => !r.selfie || r.loc > 100;
  const rows = ROWS.filter((r) => (f === 'all' ? true : f === 'late' ? !!r.late : bad(r)));
  const fd = DOTS.find((d) => d.id === focus);

  return (
    <>
      <div className="row">
        <div className="lft" style={{ gap: 12 }}><div className="h" style={{ fontSize: 22 }}>Live and attendance</div>
          {day === 'today' ? <Tag tone="g">Live · updated {ago} sec ago</Tag> : <Tag tone="x">{day === 'yesterday' ? 'Sunday 15 November' : '10 to 16 November'}</Tag>}</div>
        <div className="lft s">
          <Tabs value={day} onChange={setDay} items={[{ key: 'today', label: 'Today' }, { key: 'yesterday', label: 'Yesterday' }, { key: 'week', label: 'This week' }]} />
          <button className="btn o" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => toast('Exported attendance.csv')}>Export</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <Kpi label="On a job now" value={day === 'today' ? k[0] : '—'} />
        <Kpi label={day === 'today' ? 'Checked in today' : 'Check-ins'} value={k[1]} onClick={() => setF('all')} />
        <Kpi label="Late check-ins" value={k[2]} onClick={() => setF('late')} />
        <Kpi label="Selfie or location did not match" value={k[3]} red onClick={() => setF('bad')} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="map" style={{ flex: 1, height: 'auto', minHeight: 300 }}>
            <i style={{ left: 0, right: 0, top: '34%', height: 14 }} /><i style={{ left: 0, right: 0, top: '72%', height: 10 }} />
            <i style={{ top: 0, bottom: 0, left: '30%', width: 12 }} /><i style={{ top: 0, bottom: 0, left: '68%', width: 14 }} />
            {DOTS.map((d) => (
              <div key={d.id} className="dot clk" title={d.name} style={{ left: d.left, top: d.top, ...toneStyle[d.tone], ...(focus === d.id ? { boxShadow: '0 0 0 3px var(--green-d)' } : {}) }}
                onClick={() => setFocus(d.id)}><I n="user" /></div>
            ))}
            {fd && (
              <div className="card s clk" style={{ position: 'absolute', left: `calc(${fd.left} + 4%)`, top: `calc(${fd.top} - 14%)`, padding: '6px 9px', maxWidth: '60%', whiteSpace: 'nowrap' }}
                onClick={() => go('partnerDetail', { id: fd.id })}><b>{fd.name}</b> · {fd.info}</div>
            )}
          </div>
          <div className="lft s" style={{ padding: '10px 14px', gap: 14 }}>
            <span className="lft" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--green)' }} />On a job</span>
            <span className="lft" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--yellow)' }} />Travelling</span>
            <span className="lft" style={{ gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--red)' }} />Needs a look</span>
          </div>
        </div>
        <div className="card" style={{ padding: '14px 8px 4px' }}>
          <div className="row" style={{ padding: '0 10px 8px' }}>
            <span className="h2" style={{ fontSize: 15 }}>Attendance log</span>
            <Tabs value={f} onChange={setF} items={[{ key: 'all', label: `All ${k[1]}` }, { key: 'late', label: `Late ${k[2]}` }, { key: 'bad', label: `Not matched ${k[3]}` }]} />
          </div>
          <table>
            <thead><tr><th>Partner</th><th>Job</th><th>Check-in</th><th>Check-out</th><th>Worked</th><th>Selfie</th><th>Location</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="clk" style={focus === r.id ? { background: 'var(--mint)' } : undefined}
                  onClick={() => (DOTS.some((d) => d.id === r.id) && focus !== r.id ? setFocus(r.id) : go('partnerDetail', { id: r.id }))}>
                  <td><span className="lft"><Av sm face={r.face} /><b>{r.name}</b></span></td>
                  <td>{r.job}</td>
                  <td>{r.inT}{r.late ? <> <span className="tag" style={{ padding: '1px 7px' }}>{r.late} late</span></> : null}</td>
                  {r.live ? <td className="m">On job</td> : <td>{r.out}</td>}
                  {r.live ? <td className="m">{r.worked}</td> : <td>{r.worked}</td>}
                  <td>{r.selfie ? <Tag tone="n">Matched</Tag> : <Tag tone="r">Not matched</Tag>}</td>
                  <td>{r.loc > 100 ? <Tag tone="r">{r.loc} m away</Tag> : <Tag tone="n">{r.loc} m</Tag>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager text={f === 'all' ? 'Page 1 of 3 · 7 rows per page' : `${rows.length} rows`} />
        </div>
      </div>
    </>
  );
}
