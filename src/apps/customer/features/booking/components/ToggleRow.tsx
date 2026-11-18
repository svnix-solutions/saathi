import React from 'react';
import { StyleSheet } from 'react-native';
import { Row, T, Toggle } from '@/native/ui';

export type ToggleRowProps = { label: string; on: boolean; onChange: (v: boolean) => void };

/** Label on the left, switch on the right (book for family options). */
export function ToggleRow({ label, on, onChange }: ToggleRowProps) {
  return (
    <Row>
      <T style={styles.label}>{label}</T>
      <Toggle on={on} onChange={onChange} />
    </Row>
  );
}

const styles = StyleSheet.create({ label: { flex: 1 } });

export default ToggleRow;
