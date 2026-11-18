import React from 'react';

export type CardHeadProps = {
  /** Section title (15 px bold). */
  title: React.ReactNode;
  /** Right-hand content: tabs, a text link, a tag. */
  right?: React.ReactNode;
  /** Adds the `0 10px 8px` padding used when the card holds a table (card padding `14px 8px 4px`). */
  pad?: boolean;
};

/** Title row at the top of a card. */
export const CardHead = ({ title, right, pad = true }: CardHeadProps) => (
  <div className="row" style={pad ? { padding: '0 10px 8px' } : undefined}><span className="h2" style={{ fontSize: 15 }}>{title}</span>{right}</div>
);
