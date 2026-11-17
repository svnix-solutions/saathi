import React, { createContext, useContext, useMemo } from 'react';
import { dark as darkColors, light as lightColors, type ColorScheme } from '@/tokens';

export type Locale = 'en' | 'hi' | 'pa';
export type Device = 'regular' | 'small';

export type ThemeState = {
  dark: boolean;
  /** 1 = normal, 1.22 = the design's "large text" condition */
  textScale: number;
  locale: Locale;
  device: Device;
};

type ThemeValue = ThemeState & { c: ColorScheme; fs: (px: number) => number };

const defaultState: ThemeState = { dark: false, textScale: 1, locale: 'en', device: 'regular' };

const ThemeCtx = createContext<ThemeValue>({ ...defaultState, c: lightColors, fs: (n) => n });

export function ThemeProvider({ children, ...p }: Partial<ThemeState> & { children: React.ReactNode }) {
  const parent = useContext(ThemeCtx);
  const s: ThemeState = {
    dark: p.dark ?? parent.dark,
    textScale: p.textScale ?? parent.textScale,
    locale: p.locale ?? parent.locale,
    device: p.device ?? parent.device,
  };
  const v = useMemo<ThemeValue>(
    () => ({ ...s, c: s.dark ? darkColors : lightColors, fs: (n: number) => Math.round(n * s.textScale * 10) / 10 }),
    [s.dark, s.textScale, s.locale, s.device],
  );
  return <ThemeCtx.Provider value={v}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

/**
 * Inline translations. Usage: `const t = useT(); t('Book helper', 'हेल्पर बुक करें')`.
 * Falls back to English when a translation is missing.
 */
export function useT() {
  const { locale } = useTheme();
  return (en: string, hi?: string, pa?: string) => (locale === 'hi' && hi) || (locale === 'pa' && pa) || en;
}
