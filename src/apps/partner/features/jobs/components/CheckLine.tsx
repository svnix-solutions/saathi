import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Check, H2, Icon, Lft, T, useTheme } from '@/native/ui';

export type CheckLineProps = {
  /** ticked */
  on?: boolean;
  title: string;
  sub: string;
  icon?: 'pin' | 'clock' | 'user';
  /** highlighted as the next step */
  sel?: boolean;
  onPress?: () => void;
  /** still working: the icon is muted */
  busy?: boolean;
};

/** One step of check-in / check-out: a 24px tick, a title and a line under it, and an icon on the right. */
export function CheckLine({ on, title, sub, icon, sel, onPress, busy }: CheckLineProps) {
  const { c } = useTheme();
  return (
    <Card row sel={sel} onPress={onPress}>
      <Lft style={styles.fill}>
        <Check on={on} size={24} />
        <View style={styles.fill}><H2>{title}</H2><T s m>{sub}</T></View>
      </Lft>
      {icon && <Icon name={icon} color={busy ? c.mut : c.accent} />}
    </Card>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default CheckLine;
