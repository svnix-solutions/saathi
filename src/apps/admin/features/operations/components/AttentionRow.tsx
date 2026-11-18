import React from 'react';

export type AttentionRowProps = {
  title: React.ReactNode;
  sub: React.ReactNode;
  /** Red title (emergencies). */
  alert?: boolean;
  /** Button or tag on the right. */
  action: React.ReactNode;
};

/** One line of the dashboard's "Needs attention" card: bold title, grey sub-line, action on the right. */
export const AttentionRow = ({ title, sub, alert, action }: AttentionRowProps) => (
  <div className="row"><div><b className={alert ? 'ops-alert-text' : undefined}>{title}</b><div className="s m">{sub}</div></div>{action}</div>
);
