import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Grid, H2, Icon, Lft, Page, Pill, Screen, Sheet, Spacer, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';
import { AmountLine } from '../components/AmountLine';
import { advanceAmounts, advanceWeeks } from '../data';

/** Design page 31 · screen 52: take up to ₹3,000 ahead, paid back from Monday payouts with no interest. */
export function AdvanceScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [amt, setAmt] = useState(2000);
  const [weeks, setWeeks] = useState(4);
  const [sheet, setSheet] = useState(false);
  const [taken, setTaken] = useState(false);
  const each = Math.round(amt / weeks);
  return (
    <Page variant="bare">
      <TopBar>
        <TopBar.Text dim>{t('You can take ahead', 'आप पहले ले सकती हैं', 'ਤੁਸੀਂ ਪਹਿਲਾਂ ਲੈ ਸਕਦੇ ਹੋ')}</TopBar.Text>
        <TopBar.Title size={30}>{t('up to ₹3,000', '₹3,000 तक', '₹3,000 ਤੱਕ')}</TopBar.Title>
        <TopBar.Text dim>{t('Based on 6 weeks of steady work', '6 हफ़्ते के लगातार काम के आधार पर', '6 ਹਫ਼ਤਿਆਂ ਦੇ ਲਗਾਤਾਰ ਕੰਮ ਦੇ ਆਧਾਰ ਤੇ')}</TopBar.Text>
      </TopBar>
      <Screen>
        {taken ? (
          <Card tone="mint">
            <Lft><Icon name="check" color={c.accent} /><H2 style={styles.grow}>{t(`${rupees(amt)} sent to State Bank ···· 4821`, `${rupees(amt)} स्टेट बैंक ···· 4821 में भेजे`, `${rupees(amt)} ਸਟੇਟ ਬੈਂਕ ···· 4821 ਵਿੱਚ ਭੇਜੇ`)}</H2></Lft>
            <T s m style={{ marginTop: 4 }}>{t(`${rupees(each)} will be taken each ${decisions.partner.payoutDay} for ${weeks} weeks.`, `${weeks} हफ़्ते तक हर सोमवार ${rupees(each)} कटेंगे।`, `${weeks} ਹਫ਼ਤਿਆਂ ਤੱਕ ਹਰ ਸੋਮਵਾਰ ${rupees(each)} ਕੱਟੇ ਜਾਣਗੇ।`)}</T>
          </Card>
        ) : null}
        <H2>{t('How much do you need?', 'कितने पैसे चाहिए?', 'ਕਿੰਨੇ ਪੈਸੇ ਚਾਹੀਦੇ ਹਨ?')}</H2>
        <Grid cols={3}>
          {advanceAmounts.map((a) => <Pill key={a} sel={amt === a} onPress={() => setAmt(a)}>{rupees(a)}</Pill>)}
        </Grid>
        <H2>{t('Pay back from earnings', 'कमाई से वापस', 'ਕਮਾਈ ਵਿੱਚੋਂ ਵਾਪਸ')}</H2>
        <Grid cols={2}>
          {advanceWeeks.map((w) => <Pill key={w} sel={weeks === w} onPress={() => setWeeks(w)}>{t(`${w} weeks`, `${w} हफ़्ते`, `${w} ਹਫ਼ਤੇ`)}</Pill>)}
        </Grid>
        <Card style={styles.summary}>
          <AmountLine label={t('You get today', 'आज मिलेंगे', 'ਅੱਜ ਮਿਲਣਗੇ')} value={rupees(amt)} />
          <AmountLine label={t('Taken each Monday', 'हर सोमवार कटेंगे', 'ਹਰ ਸੋਮਵਾਰ ਕੱਟੇ ਜਾਣਗੇ')} value={rupees(each)} />
          <AmountLine label={t('Extra charge', 'अलग से चार्ज', 'ਵੱਖਰਾ ਚਾਰਜ')} value="₹0" accent />
        </Card>
        <T s m>{t('No interest. If you earn less in a week, we take less that week.', 'कोई ब्याज नहीं। किसी हफ़्ते कम कमाई हो, तो उस हफ़्ते कम कटेगा।', 'ਕੋਈ ਵਿਆਜ ਨਹੀਂ। ਕਿਸੇ ਹਫ਼ਤੇ ਘੱਟ ਕਮਾਈ ਹੋਵੇ, ਤਾਂ ਉਸ ਹਫ਼ਤੇ ਘੱਟ ਕੱਟੇਗਾ।')}</T>
        <Spacer />
        <Button disabled={taken} style={{ paddingVertical: 16 }} textStyle={styles.bigLabel} onPress={() => setSheet(true)}>
          {taken ? t('Advance taken', 'एडवांस ले लिया', 'ਐਡਵਾਂਸ ਲੈ ਲਿਆ') : t(`Get ${rupees(amt)} now`, `अभी ${rupees(amt)} लें`, `ਹੁਣੇ ${rupees(amt)} ਲਓ`)}
        </Button>
      </Screen>
      <Sheet visible={sheet} onClose={() => setSheet(false)}>
        <H2>{t('Confirm your advance', 'एडवांस पक्का करें', 'ਐਡਵਾਂਸ ਪੱਕਾ ਕਰੋ')}</H2>
        <Card style={styles.summary}>
          <AmountLine label={t('Sent now to', 'अभी भेजे जाएँगे', 'ਹੁਣੇ ਭੇਜੇ ਜਾਣਗੇ')} value={t('State Bank ···· 4821', 'स्टेट बैंक ···· 4821', 'ਸਟੇਟ ਬੈਂਕ ···· 4821')} />
          <AmountLine label={t('Amount', 'रकम', 'ਰਕਮ')} value={rupees(amt)} />
          <AmountLine label={t('Paid back', 'वापसी', 'ਵਾਪਸੀ')} value={t(`${rupees(each)} × ${weeks} Mondays`, `${rupees(each)} × ${weeks} सोमवार`, `${rupees(each)} × ${weeks} ਸੋਮਵਾਰ`)} />
          <AmountLine label={t('Interest', 'ब्याज', 'ਵਿਆਜ')} value="₹0" accent />
        </Card>
        <Lft style={styles.top}><Icon name="shield" size={14} color={c.mut} /><T s m style={styles.grow}>{t('Advances are given by our licensed bank partner. Saathi takes the repayment from your payout.', 'एडवांस हमारा लाइसेंस वाला बैंक पार्टनर देता है। Saathi वापसी आपके भुगतान से काटता है।', 'ਐਡਵਾਂਸ ਸਾਡਾ ਲਾਇਸੈਂਸ ਵਾਲਾ ਬੈਂਕ ਪਾਰਟਨਰ ਦਿੰਦਾ ਹੈ। Saathi ਵਾਪਸੀ ਤੁਹਾਡੇ ਭੁਗਤਾਨ ਵਿੱਚੋਂ ਕੱਟਦਾ ਹੈ।')}</T></Lft>
        <Button onPress={() => { setSheet(false); setTaken(true); nav.toast(t(`${rupees(amt)} is on its way to your bank`, `${rupees(amt)} आपके बैंक में भेजे जा रहे हैं`, `${rupees(amt)} ਤੁਹਾਡੇ ਬੈਂਕ ਵਿੱਚ ਭੇਜੇ ਜਾ ਰਹੇ ਹਨ`)); }}>{t('Confirm', 'पक्का करें', 'ਪੱਕਾ ਕਰੋ')} · {rupees(amt)}</Button>
        <Button variant="outline" onPress={() => setSheet(false)}>{t('Not now', 'अभी नहीं', 'ਹੁਣੇ ਨਹੀਂ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  summary: { gap: 7 },
  bigLabel: { fontSize: 15 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});

export default AdvanceScreen;
