import React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { font, palette } from '@/tokens';
import { ThemeProvider, useTheme, type ThemeState } from '../theme';
import { useNav } from '../nav';
import { Toast } from './primitives';

/**
 * Phone frame exactly as the design draws it: 280×600, 8px ink bezel, 38px radius.
 * "small" is the design's small-phone condition (236×500).
 * Theme props (dark, textScale, locale, device) apply to everything inside.
 */
export function Phone({ children, caption, sub, bg, style, ...theme }: Partial<ThemeState> & {
  children: React.ReactNode; caption?: string; sub?: string; bg?: string; style?: ViewStyle;
}) {
  return (
    <ThemeProvider {...theme}>
      <PhoneInner caption={caption} sub={sub} bg={bg} style={style}>{children}</PhoneInner>
    </ThemeProvider>
  );
}

function PhoneInner({ children, caption, sub, bg, style }: { children: React.ReactNode; caption?: string; sub?: string; bg?: string; style?: ViewStyle }) {
  const { c, device } = useTheme();
  const small = device === 'small';
  const nav = useNav();
  return (
    <View style={{ width: small ? 236 : 280 }}>
      <View style={[{
        width: small ? 236 : 280, height: small ? 500 : 600, borderWidth: 8, borderColor: palette.ink, borderRadius: 38,
        backgroundColor: bg ?? c.surface, overflow: 'hidden',
        boxShadow: '0 34px 60px -28px rgba(7,63,51,.45), 0 0 0 1.5px #33443f',
      } as ViewStyle, style]}>
        {children}
        <Toast message={nav.toastMsg} />
      </View>
      {caption && (
        <View style={{ marginTop: 14 }}>
          <Text style={{ fontFamily: font.family, fontSize: 13, fontWeight: '700', color: palette.ink }}>{caption}</Text>
          {sub && <Text style={{ fontFamily: font.family, fontSize: 13, color: palette.mut }}>{sub}</Text>}
        </View>
      )}
    </View>
  );
}

/** Lays several phones side by side, like a design page (.phones). */
export function PhoneRow({ children }: { children: React.ReactNode }) {
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 40, justifyContent: 'center', alignItems: 'flex-start', padding: 24 }}>{children}</View>;
}
