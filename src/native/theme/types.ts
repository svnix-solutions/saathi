import type { ColorScheme } from '@/tokens';

export type Locale = 'en' | 'hi' | 'pa';
export type Device = 'regular' | 'small';

export type ThemeState = {
  dark: boolean;
  /** 1 = normal, 1.22 = the design's "large text" condition */
  textScale: number;
  locale: Locale;
  device: Device;
};

export type ThemeValue = ThemeState & {
  /** colours of the active scheme (light or dark) */
  c: ColorScheme;
  /** scales a font size by the text scale: `fs(12)` */
  fs: (px: number) => number;
};
