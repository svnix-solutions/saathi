/** 80 · Admin one support ticket (params: { id }). Support can refund up to ₹200; more goes to the ops lead. */
import React, { useEffect, useRef, useState } from 'react';
import { Av, I, Modal, Tag, useAdmin } from '../shell';
import { useStore, patchTicket, patchBooking, inr, type Ticket } from './store';
import { TLink } from './ui';

const ROLE_LIMIT = 200;

type Facts = { rows: [string, string, boolean?][]; price: number; fixes: { label: string; refund?: number; kind: 'helper' | 'refund' | 'call' }[] };
const FACTS: Record<string, Facts> = {
  'T-318': {
    price: 158,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Partner', 'Geeta K.'], ['Check-in', '7:58 · 10 m from door'], ['Check-out', '8:38 · 40 min worked', true], ['Tasks ticked', '2 of 3'], ['Selfie', 'Not matched', true]],
    fixes: [{ label: 'Send a helper back, free', kind: 'helper' }, { label: 'Refund ₹53 for 20 minutes', refund: 53, kind: 'refund' }, { label: 'Refund half · ₹79', refund: 79, kind: 'refund' }, { label: 'Call Sameer', kind: 'call' }],
  },
  'T-317': {
    price: 158,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Partner', 'Rekha M.'], ['Arrived', '9:15 · 8 m from door'], ['Waited', '10 min · 2 calls made'], ['Customer phone', 'Switched off', true]],
    fixes: [{ label: 'Pay Rekha ₹30 for the wait', kind: 'helper' }, { label: 'Call customer', kind: 'call' }],
  },
  'T-316': {
    price: 237,
    rows: [['Booked', 'General · 1 hr · ₹158'], ['Charged', '₹237 · 1.5 hr', true], ['Extra time', 'Asked by partner, not approved', true], ['Partner', 'Anita B.']],
    fixes: [{ label: 'Refund ₹79 extra charge', refund: 79, kind: 'refund' }, { label: 'Call Priya', kind: 'call' }],
  },
  'T-315': {
    price: 316,
    rows: [['Booked', 'Kitchen & bath · 1 hr · ₹316'], ['Partner', 'Kavita R.'], ['Damage', 'Glass jar · about ₹450', true], ['Photo', 'Sent by customer']],
    fixes: [{ label: 'Pay ₹450 for the jar', refund: 450, kind: 'refund' }, { label: 'Open a damage claim', kind: 'helper' }, { label: 'Call Meera', kind: 'call' }],
  },
  'T-314': {
    price: 0,
    rows: [['Payout', 'Week of 2 to 8 November'], ['Shown in app', '₹1,654'], ['Paid', '₹1,534', true], ['Reason', 'Cancelled visit counted twice']],
    fixes: [{ label: 'Add ₹120 to next payout', kind: 'helper' }, { label: 'Call Anita', kind: 'call' }],
  },
};

function statusTag(t: Ticket) {
  if (t.status === 'closed') return <Tag tone="x">Closed</Tag>;
  if (t.status === 'answered') return <Tag tone="x">Answered</Tag>;
  if (t.status === 'passed') return <Tag tone="n">With ops lead</Tag>;
  return <Tag tone="r">Open · {t.age}</Tag>;
}

export function TicketPage({ params }: { params: Record<string, any> }) {
  const { go, toast } = useAdmin();
  const tickets = useStore((s) => s.tickets);
  const [id, setId] = useState<string>(params.id ?? 'T-318');
  const [reply, setReply] = useState('');
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [confirm, setConfirm] = useState<null | number>(null);
  const [done, setDone] = useState<Record<string, string[]>>({});
  const chat = useRef<HTMLDivElement>(null);

  const t = tickets.find((x) => x.id === id) ?? tickets[0];
  const facts = FACTS[t.id];
  const first = t.who.split(' ')[0];
  const closed = t.status === 'closed';
  const used = done[t.id] ?? [];
  const mark = (label: string) => setDone({ ...done, [t.id]: [...used, label] });
  const openCount = tickets.filter((x) => x.status === 'open' || x.status === 'passed').length;

  useEffect(() => { chat.current?.scrollTo(0, chat.current.scrollHeight); }, [t.msgs.length, id]);
  useEffect(() => { if (params.id) setId(params.id); }, [params.id]);
  useEffect(() => { setReply(''); setAmount(''); setNote(''); }, [id]);

  const say = (text: string) => patchTicket(t.id, (x) => ({ msgs: [...x.msgs, { me: true, text }], status: x.status === 'open' ? 'answered' : x.status }));

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

  const fix = (f: Facts['fixes'][number]) => {
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

  return (
    <>
      <div className="row">
        <div className="lft" style={{ gap: 12 }}>
          <span className="ic clk" onClick={() => go('support')} role="button" aria-label="All tickets"><I n="back" /></span>
          <div className="h" style={{ fontSize: 22 }}>Ticket #{t.id}</div>{statusTag(t)}
        </div>
        <div className="lft">
          {t.status !== 'passed' && !closed && <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => { patchTicket(t.id, { status: 'passed' }); toast('Passed to ops lead · they are told by SMS'); }}>Pass to ops lead</button>}
          {closed
            ? <button className="btn o" style={{ padding: '9px 16px' }} onClick={() => { patchTicket(t.id, { status: 'open' }); toast('Ticket reopened'); }}>Reopen</button>
            : <button className="btn" style={{ padding: '10px 16px' }} onClick={() => { patchTicket(t.id, { status: 'closed' }); toast(`#${t.id} closed · ${first} gets a short survey`); }}>Close ticket</button>}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.35fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="h2" style={{ fontSize: 15 }}>Open tickets · {openCount}</div>
          {tickets.map((x) => (
            <div key={x.id} className={`card clk ${x.id === t.id ? 'sel' : ''}`} style={{ padding: '9px 11px' }} onClick={() => setId(x.id)}>
              <div className="row"><b>{x.title}</b>{x.status === 'open' ? <Tag tone={x.id === 'T-318' ? 'r' : 'y'}>{x.age}</Tag> : x.status === 'passed' ? <Tag tone="n">Ops lead</Tag> : <Tag tone="x">{x.status === 'closed' ? 'Closed' : 'Answered'}</Tag>}</div>
              <div className="s m">{x.from} · {x.who} · {x.ref}</div>
            </div>
          ))}
          <div className="s m end">Oldest unanswered first. Target: first reply within 10 minutes.</div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 0 }}>
          <div className="row">
            <div className="lft"><Av face={t.face} /><div><div className="h2" style={{ fontSize: 15 }}>{t.who}</div><div className="s m">{t.info}</div></div></div>
            <TLink onClick={() => (t.from === 'Customer' ? go('customerDetail', { name: t.who }) : go('partnerDetail', { id: t.face }))}>Open {t.from.toLowerCase()}</TLink>
          </div>
          <div className="hr" />
          <div ref={chat} style={{ display: 'flex', flexDirection: 'column', gap: 9, overflow: 'auto', maxHeight: 300 }}>
            {t.msgs.map((m, i) => (
              <div key={i} className={`bub ${m.me ? 'me' : ''}`} style={{ maxWidth: '88%' }}>{m.bold && <b>{m.bold} </b>}{m.text}</div>
            ))}
          </div>
          {t.id === 'T-318' && <div className="s m" style={{ textAlign: 'center' }}>Support 1 replied in 4 minutes</div>}
          {t.pendingRefund && t.status === 'passed' && (
            <div className="card s" style={{ padding: '9px 11px', background: 'var(--yellow)', border: 0 }}>
              <b>Passed to manager.</b> Refund of {inr(t.pendingRefund)} is above your {inr(ROLE_LIMIT)} limit. The ops lead approves or changes it; you will see it here.
            </div>
          )}
          <div className="h2" style={{ marginTop: 4 }}>Private note</div>
          {t.note && <div className="card s m" style={{ padding: '9px 11px' }}>{t.note}</div>}
          <form className="lft" onSubmit={(e) => { e.preventDefault(); if (!note.trim()) return; patchTicket(t.id, (x) => ({ note: x.note ? `${x.note} ${note.trim()}` : note.trim() })); setNote(''); toast('Note saved · only staff see it'); }}>
            <input className="inp" style={{ padding: '7px 10px', fontSize: 12 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a private note (staff only)" />
          </form>
          <form className="inp row end" style={{ padding: '4px 12px', fontSize: 13, fontWeight: 400 }}
            onSubmit={(e) => { e.preventDefault(); if (!reply.trim()) return; say(reply.trim()); setReply(''); toast(`Reply sent to ${first}`); }}>
            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder={closed ? 'Ticket is closed' : `Reply to ${first}`} disabled={closed}
              style={{ border: 0, outline: 'none', background: 'transparent', font: 'inherit', color: 'var(--ink)', flex: 1, padding: '6px 0', minWidth: 0 }} />
            <button type="submit" className="s clk" style={{ color: 'var(--green)', fontWeight: 700, border: 0, background: 'none', font: 'inherit', fontSize: 11 }}>Send</button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="card">
            <div className="h2" style={{ fontSize: 15, marginBottom: 8 }}>Facts of {t.ref === 'payout' ? 'the payout' : `visit ${t.ref}`}</div>
            <div style={{ display: 'grid', gap: 7 }}>
              {facts.rows.map(([k, v, red]) => <div key={k} className="row"><span className="m">{k}</span><b style={red ? { color: 'var(--red)' } : undefined}>{v}</b></div>)}
              {!!t.refunded && <div className="row"><span className="m">Refunded</span><b style={{ color: 'var(--green)' }}>{inr(t.refunded)}</b></div>}
            </div>
          </div>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="h2" style={{ fontSize: 15 }}>What you can do</div>
            {facts.fixes.map((f, i) => {
              const isDone = used.includes(f.label);
              return (
                <button key={f.label} className={`btn ${i === 0 ? '' : 'o'}`} style={{ padding: i === 0 ? 10 : 9, opacity: isDone || closed ? 0.55 : 1 }}
                  onClick={() => (isDone ? toast('Already done') : fix(f))}>{isDone ? `✓ ${f.label}` : f.label}</button>
              );
            })}
            {facts.price > 0 && (
              <form className="lft" style={{ gap: 6 }} onSubmit={(e) => { e.preventDefault(); const n = parseInt(amount, 10); if (!n) { toast('Enter an amount'); return; } if (closed) { toast('Ticket is closed · reopen it first'); return; } setConfirm(n); }}>
                <div className="inp row" style={{ padding: '0 10px', flex: 1 }}><span className="m">₹</span>
                  <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} placeholder="Other amount" inputMode="numeric"
                    style={{ border: 0, outline: 'none', background: 'transparent', font: 'inherit', fontSize: 13, padding: '8px 4px', flex: 1, minWidth: 0 }} /></div>
                <button type="submit" className="btn o sm">Refund</button>
              </form>
            )}
            <div className="s m end">Your role can refund up to {inr(ROLE_LIMIT)}. Larger refunds go to the ops lead.</div>
          </div>
        </div>
      </div>

      <Modal open={confirm !== null} onClose={() => setConfirm(null)} title={confirm && confirm > ROLE_LIMIT ? `Ask for a ${inr(confirm)} refund?` : `Refund ${inr(confirm ?? 0)} to ${first}?`}
        actions={<>
          <button className="btn o sm" onClick={() => setConfirm(null)}>Cancel</button>
          <button className="btn sm" onClick={() => confirm && refund(confirm)}>{confirm && confirm > ROLE_LIMIT ? 'Pass to ops lead' : 'Refund'}</button>
        </>}>
        <div className="m">{confirm && confirm > ROLE_LIMIT
          ? `This is above your ${inr(ROLE_LIMIT)} limit. It goes to the ops lead to approve, and ${first} is told it is being checked.`
          : `The money goes back to ${first}'s UPI within 2 hours. ${first} gets an SMS.`}</div>
      </Modal>
    </>
  );
}
