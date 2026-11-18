import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Pill } from '../Pill/Pill';

export type ChipGroupItem<K extends string> = { key: K; label: string };

export type ChipGroupProps<K extends string> = {
  items: ChipGroupItem<K>[];
  value: K;
  onChange: (key: K) => void;
  /** gap between chips in px (default 4, as the design draws the category row) */
  gap?: number;
  accessibilityLabel?: string;
};

/**
 * A single-choice row of small chips at their natural width (the design's category row: `.pill.s`, padding 5/7).
 * When the chips do not fit — a small phone, large text, a long Hindi label — the row scrolls sideways instead of
 * squeezing or clipping them.
 */
export function ChipGroup<K extends string>({ items, value, onChange, gap = 4, accessibilityLabel }: ChipGroupProps<K>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} accessibilityRole="tablist" accessibilityLabel={accessibilityLabel}
      contentContainerStyle={[styles.row, { gap }]} style={styles.scroll}>
      {items.map((it) => (
        <Pill key={it.key} s sel={it.key === value} onPress={() => onChange(it.key)} style={{ paddingVertical: 5, paddingHorizontal: 7 }}>{it.label}</Pill>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ scroll: { flexGrow: 0 }, row: { alignItems: 'center' } });

export default ChipGroup;
