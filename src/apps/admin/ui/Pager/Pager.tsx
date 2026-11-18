import React from 'react';

export type PagerProps = {
  /** Left-hand text, e.g. "Page 1 of 3 · 7 rows per page". */
  text?: string;
  /** Current page (highlighted). */
  page?: number;
  /** How many page buttons to draw. `1` draws a lone current page and no arrows. */
  pages?: number;
  /** Makes the page buttons and arrows clickable. Called with the page asked for (may be beyond `pages`). */
  onPage?: (page: number) => void;
};

/** Table footer: the left-hand text and page buttons. Static unless `onPage` is given. */
export function Pager({ text = 'Page 1 of 3 · 7 rows per page', page = 1, pages = 3, onPage }: PagerProps) {
  const btn = (label: React.ReactNode, to: number, aria?: string) => onPage
    ? <span key={aria ?? to} className="clk" role="button" aria-label={aria} onClick={() => onPage(to)}>{label}</span>
    : <span key={aria ?? to}>{label}</span>;
  return (
    <div className="pg">
      <span>{text}</span>
      <span>
        {pages > 1 && btn('‹', Math.max(1, page - 1), 'Previous page')}
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (n === page ? <b key={n}>{n}</b> : btn(n, n)))}
        {pages > 1 && btn('›', page + 1, 'Next page')}
      </span>
    </div>
  );
}
