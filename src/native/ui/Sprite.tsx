import React from 'react';
import { Image, View, Text, type ViewStyle } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../theme';

/**
 * Re-creates CSS `background-size: S%; background-position: X% Y%` cropping for
 * the square character PNGs in /public/img, in React Native.
 */
function Crop({ src, w, h, size, x, y, bg, radius, style }: {
  src: string; w: number; h: number; size: number; x: number; y: number; bg: string; radius: number; style?: ViewStyle;
}) {
  const rw = (w * size) / 100; // rendered image width (square, so height too)
  const left = ((w - rw) * x) / 100;
  const top = ((h - rw) * y) / 100;
  return (
    <View style={[{ width: w, height: h, borderRadius: radius, overflow: 'hidden', backgroundColor: bg }, style]}>
      <Image source={{ uri: src }} style={{ position: 'absolute', width: rw, height: rw, left, top }} />
    </View>
  );
}

/** Service characters (`.ch .c1`–`.c6`). Pos/size match the design CSS. */
const characters = {
  clean: { src: 'clean.png', x: 65, y: 13 },
  deep: { src: 'deep.png', x: 50, y: 9 },
  kitchen: { src: 'kitchen.png', x: 46, y: 3 },
  laundry: { src: 'laundry.png', x: 38, y: 4 },
  custom: { src: 'custom.png', x: 46, y: 15 },
  hero: { src: 'hero.png', x: 52, y: 4 },
} as const;
export type Character = keyof typeof characters;

export function CharacterTile({ name, size = 46, width, height, zoom = 230, radius = 13, x, y, bg, style }: {
  name: Character; size?: number; width?: number; height?: number; zoom?: number; radius?: number;
  x?: number; y?: number; bg?: string; style?: ViewStyle;
}) {
  const { c } = useTheme();
  const ch = characters[name];
  return (
    <Crop src={`/img/${ch.src}`} w={width ?? size} h={height ?? size} size={zoom} x={x ?? ch.x} y={y ?? ch.y}
      bg={bg ?? c.mint} radius={radius} style={style} />
  );
}

/** Faces (`.av.f-xx`). Each named person in the sample data has one. */
const faces = {
  sd: { src: 'hero.png', x: 49, y: 7, s: 600 }, // Sunita D. — the hero helper
  rm: { src: 'clean.png', x: 59, y: 10, s: 550 },
  kr: { src: 'custom.png', x: 47, y: 11, s: 450 },
  gk: { src: 'face-gk.png', x: 45, y: 15, s: 230 },
  mt: { src: 'face-mt.png', x: 50, y: 7, s: 330 },
  ms: { src: 'cust-ms.png', x: 50, y: 62, s: 170 },
  ap: { src: 'cust-ap.png', x: 50, y: 34, s: 260 },
  rg: { src: 'cust-rg.png', x: 50, y: 36, s: 240 },
  fa: { src: 'cust-fa.png', x: 50, y: 41, s: 240 },
  pn: { src: 'cust-pn.png', x: 50, y: 35, s: 220 },
  st: { src: 'cust-st.png', x: 50, y: 17, s: 300 },
  rv: { src: 'cust-rv.png', x: 46, y: 24, s: 290 },
  ak: { src: 'cust-ak.png', x: 43, y: 18, s: 290 },
  kd: { src: 'cust-kd.png', x: 50, y: 13, s: 520 },
  pv: { src: 'face-pv.png', x: 28, y: 24, s: 300 },
  ls: { src: 'face-ls.png', x: 84, y: 22, s: 290 },
  ad: { src: 'staff-ad.png', x: 50, y: 18, s: 190 },
  ol: { src: 'staff-ol.png', x: 50, y: -4, s: 267 },
  ac: { src: 'staff-ac.png', x: 50, y: 16, s: 190 },
  au: { src: 'staff-au.png', x: 50, y: 14, s: 190 },
  s1: { src: 'staff-s1.png', x: 50, y: 16, s: 260 },
  s2: { src: 'staff-s2.png', x: 5, y: 48, s: 181 },
  mk: { src: 'staff-mk.png', x: 54, y: 1, s: 253 },
  nk: { src: 'cust-nk.png', x: 50, y: 30, s: 260 }, // Nitin K. — the sample customer
  ab: { src: 'face-ab.png', x: 45, y: 15, s: 350 },
} as const;
export type Face = keyof typeof faces;
export const faceIds = Object.keys(faces) as Face[];

/** Round avatar: a face crop when `face` is given, else initials on yellow. */
export function Avatar({ face, initials, size = 40, bg = palette.yellow, style }: {
  face?: Face; initials?: string; size?: number; bg?: string; style?: ViewStyle;
}) {
  if (face) {
    const f = faces[face];
    return <Crop src={`/img/${f.src}`} w={size} h={size} size={f.s} x={f.x} y={f.y} bg={bg} radius={size / 2} style={style} />;
  }
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Text style={{ fontWeight: '700', fontSize: size * 0.32, color: palette.ink }}>{initials}</Text>
    </View>
  );
}
