import React from 'react';

export type TextLinkProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};

/** Green bold text action in card headers ("Edit", "New code", "Widen to 3 km"). Small text, Enter activates. */
export const TextLink = ({ children, onClick, style }: TextLinkProps) => (
  <span className="s clk" role="button" tabIndex={0} style={{ color: 'var(--green)', fontWeight: 700, ...style }} onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick?.()}>{children}</span>
);
