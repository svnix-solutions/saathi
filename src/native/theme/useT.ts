import { useTheme } from './ThemeProvider';

/**
 * Inline translations. Usage: `const t = useT(); t('Book helper', 'हेल्पर बुक करें')`.
 * Falls back to English when a translation is missing.
 */
export function useT() {
  const { locale } = useTheme();
  return (en: string, hi?: string, pa?: string) => (locale === 'hi' && hi) || (locale === 'pa' && pa) || en;
}
