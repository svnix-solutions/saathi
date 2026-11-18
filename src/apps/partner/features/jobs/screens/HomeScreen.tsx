/** Design page 20 (section 4), screen 9 · Home, online (and offline). */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { rupees } from '@/domain';
import {
  Avatar, Card, Grid, H, H2, Icon, IconTile, Lft, Page, Row, Screen, T, Tag, Toggle, TopBar, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { homeShortcuts } from '../data';
import { useAutoOffer } from '../hooks/useAutoOffer';
import { partnerName } from '../job';
import { useJobsState } from '../state';

export function HomeScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useJobsState();
  const online = st.online;
  useAutoOffer();
  const hour = new Date().getHours();
  const greet = hour < 12 ? t('Good morning', 'सुप्रभात') : hour < 17 ? t('Good afternoon', 'नमस्ते') : t('Good evening', 'शुभ संध्या');
  const goOnline = (v: boolean) => {
    set({ online: v, offerShown: false });
    nav.toast(v ? t('You are online', 'आप ऑनलाइन हैं') : t('You are offline. No new jobs will ring.', 'आप ऑफ़लाइन हैं। नया काम नहीं आएगा।'));
  };
  return (
    <Page>
      <TopBar>
        <Row>
          <View>
            <TopBar.Text dim>Saathi Partner · {greet}</TopBar.Text>
            <TopBar.Title>{partnerName(t, st.name)}</TopBar.Title>
          </View>
          <Lft gap={10}>
            <Pressable onPress={() => nav.push('alerts')} accessibilityRole="button" accessibilityLabel={t('Alerts', 'सूचनाएँ')} hitSlop={6}>
              <Icon name="bell" color={palette.white} size={20} />
            </Pressable>
            <Pressable onPress={() => nav.push('profile')} accessibilityRole="button" accessibilityLabel={t('My profile', 'मेरी प्रोफ़ाइल')}><Avatar face="sd" size={40} /></Pressable>
          </Lft>
        </Row>
      </TopBar>
      <Screen>
        <Card sel={online} row>
          <View style={styles.fill}>
            <H2>{online ? t('You are online', 'आप ऑनलाइन हैं') : t('You are offline', 'आप ऑफ़लाइन हैं')}</H2>
            <T s m>{online ? t('Jobs near you will ring', 'पास का काम आने पर घंटी बजेगी') : t('Turn on to get jobs near you', 'काम पाने के लिए चालू करें')}</T>
          </View>
          <Toggle big on={online} onChange={goOnline} />
        </Card>
        <Grid cols={2}>
          <Card onPress={() => nav.reset('jobs')}><T s m>{t('Jobs today', 'आज के काम')}</T><H>{st.jobsToday ?? 3}</H></Card>
          <Card onPress={() => nav.reset('earnings')}><T s m>{t('Earned today', 'आज की कमाई')}</T><H>{rupees(st.earnedToday ?? 412)}</H></Card>
        </Grid>
        <H2>{t('Next job', 'अगला काम')}</H2>
        <Card onPress={() => nav.push('jobRequest')}>
          <Row><H2>{t('Kitchen & bath scrub', 'रसोई और बाथरूम')}</H2><Tag>2:00 pm</Tag></Row>
          <Lft gap={6} style={{ marginTop: 6 }}><Icon name="pin" color={c.mut} size={16} /><T s m>{t('Block A · 1.4 km away', 'ब्लॉक ए · 1.4 किमी दूर')}</T></Lft>
        </Card>
        {online ? (
          <Card onPress={() => nav.push('err.noJobs')}><T s m>{t('Waiting for a new job. Stay within your area to get more requests.', 'नए काम का इंतज़ार। ज़्यादा काम के लिए अपने इलाके में रहें।')}</T></Card>
        ) : (
          <Card tone="clear"><T s m>{t('You will not get new jobs while offline. Jobs booked ahead still show here.', 'ऑफ़लाइन रहने पर नया काम नहीं आएगा। पहले से बुक काम यहाँ दिखेंगे।')}</T></Card>
        )}
        <Row style={{ marginTop: 2 }}>
          {homeShortcuts.map(([icon, en, hi, route]) => (
            <Pressable key={route} onPress={() => nav.push(route)} style={styles.shortcut} accessibilityRole="button">
              <IconTile name={icon} /><T s m>{t(en, hi)}</T>
            </Pressable>
          ))}
        </Row>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  shortcut: { alignItems: 'center', gap: 4, flex: 1 },
});

export default HomeScreen;
