import React from 'react';
import { Row, T, useTheme } from '@/native/ui';

export type AmountLineProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  /** green value (₹0 interest, extra charge) */
  accent?: boolean;
};

/** "muted label ...... bold value" line in an advance or order summary. */
export function AmountLine({ label, value, accent }: AmountLineProps) {
  const { c } = useTheme();
  return <Row><T m>{label}</T><T b color={accent ? c.accent : undefined}>{value}</T></Row>;
}

export default AmountLine;
