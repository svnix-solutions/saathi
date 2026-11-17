/** Small helpers used across the partner v2 screens (candidates for the shared kit). */
import React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Icon, T, palette, useNav, useTheme } from '@/native/ui';

const WHITE = '#fff';

/** Yellow-on-dark-green progress bar used inside the green TopBar (training, bonus). */
export function TopProgress({ pct }: { pct: number }) {
  return (
    <View style={{ height: 8, borderRadius: 4, backgroundColor: '#2d6a5b', marginTop: 10, overflow: 'hidden' }}>
      <View style={{ width: `${Math.min(1, Math.max(0, pct)) * 100}%`, height: '100%', borderRadius: 4, backgroundColor: palette.yellow }} />
    </View>
  );
}

/** Green-on-mint meter (ratings breakdown, quality). Optional `mark` draws the threshold tick. */
export function Meter({ pct, mark, style }: { pct: number; mark?: number; style?: ViewStyle }) {
  const { c } = useTheme();
  return (
    <View style={[{ flex: 1, height: 7, borderRadius: 4, backgroundColor: c.mint, position: 'relative' }, style]}>
      {pct > 0 && <View style={{ width: `${Math.min(1, pct) * 100}%`, height: '100%', borderRadius: 4, backgroundColor: palette.green }} />}
      {mark !== undefined && (
        <View style={{ position: 'absolute', left: `${mark * 100}%`, top: -3, width: 2, height: 13, borderRadius: 1, backgroundColor: c.ink }} />
      )}
    </View>
  );
}

/** Small white label at the top of a green TopBar, with a back chevron when there is history. */
export function TopLabel({ children }: { children: React.ReactNode }) {
  const nav = useNav();
  const txt = <T s color={WHITE} style={{ opacity: 0.8 }}>{children}</T>;
  if (!nav.canGoBack) return txt;
  return (
    <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel="Back" style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Icon name="back" size={14} color={WHITE} />
      {txt}
    </Pressable>
  );
}

/** Screen root: TopBar / Screen / tabs stack, with room for an absolute Sheet. */
export const Root = ({ children }: { children: React.ReactNode }) => <View style={{ flex: 1 }}>{children}</View>;

export const onGreen = WHITE;

/** Card-like circle placeholder (selfie, mic). */
export function Circle({ size, children, bg, border, style }: { size: number; children?: React.ReactNode; bg?: string; border?: string; style?: ViewStyle }) {
  return (
    <View style={[{
      alignSelf: 'center', width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center',
      backgroundColor: bg, borderWidth: border ? 3 : 0, borderStyle: 'dashed', borderColor: border,
    }, style]}>{children}</View>
  );
}
