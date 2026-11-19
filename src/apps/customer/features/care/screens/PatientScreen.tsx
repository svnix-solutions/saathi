/** Design page 37 · Saathi Care — screen 37.7 · Patient details: who, age, mobility, condition, who is at home. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, ChipGroup, Grid, H2, Input, Pill, Screen, Spacer, Steps, T, useNav, useT, useTheme } from '@/native/ui';
import { mobility, relations, type Relation } from '@/domain';
import { useCareDraft } from '../state';
import { GENDERS } from '../data';
import { stepOf, type CarePatient } from '../rules';

export function PatientScreen() {
  const nav = useNav();
  const t = useT();
  const { device } = useTheme();
  const { st, draft, setDraft } = useCareDraft();
  const me = (r: Relation): Partial<CarePatient> => (r === 'self' ? { name: st.name, homePhone: st.phone } : {});
  const startRel = draft.patient?.relation ?? st.careFor ?? 'parent';
  const [p, setP] = useState<CarePatient>(() => ({
    relation: startRel, name: '', age: '', gender: 'f', mobility: 'walks', notes: '', homePhone: st.phone, ...me(startRel), ...draft.patient,
  }));
  const up = (patch: Partial<CarePatient>) => setP({ ...p, ...patch });
  const pickRelation = (r: Relation) => setP({ ...p, relation: r, ...(r === 'self' ? me(r) : p.relation === 'self' ? { name: '' } : {}) });
  const ok = p.name.trim().length > 1 && Number(p.age) > 0 && p.homePhone.replace(/\D/g, '').length >= 10;
  const label = (en: string, hi: string, pa: string) => <T s b>{t(en, hi, pa)}</T>;
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Patient details', 'मरीज़ की जानकारी', 'ਮਰੀਜ਼ ਦੀ ਜਾਣਕਾਰੀ')} fallback="care.home" />
        <Steps {...stepOf(draft, 'care.patient')} label={t('Who is the care for?', 'देखभाल किसके लिए है?', 'ਦੇਖਭਾਲ ਕਿਸ ਲਈ ਹੈ?')} />
        <ChipGroup accessibilityLabel={t('Relation', 'रिश्ता', 'ਰਿਸ਼ਤਾ')} value={p.relation} onChange={pickRelation}
          items={relations.map((r) => ({ key: r.id, label: t(...r.name) }))} />
        {label('Patient’s name', 'मरीज़ का नाम', 'ਮਰੀਜ਼ ਦਾ ਨਾਮ')}
        <Input value={p.name} onChangeText={(name) => up({ name })} placeholder={t('Full name', 'पूरा नाम', 'ਪੂਰਾ ਨਾਮ')} accessibilityLabel={t('Patient’s name', 'मरीज़ का नाम', 'ਮਰੀਜ਼ ਦਾ ਨਾਮ')} />
        <Grid cols={device === 'small' ? 1 : 2}>
          <View style={styles.field}>
            {label('Age', 'उम्र', 'ਉਮਰ')}
            <Input value={p.age} onChangeText={(age) => up({ age: age.replace(/\D/g, '').slice(0, 3) })} keyboardType="number-pad" placeholder={t('Years', 'साल', 'ਸਾਲ')} accessibilityLabel={t('Age', 'उम्र', 'ਉਮਰ')} />
          </View>
          <View style={styles.field}>
            {label('Gender', 'लिंग', 'ਲਿੰਗ')}
            <ChipGroup accessibilityLabel={t('Gender', 'लिंग', 'ਲਿੰਗ')} value={p.gender} onChange={(gender) => up({ gender })}
              items={GENDERS.map((g) => ({ key: g.id, label: t(...g.name) }))} />
          </View>
        </Grid>
        <H2>{t('Can they walk?', 'क्या वे चल पाते हैं?', 'ਕੀ ਉਹ ਤੁਰ ਸਕਦੇ ਹਨ?')}</H2>
        <Grid cols={device === 'small' ? 1 : 3}>
          {mobility.map((m) => <Pill key={m.id} s sel={p.mobility === m.id} onPress={() => up({ mobility: m.id })}>{t(...m.name)}</Pill>)}
        </Grid>
        {label('Condition and notes', 'बीमारी और ज़रूरी बातें', 'ਬਿਮਾਰੀ ਅਤੇ ਜ਼ਰੂਰੀ ਗੱਲਾਂ')}
        <Input small multiline value={p.notes} onChangeText={(notes) => up({ notes })}
          placeholder={t('E.g. knee replacement 3 weeks ago, diabetic', 'जैसे: 3 हफ़्ते पहले घुटना बदला, शुगर है', 'ਜਿਵੇਂ: 3 ਹਫ਼ਤੇ ਪਹਿਲਾਂ ਗੋਡਾ ਬਦਲਿਆ, ਸ਼ੂਗਰ ਹੈ')}
          accessibilityLabel={t('Condition and notes', 'बीमारी और ज़रूरी बातें', 'ਬਿਮਾਰੀ ਅਤੇ ਜ਼ਰੂਰੀ ਗੱਲਾਂ')} />
        {label('Someone at home during the visit', 'विज़िट के समय घर पर कौन होगा', 'ਵਿਜ਼ਿਟ ਵੇਲੇ ਘਰ ਕੌਣ ਹੋਵੇਗਾ')}
        <Input prefix="+91" keyboardType="phone-pad" value={p.homePhone} onChangeText={(homePhone) => up({ homePhone })} maxLength={11}
          accessibilityLabel={t('Phone of the person at home', 'घर पर मौजूद व्यक्ति का फ़ोन', 'ਘਰ ਮੌਜੂਦ ਵਿਅਕਤੀ ਦਾ ਫ਼ੋਨ')} />
        <T s m>{t('The physio or nurse calls this number when they reach.', 'पहुँचने पर फ़िज़ियो या नर्स इसी नंबर पर कॉल करेंगे।', 'ਪਹੁੰਚਣ ਤੇ ਫ਼ਿਜ਼ੀਓ ਜਾਂ ਨਰਸ ਇਸੇ ਨੰਬਰ ਤੇ ਕਾਲ ਕਰਨਗੇ।')}</T>
        <Spacer />
        <Button disabled={!ok} onPress={() => { setDraft({ patient: { ...p, name: p.name.trim() } }); nav.push('care.schedule'); }}>
          {ok ? t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ') : t('Add name, age and phone', 'नाम, उम्र और फ़ोन भरें', 'ਨਾਮ, ਉਮਰ ਅਤੇ ਫ਼ੋਨ ਭਰੋ')}
        </Button>
      </Screen>
    </View>
  );
}

export default PatientScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, field: { gap: 6 } });
