import { useEffect, useRef, useState } from 'react';
import { chatOpening, chatReplies, replyDelayMs, type ChatMessage } from '../data';

/**
 * The prototype chat: the customer's message is added at once, then the helper "types" for a second and answers
 * with the next canned reply.
 */
export function useHelperChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatOpening);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const replyN = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (text: string) => {
    const v = text.trim();
    if (!v) return;
    setMessages((m) => [...m, { me: true, text: v }]);
    setDraft('');
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { me: false, text: chatReplies[replyN.current++ % chatReplies.length] }]);
    }, replyDelayMs);
  };

  return { messages, draft, setDraft, typing, send };
}
