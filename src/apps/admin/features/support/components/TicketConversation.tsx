import React, { useEffect, useRef } from 'react';
import { Av, TextLink } from '../../../ui';
import { inr, type Ticket } from '../../../fixtures';
import { ROLE_LIMIT } from '../data';
import '../support.css';

export type TicketConversationProps = {
  ticket: Ticket;
  /** First name of the person, for "Reply to …". */
  first: string;
  closed: boolean;
  onOpenPerson: () => void;
  reply: string;
  onReplyChange: (v: string) => void;
  onSendReply: () => void;
  note: string;
  onNoteChange: (v: string) => void;
  onSaveNote: () => void;
};

/** Middle column of the ticket page: who wrote, the chat, a pending-refund notice, the private note and the reply box. */
export function TicketConversation({ ticket: t, first, closed, onOpenPerson, reply, onReplyChange, onSendReply, note, onNoteChange, onSaveNote }: TicketConversationProps) {
  const chat = useRef<HTMLDivElement>(null);
  useEffect(() => { chat.current?.scrollTo(0, chat.current.scrollHeight); }, [t.msgs.length, t.id]);

  return (
    <div className="card sup-chat-card">
      <div className="row">
        <div className="lft"><Av face={t.face} /><div><div className="h2 sup-title">{t.who}</div><div className="s m">{t.info}</div></div></div>
        <TextLink onClick={onOpenPerson}>Open {t.from.toLowerCase()}</TextLink>
      </div>
      <div className="hr" />
      <div ref={chat} className="sup-chat">
        {t.msgs.map((m, i) => (
          <div key={i} className={`bub ${m.me ? 'me' : ''} sup-bubble`}>{m.bold && <b>{m.bold} </b>}{m.text}</div>
        ))}
      </div>
      {t.id === 'T-318' && <div className="s m sup-center">Support 1 replied in 4 minutes</div>}
      {t.pendingRefund && t.status === 'passed' && (
        <div className="card s sup-warn">
          <b>Passed to manager.</b> Refund of {inr(t.pendingRefund)} is above your {inr(ROLE_LIMIT)} limit. The ops lead approves or changes it; you will see it here.
        </div>
      )}
      <div className="h2 sup-subhead">Private note</div>
      {t.note && <div className="card s m sup-tight">{t.note}</div>}
      <form className="lft" onSubmit={(e) => { e.preventDefault(); onSaveNote(); }}>
        <input className="inp sup-note-input" value={note} onChange={(e) => onNoteChange(e.target.value)} placeholder="Add a private note (staff only)" />
      </form>
      <form className="inp row end sup-reply" onSubmit={(e) => { e.preventDefault(); onSendReply(); }}>
        <input className="sup-reply-input" value={reply} onChange={(e) => onReplyChange(e.target.value)} placeholder={closed ? 'Ticket is closed' : `Reply to ${first}`} disabled={closed} />
        <button type="submit" className="s clk sup-send">Send</button>
      </form>
    </div>
  );
}

export default TicketConversation;
