import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export type CircleProps = {
  /** diameter in px */
  size: number;
  children?: React.ReactNode;
  /** fill colour */
  bg?: string;
  /** colour of a 3px dashed border (none when omitted) */
  border?: string;
  style?: StyleProp<ViewStyle>;
};

/** Centred round placeholder (selfie frame, mic button, photo spot). */
export function Circle({ size, children, bg, border, style }: CircleProps) {
  return (
    <View style={[styles.base, {
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: bg, borderWidth: border ? 3 : 0, borderColor: border,
    }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' },
});
