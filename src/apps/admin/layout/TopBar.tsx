import React from 'react';
import { Av, I } from '../ui';

export type TopBarProps = {
  /** Breadcrumb after "Saathi /". */
  title: string;
  /** Zones of the signed-in person, shown as a tag. */
  zones: string[];
  face: string;
  /** Bell click. */
  onBell?: () => void;
};

/** Sticky white bar at the top of `.main`: breadcrumb, search box, zone tag, bell and avatar. */
export const TopBar = ({ title, zones, face, onBell }: TopBarProps) => (
  <div className="tb">
    <div className="lft s m">Saathi<span>/</span><b style={{ color: 'var(--ink)' }}>{title}</b></div>
    <div className="lft" style={{ gap: 10 }}>
      <div className="tbs"><I n="find" />Search bookings, people, areas</div>
      <span className="tag n">{zones.join(', ')}</span>
      <span className="bell clk" onClick={onBell}><I n="bell" /><i /></span>
      <Av sm face={face} />
    </div>
  </div>
);
