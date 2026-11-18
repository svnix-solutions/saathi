import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon } from '../Icon';

export type CheckProps = {
  /** ticked */
  on?: boolean;
  /** box size in px (default 18; the partner app's large box is 24) */
  size?: number;
  /** greyed out */
  disabled?: boolean;
};

/** Checkbox box (the design's `.cb`). Display only: wrap it in a Pressable, or use `<CheckRow>` for a labelled one. */
export function Check({ on, size = 18, disabled }: CheckProps) {
  const { c } = useTheme();
  return (
    <View style={[styles.box, { width: size, height: size, borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent' }, disabled ? styles.disabled : null]}>
      {on && <Icon name="check" size={size * 0.66} color={palette.white} strokeWidth={3} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderRadius: radius.check, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.45 },
});
