import React from 'react';
import { View } from 'react-native';
import { Row, Stepper, T, useT } from '@/native/ui';

export type QuantityRowProps = {
  label: string;
  /** muted line under the label (price, time per item) */
  sub: string;
  value: number;
  onChange: (n: number) => void;
  /** default 9 */
  max?: number;
};

/** "Name / sub ……… − n +" line in the supplies and deep clean lists. */
export function QuantityRow({ label, sub, value, onChange, max }: QuantityRowProps) {
  const t = useT();
  return (
    <Row>
      <View><T b>{label}</T><T s m>{sub}</T></View>
      <Stepper value={value} max={max} onChange={onChange} addLabel={t('Add', 'जोड़ें', 'ਜੋੜੋ')} />
    </Row>
  );
}

export default QuantityRow;
