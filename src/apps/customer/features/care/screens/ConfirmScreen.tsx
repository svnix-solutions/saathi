/** Design page 37 · Saathi Care — screen 37.9 · Confirm and pay: what, who, when, who comes, price, reschedule rule. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, CharacterTile, Grid, H2, Hr, Icon, KeyValue, Lft, Link, Pill, Screen, Spacer, Steps, T, useNav, useT, useTheme,
} from '@/native/ui';
import { CARE_RESCHEDULE_HOURS, PHYSIO_SESSION_PRICE, clockTime, relations, rupees } from '@/domain';
import { useCareDraft } from '../state';
import { CARE_STAFF, dateLabel, FAMILY_DOCTOR } from '../data';
import { careBill, draftSub, draftTitle, needsRx, planFromDraft, SAMPLE_PATIENT, stepOf, visitCount, visitDates } from '../rules';

export function ConfirmScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { st, set, draft } = useCareDraft();
  const [pay, setPay] = useState<'upi' | 'card'>('upi');
  const patient = draft.patient ?? SAMPLE_PATIENT;
  const rel = relations.find((r) => r.id === patient.relation) ?? relations[1];
  const bill = careBill(draft);
  const n = visitCount(draft);
  const dates = visitDates(draft);
  const rx = needsRx(draft);
  const physio = draft.kind === 'physio';
  const when = clockTime(t, draft.hour);
  const pro = physio
    ? t('Licensed physiotherapist, Saathi staff', 'लाइसेंस वाले फ़िज़ियोथेरेपिस्ट, Saathi स्टाफ़', 'ਲਾਇਸੈਂਸ ਵਾਲੇ ਫ਼ਿਜ਼ੀਓਥੈਰੇਪਿਸਟ, Saathi ਸਟਾਫ਼')
    : t('Licensed nurse, Saathi staff', 'लाइसेंस वाली नर्स, Saathi स्टाफ़', 'ਲਾਇਸੈਂਸ ਵਾਲੀ ਨਰਸ, Saathi ਸਟਾਫ਼');
  const book = () => {
    set({ carePlan: planFromDraft(draft, draft.rxDoctor || FAMILY_DOCTOR), careDraft: { ...st.careDraft, patient } });
    nav.reset('care.plan');
    nav.toast(rx
      ? t('Paid. A Saathi doctor is checking the prescription.', 'भुगतान हो गया। Saathi डॉक्टर पर्ची जाँच रहे हैं।', 'ਭੁਗਤਾਨ ਹੋ ਗਿਆ। Saathi ਡਾਕਟਰ ਪਰਚੀ ਜਾਂਚ ਰਹੇ ਹਨ।')
      : t(`Booked. ${n} visits are on your plan.`, `बुक हो गया। ${n} विज़िट आपके प्लान में हैं।`, `ਬੁੱਕ ਹੋ ਗਿਆ। ${n} ਵਿਜ਼ਿਟਾਂ ਤੁਹਾਡੇ ਪਲਾਨ ਵਿੱਚ ਹਨ।`));
  };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Confirm and pay', 'पक्का करें और भुगतान करें', 'ਪੱਕਾ ਕਰੋ ਅਤੇ ਭੁਗਤਾਨ ਕਰੋ')} fallback="care.home" />
        <Steps {...stepOf(draft, 'care.confirm')} />
        <Card style={styles.gap}>
          <Lft style={styles.top}>
            {physio ? <Avatar face={CARE_STAFF.physio.face} size={44} /> : <CharacterTile name="nurse" size={44} />}
            <View style={styles.grow}>
              <H2>{t(...draftTitle(draft))}</H2>
              <T s m>{t(...draftSub(draft))}</T>
            </View>
          </Lft>
          <Hr />
          <Lft style={styles.top}><Icon name="user" size={16} color={c.accent} />
            <T s style={styles.grow}>{t(`${patient.name}, ${patient.age} · ${rel.name[0]}`, `${patient.name}, ${patient.age} साल · ${rel.name[1]}`, `${patient.name}, ${patient.age} ਸਾਲ · ${rel.name[2]}`)}</T></Lft>
          <Lft style={styles.top}><Icon name="clock" size={16} color={c.accent} />
            <T s style={styles.grow}>{n > 1
              ? t(`${n} visits from ${dateLabel(t, dates[0], true)} to ${dateLabel(t, dates[dates.length - 1])}, ${when}`, `${n} विज़िट, ${dateLabel(t, dates[0], true)} से ${dateLabel(t, dates[dates.length - 1])} तक, ${when}`, `${n} ਵਿਜ਼ਿਟਾਂ, ${dateLabel(t, dates[0], true)} ਤੋਂ ${dateLabel(t, dates[dates.length - 1])} ਤੱਕ, ${when}`)
              : `${dateLabel(t, dates[0], true)}, ${when}`}</T></Lft>
          <Lft style={styles.top}><Icon name="shield" size={16} color={c.accent} /><T s style={styles.grow}>{pro}</T></Lft>
          <Lft style={styles.top}><Icon name="pin" size={16} color={c.accent} /><T s style={styles.grow}>{st.address.line}</T>
            <Link onPress={() => nav.push('addresses')}>{t('Change', 'बदलें', 'ਬਦਲੋ')}</Link></Lft>
        </Card>
        {rx && (
          <Card tone="mint">
            <T s>{t(
              `Prescription from ${draft.rxDoctor || 'your doctor'} added. The nurse is sent once a Saathi doctor approves it; if not, you get all your money back.`,
              `${draft.rxDoctor || 'आपके डॉक्टर'} की पर्ची लग गई। Saathi डॉक्टर के मंज़ूर करने के बाद नर्स भेजी जाएगी; नहीं तो पूरा पैसा वापस।`,
              `${draft.rxDoctor || 'ਤੁਹਾਡੇ ਡਾਕਟਰ'} ਦੀ ਪਰਚੀ ਲੱਗ ਗਈ। Saathi ਡਾਕਟਰ ਦੀ ਮਨਜ਼ੂਰੀ ਤੋਂ ਬਾਅਦ ਨਰਸ ਭੇਜੀ ਜਾਵੇਗੀ; ਨਹੀਂ ਤਾਂ ਪੂਰੇ ਪੈਸੇ ਵਾਪਸ।`,
            )}</T>
          </Card>
        )}
        <Card style={styles.gap}>
          {physio && n > 1 ? <>
            <KeyValue label={t(`${n} visits × ${rupees(PHYSIO_SESSION_PRICE)}`, `${n} विज़िट × ${rupees(PHYSIO_SESSION_PRICE)}`, `${n} ਵਿਜ਼ਿਟਾਂ × ${rupees(PHYSIO_SESSION_PRICE)}`)} value={rupees(bill.list)} />
            <KeyValue label={t('Plan saving', 'प्लान की बचत', 'ਪਲਾਨ ਦੀ ਬੱਚਤ')} value={`− ${rupees(bill.saving)}`} valueTone="accent" />
          </> : n > 1
            ? <KeyValue label={t(`${n} days × ${rupees(bill.each)}`, `${n} दिन × ${rupees(bill.each)}`, `${n} ਦਿਨ × ${rupees(bill.each)}`)} value={rupees(bill.list)} />
            : <KeyValue label={t(...draftTitle(draft))} value={rupees(bill.list)} />}
          <KeyValue label={t('Visit fee', 'आने का शुल्क', 'ਆਉਣ ਦੀ ਫ਼ੀਸ')} value={t('Free', 'मुफ़्त', 'ਮੁਫ਼ਤ')} valueTone="accent" />
          <Hr />
          <KeyValue variant="total" label={t('Total', 'कुल', 'ਕੁੱਲ')} value={rupees(bill.total)} />
        </Card>
        <Lft style={styles.top}>
          <Icon name="clock" size={16} color={c.accent} />
          <T s m style={styles.grow}>{t(
            `Free reschedule or skip up to ${CARE_RESCHEDULE_HOURS} hours before a visit. Skipped visits move to the end of the plan.`,
            `विज़िट से ${CARE_RESCHEDULE_HOURS} घंटे पहले तक बदलना या छोड़ना मुफ़्त। छोड़ी गई विज़िट प्लान के आख़िर में जुड़ जाती है।`,
            `ਵਿਜ਼ਿਟ ਤੋਂ ${CARE_RESCHEDULE_HOURS} ਘੰਟੇ ਪਹਿਲਾਂ ਤੱਕ ਬਦਲਣਾ ਜਾਂ ਛੱਡਣਾ ਮੁਫ਼ਤ। ਛੱਡੀ ਵਿਜ਼ਿਟ ਪਲਾਨ ਦੇ ਅਖੀਰ ਵਿੱਚ ਜੁੜ ਜਾਂਦੀ ਹੈ।`,
          )}</T>
        </Lft>
        <H2>{t('Pay with', 'भुगतान का तरीका', 'ਭੁਗਤਾਨ ਦਾ ਤਰੀਕਾ')}</H2>
        <Grid cols={2}>
          <Pill sel={pay === 'upi'} onPress={() => setPay('upi')}>UPI</Pill>
          <Pill sel={pay === 'card'} onPress={() => setPay('card')}>{t('Card', 'कार्ड', 'ਕਾਰਡ')}</Pill>
        </Grid>
        <Spacer />
        <Button onPress={book}>{t(`Pay ${rupees(bill.total)}`, `${rupees(bill.total)} भुगतान करें`, `${rupees(bill.total)} ਭੁਗਤਾਨ ਕਰੋ`)}</Button>
      </Screen>
    </View>
  );
}

export default ConfirmScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, gap: { gap: 8 }, top: { alignItems: 'flex-start' }, grow: { flex: 1, gap: 2 } });
