/** 77 Zones and team access: open/pause zones, tune radius and fees. */
import React, { useState } from 'react';
import { Check, I, Modal, Pager, Tag, Toggle, useAdmin, type TagTone } from '../shell';
import { decisions } from '@/data/decisions';
import { Btn, CardHead, Field } from './ui';

type Zone = { name: string; status: string; tone: TagTone; partners: string; in15: string; busy: string; hours: string; live: boolean; radius: number; fee: number };
const initial: Zone[] = [
  { name: 'Sector 21', status: 'Healthy', tone: 'n', partners: '12', in15: '94%', busy: 'None', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Block C', status: 'Healthy', tone: 'n', partners: '10', in15: '91%', busy: 'None', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Sector 18', status: 'Healthy', tone: 'n', partners: '9', in15: '88%', busy: '+10% at 8 am', hours: '6 am to 9 pm', live: true, radius: 1.5, fee: 0 },
  { name: 'Block A', status: 'Stretched', tone: 'y', partners: '4', in15: '71%', busy: '+10% at 8 am', hours: '7 am to 8 pm', live: true, radius: 2, fee: 0 },
  { name: 'Block D', status: 'Too few partners', tone: 'r', partners: '2', in15: '52%', busy: '+15% all day', hours: '7 am to 8 pm', live: true, radius: 3, fee: 0 },
  { name: 'Sector 34', status: 'Opening 1 Dec', tone: 'x', partners: '3 of 8', in15: 'Not live', busy: 'Not set', hours: 'Not set', live: false, radius: 1.5, fee: 0 },
];
const busyOptions = ['None', '+10% at 8 am', '+15% at 8 am', '+10% all day', '+15% all day'];
const hourOptions = ['6 am to 9 pm', '7 am to 8 pm', '7 am to 9 pm', '8 am to 8 pm'];

export function Zones() {
  const { go, toast } = useAdmin();
  const [zones, setZones] = useState(initial);
  const [log, setLog] = useState([
    { who: 'Ops lead', what: 'raised Block D busy-hour price to +15%', when: 'Today, 9:12 am' },
    { who: 'Support 1', what: 'refunded ₹79 on visit #2031', when: 'Today, 8:40 am' },
    { who: 'Admin', what: 'suspended partner Geeta K.', when: 'Yesterday, 6:05 pm' },
    { who: 'Accounts', what: 'paid 48 partners, ₹1,12,480', when: 'Monday, 10:00 am' },
    { who: 'Ops lead', what: 'added zone Sector 34', when: 'Friday, 4:20 pm' },
  ]);
  const [checks, setChecks] = useState({ boundary: true, prices: true, trained: false, hub: false });
  const [edit, setEdit] = useState<Zone | null>(null);
  const [pause, setPause] = useState<Zone | null>(null);
  const [adding, setAdding] = useState(false);
  const [invite, setInvite] = useState(false);
  const [draft, setDraft] = useState({ name: '', email: '', role: 'Support' });

  const record = (what: string) => setLog((l) => [{ who: 'Admin', what, when: 'Just now' }, ...l]);
  const patch = (name: string, p: Partial<Zone>) => setZones((zs) => zs.map((z) => z.name === name ? { ...z, ...p } : z));
  const liveCount = zones.filter((z) => z.live).length;

  const flip = (z: Zone) => {
    if (z.live) return setPause(z);
    if (z.name === 'Sector 34' && !(checks.trained && checks.hub)) return toast('Finish the opening checklist before Sector 34 goes live');
    patch(z.name, { live: true, ...(z.tone === 'x' ? { status: 'Healthy', tone: 'n', in15: 'New', hours: '6 am to 9 pm', busy: 'None' } : {}) });
    record(`opened zone ${z.name}`); toast(`${z.name} is live. Customers there can book now.`);
  };

  return <>
    <div className="row"><div><div className="h" style={{ fontSize: 22 }}>Zones and team</div><div className="m">{liveCount} zones live · {zones.length - liveCount} {zones.length - liveCount === 1 ? 'opening soon' : 'paused or opening'}</div></div>
      <div className="lft"><Btn o onClick={() => setInvite(true)}>Invite team member</Btn><Btn onClick={() => { setDraft({ ...draft, name: '' }); setAdding(true); }}>Add zone</Btn></div></div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
      <div className="card" style={{ padding: '14px 8px 4px' }}>
        <CardHead title="Service zones" right={<span className="s m">Arrival within 15 min, last 7 days · click a zone to tune</span>} />
        <table>
          <thead><tr><th>Zone</th><th>Status</th><th>Partners</th><th>In 15 min</th><th>Busy-hour price</th><th>Hours</th><th>Live</th></tr></thead>
          <tbody>{zones.map((z) => (
            <tr key={z.name} className="clk" onClick={() => setEdit({ ...z })}>
              <td><b>{z.name}</b></td>
              <td>{z.live || z.tone === 'x' ? <Tag tone={z.tone}>{z.status}</Tag> : <Tag tone="x">Paused</Tag>}</td>
              <td>{z.partners}</td><td className={z.in15 === 'Not live' ? 'm' : ''}>{z.in15}</td>
              <td className={z.busy === 'Not set' ? 'm' : ''}>{z.busy}</td><td className={z.hours === 'Not set' ? 'm' : ''}>{z.hours}</td>
              <td onClick={(e) => e.stopPropagation()}><Toggle on={z.live} onChange={() => flip(z)} /></td>
            </tr>))}
          </tbody>
        </table>
        <Pager text="Page 1 of 3 · 6 rows per page" />
        {zones.find((z) => z.name === 'Block D')?.live && (
          <div className="card s" style={{ margin: '12px 10px', background: 'var(--yellow)', border: 0 }}>
            <b>Block D:</b> only half of bookings arrive in 15 minutes. Show customers the real arrival time, or pause instant booking there until 4 more partners join.
            <div className="lft" style={{ marginTop: 8 }}>
              <span className="lnk" style={{ color: 'var(--ink)' }} onClick={() => { record('set Block D to show real arrival time'); toast('Block D now shows “about 25 min” to customers'); }}>Show real arrival time</span>
              <span>·</span>
              <span className="lnk" style={{ color: 'var(--ink)' }} onClick={() => setPause(zones.find((z) => z.name === 'Block D')!)}>Pause instant booking</span>
            </div>
          </div>)}
        <div className="card" style={{ margin: '0 10px 12px' }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Opening Sector 34 on 1 December</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }} className="s">
            <div className="lft"><Check on={checks.boundary} onChange={(v) => setChecks({ ...checks, boundary: v })} />Area boundary drawn</div>
            <div className="lft"><Check on={checks.prices} onChange={(v) => setChecks({ ...checks, prices: v })} />Prices set</div>
            <div className="lft"><Check on={checks.trained} onChange={(v) => setChecks({ ...checks, trained: v })} />8 partners trained ({checks.trained ? '8' : '3'} so far)</div>
            <div className="lft"><Check on={checks.hub} onChange={(v) => setChecks({ ...checks, hub: v })} />Pick-up hub chosen</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="card" style={{ padding: '14px 8px 4px' }}>
          <div className="row" style={{ padding: '0 10px 6px' }}><span className="h2" style={{ fontSize: 15 }}>Team access</span><span className="s lnk" onClick={() => go('team')}>Manage in Team</span></div>
          <table>
            <thead><tr><th>Person</th><th>Roles</th><th>Zones</th></tr></thead>
            <tbody>
              <tr><td><b>Admin</b></td><td><Tag tone="g">Owner</Tag></td><td>All</td></tr>
              <tr><td><b>Ops lead</b></td><td><Tag tone="n">Operations</Tag> <Tag tone="n">Quality</Tag></td><td>All</td></tr>
              <tr><td><b>Support 1</b></td><td><Tag tone="n">Support</Tag></td><td>Block C, Sector 21</td></tr>
              <tr><td><b>Support 2</b></td><td><Tag tone="n">Support</Tag> <Tag>Finance</Tag></td><td>All</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card" style={{ flex: 1 }}>
          <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Who changed what</div>
          <div style={{ display: 'grid', gap: 8 }} className="s">
            {log.slice(0, 6).map((l, i) => <React.Fragment key={i}>{i > 0 && <div className="hr" />}<div><b>{l.who}</b> {l.what}<div className="m">{l.when}</div></div></React.Fragment>)}
          </div>
        </div>
      </div>
    </div>

    {edit && (
      <Modal open onClose={() => setEdit(null)} title={`Tune ${edit.name}`}
        actions={<><Btn o onClick={() => setEdit(null)}>Cancel</Btn><Btn onClick={() => {
          const old = zones.find((z) => z.name === edit.name)!;
          patch(edit.name, { radius: edit.radius, busy: edit.busy, hours: edit.hours, fee: edit.fee });
          const ch: string[] = [];
          if (old.radius !== edit.radius) ch.push(`search radius to ${edit.radius} km`);
          if (old.busy !== edit.busy) ch.push(`busy-hour price to ${edit.busy}`);
          if (old.hours !== edit.hours) ch.push(`hours to ${edit.hours}`);
          if (old.fee !== edit.fee) ch.push(`arrival fee to ₹${edit.fee}`);
          if (ch.length) record(`set ${edit.name} ${ch.join(', ')}`);
          setEdit(null); toast(ch.length ? `${edit.name} saved` : 'Nothing changed');
        }}>Save</Btn></>}>
        <Field label={`Search radius · ${edit.radius} km`}>
          <input type="range" min={decisions.ops.searchKm[0]} max={decisions.ops.searchKm[1] + 1} step={0.5} value={edit.radius}
            onChange={(e) => setEdit({ ...edit, radius: parseFloat(e.target.value) })} />
          <span className="s m">Launch rule: look within {decisions.ops.searchKm[0]} km, widen to {decisions.ops.searchKm[1]} km when no one accepts.</span>
        </Field>
        <Field label="Busy-hour price"><select className="inp" value={edit.busy === 'Not set' ? 'None' : edit.busy} onChange={(e) => setEdit({ ...edit, busy: e.target.value })}>{busyOptions.map((o) => <option key={o}>{o}</option>)}</select></Field>
        <div className="g2">
          <Field label="Hours"><select className="inp" value={edit.hours === 'Not set' ? hourOptions[0] : edit.hours} onChange={(e) => setEdit({ ...edit, hours: e.target.value })}>{hourOptions.map((o) => <option key={o}>{o}</option>)}</select></Field>
          <Field label="Arrival fee (₹)"><input className="inp" inputMode="numeric" value={edit.fee} onChange={(e) => setEdit({ ...edit, fee: parseInt(e.target.value.replace(/\D/g, '') || '0', 10) })} /></Field>
        </div>
      </Modal>
    )}
    {pause && (
      <Modal open onClose={() => setPause(null)} title={`Pause ${pause.name}?`}
        actions={<><Btn o onClick={() => setPause(null)}>Keep live</Btn><Btn red onClick={() => { patch(pause.name, { live: false }); record(`paused zone ${pause.name}`); setPause(null); toast(`${pause.name} paused. Customers see “not available right now”.`); }}>Pause zone</Btn></>}>
        <div className="m">New bookings stop in {pause.name}. Visits already booked still go ahead. {pause.partners} partners will be told.</div>
      </Modal>
    )}
    <Modal open={adding} onClose={() => setAdding(false)} title="Add zone"
      actions={<><Btn o onClick={() => setAdding(false)}>Cancel</Btn><Btn onClick={() => {
        if (!draft.name.trim()) return toast('Give the zone a name');
        setZones((zs) => [...zs, { name: draft.name.trim(), status: 'Not open', tone: 'x', partners: '0 of 8', in15: 'Not live', busy: 'Not set', hours: 'Not set', live: false, radius: 1.5, fee: 0 }]);
        record(`added zone ${draft.name.trim()}`); setAdding(false); toast(`${draft.name.trim()} added. Draw the boundary next.`);
      }}>Add zone</Btn></>}>
      <Field label="Zone name"><input className="inp" placeholder="e.g. Sector 45" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
      <div className="s m lft"><I n="pin" />The zone starts switched off until it has 8 trained partners.</div>
    </Modal>
    <Modal open={invite} onClose={() => setInvite(false)} title="Invite team member"
      actions={<><Btn o onClick={() => setInvite(false)}>Cancel</Btn><Btn onClick={() => {
        if (!/.+@.+\..+/.test(draft.email)) return toast('Enter a work email');
        record(`invited ${draft.email} as ${draft.role}`); setInvite(false); toast(`Invite sent to ${draft.email}`); setDraft({ ...draft, email: '' });
      }}>Send invite</Btn></>}>
      <Field label="Work email"><input className="inp" placeholder="name@saathi.in" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
      <Field label="Role"><select className="inp" value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
        {['Operations', 'Support', 'Finance', 'Partner team'].map((r) => <option key={r}>{r}</option>)}</select></Field>
    </Modal>
  </>;
}
