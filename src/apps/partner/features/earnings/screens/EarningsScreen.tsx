import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H2, Page, Row, Screen, Sheet, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { defaultToday, usePartnerState, type PayLine } from '../../../state';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { DayBars } from '../components/DayBars';
import { TODAY_INDEX, dayNames, weekDayTotals } from '../data';

/** Design page 20 · screen 12: this week's earnings, daily bars and today's lines. */
export function EarningsScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = usePartnerState();
  const week = st.week ?? 2846;
  const today = st.today ?? defaultToday;
  const days = weekDayTotals(st.earnedToday ?? 412);
  const [sel, setSel] = useState(TODAY_INDEX);
  const [line, setLine] = useState<PayLine | null>(null);
  const dayName = (i: number) => t(dayNames[i][0], dayNames[i][1]);
  return (
    <Page>
      <TopBar>
        <TopBar.Text dim>{t('This week', 'इस हफ़्ते')}</TopBar.Text>
        <TopBar.Title size={30}>{rupees(week)}</TopBar.Title>
        <TopBar.Text dim>{t(`${st.weekJobs ?? 19} jobs · paid every ${decisions.partner.payoutDay}`, `${st.weekJobs ?? 19} काम · हर सोमवार भुगतान`)}</TopBar.Text>
      </TopBar>
      <Screen>
        <Card>
          <DayBars values={days} selected={sel} onSelect={setSel} />
          <T s m center style={{ marginTop: 8 }}>{dayName(sel)} · {rupees(days[sel])}</T>
        </Card>
        <H2>{sel === TODAY_INDEX ? t('Today', 'आज') : dayName(sel)}</H2>
        {(sel === TODAY_INDEX ? today : today.slice(0, 2)).map((l, i) => (
          <Card key={i} row onPress={() => setLine(l)}>
            <View><H2>{t(l.title, l.titleHi)}</H2><T s m>{l.sub}</T></View>
            <H2 color={l.tip ? c.accent : undefined}>{l.tip ? `+ ${rupees(l.amt)}` : rupees(l.amt)}</H2>
          </Card>
        ))}
        <Card tone="clear" row onPress={() => nav.push('bank')}>
          <T s m style={styles.grow}>{t('Paid to State Bank ···· 4821 every Monday', 'हर सोमवार स्टेट बैंक ···· 4821 में')}</T>
          <T s b color={c.accent}>{t('Change', 'बदलें')}</T>
        </Card>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={!!line} onClose={() => setLine(null)}>
        {line && <>
          <Row><H2>{t(line.title, line.titleHi)}</H2><H2>{rupees(line.amt)}</H2></Row>
          <T s m>{line.sub}</T>
          {!line.tip && <Card style={styles.split}>
            <Row><T>{t('Customer paid', 'ग्राहक ने दिया')}</T><T>{rupees(Math.round(line.amt / decisions.partner.share))}</T></Row>
            <Row><T>{t('Your share (80%)', 'आपका हिस्सा (80%)')}</T><T b>{rupees(line.amt)}</T></Row>
          </Card>}
          <T s m>{t('Goes into Monday’s payout.', 'सोमवार के भुगतान में जुड़ेगा।')}</T>
          <Button size="tall" onPress={() => setLine(null)}>{t('OK', 'ठीक है')}</Button>
        </>}
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  split: { gap: 8 },
});

export default EarningsScreen;
