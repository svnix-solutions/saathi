import React from 'react';

export type JobsPagerProps = {
  /** Current page, 1 or 2 (the prototype has two pages of jobs). */
  page: number;
  onPage: (page: number) => void;
  /** Called for page 3, which is not in the prototype. */
  onUnavailable: () => void;
};

/** Clickable table footer for the partner's recent jobs: "Page 1 of 24 · 6 rows per page", ‹ 1 2 3 ›. */
export function JobsPager({ page, onPage, onUnavailable }: JobsPagerProps) {
  return (
    <div className="pg"><span>Page {page} of 24 · 6 rows per page</span><span>
      <span className="clk" role="button" aria-label="Previous page" onClick={() => onPage(1)}>‹</span>
      {[1, 2, 3].map((n) => (n === page ? <b key={n}>{n}</b> : <span key={n} className="clk" role="button" onClick={() => (n <= 2 ? onPage(n) : onUnavailable())}>{n}</span>))}
      <span className="clk" role="button" aria-label="Next page" onClick={() => onPage(2)}>›</span></span></div>
  );
}
