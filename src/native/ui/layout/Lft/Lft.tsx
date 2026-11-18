import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { space } from '@/tokens';
import { Col } from '../Col/Col';

export type LftProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle>; /** gap in px (default 8) */ gap?: number };

/** Horizontal row packed to the left, items centred (the design's `.lft`). */
export const Lft = ({ children, style, gap = space.row }: LftProps) => (
  <View style={[styles.row, { gap }, style]}>{shrinkable(children)}</View>
);

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center' } });

/**
 * React Native does not let a row's children shrink (CSS does), so text in a plain <View> next to an icon or avatar
 * would run past the edge on a small phone or with large text. Plain Views and nested Lft/Col groups without a fixed width get
 * `flexShrink: 1, minWidth: 0` so their text wraps, as the design's CSS rows do.
 */
export function shrinkable(children: React.ReactNode) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<{ style?: StyleProp<ViewStyle> }>(child) || !(child.type === View || child.type === Lft || child.type === Col)) return child;
    const flat = StyleSheet.flatten(child.props.style) ?? {};
    if (flat.width != null || flat.flex != null || flat.flexShrink != null) return child;
    return React.cloneElement(child, { style: [shrinkStyle.item, child.props.style] });
  });
}
const shrinkStyle = StyleSheet.create({ item: { flexShrink: 1, minWidth: 0 } });
