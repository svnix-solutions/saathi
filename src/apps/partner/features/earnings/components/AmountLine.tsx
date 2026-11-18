import React from 'react';
import { StyleSheet } from 'react-native';
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
  return <Row><T m style={styles.label}>{label}</T><T b color={accent ? c.accent : undefined}>{value}</T></Row>;
}

const styles = StyleSheet.create({
  label: { flex: 1 },
});

export default AmountLine;
