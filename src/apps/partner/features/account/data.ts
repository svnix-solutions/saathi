import type { IconName, Locale } from '@/native/ui';

/* ---------- profile ---------- */
export const seedPhone = '98100 22334';
export const samplePhone = '98111 20034';
export const sampleProfile = { fullName: 'Sunita Devi', email: 'sunita.devi@example.com', emergency: 'Ravi (husband) · 98111 45678', langs: ['Hindi', 'Punjabi'] };
/** The sample names as shown in Hindi and Punjabi. */
export const sampleNames = {
  fullName: ['Sunita Devi', 'सुनीता देवी', 'ਸੁਨੀਤਾ ਦੇਵੀ'], short: ['Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.'],
} as const;
/** Languages a partner can say they speak, with their Hindi and Punjabi names. */
export const spokenLanguagesHi: Record<string, string> = { Hindi: 'हिन्दी', Punjabi: 'पंजाबी', English: 'अंग्रेज़ी', Bengali: 'बांग्ला' };
export const spokenLanguagesPa: Record<string, string> = { Hindi: 'ਹਿੰਦੀ', Punjabi: 'ਪੰਜਾਬੀ', English: 'ਅੰਗਰੇਜ਼ੀ', Bengali: 'ਬੰਗਾਲੀ' };

/* ---------- bank ---------- */
/** Bank (brand name, kept in Latin) and branch (English, Hindi, Punjabi) by the first 4 letters of the IFSC. */
export const banks: Record<string, [string, string, string, string]> = {
  SBIN: ['State Bank of India', 'Block C branch', 'ब्लॉक सी शाखा', 'ਬਲਾਕ ਸੀ ਸ਼ਾਖਾ'],
  HDFC: ['HDFC Bank', 'Sector 18 branch', 'सेक्टर 18 शाखा', 'ਸੈਕਟਰ 18 ਸ਼ਾਖਾ'],
  ICIC: ['ICICI Bank', 'Main Road branch', 'मेन रोड शाखा', 'ਮੇਨ ਰੋਡ ਸ਼ਾਖਾ'],
  PUNB: ['Punjab National Bank', 'Block B branch', 'ब्लॉक बी शाखा', 'ਬਲਾਕ ਬੀ ਸ਼ਾਖਾ'],
  BARB: ['Bank of Baroda', 'Market branch', 'मार्केट शाखा', 'ਮਾਰਕੀਟ ਸ਼ਾਖਾ'],
};
/** A valid IFSC we have no sample for. */
export const unknownBank: [string, string, string, string] = ['Bank found', 'Branch from the IFSC', 'शाखा IFSC से', 'ਸ਼ਾਖਾ IFSC ਤੋਂ'];
export const unknownBankName: [string, string, string] = ['Bank found', 'बैंक मिल गया', 'ਬੈਂਕ ਮਿਲ ਗਿਆ'];
export const sampleBank = { account: '•••• •••• 4821', ifsc: 'SBIN0001234', upiId: 'sunita@okaxis' };

/* ---------- alerts ---------- */
export type PartnerAlert = { id: string; icon: IconName; fill?: boolean; en: string; hi: string; pa: string; subEn: string; subHi: string; subPa: string; go: string };
export const alerts: PartnerAlert[] = [
  { id: 'pay', icon: 'wallet', en: '₹2,846 sent to your bank', hi: '₹2,846 आपके बैंक में भेजे', pa: '₹2,846 ਤੁਹਾਡੇ ਬੈਂਕ ਵਿੱਚ ਭੇਜੇ', subEn: 'Weekly payout · State Bank ···· 4821 · today', subHi: 'साप्ताहिक भुगतान · स्टेट बैंक ···· 4821 · आज', subPa: 'ਹਫ਼ਤਾਵਾਰੀ ਭੁਗਤਾਨ · ਸਟੇਟ ਬੈਂਕ ···· 4821 · ਅੱਜ', go: 'earnings' },
  { id: 'rev', icon: 'star', en: 'New review: 5 stars', hi: 'नई समीक्षा: 5 स्टार', pa: 'ਨਵੀਂ ਸਮੀਖਿਆ: 5 ਸਟਾਰ', subEn: '"Kitchen slab was spotless" · 2 hr ago', subHi: '"किचन स्लैब चमक रहा था" · 2 घंटे पहले', subPa: '"ਰਸੋਈ ਦੀ ਸਲੈਬ ਚਮਕ ਰਹੀ ਸੀ" · 2 ਘੰਟੇ ਪਹਿਲਾਂ', go: 'reviews' },
  { id: 'pol', icon: 'shield', en: 'Police verification done', hi: 'पुलिस सत्यापन पूरा', pa: 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ ਪੂਰੀ', subEn: 'Valid until Oct 2027 · yesterday', subHi: 'अक्टूबर 2027 तक मान्य · कल', subPa: 'ਅਕਤੂਬਰ 2027 ਤੱਕ ਜਾਇਜ਼ · ਕੱਲ੍ਹ', go: 'joining' },
  { id: 'busy', icon: 'bolt', fill: true, en: 'Busy hour tomorrow, 7 to 10 am', hi: 'कल व्यस्त समय, सुबह 7 से 10', pa: 'ਕੱਲ੍ਹ ਭੀੜ ਦਾ ਸਮਾਂ, ਸਵੇਰੇ 7 ਤੋਂ 10', subEn: '₹20 extra per job in Block C · yesterday', subHi: 'ब्लॉक सी में हर काम पर ₹20 ज़्यादा · कल', subPa: 'ਬਲਾਕ ਸੀ ਵਿੱਚ ਹਰ ਕੰਮ ਉੱਤੇ ₹20 ਵੱਧ · ਕੱਲ੍ਹ', go: 'hours' },
  { id: 'off', icon: 'clock', en: 'Day off approved', hi: 'छुट्टी मंज़ूर', pa: 'ਛੁੱਟੀ ਮਨਜ਼ੂਰ', subEn: 'Sun 30 Nov · 2 days ago', subHi: 'रवि 30 नवंबर · 2 दिन पहले', subPa: 'ਐਤ 30 ਨਵੰਬਰ · 2 ਦਿਨ ਪਹਿਲਾਂ', go: 'timeOff' },
];
/** Alerts already read in the sample state (only the payout is new). */
export const defaultAlertsRead = ['rev', 'pol', 'busy', 'off'];

/* ---------- joining ---------- */
export const joiningDone = [
  { en: 'Mobile number', hi: 'मोबाइल नंबर', pa: 'ਮੋਬਾਈਲ ਨੰਬਰ', subEn: 'Verified', subHi: 'सत्यापित', subPa: 'ਤਸਦੀਕ ਹੋਇਆ' },
  { en: 'Aadhaar, PAN and 2 references', hi: 'आधार, पैन और 2 पहचान वाले', pa: 'ਆਧਾਰ, ਪੈਨ ਅਤੇ 2 ਪਛਾਣ ਵਾਲੇ', subEn: 'Added at sign-up · approved', subHi: 'साइन-अप में जोड़े · मंज़ूर', subPa: 'ਸਾਈਨ-ਅੱਪ ਵਿੱਚ ਜੋੜੇ · ਮਨਜ਼ੂਰ' },
];

/* ---------- working hours ---------- */
export const weekDays = [['M', 'सो', 'ਸੋ'], ['T', 'मं', 'ਮੰ'], ['W', 'बु', 'ਬੁ'], ['T', 'गु', 'ਵੀ'], ['F', 'शु', 'ਸ਼ੁ'], ['S', 'श', 'ਸ਼'], ['S', 'र', 'ਐ']];
export const defaultWorkDays = [true, true, true, true, true, true, false];
export const shiftRows = [
  ['Morning', 'सुबह', 'ਸਵੇਰ', '6 am to 10 am', 'सुबह 6 से 10', 'ਸਵੇਰੇ 6 ਤੋਂ 10'],
  ['Midday', 'दोपहर', 'ਦੁਪਹਿਰ', '10 am to 2 pm', 'सुबह 10 से दोपहर 2', 'ਸਵੇਰੇ 10 ਤੋਂ ਦੁਪਹਿਰ 2'],
  ['Evening', 'शाम', 'ਸ਼ਾਮ', '4 pm to 8 pm', 'शाम 4 से 8', 'ਸ਼ਾਮ 4 ਤੋਂ 8'],
];
export const defaultShifts = [true, true, false];

/* ---------- help ---------- */
export type HelpTopic = { icon: IconName; en: string; hi: string; pa: string; tipEn: string; tipHi: string; tipPa: string; act: string; actHi: string; actPa: string };
export const helpTopics: HelpTopic[] = [
  { icon: 'home', en: 'Customer not at home', hi: 'ग्राहक घर पर नहीं', pa: 'ਗਾਹਕ ਘਰ ਨਹੀਂ ਹੈ', tipEn: 'Wait 10 minutes at the door. We call the customer for you. If nobody comes you are paid ₹30 for the trip.', tipHi: 'दरवाज़े पर 10 मिनट रुकें। हम ग्राहक को कॉल करेंगे। कोई न आए तो आने के ₹30 मिलेंगे।', tipPa: 'ਦਰਵਾਜ਼ੇ ਉੱਤੇ 10 ਮਿੰਟ ਰੁਕੋ। ਅਸੀਂ ਗਾਹਕ ਨੂੰ ਕਾਲ ਕਰਾਂਗੇ। ਕੋਈ ਨਾ ਆਵੇ ਤਾਂ ਆਉਣ ਦੇ ₹30 ਮਿਲਣਗੇ।', act: 'Call the customer for me', actHi: 'ग्राहक को कॉल करें', actPa: 'ਗਾਹਕ ਨੂੰ ਕਾਲ ਕਰੋ' },
  { icon: 'wallet', en: 'Payment problem', hi: 'भुगतान की समस्या', pa: 'ਭੁਗਤਾਨ ਦੀ ਸਮੱਸਿਆ', tipEn: 'Payouts go to your bank every Monday. Missing money is checked within 2 days.', tipHi: 'हर सोमवार बैंक में भुगतान। कम पैसे की जाँच 2 दिन में होती है।', tipPa: 'ਹਰ ਸੋਮਵਾਰ ਬੈਂਕ ਵਿੱਚ ਭੁਗਤਾਨ। ਘੱਟ ਪੈਸਿਆਂ ਦੀ ਜਾਂਚ 2 ਦਿਨਾਂ ਵਿੱਚ ਹੁੰਦੀ ਹੈ।', act: 'Report a payment problem', actHi: 'भुगतान की शिकायत करें', actPa: 'ਭੁਗਤਾਨ ਦੀ ਸ਼ਿਕਾਇਤ ਕਰੋ' },
  { icon: 'clock', en: 'Job needs more time', hi: 'काम में और समय चाहिए', pa: 'ਕੰਮ ਨੂੰ ਹੋਰ ਸਮਾਂ ਚਾਹੀਦਾ', tipEn: 'We ask the customer to add 30 minutes. You earn more for the extra time.', tipHi: 'हम ग्राहक से 30 मिनट जोड़ने को कहेंगे। ज़्यादा समय की ज़्यादा कमाई।', tipPa: 'ਅਸੀਂ ਗਾਹਕ ਨੂੰ 30 ਮਿੰਟ ਜੋੜਨ ਲਈ ਕਹਾਂਗੇ। ਵੱਧ ਸਮੇਂ ਦੀ ਵੱਧ ਕਮਾਈ।', act: 'Ask for 30 more minutes', actHi: '30 मिनट और माँगें', actPa: '30 ਮਿੰਟ ਹੋਰ ਮੰਗੋ' },
  { icon: 'sparkle', en: 'No cleaning supplies', hi: 'सफ़ाई का सामान नहीं', pa: 'ਸਫ਼ਾਈ ਦਾ ਸਮਾਨ ਨਹੀਂ', tipEn: 'Ask the customer first. If there is nothing, we note it and you do what is possible.', tipHi: 'पहले ग्राहक से पूछें। कुछ न हो तो हम दर्ज करेंगे, जितना हो सके करें।', tipPa: 'ਪਹਿਲਾਂ ਗਾਹਕ ਤੋਂ ਪੁੱਛੋ। ਕੁਝ ਨਾ ਹੋਵੇ ਤਾਂ ਅਸੀਂ ਦਰਜ ਕਰਾਂਗੇ, ਜਿੰਨਾ ਹੋ ਸਕੇ ਕਰੋ।', act: 'Tell the team', actHi: 'टीम को बताएँ', actPa: 'ਟੀਮ ਨੂੰ ਦੱਸੋ' },
];
/** App languages in the Help sheet, in the design's order. */
export const helpLanguages: [Locale, string][] = [['en', 'English'], ['hi', 'हिन्दी'], ['pa', 'ਪੰਜਾਬੀ']];

/* ---------- my documents ---------- */
export type DocStatus = 'valid' | 'update' | 'checking';
export type PartnerDocId = 'aadhaar' | 'police' | 'bank' | 'photo';
export const partnerDocs: { id: PartnerDocId; icon: IconName; title: [string, string, string]; sub: [string, string, string] }[] = [
  { id: 'aadhaar', icon: 'user', title: ['Aadhaar card', 'आधार कार्ड', 'ਆਧਾਰ ਕਾਰਡ'], sub: ['Checked 28 Oct 2026 · ···· 4821', '28 अक्टूबर 2026 को जाँचा · ···· 4821', '28 ਅਕਤੂਬਰ 2026 ਨੂੰ ਜਾਂਚਿਆ · ···· 4821'] },
  { id: 'police', icon: 'shield', title: ['Police verification', 'पुलिस सत्यापन', 'ਪੁਲਿਸ ਵੈਰੀਫ਼ਿਕੇਸ਼ਨ'], sub: ['Valid until Oct 2027', 'अक्टूबर 2027 तक मान्य', 'ਅਕਤੂਬਰ 2027 ਤੱਕ ਜਾਇਜ਼'] },
  { id: 'bank', icon: 'wallet', title: ['Bank account', 'बैंक खाता', 'ਬੈਂਕ ਖਾਤਾ'], sub: ['State Bank ···· 4821', 'स्टेट बैंक ···· 4821', 'ਸਟੇਟ ਬੈਂਕ ···· 4821'] },
  { id: 'photo', icon: 'cam', title: ['Profile photo', 'प्रोफ़ाइल फ़ोटो', 'ਪ੍ਰੋਫ਼ਾਈਲ ਫ਼ੋਟੋ'], sub: ['Older than 1 year · take a new one', '1 साल से पुरानी · नई फ़ोटो लें', '1 ਸਾਲ ਤੋਂ ਪੁਰਾਣੀ · ਨਵੀਂ ਫ਼ੋਟੋ ਲਓ'] },
];
export const initialDocStatus: Record<PartnerDocId, DocStatus> = { aadhaar: 'valid', police: 'valid', bank: 'valid', photo: 'update' };
