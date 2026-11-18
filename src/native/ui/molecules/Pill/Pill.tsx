import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { font, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type PillProps = {
  children: React.ReactNode;
  /** selected: mint fill, green border */
  sel?: boolean;
  /** same as `sel` */
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** 11px label instead of 12px */
  s?: boolean;
  disabled?: boolean;
};

/** Selectable chip (the design's `.pill`): durations, slots, filters. */
export function Pill({ children, sel, selected, onPress, style, s, disabled }: PillProps) {
  const { c, fs } = useTheme();
  const on = sel ?? selected;
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityState={{ selected: !!on }}
      style={[styles.base, { borderRadius: radius.pill, paddingVertical: 9, paddingHorizontal: 4, borderWidth: on ? 1.5 : 1, borderColor: on ? c.selBorder : c.line, backgroundColor: on ? c.selBg : c.card }, disabled ? styles.disabled : null, style]}>
      <Text style={[styles.label, { fontSize: fs(s ? 11 : 12), color: c.ink }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center' },
  label: { fontFamily: font.family, fontWeight: '600', textAlign: 'center' },
  disabled: { opacity: 0.45 },
});
