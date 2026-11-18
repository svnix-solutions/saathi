import React from 'react';
import { TableCard, Tag } from '../../../ui';
import '../catalog.css';

/** Who on the team can see which zones; managed on the Team page. */
export function TeamAccessCard({ onManage }: { onManage: () => void }) {
  return (
    <TableCard head={<div className="row cat-table-head"><span className="h2 cat-title">Team access</span><span className="s lnk" onClick={onManage}>Manage in Team</span></div>}>
      <table>
        <thead><tr><th>Person</th><th>Roles</th><th>Zones</th></tr></thead>
        <tbody>
          <tr><td><b>Admin</b></td><td><Tag tone="g">Owner</Tag></td><td>All</td></tr>
          <tr><td><b>Ops lead</b></td><td><Tag tone="n">Operations</Tag> <Tag tone="n">Quality</Tag></td><td>All</td></tr>
          <tr><td><b>Support 1</b></td><td><Tag tone="n">Support</Tag></td><td>Block C, Sector 21</td></tr>
          <tr><td><b>Support 2</b></td><td><Tag tone="n">Support</Tag> <Tag>Finance</Tag></td><td>All</td></tr>
        </tbody>
      </table>
    </TableCard>
  );
}

export default TeamAccessCard;
