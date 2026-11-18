import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { radius } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../Icon';

export type IconTileProps = {
  name: IconName;
  /** makes it a button (accessibility label = icon name) */
  onPress?: () => void;
  /** square size in px (default 34) */
  size?: number;
  /** icon colour (default accent) */
  color?: string;
  /** tile colour (default mint) */
  bg?: string;
};

/** Mint rounded square with an icon (the design's `.ic`). */
export function IconTile({ name, onPress, size = 34, color, bg }: IconTileProps) {
  const { c } = useTheme();
  const box = <View style={[styles.box, { width: size, height: size, backgroundColor: bg ?? c.mint }]}><Icon name={name} color={color ?? c.accent} /></View>;
  return onPress ? <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={name}>{box}</Pressable> : box;
}

const styles = StyleSheet.create({ box: { borderRadius: radius.ic, alignItems: 'center', justifyContent: 'center' } });
