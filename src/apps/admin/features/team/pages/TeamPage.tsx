/** Screen 85 · Team. */
import React, { useState } from 'react';
import { Av, Button, I, Modal, PageHead, Pager, Table, TableCard, Tag, type TableColumn } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr, rolesSummary, useMatrix } from '../../../fixtures';
import { ALL_ZONES, initialTeam, initials, roleOrder, untilLabel, untilOptions, zoneOptions, type Grant, type TeamMember } from '../data';
import { RoleTags } from '../components/RoleTags';
import '../team.css';

const avatarInitials = (p: TeamMember) => (p.face ? p.face.toUpperCase() : initials(p.name));
const statusTag = (s: TeamMember['status']) =>
  s === 'Active' ? <Tag tone="n">Active</Tag> : s === 'Invited' ? <Tag>Invited</Tag> : <Tag tone="r">Removed</Tag>;

const columns: TableColumn<TeamMember>[] = [
  { key: 'person', label: 'Person', render: (p) => <span className="lft"><Av sm face={p.face} initials={avatarInitials(p)} /><b>{p.name}</b></span> },
  { key: 'roles', label: 'Roles', render: (p) => <RoleTags roles={p.roles} /> },
  { key: 'zones', label: 'Zones', render: (p) => Object.values(p.roles)[0]?.zones ?? '—' },
  { key: 'last', label: 'Last sign-in', cell: (p) => ({ className: p.last === 'Never' ? 'm' : '' }), render: (p) => p.last },
  { key: 'status', label: 'Status', render: (p) => statusTag(p.status) },
];

export function TeamPage() {
  const { go, toast, roles: myRoles } = useAdmin();
  const isOwner = myRoles.includes('Owner');
  const [m] = useMatrix();
  const [people, setPeople] = useState(initialTeam);
  const [selId, setSelId] = useState('s2');
  const sel = people.find((p) => p.id === selId) ?? people[0];
  const [draft, setDraft] = useState<Record<string, Grant>>(sel.roles);
  const [grantEdit, setGrantEdit] = useState<string | null>(null);
  const [invite, setInvite] = useState(false);
  const [remove, setRemove] = useState(false);
  const [inv, setInv] = useState({ name: '', email: '', role: 'Support', zones: ALL_ZONES, until: '' });

  const pick = (p: TeamMember) => { setSelId(p.id); setDraft(p.roles); };
  const toggleRole = (r: string) => {
    if (r === 'Owner' && !isOwner) { toast('Only an Owner can give this'); return; }
    setDraft((d) => { const n = { ...d }; if (n[r]) delete n[r]; else n[r] = { zones: ALL_ZONES }; return n; });
  };
  const draftRoles = Object.keys(draft);
  const sum = rolesSummary(m, draftRoles);
  const cover = Object.entries(draft).find(([, g]) => g.until);
  const dirty = JSON.stringify(draft) !== JSON.stringify(sel.roles);

  const save = () => {
    if (!draftRoles.length) { toast('Give at least one role, or remove access'); return; }
    setPeople((ps) => ps.map((p) => (p.id === sel.id ? { ...p, roles: draft } : p)));
    toast(`Roles saved for ${sel.name}`);
  };
  const sendInvite = () => {
    if (!inv.name.trim() || !inv.email.includes('@')) { toast('Add a name and an email'); return; }
    const id = 'n' + Date.now();
    const p: TeamMember = { id, name: inv.name.trim(), email: inv.email.trim(), joined: 'Nov 2026', last: 'Never', status: 'Invited', roles: { [inv.role]: { zones: inv.zones, until: inv.until || undefined } } };
    setPeople((ps) => [...ps, p]); pick(p); setInvite(false);
    setInv({ name: '', email: '', role: 'Support', zones: ALL_ZONES, until: '' });
    toast(`Invite sent to ${p.email}`);
  };
  const removeAccess = () => {
    setPeople((ps) => ps.map((p) => (p.id === sel.id ? { ...p, status: 'Removed', roles: {} } : p))); setDraft({}); setRemove(false); toast(`${sel.name} can no longer sign in`);
  };
  const g = grantEdit ? draft[grantEdit] : undefined;
  const nRoles = new Set(people.flatMap((p) => Object.keys(p.roles))).size;

  return <>
    <PageHead title="Team" sub={<>{people.filter((p) => p.status !== 'Removed').length} people · {nRoles} roles</>}
      actions={<><Button variant="outline" onClick={() => go('permissions')}>Roles and permissions</Button><Button onClick={() => isOwner ? setInvite(true) : toast('Only an Owner can invite people')}>Invite person</Button></>} />
    <div className="team-body team-body-team">
      <TableCard footer={<Pager pages={1} text={`Page 1 of 1 · ${people.length} rows per page`} />}>
        <Table columns={columns} rows={people} rowKey={(p) => p.id} onRowClick={pick} selected={(p) => p.id === sel.id} />
      </TableCard>
      <div className="team-side">
        <div className="card team-panel team-fill">
          <div className="row"><div className="lft"><Av face={sel.face} initials={avatarInitials(sel)} /><div><div className="h2 team-title">{sel.name}</div><div className="s m">{sel.email} · joined {sel.joined}</div></div></div>
            {statusTag(sel.status)}</div>
          <div className="hr" />
          <div className="h2">Roles</div>
          {roleOrder.map((r) => {
            const on = !!draft[r];
            return (
              <div className="row" key={r}>
                <div className="lft clk" onClick={() => toggleRole(r)}><span className={`cb ${on ? 'on' : ''}${r === 'Owner' && !isOwner ? ' team-locked' : ''}`}>{on && <I n="check" />}</span>{r}</div>
                {r === 'Owner' && !on ? <span className="s m">Only an Owner can give this</span>
                  : on ? (draft[r].until
                    ? <Tag onClick={() => setGrantEdit(r)}>Cover till {draft[r].until}</Tag>
                    : <span className="s m clk team-dotted" role="button" onClick={() => setGrantEdit(r)}>{draft[r].zones}</span>)
                  : r === 'Operations' ? <span className="s m">Choose zones</span> : null}
              </div>);
          })}
          <div className="card sel s team-compact">
            {draftRoles.length === 0 ? <><b>No roles ticked.</b> This person cannot open the panel.</>
              : <><b>With {draftRoles.length === 1 ? 'this role' : draftRoles.length === 2 ? 'these two roles' : `these ${draftRoles.length} roles`}:</b> {sum.count} of {sum.total} permissions. {sum.limit > 0 ? <>Refunds up to {inr(sum.limit)}{draftRoles.length > 1 ? ', the higher of the limits' : ''}.</> : 'No refunds.'}{cover && <> {cover[0]} ends by itself on {cover[1].until}.</>}</>}
          </div>
          <div className="g2 end">
            <Button variant="danger-outline" size="lg" style={{ padding: 9 }} onClick={() => sel.id === 'ad' ? toast('You cannot remove your own access') : setRemove(true)}>Remove access</Button>
            <Button size="lg" style={{ padding: 10, opacity: dirty ? 1 : .6 }} onClick={save}>Save roles</Button>
          </div>
        </div>
      </div>
    </div>

    <Modal open={!!grantEdit} onClose={() => setGrantEdit(null)} title={`${grantEdit} for ${sel.name}`}
      actions={<Button size="sm" onClick={() => setGrantEdit(null)}>Done</Button>}>
      {g && grantEdit && <>
        <label className="s m">Zones</label>
        <select className="inp" value={g.zones} onChange={(e) => setDraft((d) => ({ ...d, [grantEdit]: { ...g, zones: e.target.value } }))}>{zoneOptions.map((z) => <option key={z}>{z}</option>)}</select>
        <label className="s m">Give this role</label>
        <select className="inp" value={g.until ?? ''} onChange={(e) => setDraft((d) => ({ ...d, [grantEdit]: { ...g, until: e.target.value || undefined } }))}>
          {untilOptions.map((u) => <option key={u} value={u}>{untilLabel(u)}</option>)}
        </select>
        <div className="s m">A cover role ends by itself on the date. Nobody has to remember to take it back.</div>
      </>}
    </Modal>

    <Modal open={invite} onClose={() => setInvite(false)} title="Invite person"
      actions={<><Button variant="outline" size="sm" onClick={() => setInvite(false)}>Cancel</Button><Button size="sm" onClick={sendInvite}>Send invite</Button></>}>
      <input className="inp" placeholder="Name" value={inv.name} onChange={(e) => setInv({ ...inv, name: e.target.value })} />
      <input className="inp" placeholder="Work email" value={inv.email} onChange={(e) => setInv({ ...inv, email: e.target.value })} />
      <div className="g2">
        <select className="inp" value={inv.role} onChange={(e) => setInv({ ...inv, role: e.target.value })}>{roleOrder.filter((r) => r !== 'Owner' || isOwner).map((r) => <option key={r}>{r}</option>)}</select>
        <select className="inp" value={inv.zones} onChange={(e) => setInv({ ...inv, zones: e.target.value })}>{zoneOptions.map((z) => <option key={z}>{z}</option>)}</select>
      </div>
      <select className="inp" value={inv.until} onChange={(e) => setInv({ ...inv, until: e.target.value })}>
        {untilOptions.map((u) => <option key={u} value={u}>{untilLabel(u)}</option>)}
      </select>
      <div className="s m">They get an email link and set up sign-in with a 6-digit code. More roles can be added after.</div>
    </Modal>

    <Modal open={remove} onClose={() => setRemove(false)} title={`Remove ${sel.name}?`}
      actions={<><Button variant="outline" size="sm" onClick={() => setRemove(false)}>Keep</Button><Button variant="danger" size="sm" onClick={removeAccess}>Remove access</Button></>}>
      <div className="s">They are signed out everywhere at once. Their past actions stay in the record.</div>
    </Modal>
  </>;
}

export default TeamPage;
