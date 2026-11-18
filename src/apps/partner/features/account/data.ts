import type { IconName, Locale } from '@/native/ui';

/* ---------- profile ---------- */
export const seedPhone = '98100 22334';
export const samplePhone = '98111 20034';
export const sampleProfile = { fullName: 'Sunita Devi', email: 'sunita.devi@example.com', emergency: 'Ravi (husband) · 98111 45678', langs: ['Hindi', 'Punjabi'] };
/** Languages a partner can say they speak, with their Hindi names. */
export const spokenLanguagesHi: Record<string, string> = { Hindi: 'हिन्दी', Punjabi: 'पंजाबी', English: 'अंग्रेज़ी', Bengali: 'बांग्ला' };

/* ---------- bank ---------- */
/** Bank and branch by the first 4 letters of the IFSC. */
export const banks: Record<string, [string, string]> = {
  SBIN: ['State Bank of India', 'Block C branch'], HDFC: ['HDFC Bank', 'Sector 18 branch'], ICIC: ['ICICI Bank', 'Main Road branch'],
  PUNB: ['Punjab National Bank', 'Block B branch'], BARB: ['Bank of Baroda', 'Market branch'],
};
export const sampleBank = { account: '•••• •••• 4821', ifsc: 'SBIN0001234', upiId: 'sunita@okaxis' };

/* ---------- alerts ---------- */
export type PartnerAlert = { id: string; icon: IconName; fill?: boolean; en: string; hi: string; subEn: string; subHi: string; go: string };
export const alerts: PartnerAlert[] = [
  { id: 'pay', icon: 'wallet', en: '₹2,846 sent to your bank', hi: '₹2,846 आपके बैंक में भेजे', subEn: 'Weekly payout · State Bank ···· 4821 · today', subHi: 'साप्ताहिक भुगतान · स्टेट बैंक ···· 4821 · आज', go: 'earnings' },
  { id: 'rev', icon: 'star', en: 'New review: 5 stars', hi: 'नई समीक्षा: 5 स्टार', subEn: '"Kitchen slab was spotless" · 2 hr ago', subHi: '"किचन स्लैब चमक रहा था" · 2 घंटे पहले', go: 'reviews' },
  { id: 'pol', icon: 'shield', en: 'Police verification done', hi: 'पुलिस सत्यापन पूरा', subEn: 'Valid until Oct 2027 · yesterday', subHi: 'अक्टूबर 2027 तक मान्य · कल', go: 'joining' },
  { id: 'busy', icon: 'bolt', fill: true, en: 'Busy hour tomorrow, 7 to 10 am', hi: 'कल व्यस्त समय, सुबह 7 से 10', subEn: '₹20 extra per job in Block C · yesterday', subHi: 'ब्लॉक सी में हर काम पर ₹20 ज़्यादा · कल', go: 'hours' },
  { id: 'off', icon: 'clock', en: 'Day off approved', hi: 'छुट्टी मंज़ूर', subEn: 'Sun 30 Nov · 2 days ago', subHi: 'रवि 30 नवंबर · 2 दिन पहले', go: 'timeOff' },
];
/** Alerts already read in the sample state (only the payout is new). */
export const defaultAlertsRead = ['rev', 'pol', 'busy', 'off'];

/* ---------- joining ---------- */
export const joiningDone = [
  { en: 'Mobile number', hi: 'मोबाइल नंबर', subEn: 'Verified', subHi: 'सत्यापित' },
  { en: 'Aadhaar, PAN and 2 references', hi: 'आधार, पैन और 2 पहचान वाले', subEn: 'Added at sign-up · approved', subHi: 'साइन-अप में जोड़े · मंज़ूर' },
];

/* ---------- working hours ---------- */
export const weekDays = [['M', 'सो'], ['T', 'मं'], ['W', 'बु'], ['T', 'गु'], ['F', 'शु'], ['S', 'श'], ['S', 'र']];
export const defaultWorkDays = [true, true, true, true, true, true, false];
export const shiftRows = [['Morning', 'सुबह', '6 am to 10 am', 'सुबह 6 से 10'], ['Midday', 'दोपहर', '10 am to 2 pm', 'सुबह 10 से दोपहर 2'], ['Evening', 'शाम', '4 pm to 8 pm', 'शाम 4 से 8']];
export const defaultShifts = [true, true, false];

/* ---------- help ---------- */
export type HelpTopic = { icon: IconName; en: string; hi: string; tipEn: string; tipHi: string; act: string; actHi: string };
export const helpTopics: HelpTopic[] = [
  { icon: 'home', en: 'Customer not at home', hi: 'ग्राहक घर पर नहीं', tipEn: 'Wait 10 minutes at the door. We call the customer for you. If nobody comes you are paid ₹30 for the trip.', tipHi: 'दरवाज़े पर 10 मिनट रुकें। हम ग्राहक को कॉल करेंगे। कोई न आए तो आने के ₹30 मिलेंगे।', act: 'Call the customer for me', actHi: 'ग्राहक को कॉल करें' },
  { icon: 'wallet', en: 'Payment problem', hi: 'भुगतान की समस्या', tipEn: 'Payouts go to your bank every Monday. Missing money is checked within 2 days.', tipHi: 'हर सोमवार बैंक में भुगतान। कम पैसे की जाँच 2 दिन में होती है।', act: 'Report a payment problem', actHi: 'भुगतान की शिकायत करें' },
  { icon: 'clock', en: 'Job needs more time', hi: 'काम में और समय चाहिए', tipEn: 'We ask the customer to add 30 minutes. You earn more for the extra time.', tipHi: 'हम ग्राहक से 30 मिनट जोड़ने को कहेंगे। ज़्यादा समय की ज़्यादा कमाई।', act: 'Ask for 30 more minutes', actHi: '30 मिनट और माँगें' },
  { icon: 'sparkle', en: 'No cleaning supplies', hi: 'सफ़ाई का सामान नहीं', tipEn: 'Ask the customer first. If there is nothing, we note it and you do what is possible.', tipHi: 'पहले ग्राहक से पूछें। कुछ न हो तो हम दर्ज करेंगे, जितना हो सके करें।', act: 'Tell the team', actHi: 'टीम को बताएँ' },
];
/** App languages in the Help sheet, in the design's order. */
export const helpLanguages: [Locale, string][] = [['en', 'English'], ['hi', 'हिन्दी'], ['pa', 'ਪੰਜਾਬੀ']];

/* ---------- my documents ---------- */
export type DocStatus = 'valid' | 'update' | 'checking';
export type PartnerDocId = 'aadhaar' | 'police' | 'bank' | 'photo';
export const partnerDocs: { id: PartnerDocId; icon: IconName; title: string; sub: string }[] = [
  { id: 'aadhaar', icon: 'user', title: 'Aadhaar card', sub: 'Checked 28 Oct 2026 · ···· 4821' },
  { id: 'police', icon: 'shield', title: 'Police verification', sub: 'Valid until Oct 2027' },
  { id: 'bank', icon: 'wallet', title: 'Bank account', sub: 'State Bank ···· 4821' },
  { id: 'photo', icon: 'cam', title: 'Profile photo', sub: 'Older than 1 year · take a new one' },
];
export const initialDocStatus: Record<PartnerDocId, DocStatus> = { aadhaar: 'valid', police: 'valid', bank: 'valid', photo: 'update' };
