import { useState } from 'react';
import { useAdmin } from '../../../session';
import { inr } from '../../../fixtures';
import { PRICE_MAX, PRICE_MIN, initialServices, type CatalogService, type NewService, type ServiceTask } from '../data';

/**
 * Services and prices: inline price edits (Owner only, ₹20 to ₹2,000, for new bookings), live switches,
 * the selected service's tasks, and adding a service.
 */
export function useServices() {
  const { toast, roles } = useAdmin();
  const canPrice = roles.includes('Owner');
  const [list, setList] = useState(initialServices);
  /** Price being typed, per service id. */
  const [edit, setEdit] = useState<Record<string, string>>({});
  const [selId, setSelId] = useState('kitchenBath');
  const sel = list.find((s) => s.id === selId) ?? list[0];
  const upd = (id: string, p: Partial<CatalogService>) => setList((l) => l.map((s) => (s.id === id ? { ...s, ...p } : s)));
  const dropEdit = (id: string) => setEdit((e) => { const n = { ...e }; delete n[id]; return n; });

  const typePrice = (id: string, raw: string) => setEdit((x) => ({ ...x, [id]: raw.replace(/\D/g, '') }));
  const commitPrice = (s: CatalogService) => {
    const raw = edit[s.id]; if (raw === undefined) return;
    const v = Number(raw);
    dropEdit(s.id);
    if (!canPrice) { toast('Only an Owner can change service prices'); return; }
    if (!v || v < PRICE_MIN || v > PRICE_MAX) { toast('Price must be between ₹20 and ₹2,000'); return; }
    if (v === s.per30) return;
    upd(s.id, { per30: v }); toast(`${s.name}: ${inr(v)} per 30 min, for new bookings`);
  };
  const warnNoPricing = () => { if (!canPrice) toast('Only an Owner can change service prices'); };

  const setLive = (s: CatalogService, v: boolean) => { upd(s.id, { live: v }); toast(v ? `${s.name} is live in the app` : `${s.name} is hidden from the app`); };
  const setTaskOn = (i: number, v: boolean) => upd(sel.id, { tasks: sel.tasks!.map((x, j) => (j === i ? { ...x, on: v } : x)) });
  /** Adds a task to the selected service; false when it has no name. */
  const addTask = (task: Pick<ServiceTask, 'name' | 'time'>) => {
    if (!task.name.trim() || !sel.tasks) { toast('Name the task'); return false; }
    upd(sel.id, { tasks: [...sel.tasks, { name: task.name.trim(), time: task.time || '30 min', on: true }] });
    toast(`Task added to ${sel.name}`); return true;
  };
  /** Adds a hidden service and selects it; false when it has no name. */
  const addService = (ns: NewService) => {
    if (!ns.name.trim()) { toast('Name the service'); return false; }
    const id = 'svc' + Date.now();
    setList((l) => [...l, { id, name: ns.name.trim(), category: ns.category, per30: Number(ns.per30) || 99, needs: ns.needs.trim() || null, live: false, blurb: '—', tasks: [], trained: 0 }]);
    setSelId(id); toast(`${ns.name.trim()} added · hidden until you switch it on`); return true;
  };

  return { list, sel, select: setSelId, canPrice, edit, typePrice, commitPrice, cancelPrice: dropEdit, warnNoPricing, setLive, setTaskOn, addTask, addService };
}
