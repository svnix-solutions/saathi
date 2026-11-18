/** Sample safety alerts. Times are relative to when the page module loads. */

export type AlertStatus = 'open' | 'handling' | 'closed';
export type SafetyAlert = {
  id: string; kind: 'Emergency · customer' | 'Not safe · partner'; who: string; where: string; job: string; status: AlertStatus;
  startedAt: number; acked: boolean; owner?: string; closedNote?: string; closedAt?: string;
  pressed: string; jobLine: string; partner: string; customer: string; callFirst: string; callSecond: string; log: { t: string; text: string }[];
};

const now = Date.now();
const minAgo = (m: number) => now - m * 60 * 1000;

export const initialAlerts: SafetyAlert[] = [
  { id: 'a1', kind: 'Emergency · customer', who: 'Meera S.', where: 'Flat 12, Block A', job: '#2042', status: 'open', startedAt: minAgo(2), acked: false,
    pressed: '11:21 am, by the customer', jobLine: '#2042 · Kitchen & bath · started 11:12', partner: 'Rekha M. · 4.6 · 310 visits', customer: 'Meera S.',
    callFirst: 'Meera S.', callSecond: 'Rekha M.', log: [{ t: '11:21', text: 'Alert raised, customer app' }] },
  { id: 'a2', kind: 'Not safe · partner', who: 'Kavita R.', where: 'Sector 18', job: '#2044', status: 'handling', startedAt: minAgo(9), acked: true, owner: 'Ops lead',
    pressed: '11:14 am, by the partner', jobLine: '#2044 · General cleaning · started 11:00', partner: 'Kavita R. · 4.7 · 188 visits', customer: 'Vikram J.',
    callFirst: 'Kavita R.', callSecond: 'Vikram J.', log: [{ t: '11:14', text: 'Alert raised, partner app' }, { t: '11:15', text: 'Opened by Ops lead' }, { t: '11:17', text: 'Ops lead called Kavita R. · she is outside, safe' }] },
  { id: 'a3', kind: 'Emergency · customer', who: 'Nitin K.', where: 'House 4, Block C', job: '#2029', status: 'closed', startedAt: minAgo(100), acked: true, closedNote: 'Pressed by mistake', closedAt: '9:40 am',
    pressed: '9:38 am, by the customer', jobLine: '#2029 · General · started 9:30', partner: 'Sunita D. · 4.8 · 142 visits', customer: 'Nitin K.',
    callFirst: 'Nitin K.', callSecond: 'Sunita D.', log: [{ t: '9:38', text: 'Alert raised, customer app' }, { t: '9:39', text: 'Opened by Support 1' }, { t: '9:40', text: 'Closed · pressed by mistake' }] },
  { id: 'a4', kind: 'Not safe · partner', who: 'Pooja V.', where: 'Block A', job: '#2017', status: 'closed', startedAt: minAgo(190), acked: true, closedNote: 'Dog at the gate', closedAt: '8:15 am',
    pressed: '8:09 am, by the partner', jobLine: '#2017 · Dishes · started 8:05', partner: 'Pooja V. · 4.5 · 61 visits', customer: 'Farah A.',
    callFirst: 'Pooja V.', callSecond: 'Farah A.', log: [{ t: '8:09', text: 'Alert raised, partner app' }, { t: '8:10', text: 'Opened by Ops lead' }, { t: '8:15', text: 'Closed · dog at the gate, customer tied it up' }] },
];

/** One-tap notes in the "Close this alert" dialog. */
export const QUICK_NOTES = ['Pressed by mistake', 'Spoke to both, all safe', 'Area lead visited', 'Police called'];
