import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Grid, T, useTheme } from '@/native/ui';
import { radius } from '@/tokens';

export type PhotoSlotsProps = {
  count: number;
  /** most photos allowed; the "+ Add" tile hides at this count */
  max: number;
  onAdd: () => void;
  /** remove photo `i` (0-based) */
  onRemove: (i: number) => void;
};

/** Three-column grid of photo tiles (tap to remove) and a dashed "+ Add" tile. */
export function PhotoSlots({ count, max, onAdd, onRemove }: PhotoSlotsProps) {
  const { c } = useTheme();
  const photos = Array.from({ length: count }).map((_, i) => (
    <Pressable key={i} onPress={() => onRemove(i)} accessibilityRole="button" accessibilityLabel={`Remove photo ${i + 1}`} style={[styles.tile, { backgroundColor: c.mint }]}>
      <T s color={c.accent}>Photo {i + 1}</T>
    </Pressable>
  ));
  const add = count < max ? (
    <Pressable key="add" onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add photo" style={[styles.tile, styles.add, { borderColor: c.accent }]}>
      <T s b color={c.accent}>+ Add</T>
    </Pressable>
  ) : null;
  return <Grid cols={3}>{[...photos, add].filter(Boolean)}</Grid>;
}

export default PhotoSlots;

const styles = StyleSheet.create({
  tile: { height: 60, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  add: { borderWidth: 1.5, borderStyle: 'dashed' },
});
