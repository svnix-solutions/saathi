/** 89 Safety alerts */
import React, { useState } from 'react';
import { mmss } from '@/domain';
import { Button, I, Modal, Tabs, Tag } from '../../../ui';
import { useAdmin } from '../../../session';
import type { PageParams } from '../../../navigation';
import { clock } from '../../../fixtures';
import { QUICK_NOTES, initialAlerts, type AlertStatus, type SafetyAlert } from '../data';
import { useNow } from '../hooks/useNow';
import '../safety.css';

/** "m:ss" since the alert was raised. */
const openFor = (now: number, a: SafetyAlert) => mmss((now - a.startedAt) / 1000);

export function SafetyPage(_: { params: PageParams }) {
  const { toast } = useAdmin();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selId, setSelId] = useState('a1');
  const [tab, setTab] = useState<'all' | AlertStatus>('all');
  const [note, setNote] = useState('');
  const [closing, setClosing] = useState(false);
  const t = useNow();

  const a = alerts.find((x) => x.id === selId) ?? alerts[0];
  const upd = (id: string, f: (x: SafetyAlert) => Partial<SafetyAlert>) => setAlerts((l) => l.map((x) => (x.id === id ? { ...x, ...f(x) } : x)));
  const log = (text: string) => upd(a.id, (x) => ({ log: [...x.log, { t: clock(), text }] }));
  const n = (s: AlertStatus) => alerts.filter((x) => x.status === s).length;
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
  const sendAreaLead = () => {
    if (a.status === 'closed') { toast('This alert is closed'); return; }
    log('Area lead sent to ' + a.where); toast(`Area lead is on the way to ${a.where}`);
  };
  const ackRinging = () => {
    const o = alerts.find((x) => x.status === 'open' && !x.acked)!;
    setSelId(o.id); upd(o.id, (x) => ({ acked: true, log: [...x.log, { t: clock(), text: 'Opened by Admin' }] })); toast('Alert acknowledged');
  };
  const addNote = () => { if (!note.trim()) return; log(`Note: ${note.trim()}`); setNote(''); };
  const close = () => {
    if (!note.trim()) { toast('Write what happened before closing'); return; }
    upd(a.id, (x) => ({ status: 'closed', acked: true, closedNote: note.trim(), closedAt: clock(), log: [...x.log, { t: clock(), text: `Closed by Admin · ${note.trim()}` }] }));
    setNote(''); setClosing(false); toast('Alert closed');
  };

  const red = a.status === 'open';
  return <>
    <div className="row"><div className="lft saf-title-group"><div className="h saf-title">Safety alerts</div>{n('open') > 0 ? <Tag tone="r">{n('open')} open</Tag> : <Tag tone="n">All handled</Tag>}</div>
      <Tabs value={tab} onChange={setTab} items={[{ key: 'all', label: 'All' }, { key: 'open', label: `Open ${n('open')}` }, { key: 'handling', label: `Being handled ${n('handling')}` }, { key: 'closed', label: `Closed today ${n('closed')}` }]} /></div>

    {alerts.some((x) => x.status === 'open' && !x.acked) && (
      <div className="card row s saf-ringing">
        <span className="lft"><I n="bell" className="saf-alert-text" /><b className="saf-alert-text">New alert ringing on every admin screen</b></span>
        <Button variant="danger" size="sm" onClick={ackRinging}>Acknowledge</Button>
      </div>)}

    <div className="saf-grid">
      <div className="card saf-col">
        <div className="h2 saf-heading">Alerts</div>
        {shown.map((x) => {
          const isOpen = x.status === 'open';
          const cls = ['card clk saf-item', isOpen && 'saf-item-open', x.status === 'closed' && 'saf-item-closed',
            x.id === a.id && !isOpen && 'saf-item-current', x.id === a.id && 'saf-item-selected'].filter(Boolean).join(' ');
          return (
            <div key={x.id} className={cls} onClick={() => { setSelId(x.id); setNote(''); }}>
              <div className="row"><b className={isOpen ? 'saf-alert-text' : undefined}>{x.kind}</b>
                {isOpen ? <Tag tone="r">{openFor(t, x)}</Tag> : x.status === 'handling' ? <Tag>Handling · {openFor(t, x)}</Tag> : <Tag tone="x">Closed</Tag>}</div>
              <div className="s m">{x.status === 'closed' ? `${x.closedNote} · ${x.closedAt}` : `${x.who} · ${x.where} · job ${x.job}${x.owner ? ' · ' + x.owner : ''}`}</div>
            </div>);
        })}
        {!shown.length && <div className="s m">Nothing here.</div>}
        <div className="s m end">A new alert rings on every signed-in admin screen until someone opens it.</div>
      </div>

      <div className="card saf-map-card">
        <div className="map saf-map"><i className="saf-road-a" /><i className="saf-road-b" /><i className="saf-road-c" />
          {red && <div className="saf-pulse" />}
          <div className={`dot saf-dot-home ${red ? 'saf-dot-alert' : ''}`}><I n="home" /></div>
          <div className="dot saf-dot-partner"><I n="user" /></div>
          <div className="card s saf-map-label"><b>{a.where}</b> · {a.kind.includes('customer') ? 'customer and partner are both here' : 'partner is here'}</div>
        </div>
        <div className="s saf-facts">
          <div className="row"><span className="m">Pressed</span><b>{a.pressed}</b></div>
          <div className="row"><span className="m">Job</span><b>{a.jobLine}</b></div>
          <div className="row"><span className="m">Partner on the job</span><b>{a.partner}</b></div>
          <div className="row"><span className="m">{a.status === 'closed' ? 'Status' : 'Open for'}</span><b className={red ? 'saf-alert-text' : undefined}>{a.status === 'closed' ? `Closed ${a.closedAt}` : openFor(t, a)}</b></div>
        </div>
      </div>

      <div className="saf-stack">
        <div className="card saf-col">
          <div className="h2 saf-heading">Do now</div>
          {a.status === 'open' && !a.acked && <Button variant="accent" size="lg" className="saf-action-main" onClick={ack}>Acknowledge alert</Button>}
          <Button variant="danger" size="lg" className="saf-call" onClick={() => call(a.callFirst)}>Call {a.callFirst}</Button>
          <Button variant="outline" size="lg" className="saf-action" onClick={() => call(a.callSecond)}>Call {a.callSecond}</Button>
          <Button variant="outline" size="lg" className="saf-action" onClick={sendAreaLead}>Send the area lead to the address</Button>
          <div className="s m">If there is danger to anyone, call 112 first. The address above can be read out.</div>
        </div>
        <div className="card saf-col saf-fill">
          <div className="h2 saf-heading">Record</div>
          {a.log.map((l, i) => <div key={i} className="s"><b>{l.t}</b> · {l.text}</div>)}
          {a.status !== 'closed' ? <>
            <textarea className="inp s saf-note" rows={2} placeholder="Add a note on what happened" value={note} onChange={(e) => setNote(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }} />
            <div className="g2 end">
              <Button variant="outline" size="lg" className="saf-action" onClick={passOn}>Pass to ops lead</Button>
              <Button size="lg" className="saf-action-main" onClick={() => setClosing(true)}>Close alert</Button>
            </div>
          </> : <div className="card sel s end saf-msg"><b>Closed.</b> {a.closedNote}</div>}
        </div>
      </div>
    </div>

    <Modal open={closing} onClose={() => setClosing(false)} title="Close this alert"
      actions={<><Button variant="outline" size="sm" onClick={() => setClosing(false)}>Not yet</Button><Button size="sm" onClick={close}>Close alert</Button></>}>
      <div className="s m">{a.kind} · {a.who} · job {a.job}</div>
      <textarea className="inp" rows={3} placeholder="What happened and what was done" value={note} onChange={(e) => setNote(e.target.value)} autoFocus />
      <div className="lft saf-quick-list">
        {QUICK_NOTES.map((q) => <span key={q} className="pill s clk saf-quick" role="button" onClick={() => setNote(q)}>{q}</span>)}
      </div>
    </Modal>
  </>;
}

export default SafetyPage;
