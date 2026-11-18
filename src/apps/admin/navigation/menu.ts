import type { IconName } from '../ui/Icon/Icon';
import type { Section } from './types';

export type MenuSub = { page: string; label: string };

export type MenuItem = {
  key: Section;
  label: string;
  icon: IconName;
  /** page opened by the item */
  home: string;
  /** yellow count on the right */
  badge?: number;
  /** draw the badge pink (urgent) */
  badgeRed?: boolean;
  /** pages listed under the item while its section is open */
  subs?: MenuSub[];
};

export type MenuGroup = { group: string; items: MenuItem[] };

/** The sidebar: three groups, 13 sections. */
export const menu: MenuGroup[] = [
  { group: 'Operations', items: [
    { key: 'dashboard', label: 'Dashboard', icon: 'home', home: 'dashboard' },
    { key: 'bookings', label: 'Bookings', icon: 'list', home: 'bookings', badge: 2 },
    { key: 'live', label: 'Live map', icon: 'pin', home: 'live' },
    { key: 'safety', label: 'Safety', icon: 'shield', home: 'safety', badge: 1, badgeRed: true },
    { key: 'automation', label: 'Automation', icon: 'bolt', home: 'smart' },
  ] },
  { group: 'People', items: [
    { key: 'partners', label: 'Partners', icon: 'shield', home: 'partners' },
    { key: 'customers', label: 'Customers', icon: 'user', home: 'customers' },
    { key: 'ratings', label: 'Ratings', icon: 'star', home: 'ratings' },
  ] },
  { group: 'Business', items: [
    { key: 'pricing', label: 'Pricing & zones', icon: 'sparkle', home: 'services', subs: [
      { page: 'services', label: 'Services' }, { page: 'professions', label: 'Professions & documents' }, { page: 'zones', label: 'Zones' },
    ] },
    { key: 'payouts', label: 'Payouts', icon: 'wallet', home: 'payouts' },
    { key: 'campaigns', label: 'Campaigns', icon: 'bell', home: 'campaigns' },
    { key: 'support', label: 'Support', icon: 'call', home: 'support', badge: 5 },
    { key: 'team', label: 'Team', icon: 'key', home: 'team' },
  ] },
];
