import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { palette } from '@/tokens';
import { Crop } from '../Crop';
import { faces, type Face } from './faces';

export type AvatarProps = {
  /** a face from the sample data; without it the avatar shows `initials` */
  face?: Face;
  initials?: string;
  /** diameter in px (default 40) */
  size?: number;
  /** background (default Quick Yellow) */
  bg?: string;
  style?: ViewStyle;
};

/** Round avatar: a face crop when `face` is given, else initials on yellow. */
export function Avatar({ face, initials, size = 40, bg = palette.yellow, style }: AvatarProps) {
  if (face) {
    const f = faces[face];
    return <Crop src={`/img/${f.src}`} w={size} h={size} size={f.s} x={f.x} y={f.y} bg={bg} radius={size / 2} style={style} />;
  }
  return (
    <View style={[styles.box, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }, style]}>
      <Text style={[styles.initials, { fontSize: size * 0.32 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: '700', color: palette.ink },
});
