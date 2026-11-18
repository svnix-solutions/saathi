import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export type ColProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle>; /** gap in px (default 0) */ gap?: number };

/** Vertical stack with a gap. */
export const Col = ({ children, style, gap = 0 }: ColProps) => (
  <View style={[{ gap }, style]}>{children}</View>
);
