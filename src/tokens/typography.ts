/**
 * Type scale. `font` is the original token (kept for existing imports); `text` gives each named
 * text style its size, line height and weight. Sizes are in px before the theme's text scale (`fs`).
 */
export const font = {
  family: '"Avenir Next", "Helvetica Neue", Arial, sans-serif',
  size: { s: 11, body: 12, h2: 13, btn: 13, h: 19, hl: 22, stat: 28 },
} as const;

export type TextStyleToken = {
  size: number;
  lineHeight?: number;
  weight: '400' | '600' | '700';
  letterSpacing?: number;
};

/** Named text styles. Line heights are absolute px (body text uses 1.4×, headlines 1.2×). */
export const text = {
  /** body copy (`<T>`) */
  body: { size: 12, lineHeight: 12 * 1.4, weight: '400' },
  /** small / secondary copy (`<T s>`) */
  small: { size: 11, lineHeight: 11 * 1.4, weight: '400' },
  /** tag and tab labels */
  caption: { size: 10, weight: '700' },
  /** section label (`<H2>`, the design's .h2) */
  label: { size: 13, lineHeight: 17, weight: '700' },
  /** screen headline (`<H>`, the design's .h) */
  title: { size: 19, lineHeight: 19 * 1.2, weight: '700', letterSpacing: -0.2 },
  /** sign-in headline */
  headline: { size: 22, lineHeight: 22 * 1.2, weight: '700', letterSpacing: -0.2 },
  /** big numbers (earnings, timers) */
  display: { size: 28, lineHeight: 28 * 1.2, weight: '700', letterSpacing: -0.2 },
  /** button label */
  button: { size: 13, weight: '700' },
  /** big button label (`<Button big>`) */
  buttonBig: { size: 16, weight: '700' },
  /** tall partner button label (`<Button size="tall">`) */
  buttonTall: { size: 15, weight: '700' },
  /** text input value */
  input: { size: 15, weight: '600' },
  /** OTP digit */
  otp: { size: 20, weight: '600' },
} as const satisfies Record<string, TextStyleToken>;

export type TextVariant = keyof typeof text;
