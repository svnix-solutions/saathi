import type React from 'react';

/** Sidebar sections. A page belongs to one; roles open sections (see `session/roles.ts`). */
export type Section =
  | 'dashboard' | 'bookings' | 'care' | 'live' | 'safety' | 'automation'
  | 'partners' | 'customers' | 'ratings'
  | 'pricing' | 'payouts' | 'campaigns' | 'support' | 'team';

/** Route params passed to `go(page, params)` and to the page component. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- pages read params.id etc. without narrowing
export type PageParams = Record<string, any>;

export type PageDef = {
  /** sidebar item highlighted while this page is open */
  section: Section;
  /** breadcrumb label in the top bar */
  title: string;
  component: React.ComponentType<{ params: PageParams }>;
};

/** Page name → definition. Page names are the stable public contract (links, stories, tests). */
export type PageMap = Record<string, PageDef>;
