import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { palette } from '@/tokens';

/** Saathi mark: rounded green tile, a white "S" stroke and the yellow sparkle. */
export function Mark({ size = 52, reversed = false }: {
  size?: number;
  /** white tile with a green S (for use on green) */
  reversed?: boolean;
}) {
  const bg = reversed ? palette.white : palette.green;
  const fg = reversed ? palette.green : palette.white;
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Rect width="64" height="64" rx="16" fill={bg} />
      <Path d="M41 21c-2-3-5.5-4.5-9.5-4.5-5.5 0-9.5 3-9.5 7.5 0 9.5 20 6 20 16 0 5-4.5 8-10.5 8-4.5 0-8.5-2-10.5-5.5"
        stroke={fg} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {!reversed && <Path d="M48 8l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" fill={palette.yellow} />}
    </Svg>
  );
}
