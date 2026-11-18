import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { palette, tint } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../../atoms/Icon';

export type MapDot = { x: number; y: number; icon?: IconName; tone?: 'green' | 'yellow' | 'red'; label?: string };

export type MapMockProps = {
  /** px (default 230) */
  height?: number;
  style?: StyleProp<ViewStyle>;
  /** draw a green line between the first two dots (default true) */
  route?: boolean;
  children?: React.ReactNode;
  /** 30px round markers at x/y px, with an icon or a short label */
  dots?: MapDot[];
};

/** Stylised map (the design's `.map`): pale green with white roads, round markers and an optional route line. */
export function MapMock({ height = 230, dots = [], route = true, style, children }: MapMockProps) {
  const { c, dark } = useTheme();
  const roads: ViewStyle[] = [
    { left: 0, right: 0, top: height * 0.4, height: 14 }, { top: 0, bottom: 0, left: '54%', width: 14 },
    { left: 0, right: 0, top: height * 0.77, height: 10 }, { top: 0, bottom: 0, left: '20%', width: 10 },
  ];
  const [a, b] = dots;
  return (
    <View style={[{ height, backgroundColor: c.mapBg, overflow: 'hidden', position: 'relative' }, style]}>
      {roads.map((r, i) => <View key={i} style={[{ position: 'absolute', backgroundColor: dark ? tint.roadDark : '#fff' } as ViewStyle, r]} />)}
      {route && a && b && (
        <View style={{ position: 'absolute', left: Math.min(a.x, b.x) + 15, top: a.y + 14, width: Math.abs(b.x - a.x), height: 3, backgroundColor: palette.green }} />
      )}
      {dots.map((d, i) => (
        <View key={i} style={[styles.dot, { left: d.x, top: d.y, backgroundColor: d.tone === 'yellow' ? palette.yellow : d.tone === 'red' ? palette.red : palette.green }]}>
          {d.icon ? <Icon name={d.icon} size={14} color={d.tone === 'yellow' ? palette.ink : '#fff'} /> : <Text style={styles.label}>{d.label}</Text>}
        </View>
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: { position: 'absolute', width: 30, height: 30, borderRadius: 15, borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  label: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
