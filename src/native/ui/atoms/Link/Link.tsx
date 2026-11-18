import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle } from 'react-native';
import { font } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type LinkProps = {
  children: React.ReactNode;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<TextStyle>;
  /** centre the link in its column (was partner/v1 `GreenText center`) */
  center?: boolean;
};

/** Green bold inline action text ("Change", "Book again"): 11px, 700, accent colour. */
export function Link({ children, onPress, color, style, center }: LinkProps) {
  const { c, fs } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="link" hitSlop={6} style={center ? styles.center : undefined}>
      <Text style={[styles.base, { fontSize: fs(font.size.s), color: color ?? c.accent }, center ? styles.centerText : null, style]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { fontFamily: font.family, fontWeight: '700' },
  center: { alignSelf: 'center' },
  centerText: { textAlign: 'center' },
});
