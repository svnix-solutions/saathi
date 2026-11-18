import React, { createContext, useContext, useMemo } from 'react';
import { dark as darkColors, light as lightColors } from '@/tokens';
import type { ThemeState, ThemeValue } from './types';

const defaultState: ThemeState = { dark: false, textScale: 1, locale: 'en', device: 'regular' };

export const ThemeCtx = createContext<ThemeValue>({ ...defaultState, c: lightColors, fs: (n) => n });

/** Provides colours, text scale, locale and device size. Nested providers inherit what they do not set. */
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
