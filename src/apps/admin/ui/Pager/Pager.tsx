import React from 'react';

export type PagerProps = {
  /** Left-hand text. */
  text?: string;
};

/** Static table footer: "Page 1 of 3 · 7 rows per page" and page buttons (1 is current). */
export const Pager = ({ text = 'Page 1 of 3 · 7 rows per page' }: PagerProps) => (
  <div className="pg"><span>{text}</span><span><span>‹</span><b>1</b><span>2</span><span>3</span><span>›</span></span></div>
);
