import { useEffect, useRef, useState } from 'react';
import { chatOpening, chatReplies, replyDelayMs, type ChatMessage, type Tri } from '../data';

/**
 * The prototype chat: the customer's message is added at once, then the helper "types" for a second and answers
 * with the next canned reply. Messages keep all three languages; what the customer types is the same in each.
 */
export function useHelperChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatOpening);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const replyN = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (text: string | Tri) => {
    const msg = typeof text === 'string' ? { en: text.trim(), hi: text.trim(), pa: text.trim() } : text;
    if (!msg.en) return;
    setMessages((m) => [...m, { me: true, text: msg }]);
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
