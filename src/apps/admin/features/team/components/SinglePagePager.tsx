import React from 'react';

/** Table footer for a list that fits on one page: "Page 1 of 1 · N rows per page" and a lone page 1. */
export function SinglePagePager({ rows }: { rows: number }) {
  return <div className="pg"><span>Page 1 of 1 · {rows} rows per page</span><span><b>1</b></span></div>;
}
