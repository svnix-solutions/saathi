import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BackHeader, Card, Grid, H2, Hr, Pill, Radio, Row, Screen, T, Toggle, useNav, useT, useTheme, type Locale } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { LANGUAGES, TEXT_SIZES } from '../data';

export type LanguageSettingsProps = {
  /** the language, text scale and dark mode the preview is drawn with */
  lang: Locale;
  scale: number;
  dark: boolean;
};

/**
 * Body of Language and display. Rendered inside a ThemeProvider set to the customer's choices,
 * so the screen previews them as they are picked.
 */
export function LanguageSettings({ lang, scale, dark }: LanguageSettingsProps) {
  const t = useT();
  const nav = useNav();
  const { fs } = useTheme();
  const [st, set] = useCustomerState();
  const choose = (k: Locale) => { set({ language: k }); nav.toast(k === 'hi' ? 'भाषा: हिन्दी' : k === 'pa' ? 'ਭਾਸ਼ਾ: ਪੰਜਾਬੀ' : 'Language: English'); };
  const readAloud = (v: boolean) => { set({ readAloud: v }); if (v) nav.toast(t('Screens will be read aloud', 'स्क्रीन पढ़कर सुनाई जाएँगी')); };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Language and display', 'भाषा और डिस्प्ले', 'ਭਾਸ਼ਾ ਅਤੇ ਡਿਸਪਲੇ')} fallback="account" />
        <H2>{t('App language', 'ऐप की भाषा', 'ਐਪ ਦੀ ਭਾਸ਼ਾ')}</H2>
        <Card style={styles.list}>
          {LANGUAGES.map((l, i) => (
            <React.Fragment key={l.k}>
              {i > 0 && <Hr />}
              <Pressable onPress={() => choose(l.k)} accessibilityRole="radio" accessibilityState={{ selected: lang === l.k }}>
                <Row><T>{l.label}</T><Radio on={lang === l.k} checkSize={11.88} /></Row>
              </Pressable>
            </React.Fragment>
          ))}
        </Card>
        <H2>{t('Text size', 'अक्षरों का आकार', 'ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ')}</H2>
        <Grid cols={3}>
          {TEXT_SIZES.map((z) => (
            <Pill key={z.k} s={z.k === 'Small'} sel={Math.abs(scale - z.scale) < 0.01} onPress={() => set({ textScale: z.scale })}>
              {z.k === 'Large' ? <Text style={[styles.large, { fontSize: fs(15) }]}>{t(z.k, z.hi, z.pa)}</Text> : t(z.k, z.hi, z.pa)}
            </Pill>
          ))}
        </Grid>
        <Card style={styles.list}>
          <Row><T>{t('Dark mode', 'डार्क मोड', 'ਡਾਰਕ ਮੋਡ')}</T><Toggle on={dark} onChange={(v) => set({ darkMode: v })} /></Row>
          <Hr />
          <Row><T>{t('Read screens aloud', 'स्क्रीन पढ़कर सुनाएँ', 'ਸਕ੍ਰੀਨ ਪੜ੍ਹ ਕੇ ਸੁਣਾਓ')}</T><Toggle on={!!st.readAloud} onChange={readAloud} /></Row>
          <Hr />
          <Row><T style={styles.grow}>{t('Helper should speak my language', 'हेल्पर मेरी भाषा बोले', 'ਹੈਲਪਰ ਮੇਰੀ ਭਾਸ਼ਾ ਬੋਲੇ')}</T><Toggle on={st.helperLang ?? true} onChange={(v) => set({ helperLang: v })} /></Row>
        </Card>
        <T s m>{t('Messages from your helper are translated into your language.', 'हेल्पर के संदेश आपकी भाषा में अनुवाद होते हैं।', 'ਹੈਲਪਰ ਦੇ ਸੁਨੇਹੇ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਅਨੁਵਾਦ ਹੁੰਦੇ ਹਨ।')}</T>
      </Screen>
      <CustomerTabs active="account" />
    </View>
  );
}

export default LanguageSettings;

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { gap: 10 },
  large: { fontWeight: '600' },
  grow: { flex: 1 },
});
