import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon } from '../Icon';

export type RadioProps = {
  /** chosen (same as `selected`) */
  on?: boolean;
  /** chosen (same as `on`) */
  selected?: boolean;
  /** diameter in px (default 18) */
  size?: number;
  /** what is drawn inside when chosen: a white tick (default) or a white dot (partner sign-up) */
  mark?: 'check' | 'dot';
  /** tick size; default 12 at size 18, else size × 0.66 */
  checkSize?: number;
  disabled?: boolean;
};

/**
 * Round radio (the design's `.cb` with border-radius 50%). Display only: put it inside a pressable row.
 * Replaces the four local copies (customer v1, v2a, v2b, partner sign-up).
 */
export function Radio({ on, selected, size = 18, mark = 'check', checkSize, disabled }: RadioProps) {
  const { c } = useTheme();
  const sel = on ?? selected ?? false;
  const dot = Math.round(size * 0.36);
  return (
    <View style={[styles.box, { width: size, height: size, borderRadius: size / 2, borderColor: sel ? palette.green : c.line, backgroundColor: sel ? palette.green : 'transparent' }, disabled ? styles.disabled : null]}>
      {sel && mark === 'check' && <Icon name="check" size={checkSize ?? (size === 18 ? 12 : size * 0.66)} color="#fff" strokeWidth={3} />}
      {sel && mark === 'dot' && <View style={[styles.dot, { width: dot, height: dot, borderRadius: dot / 2 }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  dot: { backgroundColor: '#fff' },
  disabled: { opacity: 0.45 },
});
