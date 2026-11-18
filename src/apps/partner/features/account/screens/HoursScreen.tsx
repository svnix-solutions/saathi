import React from 'react';
import { StyleSheet, View } from 'react-native';
import { clockTime } from '@/domain';
import { Card, H, H2, Page, Pill, Row, Screen, T, Tag, Toggle, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { defaultShifts, defaultWorkDays, shiftRows, weekDays } from '../data';
import { useAccountState } from '../state';

/** Design page 21 (section 51), screen 14 · Working hours. */
export function HoursScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAccountState();
  const on = st.workDays ?? defaultWorkDays;
  const shifts = st.shifts ?? defaultShifts;
  return (
    <Page>
      <Screen>
        <H>{t('My working hours', 'मेरे काम के घंटे', 'ਮੇਰੇ ਕੰਮ ਦੇ ਘੰਟੇ')}</H>
        <View style={styles.days}>
          {weekDays.map(([en, hi, pa], i) => (
            <Pill key={i} style={styles.fill} sel={on[i]} onPress={() => set({ workDays: on.map((v, j) => (j === i ? !v : v)) })}>{t(en, hi, pa)}</Pill>
          ))}
        </View>
        {shiftRows.map(([en, hi, pa, subEn, subHi, subPa], i) => (
          <Card key={en} row>
            <View><H2>{t(en, hi, pa)}</H2><T s m>{t(subEn, subHi, subPa)}</T></View>
            <Toggle on={shifts[i]} onChange={(v) => { set({ shifts: shifts.map((s, j) => (j === i ? v : s)) }); nav.toast(v ? t(`${en} on`, `${hi} चालू`, `${pa} ਚਾਲੂ`) : t(`${en} off`, `${hi} बंद`, `${pa} ਬੰਦ`)); }} />
          </Card>
        ))}
        <H2>{t('Booked ahead', 'पहले से बुक', 'ਪਹਿਲਾਂ ਤੋਂ ਬੁੱਕ')}</H2>
        <Card onPress={() => nav.toast(t('Monthly plan: Mon to Sat, 8:00 am at Flat 204', 'मासिक प्लान: सोम से शनि, सुबह 8 बजे, फ़्लैट 204', 'ਮਹੀਨੇ ਦਾ ਪਲਾਨ: ਸੋਮ ਤੋਂ ਸ਼ਨੀ, ਸਵੇਰੇ 8 ਵਜੇ, ਫ਼ਲੈਟ 204'))}>
          <Row><H2 style={styles.shrink}>{t('Monthly plan · Nitin K.', 'मासिक प्लान · नितिन के.', 'ਮਹੀਨੇ ਦਾ ਪਲਾਨ · ਨਿਤਿਨ ਕੇ.')}</H2><Tag>{clockTime(t, 8)}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{t('Mon to Sat · General cleaning · 1 hr', 'सोम से शनि · सामान्य सफ़ाई · 1 घंटा', 'ਸੋਮ ਤੋਂ ਸ਼ਨੀ · ਆਮ ਸਫ਼ਾਈ · 1 ਘੰਟਾ')}</T>
        </Card>
        <Card onPress={() => nav.toast(t('Kitchen & bath scrub on Tuesday at 2 pm, Block A', 'रसोई और बाथरूम, मंगलवार दोपहर 2 बजे, ब्लॉक ए', 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ, ਮੰਗਲਵਾਰ ਦੁਪਹਿਰ 2 ਵਜੇ, ਬਲਾਕ ਏ'))}>
          <Row><H2 style={styles.shrink}>{t('Kitchen & bath scrub', 'रसोई और बाथरूम', 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ')}</H2><Tag>{t('Tue 2 pm', 'मंगल दोपहर 2', 'ਮੰਗਲ ਦੁਪਹਿਰ 2')}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{t('Block A · 2 hr', 'ब्लॉक ए · 2 घंटे', 'ਬਲਾਕ ਏ · 2 ਘੰਟੇ')}</T>
        </Card>
      </Screen>
      <PartnerTabs active="jobs" />
    </Page>
  );
}

export default HoursScreen;

const styles = StyleSheet.create({
  days: { flexDirection: 'row', gap: 5 },
  fill: { flex: 1 },
  shrink: { flexShrink: 1 },
});
