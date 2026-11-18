import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/index';

/** Horizontal rule (the design's `.hr`): 1px line in the theme's line colour. */
export const Hr = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { c } = useTheme();
  return <View style={[styles.base, { backgroundColor: c.line }, style]} />;
};

const styles = StyleSheet.create({ base: { height: 1 } });
