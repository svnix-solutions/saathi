import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Icon, Lft, T, useT, useTheme } from '@/native/ui';
import { CARE_TRUST } from '@/domain';

/** Why families pick Saathi Care (`CARE_TRUST`), one shield line each. */
export function TrustList() {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card tone="mint" style={styles.card}>
      {CARE_TRUST.map((w) => (
        <Lft key={w[0]} style={styles.top}>
          <Icon name="shield" size={16} color={c.accent} />
          <T s style={styles.grow}>{t(...w)}</T>
        </Lft>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
