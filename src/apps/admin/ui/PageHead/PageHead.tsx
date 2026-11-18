import React from 'react';
import { I } from '../Icon/Icon';

export type PageHeadProps = {
  /** Page title (22 px). */
  title: string;
  /** Grey line under the title. */
  sub?: React.ReactNode;
  /** Buttons on the right. */
  actions?: React.ReactNode;
  /** Shows a back arrow before the title. */
  back?: () => void;
};

/** Title row under the top bar: optional back arrow, title + sub-title, actions on the right. */
export const PageHead = ({ title, sub, actions, back }: PageHeadProps) => (
  <div className="row">
    <div className="lft" style={{ gap: 10 }}>
      {back && <span className="ic clk" onClick={back} role="button" aria-label="Back"><I n="back" /></span>}
      <div><div className="h" style={{ fontSize: 22 }}>{title}</div>{sub && <div className="m">{sub}</div>}</div>
    </div>
    {actions && <div className="lft" style={{ gap: 8 }}>{actions}</div>}
  </div>
);
