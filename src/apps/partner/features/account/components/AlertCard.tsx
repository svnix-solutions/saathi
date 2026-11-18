import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, IconTile, Lft, T, useTheme, type IconName } from '@/native/ui';

/** One alert: icon tile, title and when; unread alerts are highlighted. */
export function AlertCard({ icon, title, sub, unread, onPress }: { icon: IconName; title: string; sub: string; unread: boolean; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Card sel={unread} onPress={onPress}>
      <Lft style={styles.top}>
        <IconTile name={icon} bg={unread ? c.card : undefined} />
        <View style={styles.fill}><H2>{title}</H2><T s m>{sub}</T></View>
      </Lft>
    </Card>
  );
}

export default AlertCard;

const styles = StyleSheet.create({
  top: { alignItems: 'flex-start' },
  fill: { flex: 1 },
});
