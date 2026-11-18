import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/index';
import { H2 } from '../../atoms/H2';
import { T } from '../../atoms/T';
import { Row } from '../../layout/Row';

export type KeyValueProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  /**
   * `receipt` (default): muted label, body value — "Visit · 1 hr ...... ₹158" (was customer/v2a `Line`).
   * `total`: both sides as bold H2 (was `Line bold`).
   * `plain`: ink label that takes the free space; `value` is rendered as given (was partner/v1 `KV`).
   */
  variant?: 'receipt' | 'total' | 'plain';
  /** `accent` colours the value green (receipt only; was `Line green`) */
  valueTone?: 'default' | 'accent';
};

/** "label ............ value" line inside a card (receipts, job details). */
export function KeyValue({ label, value, variant = 'receipt', valueTone = 'default' }: KeyValueProps) {
  const { c } = useTheme();
  if (variant === 'plain') {
    return <Row>{typeof label === 'string' ? <T style={styles.grow}>{label}</T> : label}{value}</Row>;
  }
  if (variant === 'total') return <Row><H2>{label}</H2><H2>{value}</H2></Row>;
  return (
    <Row>
      <T m>{label}</T>
      <T color={valueTone === 'accent' ? c.accent : undefined}>{value}</T>
    </Row>
  );
}

const styles = StyleSheet.create({ grow: { flex: 1 } });
