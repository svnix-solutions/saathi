import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { tint, palette } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../../atoms/Icon';
import { T } from '../../atoms/T';

export type PhotoTileProps = {
  /**
   * `add` (default): full-width tap target, dashed accent border until `added`, then mint (was partner/v1 `PhotoTile`).
   * `thumb`: 58px square mint (or dark) thumbnail with a label or custom content (was partner/v3 `PhotoTile`).
   */
  variant?: 'add' | 'thumb';
  label?: string;
  /** add: the photo is taken (mint fill, no border) */
  added?: boolean;
  /** add: icon above the label */
  icon?: IconName;
  onPress?: () => void;
  /** add: tile height (default 78; under 70 the radius is 11) */
  height?: number;
  /** add: bold label */
  bold?: boolean;
  /** thumb: dark "before" photo */
  dark?: boolean;
  /** thumb: square size (default 58) */
  size?: number;
  /** thumb: content instead of the label */
  children?: React.ReactNode;
};

/** A photo slot: an "add photo" target (check-in, finish) or a small thumbnail (photo check). */
export function PhotoTile({ variant = 'add', label, added, icon, onPress, height = 78, bold, dark, size = 58, children }: PhotoTileProps) {
  const { c } = useTheme();
  if (variant === 'thumb') {
    return (
      <View style={[styles.thumb, { width: size, height: size, backgroundColor: dark ? tint.photoDark : c.mint }]}>
        {children ?? <T s color={dark ? palette.white : c.accent}>{label}</T>}
      </View>
    );
  }
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}
      style={[styles.add, { height, borderRadius: height > 70 ? 12 : 11,
        backgroundColor: added ? c.mint : 'transparent', borderWidth: added ? 0 : 1.5, borderColor: c.accent }]}>
      {icon && <Icon name={icon} color={c.accent} />}
      <T s center color={c.accent} b={bold}>{label}</T>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  thumb: { borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  add: { alignItems: 'center', justifyContent: 'center', gap: 2, borderStyle: 'dashed' },
});
