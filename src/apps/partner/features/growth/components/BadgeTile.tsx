import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, H2, IconTile, T, palette, useT } from '@/native/ui';
import { tx, type Badge } from '../data';

/** Yellow icon when earned, faded when still locked. */
export function BadgeIcon({ badge }: { badge: Badge }) {
  return <IconTile name={badge.icon} bg={badge.earned ? palette.yellow : undefined} color={badge.earned ? palette.ink : undefined} />;
}

/** One badge in the badges grid. */
export function BadgeTile({ badge: b, onPress }: { badge: Badge; onPress: () => void }) {
  const t = useT();
  return (
    <Card sel={b.earned} onPress={onPress} style={[styles.tile, !b.earned && styles.locked]}>
      <BadgeIcon badge={b} />
      <H2 center style={{ marginTop: 6 }}>{t(b.title, b.hi, b.pa)}</H2>
      <T s m center>{tx(t, b.sub)}</T>
    </Card>
  );
}

const styles = StyleSheet.create({
  tile: { alignItems: 'center' },
  locked: { opacity: 0.6 },
});

export default BadgeTile;
