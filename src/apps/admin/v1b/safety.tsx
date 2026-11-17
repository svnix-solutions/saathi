/** 89 Safety alerts */
import React, { useEffect, useState } from 'react';
import { I, Modal, Tabs, useAdmin } from '../shell';
import { clock } from './data';

type St = 'open' | 'handling' | 'closed';
type Alert = {
  id: string; kind: 'Emergency · customer' | 'Not safe · partner'; who: string; where: string; job: string; status: St;
  startedAt: number; acked: boolean; owner?: string; closedNote?: string; closedAt?: string;
  pressed: string; jobLine: string; partner: string; customer: string; callFirst: string; callSecond: string; log: { t: string; text: string }[];
};

const now = Date.now();
const alerts0: Alert[] = [
  { id: 'a1', kind: 'Emergency · customer', who: 'Meera S.', where: 'Flat 12, Block A', job: '#2042', status: 'open', startedAt: now - 2 * 60 * 1000, acked: false,
    pressed: '11:21 am, by the customer', jobLine: '#2042 · Kitchen & bath · started 11:12', partner: 'Rekha M. · 4.6 · 310 visits', customer: 'Meera S.',
    callFirst: 'Meera S.', callSecond: 'Rekha M.', log: [{ t: '11:21', text: 'Alert raised, customer app' }] },
  { id: 'a2', kind: 'Not safe · partner', who: 'Kavita R.', where: 'Sector 18', job: '#2044', status: 'handling', startedAt: now - 9 * 60 * 1000, acked: true, owner: 'Ops lead',
    pressed: '11:14 am, by the partner', jobLine: '#2044 · General cleaning · started 11:00', partner: 'Kavita R. · 4.7 · 188 visits', customer: 'Vikram J.',
    callFirst: 'Kavita R.', callSecond: 'Vikram J.', log: [{ t: '11:14', text: 'Alert raised, partner app' }, { t: '11:15', text: 'Opened by Ops lead' }, { t: '11:17', text: 'Ops lead called Kavita R. · she is outside, safe' }] },
  { id: 'a3', kind: 'Emergency · customer', who: 'Nitin K.', where: 'House 4, Block C', job: '#2029', status: 'closed', startedAt: now - 100 * 60 * 1000, acked: true, closedNote: 'Pressed by mistake', closedAt: '9:40 am',
    pressed: '9:38 am, by the customer', jobLine: '#2029 · General · started 9:30', partner: 'Sunita D. · 4.8 · 142 visits', customer: 'Nitin K.',
    callFirst: 'Nitin K.', callSecond: 'Sunita D.', log: [{ t: '9:38', text: 'Alert raised, customer app' }, { t: '9:39', text: 'Opened by Support 1' }, { t: '9:40', text: 'Closed · pressed by mistake' }] },
  { id: 'a4', kind: 'Not safe · partner', who: 'Pooja V.', where: 'Block A', job: '#2017', status: 'closed', startedAt: now - 190 * 60 * 1000, acked: true, closedNote: 'Dog at the gate', closedAt: '8:15 am',
    pressed: '8:09 am, by the partner', jobLine: '#2017 · Dishes · started 8:05', partner: 'Pooja V. · 4.5 · 61 visits', customer: 'Farah A.',
    callFirst: 'Pooja V.', callSecond: 'Farah A.', log: [{ t: '8:09', text: 'Alert raised, partner app' }, { t: '8:10', text: 'Opened by Ops lead' }, { t: '8:15', text: 'Closed · dog at the gate, customer tied it up' }] },
];

const mmss = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

export function Safety(_: { params: Record<string, any> }) {
  const { toast } = useAdmin();
  const [alerts, setAlerts] = useState(alerts0);
  const [selId, setSelId] = useState('a1');
  const [tab, setTab] = useState<'all' | St>('all');
  const [note, setNote] = useState('');
  const [closing, setClosing] = useState(false);
  const [t, setT] = useState(Date.now());
  useEffect(() => { const h = setInterval(() => setT(Date.now()), 1000); return () => clearInterval(h); }, []);

  const a = alerts.find((x) => x.id === selId) ?? alerts[0];
  const upd = (id: string, f: (x: Alert) => Partial<Alert>) => setAlerts((l) => l.map((x) => (x.id === id ? { ...x, ...f(x) } : x)));
  const log = (text: string) => upd(a.id, (x) => ({ log: [...x.log, { t: clock(), text }] }));
  const n = (s: St) => alerts.filter((x) => x.status === s).length;
  const shown = alerts.filter((x) => tab === 'all' || x.status === tab);

  const ack = () => { upd(a.id, (x) => ({ acked: true, log: [...x.log, { t: clock(), text: 'Opened by Admin' }] })); toast('Alert acknowledged · the ringing stops on other screens'); };
  const call = (who: string) => {
    if (a.status === 'closed') { toast('This alert is closed'); return; }
    if (!a.acked) upd(a.id, () => ({ acked: true }));
    log(`Admin called ${who}`); toast(`Calling ${who}…`);
  };
  const passOn = () => {
    if (a.status === 'closed') { toast('This alert is closed'); return; }
    upd(a.id, (x) => ({ status: 'handling', acked: true, owner: 'Ops lead', log: [...x.log, { t: clock(), text: 'Passed to Ops lead' + (note ? ` · ${note}` : '') }] }));
    setNote(''); toast('Passed to the ops lead');
  };
  const addNote = () => { if (!note.trim()) return; log(`Note: ${note.trim()}`); setNote(''); };
  const close = () => {
    if (!note.trim()) { toast('Write what happened before closing'); return; }
    upd(a.id, (x) => ({ status: 'closed', acked: true, closedNote: note.trim(), closedAt: clock(), log: [...x.log, { t: clock(), text: `Closed by Admin · ${note.trim()}` }] }));
    setNote(''); setClosing(false); toast('Alert closed');
  };

  const red = a.status === 'open';
  return <>
    <div className="row"><div className="lft" style={{ gap: 12 }}><div className="h" style={{ fontSize: 22 }}>Safety alerts</div>{n('open') > 0 ? <span className="tag r">{n('open')} open</span> : <span className="tag n">All handled</span>}</div>
      <Tabs value={tab} onChange={setTab} items={[{ key: 'all', label: 'All' }, { key: 'open', label: `Open ${n('open')}` }, { key: 'handling', label: `Being handled ${n('handling')}` }, { key: 'closed', label: `Closed today ${n('closed')}` }]} /></div>

    {alerts.some((x) => x.status === 'open' && !x.acked) && (
      <div className="card row s" style={{ padding: '9px 12px', borderColor: 'var(--red)', background: '#fdf1ef' }}>
        <span className="lft"><I n="bell" style={{ color: 'var(--red)' }} /><b style={{ color: 'var(--red)' }}>New alert ringing on every admin screen</b></span>
        <button className="btn r sm" onClick={() => { const o = alerts.find((x) => x.status === 'open' && !x.acked)!; setSelId(o.id); upd(o.id, (x) => ({ acked: true, log: [...x.log, { t: clock(), text: 'Opened by Admin' }] })); toast('Alert acknowledged'); }}>Acknowledge</button>
      </div>)}

    <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.3fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="h2" style={{ fontSize: 15 }}>Alerts</div>
        {shown.map((x) => {
          const isOpen = x.status === 'open';
          return (
            <div key={x.id} className="card clk" onClick={() => { setSelId(x.id); setNote(''); }}
              style={{ padding: '9px 11px', ...(isOpen ? { borderColor: 'var(--red)', background: '#fdf1ef' } : {}), ...(x.status === 'closed' ? { opacity: .7 } : {}), ...(x.id === a.id && !isOpen ? { borderColor: 'var(--green)', background: 'var(--mint)' } : {}), ...(x.id === a.id ? { boxShadow: '0 0 0 2px var(--green) inset' } : {}) }}>
              <div className="row"><b style={isOpen ? { color: 'var(--red)' } : undefined}>{x.kind}</b>
                {isOpen ? <span className="tag r">{mmss(t - x.startedAt)}</span> : x.status === 'handling' ? <span className="tag">Handling · {mmss(t - x.startedAt)}</span> : <span className="tag x">Closed</span>}</div>
              <div className="s m">{x.status === 'closed' ? `${x.closedNote} · ${x.closedAt}` : `${x.who} · ${x.where} · job ${x.job}${x.owner ? ' · ' + x.owner : ''}`}</div>
            </div>);
        })}
        {!shown.length && <div className="s m">Nothing here.</div>}
        <div className="s m end">A new alert rings on every signed-in admin screen until someone opens it.</div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="map" style={{ flex: 1, height: 'auto', minHeight: 220 }}><i style={{ left: 0, right: 0, top: '38%', height: 14 }} /><i style={{ top: 0, bottom: 0, left: '44%', width: 14 }} /><i style={{ left: 0, right: 0, top: '74%', height: 10 }} />
          {red && <div style={{ position: 'absolute', left: 'calc(44% - 52px)', top: 'calc(38% - 52px)', width: 118, height: 118, borderRadius: '50%', background: 'rgba(179,38,30,.2)' }} />}
          <div className="dot" style={{ left: 'calc(44% - 8px)', top: 'calc(38% - 8px)', background: red ? 'var(--red)' : 'var(--green)' }}><I n="home" /></div>
          <div className="dot" style={{ left: 'calc(44% + 30px)', top: 'calc(38% + 10px)', background: 'var(--yellow)', color: 'var(--ink)' }}><I n="user" /></div>
          <div className="card s" style={{ position: 'absolute', left: 14, top: 14, padding: '6px 9px' }}><b>{a.where}</b> · {a.kind.includes('customer') ? 'customer and partner are both here' : 'partner is here'}</div>
        </div>
        <div style={{ padding: '12px 14px', display: 'grid', gap: 7 }} className="s">
          <div className="row"><span className="m">Pressed</span><b>{a.pressed}</b></div>
          <div className="row"><span className="m">Job</span><b>{a.jobLine}</b></div>
          <div className="row"><span className="m">Partner on the job</span><b>{a.partner}</b></div>
          <div className="row"><span className="m">{a.status === 'closed' ? 'Status' : 'Open for'}</span><b style={red ? { color: 'var(--red)' } : undefined}>{a.status === 'closed' ? `Closed ${a.closedAt}` : mmss(t - a.startedAt)}</b></div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15 }}>Do now</div>
          {a.status === 'open' && !a.acked && <button className="btn y" style={{ padding: 10 }} onClick={ack}>Acknowledge alert</button>}
          <button className="btn" style={{ padding: 11, background: 'var(--red)' }} onClick={() => call(a.callFirst)}>Call {a.callFirst}</button>
          <button className="btn o" style={{ padding: 9 }} onClick={() => call(a.callSecond)}>Call {a.callSecond}</button>
          <button className="btn o" style={{ padding: 9 }} onClick={() => { if (a.status === 'closed') { toast('This alert is closed'); return; } log('Area lead sent to ' + a.where); toast(`Area lead is on the way to ${a.where}`); }}>Send the area lead to the address</button>
          <div className="s m">If there is danger to anyone, call 112 first. The address above can be read out.</div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15 }}>Record</div>
          {a.log.map((l, i) => <div key={i} className="s"><b>{l.t}</b> · {l.text}</div>)}
          {a.status !== 'closed' ? <>
            <textarea className="inp s" rows={2} style={{ padding: '9px 11px', resize: 'vertical' }} placeholder="Add a note on what happened" value={note} onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }} />
            <div className="g2 end"><button className="btn o" style={{ padding: 9 }} onClick={passOn}>Pass to ops lead</button><button className="btn" style={{ padding: 10 }} onClick={() => setClosing(true)}>Close alert</button></div>
          </> : <div className="card sel s end" style={{ padding: '9px 11px' }}><b>Closed.</b> {a.closedNote}</div>}
        </div>
      </div>
    </div>

    <Modal open={closing} onClose={() => setClosing(false)} title="Close this alert"
      actions={<><button className="btn o sm" onClick={() => setClosing(false)}>Not yet</button><button className="btn sm" onClick={close}>Close alert</button></>}>
      <div className="s m">{a.kind} · {a.who} · job {a.job}</div>
      <textarea className="inp" rows={3} placeholder="What happened and what was done" value={note} onChange={(e) => setNote(e.target.value)} autoFocus />
      <div className="lft" style={{ flexWrap: 'wrap', gap: 6 }}>
        {['Pressed by mistake', 'Spoke to both, all safe', 'Area lead visited', 'Police called'].map((q) => <span key={q} className="pill s clk" style={{ padding: '6px 10px' }} onClick={() => setNote(q)}>{q}</span>)}
      </div>
    </Modal>
  </>;
}
