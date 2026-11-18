/** Design page 22 (section 54), screen 19 · Live on the job: who can see the partner's location. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { clockTime, timeLeft } from '@/domain';
import {
  Button, Card, H, H2, Hr, Icon, IconTile, MapMock, Page, Row, Screen, Spacer, T, Tag, Toggle, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { useJobClock } from '../../../state';
import { useJobsState } from '../state';
import { tint } from '@/tokens';

export function LiveScreen() {
  const t = useT();
  const nav = useNav();
  const { c, fs } = useTheme();
  const [st, set] = useJobsState();
  const left = useJobClock();
  const checkedIn = st.checkedInAt ?? '11:08 am';
  const checkedInT = checkedIn === '11:08 am' ? clockTime(t, 11, 8) : checkedIn;
  const shareWithFamily = (v: boolean) => {
    set({ familyLive: v });
    nav.toast(v ? t('Ravi can see your location until check-out', 'रवि चेक-आउट तक आपकी लोकेशन देख सकते हैं', 'ਰਵੀ ਚੈੱਕ-ਆਊਟ ਤੱਕ ਤੁਹਾਡੀ ਲੋਕੇਸ਼ਨ ਦੇਖ ਸਕਦੇ ਹਨ') : t('Family sharing off', 'परिवार से शेयर बंद', 'ਪਰਿਵਾਰ ਨਾਲ ਸ਼ੇਅਰ ਬੰਦ'));
  };
  return (
    <Page>
      <MapMock height={170} route={false} dots={[]}>
        <View style={styles.halo} />
        <View style={styles.me}>
          <Icon name="user" size={14} color={palette.white} />
        </View>
        <Pressable onPress={nav.back} style={[styles.back, { backgroundColor: c.card }]} accessibilityRole="button" accessibilityLabel={t('Back', 'वापस', 'ਵਾਪਸ')}>
          <Icon name="back" color={c.ink} />
        </Pressable>
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Row><H>{t('You are live', 'आप लाइव हैं', 'ਤੁਸੀਂ ਲਾਈਵ ਹੋ')}</H><Tag tone="g">{t('Live', 'लाइव', 'ਲਾਈਵ')}</Tag></Row>
        <Card row>
          <View style={styles.fill}><T s m>{t(`Checked in ${checkedIn}`, `${checkedInT} पर चेक-इन`, `${checkedInT} ਤੇ ਚੈੱਕ-ਇਨ`)}</T><H size={26} style={{ marginTop: 4 }}>{timeLeft(t, left)}</H></View>
          <IconTile name="clock" onPress={() => nav.push('help')} />
        </Card>
        <H2>{t('Who can see you', 'आपको कौन देख सकता है', 'ਤੁਹਾਨੂੰ ਕੌਣ ਦੇਖ ਸਕਦਾ ਹੈ')}</H2>
        <Card style={{ gap: 9 }}>
          <Row><View style={styles.fill}><T>{'Saathi'} {t('team', 'टीम', 'ਟੀਮ')}</T></View><Tag tone="n">{t('Always on a job', 'काम के दौरान हमेशा', 'ਕੰਮ ਦੌਰਾਨ ਹਮੇਸ਼ਾ')}</Tag></Row>
          <Hr />
          <Row><T style={styles.fill}>{t('Customer', 'ग्राहक', 'ਗਾਹਕ')}</T><Tag tone="n">{t('Until check-out', 'चेक-आउट तक', 'ਚੈੱਕ-ਆਊਟ ਤੱਕ')}</Tag></Row>
          <Hr />
          <Row><T style={styles.fill}>{t('My family', 'मेरा परिवार', 'ਮੇਰਾ ਪਰਿਵਾਰ')}</T><Toggle on={!!st.familyLive} onChange={shareWithFamily} /></Row>
        </Card>
        <T s m>{t('Live location stops by itself when you check out.', 'चेक-आउट करते ही लाइव लोकेशन अपने-आप बंद हो जाती है।', 'ਚੈੱਕ-ਆਊਟ ਕਰਦੇ ਹੀ ਲਾਈਵ ਲੋਕੇਸ਼ਨ ਆਪਣੇ-ਆਪ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ।')}</T>
        <Spacer />
        <Button size="tall" onPress={() => nav.push('checkOut')} style={{ paddingVertical: 14 }} textStyle={{ fontSize: fs(14) }}>{t('Finish and check out', 'खत्म करें और चेक-आउट', 'ਖ਼ਤਮ ਕਰੋ ਅਤੇ ਚੈੱਕ-ਆਊਟ')}</Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  halo: { position: 'absolute', left: 112, top: 32, width: 90, height: 90, borderRadius: 45, backgroundColor: tint.mapHalo },
  me: {
    position: 'absolute', left: 142, top: 62, width: 30, height: 30, borderRadius: 15, borderWidth: 3, borderColor: palette.white,
    backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center',
  },
  back: { position: 'absolute', left: 12, top: 12, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});

export default LiveScreen;
