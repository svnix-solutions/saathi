import React from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { space } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type ScreenLayoutProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** gap between children (default 11) */
  gap?: number;
  /** scrolls when content is long (default true) */
  scroll?: boolean;
  /** screen padding 20/16/14 (default true) */
  pad?: boolean;
  /** background (default the theme's surface) */
  bg?: string;
};

/**
 * The phone screen body (the design's `.scr`): padding 20/16/14, gap 11, scrolls when content is long.
 * Put a <TopBar> before it and a <TabBar> after it inside a <Page>.
 */
export function Screen({ children, style, gap = space.gap, scroll = true, pad = true, bg }: ScreenLayoutProps) {
  const { c } = useTheme();
  const inner: ViewStyle = { padding: pad ? space.scrX : 0, paddingTop: pad ? space.scrTop : 0, paddingBottom: pad ? space.scrBottom : 0, gap, flexGrow: 1 };
  if (!scroll) return <View style={[styles.fill, { backgroundColor: bg ?? c.surface }, inner, style]}>{children}</View>;
  return (
    <ScrollView style={[styles.fill, { backgroundColor: bg ?? c.surface }]} contentContainerStyle={[inner, style]} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
