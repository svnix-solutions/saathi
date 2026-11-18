/** Sample campaigns, audiences and channels for the campaigns page. */
import type { TagTone } from '../../ui';

export type Campaign = {
  id: number; name: string; to: string; who: 'customers' | 'partners'; by: string; reached: number | null; booked: string | null;
  status: string; tone: TagTone; message: string; rate?: string; brought?: string; cost?: string;
};

export const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Come back, ₹50 off', to: 'Not booked in 30 days', who: 'customers', by: 'WhatsApp', reached: 412, booked: '58', status: 'Running', tone: 'g',
    message: 'Hi Meera, your home misses us. Here is **₹50 off** your next Saathi visit, valid till Sunday. Reply BOOK to get a helper in 15 minutes.', rate: '14%', brought: '₹6,264', cost: 'Cost so far: ₹2,900 in discounts and ₹330 in messages.' },
  { id: 2, name: 'Try a monthly plan', to: '3+ visits, no plan', who: 'customers', by: 'App alert', reached: 236, booked: '19', status: 'Running', tone: 'g',
    message: 'Same helper, same time, every day. Save 10% with a Saathi monthly plan.', rate: '8%', brought: '₹28,400', cost: 'Cost so far: ₹2,840 in discounts. App alerts are free.' },
  { id: 3, name: 'Busy-hour pay, Block D', to: 'Partners near Block D', who: 'partners', by: 'App alert', reached: 14, booked: '6 online', status: 'Running', tone: 'g',
    message: 'Extra ₹20 a visit in Block D from 8 to 10 am tomorrow. Go online to get jobs.', rate: '43%', brought: '6 partners', cost: 'Cost so far: ₹240 in extra pay.' },
  { id: 4, name: 'Diwali deep clean', to: 'All customers', who: 'customers', by: 'WhatsApp + SMS', reached: null, booked: null, status: 'Sat 9 am', tone: 'n',
    message: 'Diwali is coming! Book a kitchen & bath scrub this week and get ₹100 off with DIWALI.' },
  { id: 5, name: 'Sector 34 is open', to: 'Waitlist, Sector 34', who: 'customers', by: 'SMS', reached: null, booked: null, status: '1 Dec', tone: 'n',
    message: 'Saathi is now in Sector 34. Get a helper at your door in 15 minutes. ₹50 off your first visit with FIRST50.' },
  { id: 6, name: 'Rate your last visit', to: 'Unrated visits', who: 'customers', by: 'App alert', reached: 801, booked: '322 rated', status: 'Ended', tone: 'x',
    message: 'How was your visit? Tap to rate your helper. It takes 5 seconds.', rate: '40%', brought: '322 ratings', cost: 'App alerts are free.' },
];

export const AUDIENCES: { label: string; who: Campaign['who']; size: number }[] = [
  { label: 'All customers', who: 'customers', size: 1284 },
  { label: 'Not booked in 30 days', who: 'customers', size: 412 },
  { label: '3+ visits, no plan', who: 'customers', size: 236 },
  { label: 'New this week', who: 'customers', size: 112 },
  { label: 'All partners', who: 'partners', size: 148 },
  { label: 'Partners near Block D', who: 'partners', size: 14 },
];
export const CHANNELS = ['App alert', 'WhatsApp', 'SMS'] as const;
/** Rupees per message sent on each channel. */
export const MSG_COST: Record<string, number> = { 'App alert': 0, WhatsApp: 0.8, SMS: 0.25 };
/** Share of customers who agreed to receive offers. */
export const AGREED_SHARE = 0.82;
export const SEND_LATER_OPTIONS = ['Tomorrow 9 am', 'Sat 9 am', 'Sun 10 am', '1 Dec'];

export type Draft = { name: string; audience: string; ch: string[]; message: string; when: 'now' | 'later'; at: string };
export const emptyDraft = (): Draft => ({ name: '', audience: AUDIENCES[1].label, ch: ['WhatsApp'], message: '', when: 'now', at: 'Sat 9 am' });

export type CampaignAudience = 'all' | 'customers' | 'partners';

/** Quiet hours from decisions ('9 pm to 8 am'). */
export const inQuietHours = (d = new Date()) => d.getHours() >= 21 || d.getHours() < 8;
