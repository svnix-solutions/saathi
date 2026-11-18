import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/index';

export type PageProps = {
  children: React.ReactNode;
  /** `surface` paints the theme's surface (default); `bare` has no background */
  variant?: 'surface' | 'bare';
  /** background colour; wins over `variant` */
  bg?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Full-height screen root: TopBar / Screen / TabBar stack inside it, with room for an absolute Sheet.
 * Was `Page` in partner/v1/kit (`variant="surface"`) and `Root` in partner/v2/kit (`variant="bare"`).
 */
export function Page({ children, variant = 'surface', bg, style }: PageProps) {
  const { c } = useTheme();
  const color = bg ?? (variant === 'surface' ? c.surface : undefined);
  return <View style={[styles.fill, color ? { backgroundColor: color } : null, style]}>{children}</View>;
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
