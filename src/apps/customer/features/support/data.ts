import { decisions } from '@/domain';

/** A line of sample text in English, Hindi and Punjabi; shown with `t(l.en, l.hi, l.pa)`. */
export type L = { en: string; hi: string; pa: string };

/** "Something went wrong?" rows on Help and safety: [support topic, English, Hindi, Punjabi]. */
export const problems: [string, string, string, string][] = [
  ['notArrived', 'Helper has not arrived', 'हेल्पर नहीं पहुँचा', 'ਹੈਲਪਰ ਨਹੀਂ ਪਹੁੰਚਿਆ'],
  ['notFinished', 'Work was not finished', 'काम पूरा नहीं हुआ', 'ਕੰਮ ਪੂਰਾ ਨਹੀਂ ਹੋਇਆ'],
  ['damaged', 'Something is damaged or missing', 'कुछ टूटा या गायब है', 'ਕੁਝ ਟੁੱਟਿਆ ਜਾਂ ਗੁੰਮ ਹੈ'],
  ['charged', 'I was charged wrongly', 'मुझसे गलत पैसे लिए गए', 'ਮੇਰੇ ਤੋਂ ਗਲਤ ਪੈਸੇ ਲਏ ਗਏ'],
];

/** A run of chat text; `bold` runs are drawn in bold (the amount refunded). */
export type ChatPart = { text: L; bold?: boolean };
/**
 * One chat line. `me` is the customer; `choices` are quick replies shown under the bubble.
 * `text` is a plain string for what the customer typed, or translated sample text.
 */
export type ChatMessage = { me?: boolean; text: string | L | ChatPart[]; choices?: L[] };

const sendSomeone: L = { en: 'Yes, send someone', hi: 'हाँ, किसी को भेजें', pa: 'ਹਾਂ, ਕਿਸੇ ਨੂੰ ਭੇਜੋ' };
const refundFine: L = { en: 'No, refund is fine', hi: 'नहीं, रिफ़ंड ठीक है', pa: 'ਨਹੀਂ, ਰਿਫੰਡ ਠੀਕ ਹੈ' };
const rekhaComing: L = {
  en: 'Done. Rekha arrives in about 15 minutes, free of charge.',
  hi: 'हो गया। रेखा लगभग 15 मिनट में पहुँचेंगी, बिना किसी शुल्क के।',
  pa: 'ਹੋ ਗਿਆ। ਰੇਖਾ ਲਗਭਗ 15 ਮਿੰਟ ਵਿੱਚ ਪਹੁੰਚ ਜਾਵੇਗੀ, ਬਿਨਾਂ ਕਿਸੇ ਖਰਚੇ ਦੇ।',
};

/** The conversation already on screen when Support chat opens. */
export const firstChat: ChatMessage[] = [
  { me: true, text: { en: 'My helper left 20 minutes early', hi: 'मेरा हेल्पर 20 मिनट पहले चला गया', pa: 'ਮੇਰਾ ਹੈਲਪਰ 20 ਮਿੰਟ ਪਹਿਲਾਂ ਚਲਾ ਗਿਆ' } },
  { text: {
    en: 'Sorry about that. I can see visit #2031 was booked for 1 hr and ended after 40 min.',
    hi: 'इसके लिए माफ़ कीजिए। मैं देख रहा हूँ कि विज़िट #2031 1 घंटे के लिए बुक थी और 40 मिनट में खत्म हो गई।',
    pa: 'ਇਸ ਲਈ ਮਾਫ਼ ਕਰਨਾ। ਮੈਂ ਦੇਖ ਰਿਹਾ ਹਾਂ ਕਿ ਵਿਜ਼ਿਟ #2031 1 ਘੰਟੇ ਲਈ ਬੁੱਕ ਸੀ ਅਤੇ 40 ਮਿੰਟ ਵਿੱਚ ਖਤਮ ਹੋ ਗਈ।',
  } },
  { text: [
    { text: { en: 'I have added ', hi: 'मैंने 20 मिनट के लिए आपके वॉलेट में ', pa: 'ਮੈਂ 20 ਮਿੰਟ ਲਈ ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ' } },
    { text: { en: '₹53', hi: '₹53', pa: '₹53' }, bold: true },
    { text: {
      en: ' to your wallet for the 20 minutes. Would you also like a helper sent back to finish?',
      hi: ' डाल दिए हैं। क्या काम पूरा करने के लिए हेल्पर वापस भेजें?',
      pa: ' ਪਾ ਦਿੱਤੇ ਹਨ। ਕੀ ਕੰਮ ਪੂਰਾ ਕਰਨ ਲਈ ਹੈਲਪਰ ਵਾਪਸ ਭੇਜੀਏ?',
    } },
  ], choices: [sendSomeone, refundFine] },
  { me: true, text: sendSomeone },
  { text: rekhaComing },
];

/** Quick replies already picked in the sample chat (message index → English choice). */
export const firstPicks: Record<number, string> = { 2: sendSomeone.en };

/** What the person from the Saathi team says when the customer asks for one. */
export const personGreeting: L = {
  en: 'Hi Nitin, I am Meena from the Saathi team. I have read the chat. How can I help?',
  hi: 'नमस्ते नितिन, मैं Saathi टीम से मीना हूँ। मैंने चैट पढ़ ली है। मैं कैसे मदद करूँ?',
  pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਨਿਤਿਨ, ਮੈਂ Saathi ਟੀਮ ਤੋਂ ਮੀਨਾ ਹਾਂ। ਮੈਂ ਚੈਟ ਪੜ੍ਹ ਲਈ ਹੈ। ਮੈਂ ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?',
};

/** The support bot's canned answer to a customer message (prototype only). Matches English, Hindi and Punjabi words. */
export function cannedReply(q: string): L {
  const s = q.toLowerCase();
  if (s.includes('no, refund')) return {
    en: 'Okay. The ₹53 stays in your wallet. Anything else I can help with?',
    hi: 'ठीक है। ₹53 आपके वॉलेट में रहेंगे। और कोई मदद चाहिए?',
    pa: 'ਠੀਕ ਹੈ। ₹53 ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ਰਹਿਣਗੇ। ਹੋਰ ਕੋਈ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?',
  };
  if (s.includes('yes, send')) return rekhaComing;
  if (/refund|money|charge|paid|pay|पैसा|पैसे|रिफ़ंड|रिफंड|ਪੈਸਾ|ਪੈਸੇ|ਰਿਫੰਡ/.test(s)) return {
    en: 'Refunds go to your Saathi wallet at once, or to your bank in 3 to 5 days. Shall I send it to the bank?',
    hi: 'रिफ़ंड तुरंत आपके Saathi वॉलेट में जाता है, या 3 से 5 दिन में आपके बैंक में। क्या बैंक में भेज दूँ?',
    pa: 'ਰਿਫੰਡ ਤੁਰੰਤ ਤੁਹਾਡੇ Saathi ਵਾਲੇਟ ਵਿੱਚ ਜਾਂਦਾ ਹੈ, ਜਾਂ 3 ਤੋਂ 5 ਦਿਨਾਂ ਵਿੱਚ ਤੁਹਾਡੇ ਬੈਂਕ ਵਿੱਚ। ਕੀ ਬੈਂਕ ਵਿੱਚ ਭੇਜ ਦਿਆਂ?',
  };
  if (/late|where|arriv|time|देर|कहाँ|समय|ਦੇਰ|ਕਿੱਥੇ|ਸਮਾਂ/.test(s)) return {
    en: 'Rekha is 6 minutes away. You can follow her live from Bookings.',
    hi: 'रेखा 6 मिनट दूर हैं। आप बुकिंग में उन्हें लाइव देख सकते हैं।',
    pa: 'ਰੇਖਾ 6 ਮਿੰਟ ਦੂਰ ਹੈ। ਤੁਸੀਂ ਬੁਕਿੰਗ ਵਿੱਚ ਉਸਨੂੰ ਲਾਈਵ ਦੇਖ ਸਕਦੇ ਹੋ।',
  };
  const hrs = decisions.customer.freeCancelUntilHrs;
  if (/cancel|रद्द|ਰੱਦ/.test(s)) return {
    en: `You can cancel free up to ${hrs} hr before the visit. Want me to cancel it?`,
    hi: `विज़िट से ${hrs} घंटे पहले तक आप मुफ़्त में रद्द कर सकते हैं। क्या मैं इसे रद्द कर दूँ?`,
    pa: `ਵਿਜ਼ਿਟ ਤੋਂ ${hrs} ਘੰਟੇ ਪਹਿਲਾਂ ਤੱਕ ਤੁਸੀਂ ਮੁਫ਼ਤ ਰੱਦ ਕਰ ਸਕਦੇ ਹੋ। ਕੀ ਮੈਂ ਇਸਨੂੰ ਰੱਦ ਕਰ ਦਿਆਂ?`,
  };
  if (/thank|ok|great|धन्यवाद|शुक्रिया|ठीक|ਧੰਨਵਾਦ|ਸ਼ੁਕਰੀਆ|ਠੀਕ/.test(s)) return {
    en: 'Happy to help. Have a calm day!',
    hi: 'मदद करके खुशी हुई। आपका दिन अच्छा रहे!',
    pa: 'ਮਦਦ ਕਰਕੇ ਖੁਸ਼ੀ ਹੋਈ। ਤੁਹਾਡਾ ਦਿਨ ਵਧੀਆ ਲੰਘੇ!',
  };
  return {
    en: 'Thanks, I have noted that. A person from our team will reply here within 5 minutes if I cannot fix it.',
    hi: 'धन्यवाद, मैंने यह लिख लिया है। अगर मैं इसे ठीक नहीं कर पाया, तो हमारी टीम से कोई 5 मिनट में यहाँ जवाब देगा।',
    pa: 'ਧੰਨਵਾਦ, ਮੈਂ ਇਹ ਨੋਟ ਕਰ ਲਿਆ ਹੈ। ਜੇ ਮੈਂ ਇਸਨੂੰ ਠੀਕ ਨਾ ਕਰ ਸਕਿਆ, ਤਾਂ ਸਾਡੀ ਟੀਮ ਤੋਂ ਕੋਈ 5 ਮਿੰਟ ਵਿੱਚ ਇੱਥੇ ਜਵਾਬ ਦੇਵੇਗਾ।',
  };
}
