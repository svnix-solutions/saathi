import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Check } from '../../atoms/Check';
import { T } from '../../atoms/T';

export type CheckRowProps = {
  on?: boolean;
  label: string;
  onPress?: () => void;
  /** box size (above 20 the label grows to 13px) */
  size?: number;
  /** a ticked item is struck through and muted (task lists during a visit) */
  done?: boolean;
  /** small label */
  s?: boolean;
  disabled?: boolean;
};

/** Checkbox with a label; the whole row toggles. */
export function CheckRow({ on, label, onPress, size, done, s, disabled }: CheckRowProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="checkbox" accessibilityState={{ checked: !!on }} style={styles.row}>
      <Check on={on} size={size} disabled={disabled} />
      <T m={done && on} strike={done && on} s={s} size={size && size > 20 ? 13 : undefined}>{label}</T>
    </Pressable>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', gap: 8 } });
