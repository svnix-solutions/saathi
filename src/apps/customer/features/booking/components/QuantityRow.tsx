import React from 'react';
import { View } from 'react-native';
import { Row, Stepper, T } from '@/native/ui';

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
  return (
    <Row>
      <View><T b>{label}</T><T s m>{sub}</T></View>
      <Stepper value={value} max={max} onChange={onChange} />
    </Row>
  );
}

export default QuantityRow;
