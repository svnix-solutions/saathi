import type { PartnerState, PayLine } from './types';

export const initialPartnerState: PartnerState = {
  name: 'Sunita',
  phone: '98100 22334',
  online: true,
  approved: true,
  job: {
    id: '#2041', service: 'General cleaning', minutes: 60, earn: 126, address: 'Flat 204, Block C', customer: 'Nitin K.',
    note: "Please do the kids' room first.", tasks: ['Sweep and mop floors', 'Dusting', 'Wipe surfaces'], done: ['Sweep and mop floors', 'Dusting'],
  },
};

/** Today's sample earnings list until the partner finishes a job. */
export const defaultToday: PayLine[] = [
  { title: 'General cleaning', titleHi: 'सामान्य सफ़ाई', sub: '11:10 am · 1 hr', amt: 126 },
  { title: 'Dishes & meal prep', titleHi: 'बर्तन और खाना तैयारी', sub: '9:00 am · 1.5 hr', amt: 189 },
  { title: 'Tip from customer', titleHi: 'ग्राहक से टिप', sub: '11:15 am', amt: 50, tip: true },
];
