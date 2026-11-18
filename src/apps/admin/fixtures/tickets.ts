/** Sample support tickets (prototype data only). Mutated through `fixtures/store.ts`. */

export type Msg = { me?: boolean; text: string; bold?: string };
export type TicketStatus = 'open' | 'answered' | 'closed' | 'passed';
export type Ticket = {
  id: string; title: string; from: 'Customer' | 'Partner'; who: string; face: string; ref: string; age: string;
  status: TicketStatus; refundAsk?: boolean; msgs: Msg[]; note?: string; refunded?: number; pendingRefund?: number;
  info: string;
};

/** A fresh copy of the sample tickets. */
export const initialTickets = (): Ticket[] => [
  { id: 'T-318', title: 'Work was not finished', from: 'Customer', who: 'Sameer T.', face: 'st', ref: '#2031', age: '20 min', status: 'open', refundAsk: true,
    info: 'Customer · 2 visits · Block C',
    msgs: [
      { text: 'The helper left after 40 minutes. I paid for one hour and the balcony was not done.' },
      { bold: 'Chosen fix:', text: 'send a helper back, free' },
      { me: true, text: 'Sorry about that, Sameer. I can see the visit ended early. A helper will come back today to finish. I am arranging it now.' },
    ],
    note: 'Second early finish by this partner this week. Flagged on her quality page.' },
  { id: 'T-317', title: 'Customer not at home', from: 'Partner', who: 'Rekha M.', face: 'rm', ref: '#2038', age: '35 min', status: 'open',
    info: 'Partner · Sector 21 · 4.6 rating',
    msgs: [{ text: 'I reached the flat at 9:15 and waited 10 minutes. Nobody opened the door and the phone was off.' }] },
  { id: 'T-316', title: 'Charged wrongly', from: 'Customer', who: 'Priya N.', face: 'pn', ref: '#2019', age: '2 hr', status: 'open',
    info: 'Customer · 6 visits · Sector 21',
    msgs: [{ text: 'I booked 1 hour but I was charged for 1.5 hours. Please check.' }] },
  { id: 'T-315', title: 'Something damaged', from: 'Customer', who: 'Meera S.', face: 'ms', ref: '#2008', age: '3 hr', status: 'open',
    info: 'Customer · 3 visits · Block A',
    msgs: [{ text: 'A glass jar fell and broke while the kitchen shelf was being cleaned. It cost about ₹450.' }] },
  { id: 'T-314', title: 'Payment problem', from: 'Partner', who: 'Anita B.', face: 'ab', ref: 'payout', age: 'yesterday', status: 'answered',
    info: 'Partner · Sector 21 · 4.4 rating',
    msgs: [
      { text: 'My payout last Monday was ₹120 less than the app showed.' },
      { me: true, text: 'Thanks Anita. A cancelled visit was counted twice. The ₹120 will come with this Monday’s payout.' },
    ] },
];
