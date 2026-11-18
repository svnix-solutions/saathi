import { useState } from 'react';
import type { PageMap, PageParams } from './types';

export type HistoryEntry = { page: string; params: PageParams };

export type AdminRouter = {
  /** The page on top of the history stack. */
  current: HistoryEntry;
  /** Push a page. Unknown pages are refused and reported to `onMissing`. */
  go: (page: string, params?: PageParams) => void;
  /** Pop one page (never past the first). */
  back: () => void;
  /** Replace the whole history with one page (sign out → login). */
  reset: (page: string, params?: PageParams) => void;
  /** The page exists in this prototype. */
  has: (page: string) => boolean;
};

/**
 * In-memory history stack for the admin panel. `go` also scrolls `.sa .main` back to the top.
 * The returned functions are recreated every render; memoise the context on `current` + `pages`.
 */
export function useAdminRouter(pages: PageMap, first: HistoryEntry, onMissing: (page: string) => void): AdminRouter {
  const [hist, setHist] = useState<HistoryEntry[]>([first]);
  return {
    current: hist[hist.length - 1],
    go: (page, params = {}) => {
      if (!pages[page]) { onMissing(page); return; }
      setHist((h) => [...h, { page, params }]);
      document.querySelector('.sa .main')?.scrollTo(0, 0);
    },
    back: () => setHist((h) => (h.length > 1 ? h.slice(0, -1) : h)),
    reset: (page, params = {}) => setHist([{ page, params }]),
    has: (p) => !!pages[p],
  };
}
