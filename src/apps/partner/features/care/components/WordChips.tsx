import React from 'react';
import { StyleSheet, View } from 'react-native';
import { T, useTheme } from '@/native/ui';
import { radius } from '@/tokens';

/** Read-only chips that wrap onto more lines (conditions, allergies, specialisations). `tone="red"` for allergies. */
export function WordChips({ items, tone = 'mint' }: { items: string[]; tone?: 'mint' | 'red' | 'grey' }) {
  const { c } = useTheme();
  const look = tone === 'red' ? { bg: c.card, fg: c.red, b: c.red } : tone === 'grey' ? { bg: c.chip, fg: c.mut, b: c.chip } : { bg: c.mint, fg: c.accent, b: c.mint };
  return (
    <View style={styles.wrap}>
      {items.map((x) => (
        <View key={x} style={[styles.chip, { backgroundColor: look.bg, borderColor: look.b, borderWidth: 1, borderRadius: radius.tag, paddingVertical: 4, paddingHorizontal: 9 }]}>
          <T s b color={look.fg}>{x}</T>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { maxWidth: '100%' },
});

export default WordChips;
