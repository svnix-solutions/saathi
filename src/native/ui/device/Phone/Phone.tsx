import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { elevation, font, palette, radius } from '@/tokens';
import { ThemeProvider, useTheme, type ThemeState } from '../../../theme/index';
import { useNav } from '../../../navigation/index';
import { Toast } from '../../organisms/Toast';

export type PhoneProps = Partial<ThemeState> & {
  children: React.ReactNode;
  /** bold line under the phone */
  caption?: string;
  /** muted line under the caption */
  sub?: string;
  /** screen background (default the theme's surface) */
  bg?: string;
  style?: ViewStyle;
};

/**
 * Phone frame exactly as the design draws it: 280×600, 8px ink bezel, 38px radius.
 * "small" is the design's small-phone condition (236×500).
 * Theme props (dark, textScale, locale, device) apply to everything inside. Shows `nav.toast()` messages.
 */
export function Phone({ children, caption, sub, bg, style, ...theme }: PhoneProps) {
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
        width: small ? 236 : 280, height: small ? 500 : 600, borderWidth: 8, borderColor: palette.ink, borderRadius: radius.phone,
        backgroundColor: bg ?? c.surface, overflow: 'hidden',
        boxShadow: elevation.phone,
      } as ViewStyle, style]}>
        {children}
        <Toast message={nav.toastMsg} />
      </View>
      {caption && (
        <View style={styles.caption}>
          <Text style={styles.title}>{caption}</Text>
          {sub && <Text style={styles.sub}>{sub}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  caption: { marginTop: 14 },
  title: { fontFamily: font.family, fontSize: 13, fontWeight: '700', color: palette.ink },
  sub: { fontFamily: font.family, fontSize: 13, color: palette.mut },
});
