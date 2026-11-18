import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { space } from '@/tokens';
import { shrinkable } from '../Lft/Lft';

export type RowProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle>; /** gap in px (default 8) */ gap?: number };

/** Horizontal row, items centred and pushed to both ends (the design's `.row`). */
export const Row = ({ children, style, gap = space.row }: RowProps) => (
  <View style={[styles.row, { gap }, style]}>{shrinkable(children)}</View>
);

const styles = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } });
