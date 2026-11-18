import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, H2, IconTile, Lft, Link, Page, Screen, Sheet, T, Tag, TopBar, useNav, useT, useTheme, type IconName } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { usePartnerState } from '../../../state';

type WayToEarn = { icon: IconName; title: string; hi: string; pa: string; sub: string; tag?: React.ReactNode; go: () => void };

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
    { icon: 'bolt', title: 'Busy hours', hi: 'व्यस्त घंटे', pa: 'ਰੁੱਝੇ ਘੰਟੇ',
      sub: t(`7 to 10 am · ${rupees(decisions.partner.busyHourExtra)} extra per job`, `सुबह 7 से 10 · हर काम पर ${rupees(decisions.partner.busyHourExtra)} ज़्यादा`, `ਸਵੇਰੇ 7 ਤੋਂ 10 · ਹਰ ਕੰਮ ਤੇ ${rupees(decisions.partner.busyHourExtra)} ਵੱਧ`),
      tag: <Tag>{t('Live now', 'अभी चालू', 'ਹੁਣ ਚਾਲੂ')}</Tag>, go: () => nav.push('demandMap') },
    { icon: 'star', title: `Keep ${topRated.rating} or above`, hi: `${topRated.rating} या ऊपर रखें`, pa: `${topRated.rating} ਜਾਂ ਉੱਤੇ ਰੱਖੋ`,
      sub: t(`${rupees(200)} at month end`, `महीने के आख़िर में ${rupees(200)}`, `ਮਹੀਨੇ ਦੇ ਅਖ਼ੀਰ ਵਿੱਚ ${rupees(200)}`),
      tag: <Tag tone="n">{t('On track', 'सही राह पर', 'ਸਹੀ ਰਾਹ ਤੇ')}</Tag>, go: () => nav.push('quality') },
    { icon: 'user', title: 'Bring a friend to work', hi: 'दोस्त को जोड़ें', pa: 'ਸਹੇਲੀ ਨੂੰ ਜੋੜੋ',
      sub: t(`${rupees(referralBonus.rupees)} after their ${referralBonus.afterJobs}th job`, `उनके ${referralBonus.afterJobs}वें काम के बाद ${rupees(referralBonus.rupees)}`, `ਉਨ੍ਹਾਂ ਦੇ ${referralBonus.afterJobs}ਵੇਂ ਕੰਮ ਤੋਂ ਬਾਅਦ ${rupees(referralBonus.rupees)}`),
      go: () => setFriend(true) },
    { icon: 'drop', title: 'Learn deep cleaning', hi: 'डीप क्लीनिंग सीखें', pa: 'ਡੀਪ ਕਲੀਨਿੰਗ ਸਿੱਖੋ',
      sub: t(`Unlocks ${rupees(decisions.prices.kitchenBath)} jobs`, `${rupees(decisions.prices.kitchenBath)} वाले काम खुलेंगे`, `${rupees(decisions.prices.kitchenBath)} ਵਾਲੇ ਕੰਮ ਖੁੱਲ੍ਹਣਗੇ`),
      tag: <T s b color={c.accent}>{t('Start', 'शुरू', 'ਸ਼ੁਰੂ')}</T>, go: () => nav.push('training') },
  ];
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Label>{t("This week's bonus", 'इस हफ़्ते का बोनस', 'ਇਸ ਹਫ਼ਤੇ ਦਾ ਬੋਨਸ')}</TopBar.Label>
        <TopBar.Title>{t(`Do ${target} jobs, earn ${rupees(bonus)} extra`, `${target} काम करें, ${rupees(bonus)} ज़्यादा कमाएँ`, `${target} ਕੰਮ ਕਰੋ, ${rupees(bonus)} ਵੱਧ ਕਮਾਓ`)}</TopBar.Title>
        <TopBar.Progress value={done / target} />
        <TopBar.Text dim style={{ marginTop: 4 }}>
          {left > 0
            ? t(`${done} of ${target} done · ${left} to go by Sunday`, `${target} में से ${done} हुए · रविवार तक ${left} बाकी`, `${target} ਵਿੱਚੋਂ ${done} ਹੋਏ · ਐਤਵਾਰ ਤੱਕ ${left} ਬਾਕੀ`)
            : t(`Done! ${rupees(bonus)} comes with Monday's payout`, `हो गया! ${rupees(bonus)} सोमवार के भुगतान के साथ आएगा`, `ਹੋ ਗਿਆ! ${rupees(bonus)} ਸੋਮਵਾਰ ਦੇ ਭੁਗਤਾਨ ਨਾਲ ਆਵੇਗਾ`)}
        </TopBar.Text>
      </TopBar>
      <Screen>
        <H2>{t('More ways to earn', 'कमाने के और तरीके', 'ਕਮਾਉਣ ਦੇ ਹੋਰ ਤਰੀਕੇ')}</H2>
        {rows.map((r) => (
          <Card key={r.title} row onPress={r.go}>
            <Lft style={styles.grow}>
              <IconTile name={r.icon} />
              <View style={styles.grow}><H2>{t(r.title, r.hi, r.pa)}</H2><T s m>{r.sub}</T></View>
            </Lft>
            {r.tag}
          </Card>
        ))}
      </Screen>
      <Sheet visible={friend} onClose={() => setFriend(false)}>
        <H2>{t('Bring a friend to work', 'दोस्त को जोड़ें', 'ਸਹੇਲੀ ਨੂੰ ਜੋੜੋ')}</H2>
        <T s m>{t(`Your friend signs up with your code. You get ${rupees(referralBonus.rupees)} after their ${referralBonus.afterJobs}th job.`, `आपकी दोस्त आपके कोड से जुड़े। उनके ${referralBonus.afterJobs}वें काम के बाद आपको ${rupees(referralBonus.rupees)} मिलेंगे।`, `ਤੁਹਾਡੀ ਸਹੇਲੀ ਤੁਹਾਡੇ ਕੋਡ ਨਾਲ ਜੁੜੇ। ਉਨ੍ਹਾਂ ਦੇ ${referralBonus.afterJobs}ਵੇਂ ਕੰਮ ਤੋਂ ਬਾਅਦ ਤੁਹਾਨੂੰ ${rupees(referralBonus.rupees)} ਮਿਲਣਗੇ।`)}</T>
        <Card tone="mint" row><T b size={18} style={styles.code}>SUNITA500</T><Link onPress={() => nav.toast(t('Code copied', 'कोड कॉपी हुआ', 'ਕੋਡ ਕਾਪੀ ਹੋਇਆ'))}>{t('Copy', 'कॉपी', 'ਕਾਪੀ')}</Link></Card>
        <Button onPress={() => { setFriend(false); nav.toast(t('Opening WhatsApp…', 'WhatsApp खुल रहा है…', 'WhatsApp ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ…')); }}>{t('Share on WhatsApp', 'व्हाट्सऐप पर भेजें', 'WhatsApp ਤੇ ਭੇਜੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  code: { letterSpacing: 2 },
});

export default BonusesScreen;
