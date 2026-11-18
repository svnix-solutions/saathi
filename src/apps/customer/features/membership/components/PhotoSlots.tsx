import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Grid, T, useT, useTheme } from '@/native/ui';
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
  const t = useT();
  const photos = Array.from({ length: count }).map((_, i) => (
    <Pressable key={i} onPress={() => onRemove(i)} accessibilityRole="button" accessibilityLabel={t(`Remove photo ${i + 1}`, `फ़ोटो ${i + 1} हटाएँ`, `ਫ਼ੋਟੋ ${i + 1} ਹਟਾਓ`)} style={[styles.tile, { backgroundColor: c.mint }]}>
      <T s color={c.accent}>{t(`Photo ${i + 1}`, `फ़ोटो ${i + 1}`, `ਫ਼ੋਟੋ ${i + 1}`)}</T>
    </Pressable>
  ));
  const add = count < max ? (
    <Pressable key="add" onPress={onAdd} accessibilityRole="button" accessibilityLabel={t('Add photo', 'फ़ोटो जोड़ें', 'ਫ਼ੋਟੋ ਜੋੜੋ')} style={[styles.tile, styles.add, { borderColor: c.accent }]}>
      <T s b color={c.accent}>{t('+ Add', '+ जोड़ें', '+ ਜੋੜੋ')}</T>
    </Pressable>
  ) : null;
  return <Grid cols={3}>{[...photos, add].filter(Boolean)}</Grid>;
}

export default PhotoSlots;

const styles = StyleSheet.create({
  tile: { height: 60, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  add: { borderWidth: 1.5, borderStyle: 'dashed' },
});
