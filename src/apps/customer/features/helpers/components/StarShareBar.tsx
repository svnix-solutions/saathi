import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Lft, T, palette, useTheme } from '@/native/ui';

/** "5 ▬▬▬▬▬" share-of-stars bar on the reviews summary. */
export function StarShareBar({ stars, pct }: { stars: string; pct: number }) {
  const { c } = useTheme();
  return (
    <Lft gap={6}>
      <T s>{stars}</T>
      <View style={[styles.track, { backgroundColor: c.mint }]}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </Lft>
  );
}

export default StarShareBar;

const styles = StyleSheet.create({
  track: { flex: 1, height: 6, borderRadius: 4 },
  fill: { height: '100%', borderRadius: 4, backgroundColor: palette.green },
});
