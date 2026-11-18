import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H2, IconTile, Lft, Link, Page, Screen, Sheet, T, Tag, TopBar, useNav, useT, useTheme, type IconName } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { usePartnerState } from '../../../state';

type WayToEarn = { icon: IconName; title: string; hi: string; sub: string; tag?: React.ReactNode; go: () => void };

/** Design page 27 · screen 38: this week's job bonus and more ways to earn. */
export function BonusesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = usePartnerState();
  const { rupees: bonus, jobs: target } = decisions.partner.weeklyBonus;
  const done = st.weekJobs ?? 19;
  const left = Math.max(0, target - done);
  const [friend, setFriend] = useState(false);
  const { topRated } = decisions.quality;
  const { referralBonus } = decisions.partner;
  const rows: WayToEarn[] = [
    { icon: 'bolt', title: 'Busy hours', hi: 'व्यस्त घंटे', sub: `7 to 10 am · ${rupees(decisions.partner.busyHourExtra)} extra per job`, tag: <Tag>{t('Live now', 'अभी चालू')}</Tag>, go: () => nav.push('demandMap') },
    { icon: 'star', title: `Keep ${topRated.rating} or above`, hi: `${topRated.rating} या ऊपर रखें`, sub: `${rupees(200)} at month end`, tag: <Tag tone="n">{t('On track', 'सही राह पर')}</Tag>, go: () => nav.push('quality') },
    { icon: 'user', title: 'Bring a friend to work', hi: 'दोस्त को जोड़ें', sub: `${rupees(referralBonus.rupees)} after their ${referralBonus.afterJobs}th job`, go: () => setFriend(true) },
    { icon: 'drop', title: 'Learn deep cleaning', hi: 'डीप क्लीनिंग सीखें', sub: `Unlocks ${rupees(decisions.prices.kitchenBath)} jobs`, tag: <T s b color={c.accent}>{t('Start', 'शुरू')}</T>, go: () => nav.push('training') },
  ];
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t("This week's bonus", 'इस हफ़्ते का बोनस')}</TopBar.Label>
        <TopBar.Title>{t(`Do ${target} jobs, earn ${rupees(bonus)} extra`, `${target} काम करें, ${rupees(bonus)} ज़्यादा कमाएँ`)}</TopBar.Title>
        <TopBar.Progress value={done / target} />
        <TopBar.Text dim style={{ marginTop: 4 }}>
          {left > 0 ? `${done} of ${target} done · ${left} to go by Sunday` : `Done! ${rupees(bonus)} comes with Monday's payout`}
        </TopBar.Text>
      </TopBar>
      <Screen>
        <H2>{t('More ways to earn', 'कमाने के और तरीके')}</H2>
        {rows.map((r) => (
          <Card key={r.title} row onPress={r.go}>
            <Lft style={styles.grow}>
              <IconTile name={r.icon} />
              <View style={styles.grow}><H2>{t(r.title, r.hi)}</H2><T s m>{r.sub}</T></View>
            </Lft>
            {r.tag}
          </Card>
        ))}
      </Screen>
      <Sheet visible={friend} onClose={() => setFriend(false)}>
        <H2>{t('Bring a friend to work', 'दोस्त को जोड़ें')}</H2>
        <T s m>Your friend signs up with your code. You get {rupees(referralBonus.rupees)} after their {referralBonus.afterJobs}th job.</T>
        <Card tone="mint" row><T b size={18} style={styles.code}>SUNITA500</T><Link onPress={() => nav.toast('Code copied')}>Copy</Link></Card>
        <Button onPress={() => { setFriend(false); nav.toast('Opening WhatsApp…'); }}>{t('Share on WhatsApp', 'व्हाट्सऐप पर भेजें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  code: { letterSpacing: 2 },
});

export default BonusesScreen;
