import React from 'react';
import { Image, StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * Re-creates CSS `background-size: S%; background-position: X% Y%` cropping for
 * the square character PNGs in /public/img, in React Native. Internal: used by Avatar and CharacterTile.
 */
export function Crop({ src, w, h, size, x, y, bg, radius, style }: {
  src: string; w: number; h: number; size: number; x: number; y: number; bg: string; radius: number; style?: ViewStyle;
}) {
  const rw = (w * size) / 100; // rendered image width (square, so height too)
  const left = ((w - rw) * x) / 100;
  const top = ((h - rw) * y) / 100;
  return (
    <View style={[styles.box, { width: w, height: h, borderRadius: radius, backgroundColor: bg }, style]}>
      <Image source={{ uri: src }} style={[styles.img, { width: rw, height: rw, left, top }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { overflow: 'hidden' },
  img: { position: 'absolute' },
});
