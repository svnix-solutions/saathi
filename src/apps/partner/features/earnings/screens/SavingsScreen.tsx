import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Col, Grid, H2, Page, Pill, ProgressBar, Row, Screen, Sheet, Spacer, T, Toggle, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { rupees, weekAhead } from '@/domain';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { dateHi, datePa, perPayoutChoices, savingsGoal, savingsRecent, savingsStart, savingsTakenOut, tipsPerWeek, tx, type SavingsLine } from '../data';

/** Design page 32 · screen 58: savings pot towards a goal, filled from payouts and tips. */
export function SavingsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const goal = savingsGoal;
  const [bal, setBal] = useState(savingsStart);
  const [fromPayout, setFromPayout] = useState(true);
  const [perPayout, setPerPayout] = useState(200);
  const [tips, setTips] = useState(true);
  const [recent, setRecent] = useState<SavingsLine[]>(savingsRecent);
  const [out, setOut] = useState(false);
  const [outAmt, setOutAmt] = useState(1000);
  const weekly = (fromPayout ? perPayout : 0) + (tips ? tipsPerWeek : 0);
  const left = Math.max(0, goal - bal);
  const takeOut = () => {
    const a = Math.min(outAmt, bal);
    setBal(bal - a);
    setRecent((r) => [{ label: savingsTakenOut, amt: -a }, ...r]);
    setOut(false);
    nav.toast(t(`${rupees(a)} sent to your bank`, `${rupees(a)} आपके बैंक में भेजे`, `${rupees(a)} ਤੁਹਾਡੇ ਬੈਂਕ ਵਿੱਚ ਭੇਜੇ`));
  };
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Text dim>{t('My savings pot', 'मेरी बचत', 'ਮੇਰੀ ਬੱਚਤ')}</TopBar.Text>
        <TopBar.Title size={30}>{rupees(bal)}</TopBar.Title>
        <TopBar.Text dim>{t(`For: daughter's school fees · ${rupees(goal)}`, `बेटी की स्कूल फ़ीस के लिए · ${rupees(goal)}`, `ਧੀ ਦੀ ਸਕੂਲ ਫ਼ੀਸ ਲਈ · ${rupees(goal)}`)}</TopBar.Text>
        <ProgressBar value={bal / goal} style={{ marginTop: 10 }} />
      </TopBar>
      <Screen>
        <Card>
          <Row>
            <View style={styles.grow}><H2>{t('Save from every payout', 'हर भुगतान से बचाएँ', 'ਹਰ ਭੁਗਤਾਨ ਤੋਂ ਬਚਾਓ')}</H2><T s m>{fromPayout ? t(`₹${perPayout} each Monday`, `हर सोमवार ₹${perPayout}`, `ਹਰ ਸੋਮਵਾਰ ₹${perPayout}`) : t('Off', 'बंद', 'ਬੰਦ')}</T></View>
            <Toggle on={fromPayout} onChange={setFromPayout} />
          </Row>
          {fromPayout && (
            <Grid cols={4} gap={6} style={{ marginTop: 9 }}>
              {perPayoutChoices.map((a) => <Pill key={a} s sel={perPayout === a} onPress={() => setPerPayout(a)}>₹{a}</Pill>)}
            </Grid>
          )}
        </Card>
        <Card row>
          <View style={styles.grow}><H2>{t('Save my tips', 'मेरी टिप बचाएँ', 'ਮੇਰੀ ਟਿੱਪ ਬਚਾਓ')}</H2><T s m>{t(`About ₹${tipsPerWeek} a week`, `हफ़्ते में लगभग ₹${tipsPerWeek}`, `ਹਫ਼ਤੇ ਵਿੱਚ ਲਗਭਗ ₹${tipsPerWeek}`)}</T></View>
          <Toggle on={tips} onChange={setTips} />
        </Card>
        <Card sel={weekly > 0} tone={weekly > 0 ? undefined : 'red'}>
          {left === 0 ? <H2>{t('Goal reached · well done!', 'लक्ष्य पूरा · शाबाश!', 'ਟੀਚਾ ਪੂਰਾ · ਸ਼ਾਬਾਸ਼!')}</H2>
            : weekly > 0 ? <><H2>{t(`You will reach ${rupees(goal)} by ${weekAhead(left / weekly)}`, `${dateHi(weekAhead(left / weekly))} तक ${rupees(goal)} हो जाएँगे`, `${datePa(weekAhead(left / weekly))} ਤੱਕ ${rupees(goal)} ਹੋ ਜਾਣਗੇ`)}</H2><T s m>{t(`At ₹${weekly} a week`, `हफ़्ते में ₹${weekly} से`, `ਹਫ਼ਤੇ ਵਿੱਚ ₹${weekly} ਨਾਲ`)}</T></>
            : <><H2>{t('Saving is off', 'बचत बंद है', 'ਬੱਚਤ ਬੰਦ ਹੈ')}</H2><T s m>{t('Turn on a saving above to reach your goal.', 'लक्ष्य तक पहुँचने के लिए ऊपर बचत चालू करें।', 'ਟੀਚੇ ਤੱਕ ਪਹੁੰਚਣ ਲਈ ਉੱਤੇ ਬੱਚਤ ਚਾਲੂ ਕਰੋ।')}</T></>}
        </Card>
        <H2>{t('Recent', 'हाल में', 'ਹਾਲ ਵਿੱਚ')}</H2>
        <Card style={styles.list}>
          {recent.map((r, i) => (
            <Row key={i}><T m style={styles.grow}>{tx(t, r.label)}</T><T b color={r.amt > 0 ? c.accent : c.red}>{r.amt > 0 ? '+' : '−'} {rupees(Math.abs(r.amt))}</T></Row>
          ))}
        </Card>
        <Spacer />
        <Button variant="outline" disabled={bal === 0} onPress={() => setOut(true)}>{t('Take money out', 'पैसे निकालें', 'ਪੈਸੇ ਕੱਢੋ')}</Button>
      </Screen>
      <PartnerTabs active="earnings" />
      <Sheet visible={out} onClose={() => setOut(false)}>
        <H2>{t('Take money out', 'पैसे निकालें', 'ਪੈਸੇ ਕੱਢੋ')}</H2>
        <Grid cols={3}>
          {[1000, 2000, bal].map((a, i) => <Pill key={i} sel={outAmt === a} onPress={() => setOutAmt(a)}>{i === 2 ? t('All', 'सब', 'ਸਾਰੇ') : rupees(a)}</Pill>)}
        </Grid>
        <Col gap={2}>
          <T s m>{t('Reaches State Bank ···· 4821 in a few minutes. No charge.', 'कुछ मिनट में स्टेट बैंक ···· 4821 में। कोई चार्ज नहीं।', 'ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ ਸਟੇਟ ਬੈਂਕ ···· 4821 ਵਿੱਚ। ਕੋਈ ਚਾਰਜ ਨਹੀਂ।')}</T>
          <T s m>{t('Held by our licensed bank partner.', 'पैसे हमारे लाइसेंस वाले बैंक पार्टनर के पास रहते हैं।', 'ਪੈਸੇ ਸਾਡੇ ਲਾਇਸੈਂਸ ਵਾਲੇ ਬੈਂਕ ਪਾਰਟਨਰ ਕੋਲ ਰਹਿੰਦੇ ਹਨ।')}</T>
        </Col>
        <Button disabled={outAmt > bal} onPress={takeOut}>{t('Take out', 'निकालें', 'ਕੱਢੋ')} {rupees(Math.min(outAmt, bal))}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  list: { gap: 8 },
});

export default SavingsScreen;
