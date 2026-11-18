import { useEffect, useState } from 'react';
import { useAdmin } from '../../../session';
import { inr, patchBooking, patchTicket, useStore } from '../../../fixtures';
import type { PageParams } from '../../../navigation';
import { ROLE_LIMIT, TICKET_FACTS, type TicketFix } from '../data';

/**
 * One support ticket: which ticket is open, its facts, and every action on it (reply, note, refund within the role
 * limit or passed to the ops lead, the suggested fixes, pass, close, reopen). Ticket changes go to the shared store.
 */
export function useTicket(params: PageParams) {
  const { go, toast } = useAdmin();
  const tickets = useStore((s) => s.tickets);
  const [id, setId] = useState<string>(params.id ?? 'T-318');
  /** Amount waiting for confirmation in the refund dialog. */
  const [confirm, setConfirm] = useState<null | number>(null);
  /** Fixes already used, per ticket. */
  const [done, setDone] = useState<Record<string, string[]>>({});
  const [reply, setReply] = useState('');
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const t = tickets.find((x) => x.id === id) ?? tickets[0];
  const facts = TICKET_FACTS[t.id];
  const first = t.who.split(' ')[0];
  const closed = t.status === 'closed';
  const used = done[t.id] ?? [];
  const openCount = tickets.filter((x) => x.status === 'open' || x.status === 'passed').length;

  useEffect(() => { if (params.id) setId(params.id); }, [params.id]);
  useEffect(() => { setReply(''); setAmount(''); setNote(''); }, [id]);

  const mark = (label: string) => setDone({ ...done, [t.id]: [...used, label] });
  const say = (text: string) => patchTicket(t.id, (x) => ({ msgs: [...x.msgs, { me: true, text }], status: x.status === 'open' ? 'answered' : x.status }));

  const sendReply = () => {
    if (!reply.trim()) return;
    say(reply.trim()); setReply(''); toast(`Reply sent to ${first}`);
  };
  const saveNote = () => {
    if (!note.trim()) return;
    patchTicket(t.id, (x) => ({ note: x.note ? `${x.note} ${note.trim()}` : note.trim() })); setNote('');
    toast('Note saved · only staff see it');
  };

  const refund = (n: number) => {
    if (n > ROLE_LIMIT) {
      patchTicket(t.id, (x) => ({ pendingRefund: n, status: 'passed', msgs: [...x.msgs, { me: true, text: `I have asked my manager to approve a refund of ${inr(n)}. You will hear from us within 2 hours.` }] }));
      toast(`${inr(n)} is above your ₹${ROLE_LIMIT} limit · passed to ops lead`);
    } else {
      patchTicket(t.id, (x) => ({ refunded: (x.refunded ?? 0) + n, msgs: [...x.msgs, { me: true, text: `I have refunded ${inr(n)} to your UPI. It reaches you within 2 hours.` }], status: x.status === 'open' ? 'answered' : x.status }));
      if (t.ref.startsWith('#')) patchBooking(t.ref.slice(1), { status: 'refunded', refunded: n });
      toast(`${inr(n)} refunded to ${t.who}`);
    }
    setConfirm(null); setAmount('');
  };

  /** "Other amount": asks to confirm a refund of the typed amount. */
  const refundAmount = () => {
    const n = parseInt(amount, 10);
    if (!n) { toast('Enter an amount'); return; }
    if (closed) { toast('Ticket is closed · reopen it first'); return; }
    setConfirm(n);
  };

  const fix = (f: TicketFix) => {
    if (used.includes(f.label)) { toast('Already done'); return; }
    if (closed) { toast('Ticket is closed · reopen it first'); return; }
    if (f.kind === 'call') { toast(`Calling ${t.who}…`); return; }
    if (f.kind === 'refund' && f.refund) { setConfirm(f.refund); return; }
    mark(f.label);
    if (t.id === 'T-318') {
      say('A helper, Rekha M., will reach you at 2:30 pm today to finish the balcony. No charge.');
      toast('Reassigned: Rekha M. goes back at 2:30 pm, free');
    } else if (t.id === 'T-315') {
      go('claims', { ref: t.ref });
    } else {
      say(`Done: ${f.label.toLowerCase()}.`);
      toast(f.label + ' · done');
    }
  };

  const passToLead = () => { patchTicket(t.id, { status: 'passed' }); toast('Passed to ops lead · they are told by SMS'); };
  const reopen = () => { patchTicket(t.id, { status: 'open' }); toast('Ticket reopened'); };
  const close = () => { patchTicket(t.id, { status: 'closed' }); toast(`#${t.id} closed · ${first} gets a short survey`); };
  const openPerson = () => (t.from === 'Customer' ? go('customerDetail', { name: t.who }) : go('partnerDetail', { id: t.face }));

  return {
    tickets, ticket: t, facts, first, closed, used, openCount, select: setId,
    reply, setReply, sendReply, note, setNote, saveNote, amount, setAmount: (v: string) => setAmount(v.replace(/\D/g, '')),
    confirm, cancelRefund: () => setConfirm(null), refundAmount, refund, fix,
    passToLead, reopen, close, openPerson, back: () => go('support'),
  };
}
