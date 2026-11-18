import React from 'react';
/* Web build of Icon.tsx: identical shapes rendered as DOM <svg> (react-native-web renders through react-dom).
   The native apps resolve Icon.tsx, which uses react-native-svg. Keep the two files' shapes in sync. */
const Svg = (p: React.SVGProps<SVGSVGElement>) => <svg {...p} style={{ flexShrink: 0, display: 'block' }} />;
const Path = (p: React.SVGProps<SVGPathElement>) => <path {...p} />;
const Circle = (p: React.SVGProps<SVGCircleElement>) => <circle {...p} />;
const Rect = (p: React.SVGProps<SVGRectElement>) => <rect {...p} />;
import { useTheme } from '../../../theme/index';

/** The 22 line icons used across the design (1.8px stroke, 24 grid). */
const shapes = {
  sparkle: [<Path key="a" d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />, <Path key="b" d="M19 16v4M17 18h4" />],
  drop: [<Path key="a" d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />],
  dish: [<Circle key="a" cx="12" cy="12" r="9" />, <Circle key="b" cx="12" cy="12" r="4" />],
  shirt: [<Path key="a" d="M8 4l4 2 4-2 4 3-2 3-2-1v11H8V9l-2 1-2-3z" />],
  clock: [<Circle key="a" cx="12" cy="12" r="9" />, <Path key="b" d="M12 7v5l3 2" />],
  home: [<Path key="a" d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" />],
  list: [<Path key="a" d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />],
  user: [<Circle key="a" cx="12" cy="8" r="4" />, <Path key="b" d="M4 20c1.5-4 4.5-5 8-5s6.5 1 8 5" />],
  pin: [<Path key="a" d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />, <Circle key="b" cx="12" cy="9" r="2.5" />],
  call: [<Path key="a" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" />],
  check: [<Path key="a" d="M5 12l5 5 9-10" />],
  star: [<Path key="a" d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z" />],
  wallet: [<Rect key="a" x="3" y="6" width="18" height="13" rx="3" />, <Path key="b" d="M16 12.5h2" />],
  bolt: [<Path key="a" d="M13 2L5 13h6l-1 9 8-12h-6z" />],
  back: [<Path key="a" d="M15 5l-7 7 7 7" />],
  shield: [<Path key="a" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />, <Path key="b" d="M12 8v5M12 16h.01" />],
  mic: [<Rect key="a" x="9" y="3" width="6" height="11" rx="3" />, <Path key="b" d="M5 11a7 7 0 0 0 14 0M12 18v3" />],
  cam: [<Rect key="a" x="3" y="7" width="18" height="13" rx="3" />, <Circle key="b" cx="12" cy="13.5" r="3.5" />, <Path key="c" d="M8 7l1.5-3h5L16 7" />],
  bell: [<Path key="a" d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0" />],
  find: [<Circle key="a" cx="11" cy="11" r="6" />, <Path key="b" d="M20 20l-4.5-4.5" />],
  key: [<Circle key="a" cx="8" cy="15" r="4" />, <Path key="b" d="M11 12l8-8M16 7l3 3" />],
  alert: [<Circle key="a" cx="12" cy="12" r="9" />, <Path key="b" d="M12 7v6M12 16.5v.5" />],
  // extras used by the prototype chrome
  close: [<Path key="a" d="M6 6l12 12M18 6L6 18" />],
  chevron: [<Path key="a" d="M9 5l7 7-7 7" />],
  plus: [<Path key="a" d="M12 5v14M5 12h14" />],
} as const;

export type IconName = keyof typeof shapes;
export const iconNames = Object.keys(shapes) as IconName[];

/**
 * Line icon from the design's set (24 grid, 1.8px stroke). `fill` draws it solid (used for star and bolt).
 * Colour defaults to the theme's ink. On web this file's `.web.tsx` twin renders DOM `<svg>`.
 */
export function Icon({ name, size = 18, color, fill = false, strokeWidth = 1.8 }: {
  name: IconName; size?: number; color?: string; fill?: boolean; strokeWidth?: number;
}) {
  const { c } = useTheme();
  const col = color ?? c.ink;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? col : 'none'} stroke={fill ? 'none' : col}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {shapes[name]}
    </Svg>
  );
}
