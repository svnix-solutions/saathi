import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { T, useT, useTheme } from '@/native/ui';
import { radius } from '@/tokens';

export type AddToggleProps = {
  /** in the cart */
  on: boolean;
  onPress: () => void;
};

/** Small "Add" / "Added" chip on a kit-shop row. */
export function AddToggle({ on, onPress }: AddToggleProps) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button"
      style={[styles.chip, { borderWidth: on ? 1.5 : 1, borderColor: on ? c.selBorder : c.line, backgroundColor: on ? c.selBg : c.card }]}>
      <T s b color={on ? c.ink : c.accent}>{on ? t('Added', 'जोड़ा') : t('Add', 'जोड़ें')}</T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 14 },
});

export default AddToggle;
