import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, useTheme, type IconName } from '@/native/ui';
import { radius } from '@/tokens';

export type AlertIconProps = {
  name: IconName;
  /** unread alerts sit on a card-coloured tile (the card itself is mint) */
  unread?: boolean;
  /** draw the icon filled */
  fill?: boolean;
};

/** 34px rounded tile with the alert's icon, on the Alerts inbox. */
export function AlertIcon({ name, unread, fill }: AlertIconProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.tile, { backgroundColor: unread ? c.card : c.mint }]}>
      <Icon name={name} color={c.accent} fill={fill} />
    </View>
  );
}

export default AlertIcon;

const styles = StyleSheet.create({
  tile: { width: 34, height: 34, borderRadius: radius.ic, alignItems: 'center', justifyContent: 'center' },
});
