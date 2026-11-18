/** Screen 86 · Roles and permissions. */
import React, { useState } from 'react';
import { Button, I, Modal } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr, useMatrix } from '../../../fixtures';
import '../team.css';

export function PermissionsPage() {
  const { toast, back, roles } = useAdmin();
  const canEdit = roles.includes('Owner');
  const [m, setM] = useMatrix();
  const [draft, setDraft] = useState(m);
  const [newRole, setNewRole] = useState(false);
  const [nr, setNr] = useState({ name: '', copy: 'Viewer' });
  const changes = draft.grid.reduce((n, row, ri) => n + row.filter((v, ci) => v !== (m.grid[ri]?.[ci] ?? false)).length, 0) + (draft.roles.length - m.roles.length);

  const flip = (ri: number, ci: number) => {
    if (!canEdit) { toast('Only an Owner can change this table'); return; }
    if (draft.roles[ci] === 'Owner') { toast('Owner always has every permission'); return; }
    setDraft((d) => ({ ...d, grid: d.grid.map((row, i) => (i === ri ? row.map((v, j) => (j === ci ? !v : v)) : row)) }));
  };
  const addRole = () => {
    const name = nr.name.trim();
    if (!name || draft.roles.includes(name)) { toast('Give the role a new name'); return; }
    const src = draft.roles.indexOf(nr.copy);
    setDraft((d) => ({ ...d, roles: [...d.roles, name], grid: d.grid.map((row) => [...row, src >= 0 ? row[src] : false]), limits: { ...d.limits, [name]: d.limits[nr.copy] ?? 0 } }));
    setNewRole(false); setNr({ name: '', copy: 'Viewer' }); toast(`${name} added · tick what it may do`);
  };
  const saveChanges = () => {
    if (!canEdit) { toast('Only an Owner can change this table'); return; }
    if (!changes) { toast('No changes to save'); return; }
    setM(draft); toast(`Saved · ${changes} change${changes > 1 ? 's' : ''}. People see them at their next click.`);
  };
  const limitText = Object.entries(draft.limits).sort((a, b) => b[1] - a[1]).map(([r, v]) => `${r} ${inr(v)}`).join(' · ');

  return <>
    <div className="row"><div className="lft s team-perm-head"><span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span><span className="h team-perm-title">Roles and permissions</span><span className="m">Refund limit: {limitText}</span></div>
      <div className="lft">
        <Button variant="outline" size="lg" style={{ padding: '8px 14px' }} onClick={() => canEdit ? setNewRole(true) : toast('Only an Owner can add roles')}>New role</Button>
        <Button size="lg" style={{ padding: '9px 14px', opacity: canEdit && changes ? 1 : .6 }} onClick={saveChanges}>Save changes{changes ? ` (${changes})` : ''}</Button>
      </div></div>
    {!canEdit && <div className="card s team-compact team-callout"><b>Read only.</b> Only an Owner can change this table. Your roles: {roles.join(', ')}.</div>}
    <div className="card mx team-matrix">
      <table><tbody>
        <tr><th>Area</th><th>Permission</th>{draft.roles.map((r) => <th key={r} className="team-center">{r}</th>)}</tr>
        {draft.rows.map((row, ri) => (
          <tr key={row.perm}>
            <td>{row.area && <b>{row.area}</b>}</td><td>{row.perm}</td>
            {draft.grid[ri].map((v, ci) => (
              <td key={ci} className={canEdit ? 'clk team-center' : 'team-center'} onClick={() => flip(ri, ci)}>
                {v ? <span className="cb on team-cell-cb"><I n="check" /></span>
                  : canEdit ? <span className="cb team-cell-cb team-cell-off" /> : <span className="m">·</span>}
              </td>))}
          </tr>))}
      </tbody></table>
    </div>
    <Modal open={newRole} onClose={() => setNewRole(false)} title="New role"
      actions={<><Button variant="outline" size="sm" onClick={() => setNewRole(false)}>Cancel</Button><Button size="sm" onClick={addRole}>Add role</Button></>}>
      <input className="inp" placeholder="Role name, e.g. Area lead" value={nr.name} onChange={(e) => setNr({ ...nr, name: e.target.value })} />
      <label className="s m">Start with the permissions of</label>
      <select className="inp" value={nr.copy} onChange={(e) => setNr({ ...nr, copy: e.target.value })}>{draft.roles.filter((r) => r !== 'Owner').map((r) => <option key={r}>{r}</option>)}</select>
    </Modal>
  </>;
}

export default PermissionsPage;
