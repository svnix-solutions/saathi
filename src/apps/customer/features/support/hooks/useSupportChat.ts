import { useCallback, useEffect, useRef, useState } from 'react';
import { cannedReply, firstChat, firstPicks, personGreeting, type ChatMessage, type L } from '../data';

/** Delay before the bot answers, and before a person joins (ms). */
const BOT_DELAY = 1100;
const PERSON_DELAY = 1300;

/**
 * The support chat conversation: messages, the "typing" bubble, picked quick replies, and the timed replies.
 * `send` adds the customer's line and schedules the canned answer; `askPerson` schedules the team member's greeting.
 */
export function useSupportChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(firstChat);
  const [picked, setPicked] = useState<Record<number, string>>(firstPicks);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const replyLater = useCallback((reply: L, ms: number) => {
    setTyping(true);
    timer.current = setTimeout(() => { setTyping(false); setMessages((m) => [...m, { text: reply }]); }, ms);
  }, []);

  /** Sends `q` as the customer (typed text, or a translated quick reply); returns false when it is blank. */
  const send = useCallback((q: string | L) => {
    const en = typeof q === 'string' ? q.trim() : q.en;
    if (!en) return false;
    setMessages((m) => [...m, { me: true, text: typeof q === 'string' ? en : q }]);
    replyLater(cannedReply(en), BOT_DELAY);
    return true;
  }, [replyLater]);

  /** Picks a quick reply under message `i`; returns false when that message was already answered. */
  const choose = useCallback((i: number, choice: L) => {
    if (picked[i]) return false;
    setPicked((p) => ({ ...p, [i]: choice.en }));
    send(choice);
    return true;
  }, [picked, send]);

  const askPerson = useCallback(() => replyLater(personGreeting, PERSON_DELAY), [replyLater]);

  return { messages, picked, typing, send, choose, askPerson };
}
