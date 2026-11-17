/** 90 Services and prices */
import React, { useState } from 'react';
import { Modal, Toggle, useAdmin } from '../shell';
import { decisions, services as svc0, type Category, type ServiceId } from '../../../data/decisions';
import { inr } from './data';

type Task = { name: string; time: string; on: boolean };
type Svc = { id: string; name: string; category: Category; per30: number; needs: string | null; live: boolean; blurb: string; tasks: Task[] | null; trained: number };

const designNames: Partial<Record<ServiceId, string>> = { kitchenBath: 'Kitchen & bathroom scrub' };
const kitchenTasks: Task[] = [
  { name: 'Bathrooms', time: '45 min each', on: true }, { name: 'Kitchen with cabinets', time: '1 hr', on: true },
  { name: 'Fridge inside', time: '30 min', on: true }, { name: 'Ceiling fans', time: '15 min each', on: true }, { name: 'Kitchen slab', time: '30 min', on: true },
];
const work: Record<Category, string> = { cleaning: 'House help', nursing: 'Nurse', repair: 'Home service', barber: 'Barber' };
/** Specialisation a partner needs before being sent (see the professions page). */
const needs: Partial<Record<ServiceId, string>> = { kitchenBath: 'Deep cleaning', electrician: 'Electrician', plumber: 'Plumber', kidsHaircut: 'Kids' };
const services0: Svc[] = svc0.map((s) => {
  const id = s.id;
  const tasks = id === 'custom' ? null : id === 'kitchenBath' ? kitchenTasks : s.tasks.map((t) => ({ name: t, time: '30 min', on: true }));
  return {
    id, name: designNames[id] ?? s.name, category: s.category, per30: s.per30, needs: needs[id] ?? null, live: id !== 'custom',
    blurb: id === 'kitchenBath' ? 'Bathrooms, slabs, cabinets, fridge, fans' : id === 'custom' ? 'You choose the chores' : s.sub ?? s.tasks.join(', '),
    tasks, trained: id === 'kitchenBath' ? 31 : 0,
  };
});

export function Services(_: { params: Record<string, any> }) {
  const { toast, roles, go } = useAdmin();
  const canPrice = roles.includes('Owner');
  const [list, setList] = useState(services0);
  const [edit, setEdit] = useState<Record<string, string>>({});
  const [selId, setSelId] = useState('kitchenBath');
  const [newTask, setNewTask] = useState<{ name: string; time: string } | null>(null);
  const [addSvc, setAddSvc] = useState(false);
  const [ns, setNs] = useState<{ name: string; per30: string; category: Category; needs: string }>({ name: '', per30: '99', category: 'cleaning', needs: '' });
  const [rulesOpen, setRulesOpen] = useState(false);
  const [rules, setRules] = useState({
    'Shortest visit': '30 min', 'Longest visit': '3 hr', 'Booked in blocks of': '30 min',
    'Monthly plan saving': `${Math.round(decisions.prices.monthlyPlanSaving * 100)}%`,
    'Free cancellation until': `${decisions.customer.freeCancelUntilHrs} hr before`, 'Late cancellation fee': inr(decisions.customer.lateCancelFee),
  } as Record<string, string>);
  const [rulesDraft, setRulesDraft] = useState(rules);
  const sel = list.find((s) => s.id === selId) ?? list[0];
  const upd = (id: string, p: Partial<Svc>) => setList((l) => l.map((s) => (s.id === id ? { ...s, ...p } : s)));

  const commitPrice = (s: Svc) => {
    const raw = edit[s.id]; if (raw === undefined) return;
    const v = Number(raw);
    setEdit((e) => { const n = { ...e }; delete n[s.id]; return n; });
    if (!canPrice) { toast('Only an Owner can change service prices'); return; }
    if (!v || v < 20 || v > 2000) { toast('Price must be between ₹20 and ₹2,000'); return; }
    if (v === s.per30) return;
    upd(s.id, { per30: v }); toast(`${s.name}: ${inr(v)} per 30 min, for new bookings`);
  };
  const addTask = () => {
    if (!newTask?.name.trim() || !sel.tasks) { toast('Name the task'); return; }
    upd(sel.id, { tasks: [...sel.tasks, { name: newTask.name.trim(), time: newTask.time || '30 min', on: true }] });
    toast(`Task added to ${sel.name}`); setNewTask(null);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Services and prices</div><div className="m">{list.length} services in {new Set(list.map((s) => s.category)).size} kinds of work · prices are per 30 minutes</div></div>
      <div className="lft"><button className="btn o" style={{ padding: '9px 16px' }} onClick={() => go('professions')}>Professions & documents</button><button className="btn o" style={{ padding: '9px 16px' }} onClick={() => { setRulesDraft(rules); setRulesOpen(true); }}>Booking rules</button><button className="btn" style={{ padding: '10px 16px' }} onClick={() => setAddSvc(true)}>Add service</button></div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <table><tbody>
          <tr><th>Service</th><th>Work</th><th>₹ / 30 min</th><th>1 hour</th><th>Needs</th><th>Tasks</th><th>Live</th></tr>
          {list.map((s) => {
            const shownPrice = edit[s.id] ?? String(s.per30);
            const hour = (Number(shownPrice) || s.per30) * 2;
            return (
              <tr key={s.id} className="clk" style={s.id === sel.id ? { background: 'var(--mint)' } : undefined} onClick={() => setSelId(s.id)}>
                <td><b>{s.name}</b></td>
                <td className="m">{work[s.category]}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <input className="inp" style={{ fontSize: 13, padding: '8px 11px', width: 70, fontWeight: 600 }} inputMode="numeric" aria-label={`${s.name} price per 30 minutes`}
                    value={shownPrice} readOnly={!canPrice}
                    onChange={(e) => setEdit((x) => ({ ...x, [s.id]: e.target.value.replace(/\D/g, '') }))}
                    onBlur={() => commitPrice(s)} onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setEdit((x) => { const n = { ...x }; delete n[s.id]; return n; }); } }}
                    onFocus={() => !canPrice && toast('Only an Owner can change service prices')} />
                </td>
                <td>{inr(hour)}</td>
                <td>{s.needs ? <span className="tag clk" title="Specialisations live on Professions & documents" onClick={(e) => { e.stopPropagation(); go('professions'); }}>{s.needs}</span> : 'No'}</td>
                <td>{s.tasks ? s.tasks.filter((t) => t.on).length : 'Customer decides'}</td>
                <td onClick={(e) => e.stopPropagation()}><Toggle on={s.live} onChange={(v) => { upd(s.id, { live: v }); toast(v ? `${s.name} is live in the app` : `${s.name} is hidden from the app`); }} /></td>
              </tr>);
          })}
        </tbody></table>
        <div className="card s" style={{ margin: '12px 10px', background: 'var(--yellow)', border: 0 }}><b>A new price applies to new bookings only.</b> Bookings already made keep the amount they were booked at.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="row"><span className="h2" style={{ fontSize: 15 }}>{sel.name}</span>{sel.live ? <span className="tag g">Live</span> : <span className="tag x">Hidden</span>}</div>
          <div className="s m">Shown to customers as: {sel.blurb}</div>
          {sel.tasks ? <>
            <div className="h2">Tasks the customer can tick</div>
            <div style={{ display: 'grid', gap: 6 }} className="s">
              {sel.tasks.map((t, i) => (
                <div className="row" key={t.name + i}>
                  <span style={t.on ? undefined : { opacity: .5, textDecoration: 'line-through' }}>{t.name}</span>
                  <span className="lft" style={{ gap: 8 }}><span className="m">{t.time}</span>
                    <Toggle on={t.on} onChange={(v) => upd(sel.id, { tasks: sel.tasks!.map((x, j) => (j === i ? { ...x, on: v } : x)) })} /></span>
                </div>))}
            </div>
            {newTask ? (
              <div className="lft" style={{ gap: 6 }}>
                <input className="inp" style={{ padding: '7px 10px' }} placeholder="Task name" autoFocus value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
                <select className="inp" style={{ padding: '7px 8px', width: 110 }} value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}>{['15 min', '30 min', '45 min', '1 hr', '15 min each', '30 min each'].map((x) => <option key={x}>{x}</option>)}</select>
                <button className="btn sm" onClick={addTask}>Add</button><button className="btn o sm" onClick={() => setNewTask(null)}>Cancel</button>
              </div>
            ) : <div className="s clk" style={{ color: 'var(--green)', fontWeight: 700 }} onClick={() => setNewTask({ name: '', time: '30 min' })}>Add a task</div>}
          </> : <div className="s m">The customer writes their own list of chores. No fixed tasks.</div>}
          <div className="s m">{sel.needs ? (sel.trained ? `${sel.trained} partners are trained for this service.` : `Only partners with the ${sel.needs} specialisation are sent.`) : `Every approved ${work[sel.category].toLowerCase()} partner can be sent for this service.`}</div>
        </div>
        <div className="card clk" style={{ flex: 1 }} onClick={() => { setRulesDraft(rules); setRulesOpen(true); }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Booking rules</div>
          <div style={{ display: 'grid', gap: 7 }}>{Object.entries(rules).map(([k, v]) => <div className="row" key={k}><span className="m">{k}</span><b>{v}</b></div>)}</div>
        </div>
      </div>
    </div>

    <Modal open={rulesOpen} onClose={() => setRulesOpen(false)} title="Booking rules"
      actions={<><button className="btn o sm" onClick={() => setRulesOpen(false)}>Cancel</button><button className="btn sm" onClick={() => { setRules(rulesDraft); setRulesOpen(false); toast('Booking rules saved'); }}>Save rules</button></>}>
      {Object.entries(rulesDraft).map(([k, v]) => (
        <div className="row" key={k} style={{ gap: 10 }}><span className="s m" style={{ flex: 1 }}>{k}</span>
          <input className="inp" style={{ width: 140, padding: '7px 10px' }} value={v} onChange={(e) => setRulesDraft({ ...rulesDraft, [k]: e.target.value })} /></div>))}
    </Modal>
    <Modal open={addSvc} onClose={() => setAddSvc(false)} title="Add service"
      actions={<><button className="btn o sm" onClick={() => setAddSvc(false)}>Cancel</button><button className="btn sm" onClick={() => {
        if (!ns.name.trim()) { toast('Name the service'); return; }
        const id = 'svc' + Date.now();
        setList((l) => [...l, { id, name: ns.name.trim(), category: ns.category, per30: Number(ns.per30) || 99, needs: ns.needs.trim() || null, live: false, blurb: '—', tasks: [], trained: 0 }]);
        setSelId(id); setAddSvc(false); setNs({ name: '', per30: '99', category: 'cleaning', needs: '' }); toast(`${ns.name.trim()} added · hidden until you switch it on`);
      }}>Add service</button></>}>
      <input className="inp" placeholder="Service name, e.g. Festival deep clean" value={ns.name} onChange={(e) => setNs({ ...ns, name: e.target.value })} />
      <div className="row" style={{ gap: 10 }}><span className="s m" style={{ flex: 1 }}>₹ per 30 min</span><input className="inp" style={{ width: 100 }} inputMode="numeric" value={ns.per30} onChange={(e) => setNs({ ...ns, per30: e.target.value.replace(/\D/g, '') })} /></div>
      <div className="row" style={{ gap: 10 }}><span className="s m" style={{ flex: 1 }}>Work</span><select className="inp" style={{ width: 160 }} value={ns.category} onChange={(e) => setNs({ ...ns, category: e.target.value as Category })}>{(Object.keys(work) as Category[]).map((c) => <option key={c} value={c}>{work[c]}</option>)}</select></div>
      <div className="row" style={{ gap: 10 }}><span className="s m" style={{ flex: 1 }}>Needs a specialisation</span><input className="inp" style={{ width: 160 }} placeholder="None" value={ns.needs} onChange={(e) => setNs({ ...ns, needs: e.target.value })} /></div>
      <div className="s m">New services start hidden. Add tasks, then switch Live on.</div>
    </Modal>
  </>;
}
