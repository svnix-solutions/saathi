/** Design page 37 · Saathi Care — screen 37.5 · Short procedures: injection, course, dressing, IV, nebulisation, catheter. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Icon, Lft, Row, Screen, Spacer, Stepper, Steps, T, useNav, useT, useTheme, type ScreenProps } from '@/native/ui';
import { INJECTION_COURSE_DAYS, procedures, rupees, type ProcedureId } from '@/domain';
import { useCareDraft } from '../state';
import { ChoiceCard } from '../components/ChoiceCard';
import { PROCEDURE_ICON } from '../data';
import { careBill, clampCourse, needsRx, stepOf } from '../rules';

export function ProceduresScreen({ params }: ScreenProps<{ id?: ProcedureId }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { draft: raw, setDraft } = useCareDraft();
  const draft = { ...raw, kind: 'procedure' as const, procedure: raw.kind === 'procedure' ? raw.procedure : params.id ?? raw.procedure };
  const bill = careBill(draft);
  const rx = needsRx(draft);
  const days = clampCourse(draft.courseDays);
  const next = () => { setDraft({ kind: 'procedure', procedure: draft.procedure, courseDays: days }); nav.push(rx ? 'care.prescription' : 'care.patient'); };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Short nurse visits', 'छोटी नर्स विज़िट', 'ਛੋਟੀਆਂ ਨਰਸ ਵਿਜ਼ਿਟਾਂ')} fallback="care.home" />
        <Steps {...stepOf(draft, 'care.procedures')} label={t('What does the patient need?', 'मरीज़ को क्या चाहिए?', 'ਮਰੀਜ਼ ਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?')} />
        {procedures.map((p) => {
          const on = draft.procedure === p.id;
          return (
            <ChoiceCard key={p.id} selected={on} onPress={() => setDraft({ kind: 'procedure', procedure: p.id })}
              icon={PROCEDURE_ICON[p.id]} title={t(...p.name)} sub={t(...p.sub)} tagTone="n"
              tag={p.rx ? t('Prescription needed', 'डॉक्टर की पर्ची ज़रूरी', 'ਡਾਕਟਰ ਦੀ ਪਰਚੀ ਜ਼ਰੂਰੀ') : undefined}
              price={rupees(p.price)} priceSub={p.perDay ? t('a day', 'प्रति दिन', 'ਪ੍ਰਤੀ ਦਿਨ') : undefined}>
              {on && p.id === 'injectionCourse' && (
                <Row style={styles.course}>
                  <T s b style={styles.grow}>{t(`${days} days · ${rupees(bill.total)}`, `${days} दिन · ${rupees(bill.total)}`, `${days} ਦਿਨ · ${rupees(bill.total)}`)}</T>
                  <Stepper value={days} min={INJECTION_COURSE_DAYS.min} max={INJECTION_COURSE_DAYS.max} onChange={(n) => setDraft({ kind: 'procedure', procedure: p.id, courseDays: n })} />
                </Row>
              )}
            </ChoiceCard>
          );
        })}
        <Card tone="mint">
          <Lft style={styles.top}>
            <Icon name="shield" size={16} color={c.accent} />
            <T s style={styles.grow}>{t(
              'Medicines and injections are given only on a doctor’s prescription. A Saathi doctor checks it before the nurse is sent.',
              'दवा और इंजेक्शन सिर्फ़ डॉक्टर की पर्ची पर दिए जाते हैं। नर्स भेजने से पहले Saathi डॉक्टर पर्ची जाँचते हैं।',
              'ਦਵਾਈ ਅਤੇ ਟੀਕੇ ਸਿਰਫ਼ ਡਾਕਟਰ ਦੀ ਪਰਚੀ ਤੇ ਦਿੱਤੇ ਜਾਂਦੇ ਹਨ। ਨਰਸ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ Saathi ਡਾਕਟਰ ਪਰਚੀ ਜਾਂਚਦੇ ਹਨ।',
            )}</T>
          </Lft>
        </Card>
        <Spacer />
        <Button onPress={next}>{rx
          ? t('Add prescription', 'पर्ची जोड़ें', 'ਪਰਚੀ ਜੋੜੋ')
          : t(`Continue · ${rupees(bill.total)}`, `आगे बढ़ें · ${rupees(bill.total)}`, `ਅੱਗੇ ਵਧੋ · ${rupees(bill.total)}`)}</Button>
      </Screen>
    </View>
  );
}

export default ProceduresScreen;

const styles = StyleSheet.create({
  root: { flex: 1 }, top: { alignItems: 'flex-start' }, grow: { flex: 1 },
  course: { marginTop: 10, flexWrap: 'wrap', rowGap: 6 },
});
