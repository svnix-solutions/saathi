import React from 'react';
import type { ViewStyle } from 'react-native';
import { radius as radii } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Crop } from '../Crop';
import { characters, type Character } from './characters';

export type CharacterTileProps = {
  /** which service character */
  name: Character;
  /** square size in px (default 46); `width` / `height` override it */
  size?: number;
  width?: number;
  height?: number;
  /** image zoom in % of the tile (default 230) */
  zoom?: number;
  radius?: number;
  /** crop position overrides in % */
  x?: number;
  y?: number;
  /** tile background (default the theme's mint) */
  bg?: string;
  style?: ViewStyle;
};

/** A service character cropped into a rounded tile (the design's `.ch`). */
export function CharacterTile({ name, size = 46, width, height, zoom = 230, radius = radii.tile, x, y, bg, style }: CharacterTileProps) {
  const { c } = useTheme();
  const ch = characters[name];
  return (
    <Crop src={`/img/${ch.src}`} w={width ?? size} h={height ?? size} size={zoom} x={x ?? ch.x} y={y ?? ch.y}
      bg={bg ?? c.mint} radius={radius} style={style} />
  );
}
