import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H2, Icon, IconTile, Lft, Page, Pill, Screen, Sheet, Spacer, T, palette, useNav, useT, useTheme } from '@/native/ui';
import { helpLanguages, helpTopics, type HelpTopic } from '../data';
import { useAccountState } from '../state';

/** Design page 21 (section 51), screen 16 · Help. */
export function HelpScreen() {
  const t = useT();
  const nav = useNav();
  const { c, locale } = useTheme();
  const [st, set] = useAccountState();
  const [topic, setTopic] = useState<HelpTopic | null>(null);
  const [sos, setSos] = useState(false);
  const [lang, setLang] = useState(false);
  const cur = st.locale ?? locale;
  return (
    <Page>
      <Screen>
        <BackHeader title={t('Help', 'मदद', 'ਮਦਦ')} onBack={nav.canGoBack ? nav.back : () => nav.reset('home')} />
        <Card onPress={() => setSos(true)} style={[styles.sos, { borderWidth: 0, paddingVertical: 16 }]}>
          <Lft>
            <Icon name="shield" size={28} color={palette.white} />
            <View>
              <H2 color={palette.white} style={styles.sosTitle}>{t('I do not feel safe', 'मैं सुरक्षित महसूस नहीं कर रही', 'ਮੈਂ ਸੁਰੱਖਿਅਤ ਮਹਿਸੂਸ ਨਹੀਂ ਕਰ ਰਹੀ')}</H2>
              <T s color={palette.white}>{t('Calls our safety team right now', 'तुरंत हमारी सुरक्षा टीम को कॉल', 'ਹੁਣੇ ਸਾਡੀ ਸੁਰੱਖਿਆ ਟੀਮ ਨੂੰ ਕਾਲ')}</T>
            </View>
          </Lft>
        </Card>
        <Grid cols={2}>
          {helpTopics.map((x) => (
            <Card key={x.en} onPress={() => setTopic(x)}><IconTile name={x.icon} /><H2 style={{ marginTop: 8 }}>{t(x.en, x.hi, x.pa)}</H2></Card>
          ))}
        </Grid>
        <Card row onPress={() => setLang(true)}>
          <View><H2>{t('Language', 'भाषा', 'ਭਾਸ਼ਾ')}</H2><T s m>English · हिन्दी · ਪੰਜਾਬੀ</T></View>
          <T s b color={c.accent}>{t('Change', 'बदलें', 'ਬਦਲੋ')}</T>
        </Card>
        <Spacer />
        <Button size="tall" icon="call" onPress={() => nav.toast(t('Calling Saathi partner support…', 'Saathi पार्टनर सहायता को कॉल…', 'Saathi ਪਾਰਟਨਰ ਸਹਾਇਤਾ ਨੂੰ ਕਾਲ…'))}>{t('Call Saathi', 'Saathi को कॉल करें', 'Saathi ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
      </Screen>
      <Sheet visible={sos} onClose={() => setSos(false)}>
        <Lft><Icon name="shield" size={24} color={palette.red} /><H2 style={styles.fill}>{t('Calling the safety team', 'सुरक्षा टीम को कॉल हो रही है', 'ਸੁਰੱਖਿਆ ਟੀਮ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ')}</H2></Lft>
        <T s m>{t('Your live location and this booking are shared with them. Leave the house if you can. Ravi (your emergency contact) gets an SMS.', 'आपकी लाइव लोकेशन और यह बुकिंग उनसे शेयर की गई है। हो सके तो घर से बाहर निकलें। रवि (आपके आपात संपर्क) को SMS जाता है।', 'ਤੁਹਾਡੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਅਤੇ ਇਹ ਬੁਕਿੰਗ ਉਹਨਾਂ ਨਾਲ ਸ਼ੇਅਰ ਕੀਤੀ ਗਈ ਹੈ। ਹੋ ਸਕੇ ਤਾਂ ਘਰੋਂ ਬਾਹਰ ਨਿਕਲੋ। ਰਵੀ (ਤੁਹਾਡੇ ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ) ਨੂੰ SMS ਜਾਂਦਾ ਹੈ।')}</T>
        <Button size="tall" variant="outline" onPress={() => { setSos(false); nav.toast(t('Call ended. The safety team will call you back.', 'कॉल खत्म। सुरक्षा टीम वापस कॉल करेगी।', 'ਕਾਲ ਖ਼ਤਮ। ਸੁਰੱਖਿਆ ਟੀਮ ਵਾਪਸ ਕਾਲ ਕਰੇਗੀ।')); }}>{t('End call', 'कॉल खत्म करें', 'ਕਾਲ ਖ਼ਤਮ ਕਰੋ')}</Button>
      </Sheet>
      <Sheet visible={!!topic} onClose={() => setTopic(null)}>
        {topic && <>
          <Lft><IconTile name={topic.icon} /><H2 style={styles.fill}>{t(topic.en, topic.hi, topic.pa)}</H2></Lft>
          <T s m>{t(topic.tipEn, topic.tipHi, topic.tipPa)}</T>
          <Button size="tall" onPress={() => { setTopic(null); nav.toast(t('Done. The team is on it.', 'हो गया। टीम देख रही है।', 'ਹੋ ਗਿਆ। ਟੀਮ ਵੇਖ ਰਹੀ ਹੈ।')); }}>{t(topic.act, topic.actHi, topic.actPa)}</Button>
          <Button variant="plain" onPress={() => setTopic(null)}>{t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ')}</Button>
        </>}
      </Sheet>
      <Sheet visible={lang} onClose={() => setLang(false)}>
        <H2>{t('App language', 'ऐप की भाषा', 'ਐਪ ਦੀ ਭਾਸ਼ਾ')}</H2>
        <Grid cols={3}>{helpLanguages.map(([k, l]) => <Pill key={k} sel={cur === k} onPress={() => set({ locale: k })}>{l}</Pill>)}</Grid>
        <Button size="tall" onPress={() => setLang(false)}>{t('Done', 'हो गया', 'ਹੋ ਗਿਆ')}</Button>
      </Sheet>
    </Page>
  );
}

export default HelpScreen;

const styles = StyleSheet.create({
  sos: { backgroundColor: palette.red },
  sosTitle: { fontSize: 16 },
  fill: { flex: 1 },
});
