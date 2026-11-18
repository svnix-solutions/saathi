import { decisions } from '@/domain';

/** "Something went wrong?" rows on Help and safety: [support topic, English, Hindi]. */
export const problems: [string, string, string][] = [
  ['notArrived', 'Helper has not arrived', 'हेल्पर नहीं पहुँचा'],
  ['notFinished', 'Work was not finished', 'काम पूरा नहीं हुआ'],
  ['damaged', 'Something is damaged or missing', 'कुछ टूटा या गायब है'],
  ['charged', 'I was charged wrongly', 'मुझसे गलत पैसे लिए गए'],
];

/** A run of chat text; `bold` runs are drawn in bold (the amount refunded). */
export type ChatPart = { text: string; bold?: boolean };
/** One chat line. `me` is the customer; `choices` are quick replies shown under the bubble. */
export type ChatMessage = { me?: boolean; text: string | ChatPart[]; choices?: string[] };

/** The conversation already on screen when Support chat opens. */
export const firstChat: ChatMessage[] = [
  { me: true, text: 'My helper left 20 minutes early' },
  { text: 'Sorry about that. I can see visit #2031 was booked for 1 hr and ended after 40 min.' },
  { text: [{ text: 'I have added ' }, { text: '₹53', bold: true }, { text: ' to your wallet for the 20 minutes. Would you also like a helper sent back to finish?' }], choices: ['Yes, send someone', 'No, refund is fine'] },
  { me: true, text: 'Yes, send someone' },
  { text: 'Done. Rekha arrives in about 15 minutes, free of charge.' },
];

/** Quick replies already picked in the sample chat (message index → choice). */
export const firstPicks: Record<number, string> = { 2: 'Yes, send someone' };

/** What the person from the Saathi team says when the customer asks for one. */
export const personGreeting = 'Hi Nitin, I am Meena from the Saathi team. I have read the chat. How can I help?';

/** The support bot's canned answer to a customer message (prototype only). */
export function cannedReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes('no, refund')) return 'Okay. The ₹53 stays in your wallet. Anything else I can help with?';
  if (s.includes('yes, send')) return 'Done. Rekha arrives in about 15 minutes, free of charge.';
  if (/refund|money|charge|paid|pay/.test(s)) return 'Refunds go to your Saathi wallet at once, or to your bank in 3 to 5 days. Shall I send it to the bank?';
  if (/late|where|arriv|time/.test(s)) return 'Rekha is 6 minutes away. You can follow her live from Bookings.';
  if (/cancel/.test(s)) return `You can cancel free up to ${decisions.customer.freeCancelUntilHrs} hr before the visit. Want me to cancel it?`;
  if (/thank|ok|great/.test(s)) return 'Happy to help. Have a calm day!';
  return 'Thanks, I have noted that. A person from our team will reply here within 5 minutes if I cannot fix it.';
}
