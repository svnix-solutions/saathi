import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/index';
import { T } from '../../atoms/T';
import { Row } from '../../layout/Row';
import { Pill } from '../Pill';

export type StepperProps = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  /** default 9 */
  max?: number;
  /** label of the pill shown at 0 (default "Add") */
  addLabel?: string;
};

/** "− 2 +" counter made of pills, or a single "Add" pill when the count is 0 (supplies, extras). */
export function Stepper({ value, onChange, min = 0, max = 9, addLabel = 'Add' }: StepperProps) {
  const { c } = useTheme();
  if (value <= 0) {
    return (
      <Pill onPress={() => onChange(Math.min(max, 1))} style={{ paddingVertical: 5, paddingHorizontal: 14 }}>
        <T s b color={c.accent}>{addLabel}</T>
      </Pill>
    );
  }
  return (
    <Row gap={10} style={styles.row}>
      <Pill onPress={() => onChange(Math.max(min, value - 1))} style={{ paddingVertical: 3, paddingHorizontal: 10 }}>−</Pill>
      <T b>{value}</T>
      <Pill sel onPress={() => onChange(Math.min(max, value + 1))} style={{ paddingVertical: 3, paddingHorizontal: 10 }}>+</Pill>
    </Row>
  );
}

const styles = StyleSheet.create({ row: { justifyContent: 'flex-start' } });
