import React from 'react';
import { Lft, TopBar } from '@/native/ui';

export type BalanceHeaderProps = {
  /** small dimmed label next to the back arrow ("Saathi wallet") */
  label: string;
  /** the big figure (balance, points) */
  value: React.ReactNode;
  /** lines under the figure */
  children?: React.ReactNode;
};

/** Square-cornered green header with a back arrow, a label and a big balance (Wallet, Rewards). */
export function BalanceHeader({ label, value, children }: BalanceHeaderProps) {
  return (
    <TopBar style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
      <Lft><TopBar.Back /><TopBar.Text dim>{label}</TopBar.Text></Lft>
      <TopBar.Title size={30}>{value}</TopBar.Title>
      {children}
    </TopBar>
  );
}

export default BalanceHeader;
