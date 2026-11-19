/** Design page 37 · Saathi Care — screen 37.4 · Nurse care: by the hour (2–8 h) or by the day (7, 15 or 30 days). */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Check, Grid, H2, Hr, KeyValue, Lft, Pill, Screen, Spacer, Steps, T, useNav, useT, useTheme } from '@/native/ui';
import { NURSE_DAYS_OPTIONS, NURSE_MIN_DAYS, nurseDaily, nurseHourly, rupees } from '@/domain';
import { useCareDraft } from '../state';
import { ChoiceCard } from '../components/ChoiceCard';
import { NURSE_TASKS } from '../data';
import { careBill, stepOf } from '../rules';

export function NurseScreen() {
  const nav = useNav();
  const t = useT();
  const { device } = useTheme();
  const { draft: raw, setDraft } = useCareDraft();
  const draft = { ...raw, kind: 'nurse' as const };
  const bill = careBill(draft);
  const daily = draft.nurseMode === 'daily';
  const shift = nurseDaily.find((s) => s.id === draft.shift) ?? nurseDaily[0];
  const set = (patch: Partial<typeof draft>) => setDraft({ ...patch, kind: 'nurse' });
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Nurse care at home', 'घर पर नर्स देखभाल', 'ਘਰ ਤੇ ਨਰਸ ਦੇਖਭਾਲ')} fallback="care.home" />
        <Steps {...stepOf(draft, 'care.nurse')} label={t('How long do you need a nurse?', 'नर्स कितने समय के लिए चाहिए?', 'ਨਰਸ ਕਿੰਨੇ ਸਮੇਂ ਲਈ ਚਾਹੀਦੀ ਹੈ?')} />
        <Grid cols={2}>
          <Pill sel={!daily} onPress={() => set({ nurseMode: 'hourly' })}>{t('By the hour', 'घंटे के हिसाब से', 'ਘੰਟੇ ਦੇ ਹਿਸਾਬ ਨਾਲ')}</Pill>
          <Pill sel={daily} onPress={() => set({ nurseMode: 'daily' })}>{t('By the day', 'दिन के हिसाब से', 'ਦਿਨ ਦੇ ਹਿਸਾਬ ਨਾਲ')}</Pill>
        </Grid>
        {!daily ? <>
          <T s m>{t('One visit, for a few hours: after a hospital stay, while the family is out.', 'कुछ घंटों की एक विज़िट: अस्पताल से लौटने के बाद, या जब घर पर कोई न हो।', 'ਕੁਝ ਘੰਟਿਆਂ ਦੀ ਇੱਕ ਵਿਜ਼ਿਟ: ਹਸਪਤਾਲ ਤੋਂ ਆਉਣ ਤੋਂ ਬਾਅਦ, ਜਾਂ ਜਦੋਂ ਘਰ ਕੋਈ ਨਾ ਹੋਵੇ।')}</T>
          <Grid cols={device === 'small' ? 1 : 2}>
            {nurseHourly.map((h) => (
              <Card key={h.hours} sel={draft.hours === h.hours} onPress={() => set({ hours: h.hours })} style={styles.centre} accessibilityLabel={`${h.hours}`}>
                <H2>{t(`${h.hours} hours`, `${h.hours} घंटे`, `${h.hours} ਘੰਟੇ`)}</H2>
                <T s m>{rupees(h.price)}</T>
              </Card>
            ))}
          </Grid>
        </> : <>
          {nurseDaily.map((s) => (
            <ChoiceCard key={s.id} selected={draft.shift === s.id} onPress={() => set({ shift: s.id })} title={t(...s.name)} sub={t(...s.sub)}
              price={rupees(s.perDay)} priceSub={t('a day', 'प्रति दिन', 'ਪ੍ਰਤੀ ਦਿਨ')} />
          ))}
          <H2>{t('For how many days?', 'कितने दिन?', 'ਕਿੰਨੇ ਦਿਨ?')}</H2>
          <Grid cols={3}>
            {NURSE_DAYS_OPTIONS.map((d) => (
              <Pill key={d} sel={draft.days === d} onPress={() => set({ days: d })}>{t(`${d} days`, `${d} दिन`, `${d} ਦਿਨ`)}</Pill>
            ))}
          </Grid>
          <T s m>{t(`At least ${NURSE_MIN_DAYS} days. The same nurse every day, and a trained stand-in on days off.`, `कम से कम ${NURSE_MIN_DAYS} दिन। हर दिन वही नर्स, छुट्टी के दिन ट्रेनिंग वाली दूसरी नर्स।`, `ਘੱਟੋ-ਘੱਟ ${NURSE_MIN_DAYS} ਦਿਨ। ਹਰ ਦਿਨ ਉਹੀ ਨਰਸ, ਛੁੱਟੀ ਵਾਲੇ ਦਿਨ ਟ੍ਰੇਨਿੰਗ ਵਾਲੀ ਦੂਜੀ ਨਰਸ।`)}</T>
        </>}
        <Card style={styles.gap}>
          <H2>{t('What the nurse does', 'नर्स क्या करती है', 'ਨਰਸ ਕੀ ਕਰਦੀ ਹੈ')}</H2>
          {NURSE_TASKS.map((w) => <Lft key={w[0]} style={styles.top}><Check on size={16} /><T s style={styles.grow}>{t(...w)}</T></Lft>)}
        </Card>
        <Card style={styles.gap}>
          {daily
            ? <KeyValue label={t(`${t(...shift.name)} · ${draft.days} days × ${rupees(shift.perDay)}`, `${t(...shift.name)} · ${draft.days} दिन × ${rupees(shift.perDay)}`, `${t(...shift.name)} · ${draft.days} ਦਿਨ × ${rupees(shift.perDay)}`)} value={rupees(bill.total)} />
            : <KeyValue label={t(`Nurse visit, ${draft.hours} hours`, `नर्स विज़िट, ${draft.hours} घंटे`, `ਨਰਸ ਵਿਜ਼ਿਟ, ${draft.hours} ਘੰਟੇ`)} value={rupees(bill.total)} />}
          <Hr />
          <KeyValue variant="total" label={t('Total', 'कुल', 'ਕੁੱਲ')} value={rupees(bill.total)} />
        </Card>
        <Spacer />
        <Button onPress={() => { set({}); nav.push('care.patient'); }}>{t(`Continue · ${rupees(bill.total)}`, `आगे बढ़ें · ${rupees(bill.total)}`, `ਅੱਗੇ ਵਧੋ · ${rupees(bill.total)}`)}</Button>
      </Screen>
    </View>
  );
}

export default NurseScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, centre: { alignItems: 'center' }, gap: { gap: 8 }, top: { alignItems: 'flex-start' }, grow: { flex: 1 } });
