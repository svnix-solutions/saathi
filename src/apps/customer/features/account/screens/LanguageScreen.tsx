/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 48 · Language and display. */
import React from 'react';
import { ThemeProvider, useTheme } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { LanguageSettings } from '../components/LanguageSettings';

export function LanguageScreen() {
  const [st] = useCustomerState();
  const theme = useTheme();
  const lang = st.language ?? theme.locale;
  const scale = st.textScale ?? theme.textScale;
  const dark = st.darkMode ?? theme.dark;
  return (
    <ThemeProvider locale={lang} textScale={scale} dark={dark}>
      <LanguageSettings lang={lang} scale={scale} dark={dark} />
    </ThemeProvider>
  );
}

export default LanguageScreen;
