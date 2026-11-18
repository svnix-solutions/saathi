import { shrinkable } from '../../layout/Lft/Lft';
import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { palette, radius, space } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type CardTone = 'yellow' | 'mint' | 'red' | 'clear' | 'ink';

export type CardProps = {
  children?: React.ReactNode;
  /** selected: mint fill, green 1.5px border (the design's `.sel`) */
  sel?: boolean;
  /** same as `sel` */
  selected?: boolean;
  /** `yellow` / `mint` / `ink` fill without border · `red` red border · `clear` transparent */
  tone?: CardTone;
  style?: StyleProp<ViewStyle>;
  /** makes the whole card a button */
  onPress?: () => void;
  /** padding 11/12 (default true) */
  pad?: boolean;
  /** lay children out as a `Row` */
  row?: boolean;
  accessibilityLabel?: string;
};

/** Bordered surface (the design's `.card`). Tappable when `onPress` is given. */
export function Card({ children, sel, selected, tone, style, onPress, pad = true, row, accessibilityLabel }: CardProps) {
  const { c } = useTheme();
  const isSel = sel ?? selected;
  const base: ViewStyle = {
    borderWidth: isSel ? 1.5 : 1, borderColor: isSel ? c.selBorder : c.line, borderRadius: radius.card,
    paddingVertical: pad ? space.cardY : 0, paddingHorizontal: pad ? space.cardX : 0, backgroundColor: isSel ? c.selBg : c.card,
  };
  if (tone === 'yellow') Object.assign(base, { backgroundColor: palette.yellow, borderWidth: 0 });
  if (tone === 'mint') Object.assign(base, { backgroundColor: c.mint, borderWidth: 0 });
  if (tone === 'red') Object.assign(base, { borderColor: c.red });
  if (tone === 'clear') Object.assign(base, { backgroundColor: 'transparent' });
  if (tone === 'ink') Object.assign(base, { backgroundColor: palette.ink, borderWidth: 0 });
  const rowStyle = row ? styles.row : undefined;
  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel} style={({ pressed }) => [base, rowStyle, style as ViewStyle, pressed && styles.pressed]}>
        {row ? shrinkable(children) : children}
      </Pressable>
    );
  }
  return <View style={[base, rowStyle, style]}>{row ? shrinkable(children) : children}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  pressed: { opacity: 0.85 },
});
