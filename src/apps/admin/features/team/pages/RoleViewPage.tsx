/** Screen 87 · What a Support person sees. */
import React, { useState } from 'react';
import { Button, I, Pager, TableCard, Tag, TextLink } from '../../../ui';
import { roleSections, useAdmin } from '../../../session';
import { menu } from '../../../navigation';
import { inr, rolesSummary, useMatrix } from '../../../fixtures';
import { supportTickets, type SupportTicket } from '../data';
import { useRoleViewSession } from '../hooks/useRoleViewSession';
import '../team.css';

const ticketTag = (x: SupportTicket) =>
  x.status === 'Open' ? <Tag tone={x.urgent ? 'r' : 'y'}>Open</Tag> : x.status === 'Passed on' ? <Tag>Passed on</Tag> : <Tag tone="x">Answered</Tag>;

export function RoleViewPage() {
  const { roles, zones, go, toast } = useAdmin();
  const { asSupport, viewAsSupport, backToOwner } = useRoleViewSession();
  const [m] = useMatrix();
  const [tickets, setTickets] = useState(supportTickets);
  const [selId, setSelId] = useState('2031');
  const [other, setOther] = useState('');
  const t = tickets.find((x) => x.id === selId) ?? tickets[0];
  const perms = rolesSummary(m, roles);
  const limit = perms.limit;
  const allItems = menu.flatMap((g) => g.items);
  const menus = allItems.filter((it) => roles.some((r) => roleSections[r] === 'all' || (roleSections[r] as string[]).includes(it.key))).length;

  const act = (label: string, amount: number) => {
    if (t.status !== 'Open') { toast('This ticket is already answered'); return; }
    if (amount > limit) {
      setTickets((ts) => ts.map((x) => (x.id === t.id ? { ...x, status: 'Passed on' } : x)));
      toast(`${inr(amount)} is above your ${inr(limit)} limit · passed on to the ops lead`);
    } else {
      setTickets((ts) => ts.map((x) => (x.id === t.id ? { ...x, status: 'Answered' } : x)));
      toast(amount ? `Refunded ${inr(amount)} to ${t.from.split(' · ')[0]}` : label);
    }
  };
  const otherAmt = Number(other) || 0;
  const above = (n: number) => n > limit;

  return <>
    <div className="card s row team-banner">
      <span><b>Role view.</b> {asSupport ? 'You are seeing the panel exactly as a Support person does.' : 'You are back as Owner.'}</span>
      {asSupport
        ? <Button variant="outline" size="sm" onClick={() => { backToOwner(); go('team'); }}>Back to Owner</Button>
        : <Button size="sm" onClick={viewAsSupport}>View as Support</Button>}
    </div>
    <div className="row"><div><div className="h team-page-title">Support</div><div className="m">Signed in as {asSupport ? 'Support 1' : 'Admin'} · role: {roles.join(', ')} · zones: {zones.join(', ')}</div></div>
      <Tag tone="n">{menus} of {allItems.length} menus · {perms.count} of {perms.total} permissions</Tag></div>
    <div className="team-body team-body-roleview">
      <TableCard title="Open tickets in your zones" right={<span className="s m">Tickets from other zones are not listed</span>} footer={<Pager pages={1} text={`Page 1 of 1 · ${tickets.length} rows per page`} />}>
        <table><tbody>
          <tr><th>Ticket</th><th>From</th><th>Zone</th><th>Waiting</th><th>Status</th></tr>
          {tickets.map((x) => (
            <tr key={x.id} className={x.id === t.id ? 'clk on' : 'clk'} onClick={() => setSelId(x.id)} onDoubleClick={() => go('ticket', { id: x.id })}>
              <td><b>{x.title}</b></td><td>{x.from}</td><td>{x.zone}</td><td>{x.wait}</td>
              <td>{ticketTag(x)}</td>
            </tr>))}
        </tbody></table>
      </TableCard>
      <div className="team-side">
        <div className="card team-panel">
          <div className="row"><div className="h2 team-title">Ticket: {t.title.toLowerCase()}</div><TextLink onClick={() => go('ticket', { id: t.id })}>Open</TextLink></div>
          {t.full > 0 ? <>
            <Button size="lg" style={{ padding: 10 }} onClick={() => act('A helper is going back, free', 0)}>Send a helper back, free</Button>
            <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => act('', t.part)}>Refund {inr(t.part)}{t.mins ? ` for ${t.mins} minutes` : ''}{above(t.part) ? ' · pass on' : ''}</Button>
            <Button variant="outline" size="lg" style={{ padding: 9 }} onClick={() => act('', t.full)}>Refund full {inr(t.full)}{above(t.full) ? ' · pass on' : ''}</Button>
            <div className="lft">
              <input className="inp team-amount" placeholder="Other amount, ₹" inputMode="numeric" value={other} onChange={(e) => setOther(e.target.value.replace(/\D/g, ''))} />
              <Button variant="outline" size="sm" style={{ whiteSpace: 'nowrap', ...(above(otherAmt) ? { color: 'var(--ink)', borderColor: 'var(--yellow)', background: 'var(--yellow)' } : {}) }}
                onClick={() => otherAmt ? act('', otherAmt) : toast('Type an amount')}>{above(otherAmt) ? 'Pass on to ops lead' : 'Refund'}</Button>
            </div>
          </> : <div className="s m">Payout questions are answered by Finance. You can reply but not change a payout.</div>}
          <div className="card s team-compact team-callout"><b>Your refund limit is {inr(limit)}.</b> Anything larger is sent to the ops lead to approve.</div>
        </div>
        <div className="card team-panel team-fill team-denied">
          <div className="lft"><I n="key" className="team-key" /><span className="h2 team-title">You do not have access to Payouts</span></div>
          <div className="s m">Shown if someone opens a link to a page their roles do not allow. Your roles: {roles.join(', ')}.</div>
          <div className="s m">Payouts needs the Finance or Owner role.</div>
          <Button variant="outline" size="lg" className="end" style={{ padding: 9 }} onClick={() => toast('Request sent to the Owner')}>Ask an Owner for access</Button>
        </div>
      </div>
    </div>
  </>;
}

export default RoleViewPage;
