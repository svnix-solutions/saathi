import React, { createContext, useContext, useMemo } from 'react';
import { dark as darkColors, light as lightColors } from '@/tokens';
import type { ThemeState, ThemeValue } from './types';

const defaultState: ThemeState = { dark: false, textScale: 1, locale: 'en', device: 'regular' };

export const ThemeCtx = createContext<ThemeValue>({ ...defaultState, c: lightColors, fs: (n) => n });

/** Provides colours, text scale, locale and device size. Nested providers inherit what they do not set. */
export function ThemeProvider({ children, ...p }: Partial<ThemeState> & { children: React.ReactNode }) {
  const parent = useContext(ThemeCtx);
  const dark = p.dark ?? parent.dark;
  const textScale = p.textScale ?? parent.textScale;
  const locale = p.locale ?? parent.locale;
  const device = p.device ?? parent.device;
  const v = useMemo<ThemeValue>(
    () => ({ dark, textScale, locale, device, c: dark ? darkColors : lightColors, fs: (n: number) => Math.round(n * textScale * 10) / 10 }),
    [dark, textScale, locale, device],
  );
  return <ThemeCtx.Provider value={v}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
