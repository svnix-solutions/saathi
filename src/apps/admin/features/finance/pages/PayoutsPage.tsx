/** 71 · Admin payouts, offers and support (support ticket list is its own page, `support`). */
import React, { useState } from 'react';
import { Button, Kpi, KpiGrid, Modal, PageHead } from '../../../ui';
import { useAdmin } from '../../../session';
import { inr, useStore } from '../../../fixtures';
import { OFFER_CODES_LIVE } from '../data';
import { usePayouts } from '../hooks/usePayouts';
import { PayoutsTable } from '../components/PayoutsTable';
import { OfferCodesCard } from '../components/OfferCodesCard';
import { TicketDigestCard } from '../components/TicketDigestCard';
import '../finance.css';

export function PayoutsPage() {
  const { go, toast } = useAdmin();
  const tickets = useStore((s) => s.tickets);
  const m = usePayouts();
  const [confirmAll, setConfirmAll] = useState(false);
  const [codes, setCodes] = useState(OFFER_CODES_LIVE);
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'passed').length;

  return (
    <>
      <PageHead title="Payouts" sub="Week of 9 to 15 November · paid every Monday"
        actions={<>
          <Button variant="outline" onClick={() => toast('Downloaded payouts-9-15-nov.xlsx')}>Download sheet</Button>
          <Button style={{ opacity: m.approvedCount ? 1 : 0.5 }} onClick={() => (m.approvedCount ? setConfirmAll(true) : toast('No approved payouts left to pay'))}>Pay all approved</Button>
        </>} />
      <KpiGrid>
        <Kpi label="Due this Monday" value={inr(m.due)} />
        <Kpi label="Tips passed on" value="₹6,350" />
        <Kpi label="Active offer codes" value={Object.values(codes).filter(Boolean).length} onClick={() => go('offers')} />
        <Kpi label="Open support tickets" value={openTickets} tone={openTickets > 0 ? 'alert' : 'default'} onClick={() => go('support')} />
      </KpiGrid>
      <div className="fin-payouts-grid">
        <PayoutsTable model={m} />
        <div className="fin-stack">
          <OfferCodesCard live={codes} onNew={() => go('offers')}
            onLiveChange={(c, v) => { setCodes({ ...codes, [c]: v }); toast(`${c} ${v ? 'is live' : 'switched off'}`); }} />
          <TicketDigestCard tickets={tickets.filter((t) => t.id !== 'T-315')} onOpen={(id) => go('ticket', { id })} onSeeAll={() => go('support')} />
        </div>
      </div>
      <Modal open={confirmAll} onClose={() => setConfirmAll(false)} title="Pay all approved?"
        actions={<>
          <Button variant="outline" size="sm" onClick={() => setConfirmAll(false)}>Not now</Button>
          <Button size="sm" onClick={() => { m.payApproved(); setConfirmAll(false); }}>Pay now</Button>
        </>}>
        <div className="m">{m.approvedCount} approved payouts on this page ({inr(m.approvedTotal)}) go to partners’ UPI today. Payouts to approve or on hold are not paid.</div>
      </Modal>
    </>
  );
}

export default PayoutsPage;
