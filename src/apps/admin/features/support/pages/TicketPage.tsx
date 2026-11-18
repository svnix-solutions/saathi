/** 80 · Admin one support ticket (params: { id }). Support can refund up to ₹200; more goes to the ops lead. */
import React from 'react';
import type { PageParams } from '../../../navigation';
import { useTicket } from '../hooks/useTicket';
import { TicketHeader } from '../components/TicketHeader';
import { TicketQueue } from '../components/TicketQueue';
import { TicketConversation } from '../components/TicketConversation';
import { TicketFactsCard } from '../components/TicketFactsCard';
import { TicketFixes } from '../components/TicketFixes';
import { RefundModal } from '../components/RefundModal';
import '../support.css';

export function TicketPage({ params }: { params: PageParams }) {
  const tk = useTicket(params);
  const t = tk.ticket;

  return (
    <>
      <TicketHeader ticket={t} closed={tk.closed} onBack={tk.back} onPass={tk.passToLead} onClose={tk.close} onReopen={tk.reopen} />
      <div className="sup-ticket-grid">
        <TicketQueue tickets={tk.tickets} current={t.id} openCount={tk.openCount} onPick={tk.select} />
        <TicketConversation ticket={t} first={tk.first} closed={tk.closed} onOpenPerson={tk.openPerson}
          reply={tk.reply} onReplyChange={tk.setReply} onSendReply={tk.sendReply}
          note={tk.note} onNoteChange={tk.setNote} onSaveNote={tk.saveNote} />
        <div className="sup-stack">
          <TicketFactsCard ticket={t} facts={tk.facts} />
          <TicketFixes facts={tk.facts} used={tk.used} closed={tk.closed} onFix={tk.fix}
            amount={tk.amount} onAmountChange={tk.setAmount} onRefundAmount={tk.refundAmount} />
        </div>
      </div>
      <RefundModal amount={tk.confirm} first={tk.first} onCancel={tk.cancelRefund} onConfirm={tk.refund} />
    </>
  );
}

export default TicketPage;
