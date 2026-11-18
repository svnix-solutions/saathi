/** Design page 23 (section 59), screen 21 · No jobs right now. */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Avatar, Button, Card, H, H2, Page, Row, Screen, Spacer, StatusIcon, T, Toggle, TopBar, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { usePartnerState } from '../../../state';

export function NoJobsScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = usePartnerState();
  const online = st.online;
  const name = st.name === 'Sunita' ? t('Sunita', 'सुनीता', 'ਸੁਨੀਤਾ') : st.name;
  const goOffline = () => { set({ online: false }); nav.reset('home'); nav.toast(t('You are offline', 'आप ऑफ़लाइन हैं', 'ਤੁਸੀਂ ਆਫ਼ਲਾਈਨ ਹੋ')); };
  return (
    <Page>
      <TopBar>
        <Row>
          <View><TopBar.Text dim>Saathi Partner</TopBar.Text><TopBar.Title>{name}</TopBar.Title></View>
          <Pressable onPress={() => nav.push('profile')} accessibilityRole="button" accessibilityLabel={t('My profile', 'मेरी प्रोफ़ाइल', 'ਮੇਰੀ ਪ੍ਰੋਫ਼ਾਈਲ')}><Avatar face="sd" size={40} /></Pressable>
        </Row>
      </TopBar>
      <Screen>
        <Card sel={online} row>
          <View>
            <H2>{online ? t('You are online', 'आप ऑनलाइन हैं', 'ਤੁਸੀਂ ਆਨਲਾਈਨ ਹੋ') : t('You are offline', 'आप ऑफ़लाइन हैं', 'ਤੁਸੀਂ ਆਫ਼ਲਾਈਨ ਹੋ')}</H2>
            <T s m>{online ? t('Online for 22 min', '22 मिनट से ऑनलाइन', '22 ਮਿੰਟ ਤੋਂ ਆਨਲਾਈਨ') : t('No jobs will ring', 'कोई काम नहीं आएगा', 'ਕੋਈ ਕੰਮ ਨਹੀਂ ਆਵੇਗਾ')}</T>
          </View>
          <Toggle on={online} onChange={(v) => set({ online: v })} />
        </Card>
        <View style={{ marginTop: 10 }}><StatusIcon name="clock" /></View>
        <H center>{t('No jobs near you right now', 'अभी आपके पास कोई काम नहीं', 'ਹੁਣੇ ਤੁਹਾਡੇ ਨੇੜੇ ਕੋਈ ਕੰਮ ਨਹੀਂ')}</H>
        <T m center>{t('It is usually quiet from 2 to 4 pm. Keep the app open and we will ring you.', 'आमतौर पर 2 से 4 बजे काम कम होता है। ऐप खुला रखें, हम घंटी बजाएँगे।', 'ਆਮ ਤੌਰ ਉੱਤੇ 2 ਤੋਂ 4 ਵਜੇ ਕੰਮ ਘੱਟ ਹੁੰਦਾ ਹੈ। ਐਪ ਖੁੱਲ੍ਹੀ ਰੱਖੋ, ਅਸੀਂ ਘੰਟੀ ਵਜਾਵਾਂਗੇ।')}</T>
        <Card onPress={() => nav.push('demandMap')}><H2>{t('Next busy time', 'अगला व्यस्त समय', 'ਅਗਲਾ ਭੀੜ ਦਾ ਸਮਾਂ')}</H2><T s m>{t('Around 5 pm in Block C', 'ब्लॉक सी में लगभग शाम 5 बजे', 'ਬਲਾਕ ਸੀ ਵਿੱਚ ਲਗਭਗ ਸ਼ਾਮ 5 ਵਜੇ')}</T></Card>
        <Spacer />
        <Button variant="outline" onPress={goOffline}>{t('Go offline for now', 'अभी ऑफ़लाइन जाएँ', 'ਹੁਣੇ ਆਫ਼ਲਾਈਨ ਹੋ ਜਾਓ')}</Button>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

export default NoJobsScreen;
