import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Col, H2, Icon, IconTile, Lft, T, useT, useTheme } from '@/native/ui';
import { tx, type Benefit } from '../data';

export type BenefitCardProps = {
  benefit: Benefit;
  /** details shown */
  open: boolean;
  onToggle: () => void;
  /** extra action under the details (e.g. "Book check-up") */
  action?: React.ReactNode;
};

/** One benefit row that opens to show its details; the active one is selected, a locked one is faded. */
export function BenefitCard({ benefit: b, open, onToggle, action }: BenefitCardProps) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card sel={b.active} style={b.locked ? styles.locked : undefined} onPress={onToggle}>
      <Lft style={styles.top}>
        <IconTile name={b.icon} bg={b.active ? c.card : undefined} />
        <View style={styles.grow}>
          <H2>{tx(t, b.title)}</H2>
          <T s m>{tx(t, b.sub)}</T>
        </View>
        <View style={open ? styles.chevronOpen : styles.chevronShut}><Icon name="chevron" size={14} color={c.mut} /></View>
      </Lft>
      {open && (
        <Col gap={4} style={{ marginTop: 9, paddingLeft: 42 }}>
          {b.more.map((m) => <T key={m.en} s>• {tx(t, m)}</T>)}
          {action}
        </Col>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  locked: { opacity: 0.6 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
  chevronOpen: { transform: [{ rotate: '90deg' }] },
  chevronShut: { transform: [{ rotate: '0deg' }] },
});

export default BenefitCard;
