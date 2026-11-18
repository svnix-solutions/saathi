import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { space } from '@/tokens';

export type LftProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle>; /** gap in px (default 8) */ gap?: number };

/** Horizontal row packed to the left, items centred (the design's `.lft`). */
export const Lft = ({ children, style, gap = space.row }: LftProps) => (
  <View style={[styles.row, { gap }, style]}>{children}</View>
);

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center' } });
