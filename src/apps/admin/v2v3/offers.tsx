/** 92 Offer codes: create, switch on/off, see usage. */
import React, { useState } from 'react';
import { Modal, Tag, Toggle, useAdmin } from '../shell';
import { Btn, Field, TogRow, inr } from './ui';

type Code = { code: string; kind: 'rs' | 'pct'; value: number; forWho: string; until: string; used: number; given: number; live: boolean; first: boolean; once: boolean; limit: string };
const initial: Code[] = [
  { code: 'FIRST50', kind: 'rs', value: 50, forWho: 'First visit only', until: 'No end', used: 312, given: 15600, live: true, first: true, once: true, limit: 'No limit' },
  { code: 'PLAN10', kind: 'pct', value: 10, forWho: 'Monthly plans', until: '31 Mar', used: 41, given: 15160, live: true, first: false, once: false, limit: 'No limit' },
  { code: 'DIWALI', kind: 'rs', value: 100, forWho: 'Kitchen & bath scrub', until: '20 Nov', used: 96, given: 9600, live: false, first: false, once: true, limit: '100' },
  { code: 'SOCIETY10', kind: 'pct', value: 10, forWho: 'Green Park Society', until: '31 Mar', used: 58, given: 1020, live: true, first: false, once: false, limit: 'No limit' },
];
const offerText = (c: { kind: 'rs' | 'pct'; value: number }) => c.kind === 'rs' ? `${inr(c.value)} off` : `${c.value}% off`;
const forOptions = ['Everyone', 'First visit only', 'Monthly plans', 'Kitchen & bath scrub', 'Green Park Society', 'Not booked in 30 days'];
const blank = (): Code => ({ code: '', kind: 'rs', value: 50, forWho: 'Everyone', until: 'No end', used: 0, given: 0, live: true, first: false, once: true, limit: 'No limit' });

function sees(c: Code) {
  const what = c.first ? 'your first visit' : c.forWho === 'Monthly plans' ? 'your monthly plan' : c.forWho === 'Everyone' ? 'your next visit' : `${c.forWho.toLowerCase()}`;
  return `"${offerText(c)} ${what} with code ${c.code || '…'}${c.until !== 'No end' && c.until !== 'No end date' ? `, till ${c.until}` : ''}."`;
}

export function Offers() {
  const { toast } = useAdmin();
  const [codes, setCodes] = useState(initial);
  const [sel, setSel] = useState('FIRST50');
  const cur0 = codes.find((c) => c.code === sel) ?? codes[0];
  const [form, setForm] = useState<Code>(cur0);
  const [creating, setCreating] = useState(false);
  const [nw, setNw] = useState<Code>(blank());
  const [confirmOff, setConfirmOff] = useState(false);

  const live = codes.filter((c) => c.live).length;
  const pick = (c: Code) => { setSel(c.code); setForm(c); };
  const setLive = (code: string, v: boolean) => {
    setCodes((cs) => cs.map((c) => c.code === code ? { ...c, live: v } : c));
    if (code === form.code) setForm((f) => ({ ...f, live: v }));
    toast(`${code} switched ${v ? 'on' : 'off'}`);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Offer codes</div><div className="m">{live} live · {codes.length - live} off</div></div>
      <div className="lft"><Btn onClick={() => { setNw(blank()); setCreating(true); }}>New code</Btn></div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <table>
          <thead><tr><th>Code</th><th>Offer</th><th>For</th><th>Valid until</th><th>Used</th><th>Given away</th><th>Live</th></tr></thead>
          <tbody>{codes.map((c) => (
            <tr key={c.code} className={`clk ${c.code === sel ? 'on' : ''}`} onClick={() => pick(c)}>
              <td><b>{c.code}</b></td><td>{offerText(c)}</td><td>{c.forWho}</td><td>{c.until}</td><td>{c.used}</td><td>{inr(c.given)}</td>
              <td onClick={(e) => e.stopPropagation()}><Toggle on={c.live} onChange={(v) => setLive(c.code, v)} /></td>
            </tr>))}
          </tbody>
        </table>
        <div className="pg"><span>Page 1 of 1 · {codes.length} rows per page</span><span><b>1</b></span></div>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="row"><span className="h2" style={{ fontSize: 15 }}>Edit {cur0.code}</span>{cur0.live ? <Tag tone="g">Live</Tag> : <Tag tone="x">Off</Tag>}</div>
        <div className="h2">Code</div><input className="inp" style={{ fontSize: 13, padding: '8px 11px' }} value={form.code} readOnly title="Codes cannot be renamed once used" />
        <div className="h2">Offer</div>
        <div className="g2"><div className={`pill ${form.kind === 'rs' ? 'sel' : ''}`} onClick={() => setForm({ ...form, kind: 'rs' })}>₹ off</div><div className={`pill ${form.kind === 'pct' ? 'sel' : ''}`} onClick={() => setForm({ ...form, kind: 'pct' })}>% off</div></div>
        <div className="lft inp" style={{ fontSize: 13, padding: '8px 11px', gap: 4 }}>{form.kind === 'rs' ? '₹' : '%'}
          <input style={{ border: 0, outline: 'none', font: 'inherit', flex: 1, background: 'transparent' }} inputMode="numeric" value={form.value} onChange={(e) => setForm({ ...form, value: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></div>
        <TogRow label="First visit only" on={form.first} onChange={(v) => setForm({ ...form, first: v })} />
        <TogRow label="One use per customer" on={form.once} onChange={(v) => setForm({ ...form, once: v })} />
        <div className="g2">
          <div><div className="h2">Valid until</div><input className="inp" style={{ fontSize: 13, padding: '8px 11px' }} value={form.until === 'No end' ? 'No end date' : form.until} onChange={(e) => setForm({ ...form, until: e.target.value })} /></div>
          <div><div className="h2">Total uses allowed</div><input className="inp" style={{ fontSize: 13, padding: '8px 11px' }} value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} /></div>
        </div>
        <div className="card sel s" style={{ padding: '9px 11px' }}><b>Customer sees:</b> {sees(form)}</div>
        <div className="g2 end">
          {cur0.live ? <Btn o red style={{ padding: 9 }} onClick={() => setConfirmOff(true)}>Switch off</Btn>
            : <Btn o style={{ padding: 9 }} onClick={() => setLive(cur0.code, true)}>Switch on</Btn>}
          <Btn style={{ padding: 10 }} onClick={() => {
            if (!form.value) return toast('The offer needs a value');
            setCodes((cs) => cs.map((c) => c.code === form.code ? { ...form, until: form.until === 'No end date' ? 'No end' : form.until } : c)); toast(`${form.code} saved`);
          }}>Save</Btn>
        </div>
      </div>
    </div>

    <Modal open={confirmOff} onClose={() => setConfirmOff(false)} title={`Switch off ${cur0.code}?`}
      actions={<><Btn o onClick={() => setConfirmOff(false)}>Keep it on</Btn><Btn red onClick={() => { setLive(cur0.code, false); setConfirmOff(false); }}>Switch off</Btn></>}>
      <div className="m">Customers who type it will see “This code has ended”. Bookings already made keep their discount.</div>
    </Modal>
    <Modal open={creating} onClose={() => setCreating(false)} title="New offer code"
      actions={<><Btn o onClick={() => setCreating(false)}>Cancel</Btn><Btn onClick={() => {
        const code = nw.code.trim().toUpperCase();
        if (!/^[A-Z0-9]{4,12}$/.test(code)) return toast('Use 4 to 12 letters or numbers');
        if (codes.some((c) => c.code === code)) return toast(`${code} already exists`);
        if (!nw.value) return toast('The offer needs a value');
        const c = { ...nw, code, first: nw.forWho === 'First visit only' };
        setCodes((cs) => [c, ...cs]); pick(c); setCreating(false); toast(`${code} is live`);
      }}>Create code</Btn></>}>
      <Field label="Code"><input className="inp" placeholder="e.g. WELCOME75" value={nw.code} onChange={(e) => setNw({ ...nw, code: e.target.value.toUpperCase() })} /></Field>
      <div className="g2"><div className={`pill ${nw.kind === 'rs' ? 'sel' : ''}`} onClick={() => setNw({ ...nw, kind: 'rs' })}>₹ off</div><div className={`pill ${nw.kind === 'pct' ? 'sel' : ''}`} onClick={() => setNw({ ...nw, kind: 'pct' })}>% off</div></div>
      <div className="g2">
        <Field label={nw.kind === 'rs' ? 'Amount (₹)' : 'Percent'}><input className="inp" inputMode="numeric" value={nw.value} onChange={(e) => setNw({ ...nw, value: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></Field>
        <Field label="Valid until"><input className="inp" value={nw.until} onChange={(e) => setNw({ ...nw, until: e.target.value })} /></Field>
      </div>
      <Field label="For"><select className="inp" value={nw.forWho} onChange={(e) => setNw({ ...nw, forWho: e.target.value })}>{forOptions.map((o) => <option key={o}>{o}</option>)}</select></Field>
      <div className="card sel s" style={{ padding: '9px 11px' }}><b>Customer sees:</b> {sees({ ...nw, code: nw.code.toUpperCase(), first: nw.forWho === 'First visit only' })}</div>
    </Modal>
  </>;
}
