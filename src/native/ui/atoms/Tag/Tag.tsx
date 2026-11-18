import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { font, palette, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';

/** Short design names (`y g n x r`) and their long aliases. */
export type TagTone = 'y' | 'g' | 'n' | 'x' | 'r' | 'yellow' | 'green' | 'mint' | 'grey' | 'red';
const alias = { yellow: 'y', green: 'g', mint: 'n', grey: 'x', red: 'r' } as const;

export type TagProps = {
  children: React.ReactNode;
  /** y/yellow (default) · g/green · n/mint · x/grey · r/red outline */
  tone?: TagTone;
  style?: StyleProp<ViewStyle>;
};

/** Small status chip (the design's `.tag`): 10px bold, pill shaped. */
export function Tag({ children, tone = 'y', style }: TagProps) {
  const { c, fs } = useTheme();
  const k = (tone in alias ? alias[tone as keyof typeof alias] : tone) as 'y' | 'g' | 'n' | 'x' | 'r';
  const m = {
    y: { bg: palette.yellow, fg: palette.ink, b: undefined as string | undefined },
    g: { bg: palette.green, fg: palette.white, b: undefined },
    n: { bg: c.mint, fg: palette.greenD, b: undefined },
    x: { bg: c.chip, fg: c.mut, b: undefined },
    r: { bg: c.card, fg: c.red, b: c.red },
  }[k];
  return (
    <View style={[styles.box, { backgroundColor: m.bg, borderRadius: radius.tag, paddingVertical: 3, paddingHorizontal: 9, borderWidth: m.b ? 1 : 0, borderColor: m.b }, style]}>
      <Text style={[styles.label, { fontSize: fs(10), color: k === 'n' && c.mint !== palette.mint ? c.accent : m.fg }]} numberOfLines={1}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignSelf: 'flex-start' },
  label: { fontFamily: font.family, fontWeight: '700' },
});
