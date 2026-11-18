import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { T, useTheme } from '@/native/ui';
import { radius } from '@/tokens';

/** Small selectable chip for a quick pick (damage claim items). */
export function ItemChip({ label, selected, onPress }: { label: string; selected?: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}
      style={[styles.chip, { borderColor: selected ? c.selBorder : c.line, backgroundColor: selected ? c.selBg : c.card }]}>
      <T s>{label}</T>
    </Pressable>
  );
}

export default ItemChip;

const styles = StyleSheet.create({
  chip: { borderWidth: 1, borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 9 },
});
