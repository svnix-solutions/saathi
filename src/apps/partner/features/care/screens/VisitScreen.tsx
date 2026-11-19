/** Design page 38 · 2 · Visit checklist: identity, prescription, consent, vitals, what was done, wound photo (params: { visit }). */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, CheckRow, Grid, H, H2, Input, Lft, Link, Page, PhotoTile, Row, Screen, Sheet, Spacer, T, Toggle,
  useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { RxTag } from '../components/RxTag';
import { carePatients, emptyVitals, patientLine, visitById, visitSub, visitTitle, vitalFields, vitalWarning, type Vitals } from '../data';
import { useCareState } from '../state';

export function VisitScreen({ params }: ScreenProps<{ visit?: string }>) {
  const t = useT();
  const nav = useNav();
  const { c, device } = useTheme();
  const [st, set] = useCareState();
  const visit = visitById(params.visit);
  const p = carePatients[visit.patient];
  const [identity, setIdentity] = useState(false);
  const [rxOk, setRxOk] = useState(false);
  const [consent, setConsent] = useState(false);
  const [vitals, setVitals] = useState<Vitals>(st.careVitals?.[visit.id] ?? emptyVitals);
  const [done, setDone] = useState<number[]>([]);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [stop, setStop] = useState(false);
  const warn = vitalWarning(vitals);
  const toggleStep = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const togglePhotoConsent = (v: boolean) => { setPhotoConsent(v); if (!v) setPhoto(false); };

  const missing = !identity ? t('Confirm who the patient is first', 'पहले मरीज़ की पहचान पक्की करें', 'ਪਹਿਲਾਂ ਮਰੀਜ਼ ਦੀ ਪਛਾਣ ਪੱਕੀ ਕਰੋ')
    : visit.rx && !rxOk ? t('Match the medicine with the prescription', 'दवा को पर्चे से मिलाएँ', 'ਦਵਾਈ ਨੂੰ ਪਰਚੀ ਨਾਲ ਮਿਲਾਓ')
      : !consent ? t('Ask for consent before you start', 'शुरू करने से पहले सहमति लें', 'ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਹਿਮਤੀ ਲਓ')
        : done.length < visit.steps.length ? t(`Tick what you did (${done.length} of ${visit.steps.length})`, `जो किया उस पर टिक करें (${visit.steps.length} में से ${done.length})`, `ਜੋ ਕੀਤਾ ਉਸ ਤੇ ਟਿੱਕ ਕਰੋ (${visit.steps.length} ਵਿੱਚੋਂ ${done.length})`)
          : null;
  const finish = () => {
    if (missing) { nav.toast(missing); return; }
    set({ careVitals: { ...(st.careVitals ?? {}), [visit.id]: vitals } });
    nav.push('care.notes', { visit: visit.id });
  };
  const stopVisit = (why: string) => {
    setStop(false);
    nav.toast(`${why} · ${t('your doctor and the family are told', 'डॉक्टर और परिवार को बता दिया', 'ਡਾਕਟਰ ਅਤੇ ਪਰਿਵਾਰ ਨੂੰ ਦੱਸ ਦਿੱਤਾ')}`);
    nav.reset('care.today');
  };

  return (
    <Page>
      <Screen>
        <BackHeader title={visitTitle(t, visit)} fallback="care.today" />
        <View>
          <H>{patientLine(t, p)}</H>
          <T s m>{visitSub(t, visit)}</T>
        </View>

        <H2>{t('Before you start', 'शुरू करने से पहले', 'ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ')}</H2>
        <Card style={{ gap: 12 }}>
          <CheckRow size={22} on={identity} onPress={() => setIdentity(!identity)}
            label={t(`Patient is ${p.first[0]}, ${p.age}: asked their name and age`, `मरीज़ ${p.first[1]}, ${p.age} हैं: नाम और उम्र पूछी`, `ਮਰੀਜ਼ ${p.first[2]}, ${p.age} ਹਨ: ਨਾਂ ਅਤੇ ਉਮਰ ਪੁੱਛੀ`)} />
          {visit.rx && (
            <View style={{ gap: 6 }}>
              <RxTag>{t(`Prescription checked by ${visit.rx.doctor[0]}`, `पर्चा ${visit.rx.doctor[1]} ने जाँचा`, `ਪਰਚੀ ${visit.rx.doctor[2]} ਨੇ ਜਾਂਚੀ`)}</RxTag>
              <T s>{t(...visit.rx.medicine)}</T>
              <CheckRow size={22} on={rxOk} onPress={() => setRxOk(!rxOk)}
                label={t('Medicine in hand matches the prescription', 'हाथ की दवा पर्चे से मिलती है', 'ਹੱਥ ਵਾਲੀ ਦਵਾਈ ਪਰਚੀ ਨਾਲ ਮਿਲਦੀ ਹੈ')} />
            </View>
          )}
          <CheckRow size={22} on={consent} onPress={() => setConsent(!consent)}
            label={t('Patient or family agreed to today’s care', 'मरीज़ या परिवार ने आज के इलाज की सहमति दी', 'ਮਰੀਜ਼ ਜਾਂ ਪਰਿਵਾਰ ਨੇ ਅੱਜ ਦੇ ਇਲਾਜ ਦੀ ਸਹਿਮਤੀ ਦਿੱਤੀ')} />
        </Card>

        <H2>{t('Vitals', 'वाइटल्स', 'ਵਾਈਟਲਜ਼')}</H2>
        <Grid cols={device === 'small' ? 1 : 2}>
          {vitalFields.map((f) => (
            <View key={f.key} style={{ gap: 4 }}>
              <Row><T s b color={warn.includes(f.key) ? c.red : undefined}>{t(...f.label)}</T><T s m>{f.unit}</T></Row>
              <Input small value={vitals[f.key]} onChangeText={(s) => setVitals({ ...vitals, [f.key]: s })} placeholder={f.placeholder}
                keyboardType={f.keyboard} maxLength={7} accessibilityLabel={t(...f.label)} style={warn.includes(f.key) ? { borderColor: c.red } : undefined} />
            </View>
          ))}
        </Grid>
        {warn.length > 0 && (
          <Card tone="red"><T s color={c.red}>{t('A reading is out of the usual range. Check again, and flag it for the doctor in your notes.', 'एक रीडिंग सामान्य से अलग है। फिर से जाँचें, और नोट्स में डॉक्टर के लिए फ़्लैग करें।', 'ਇੱਕ ਰੀਡਿੰਗ ਆਮ ਨਾਲੋਂ ਵੱਖਰੀ ਹੈ। ਫਿਰ ਜਾਂਚੋ, ਅਤੇ ਨੋਟਸ ਵਿੱਚ ਡਾਕਟਰ ਲਈ ਫ਼ਲੈਗ ਕਰੋ।')}</T></Card>
        )}

        <Row>
          <H2>{visit.specialty ? t('Exercises done', 'कसरत जो करवाई', 'ਕਸਰਤ ਜੋ ਕਰਵਾਈ') : t('What you did', 'आपने क्या किया', 'ਤੁਸੀਂ ਕੀ ਕੀਤਾ')}</H2>
          <T s m>{done.length}/{visit.steps.length}</T>
        </Row>
        <Card style={{ gap: 12 }}>
          {visit.steps.map((s, i) => <CheckRow key={s[0]} size={22} on={done.includes(i)} done={done.includes(i)} label={t(...s)} onPress={() => toggleStep(i)} />)}
        </Card>

        {visit.wound && (
          <>
            <H2>{t('Wound photo', 'घाव की फ़ोटो', 'ਜ਼ਖ਼ਮ ਦੀ ਫ਼ੋਟੋ')}</H2>
            <Card style={{ gap: 10 }}>
              <Row>
                <View style={styles.fill}>
                  <T b>{t('Patient agreed to a photo', 'मरीज़ फ़ोटो के लिए राज़ी हैं', 'ਮਰੀਜ਼ ਫ਼ੋਟੋ ਲਈ ਰਾਜ਼ੀ ਹਨ')}</T>
                  <T s m>{t('Only the wound. Seen by the doctor only, never shared.', 'सिर्फ़ घाव की। सिर्फ़ डॉक्टर देखेंगे, कहीं शेयर नहीं।', 'ਸਿਰਫ਼ ਜ਼ਖ਼ਮ ਦੀ। ਸਿਰਫ਼ ਡਾਕਟਰ ਦੇਖਣਗੇ, ਕਿਤੇ ਸ਼ੇਅਰ ਨਹੀਂ।')}</T>
                </View>
                <Toggle on={photoConsent} onChange={togglePhotoConsent} accessibilityLabel={t('Photo consent', 'फ़ोटो की सहमति', 'ਫ਼ੋਟੋ ਦੀ ਸਹਿਮਤੀ')} />
              </Row>
              {photoConsent ? (
                <PhotoTile icon="cam" added={photo} bold
                  label={photo ? t('Wound photo added · tap to retake', 'घाव की फ़ोटो जुड़ी · दोबारा लेने के लिए दबाएँ', 'ਜ਼ਖ਼ਮ ਦੀ ਫ਼ੋਟੋ ਜੁੜੀ · ਦੁਬਾਰਾ ਲੈਣ ਲਈ ਦਬਾਓ') : t('Take wound photo', 'घाव की फ़ोटो लें', 'ਜ਼ਖ਼ਮ ਦੀ ਫ਼ੋਟੋ ਲਓ')}
                  onPress={() => { setPhoto(true); nav.toast(t('Photo saved to the patient’s record', 'फ़ोटो मरीज़ के रिकॉर्ड में सेव', 'ਫ਼ੋਟੋ ਮਰੀਜ਼ ਦੇ ਰਿਕਾਰਡ ਵਿੱਚ ਸੇਵ')); }} />
              ) : (
                <Lft gap={6}><T s m style={styles.fill}>{t('No photo without consent. Describe the wound in your notes instead.', 'सहमति के बिना फ़ोटो नहीं। नोट्स में घाव के बारे में लिखें।', 'ਸਹਿਮਤੀ ਬਿਨਾਂ ਫ਼ੋਟੋ ਨਹੀਂ। ਨੋਟਸ ਵਿੱਚ ਜ਼ਖ਼ਮ ਬਾਰੇ ਲਿਖੋ।')}</T></Lft>
              )}
            </Card>
          </>
        )}

        <Spacer />
        {missing && <T s m center>{missing}</T>}
        <Button size="tall" onPress={finish}>{t('Finish and write notes', 'पूरा करें और नोट्स लिखें', 'ਪੂਰਾ ਕਰੋ ਅਤੇ ਨੋਟਸ ਲਿਖੋ')}</Button>
        <Link center onPress={() => setStop(true)}>{t('Can’t go ahead with this visit', 'यह विज़िट नहीं हो सकती', 'ਇਹ ਵਿਜ਼ਿਟ ਨਹੀਂ ਹੋ ਸਕਦੀ')}</Link>
      </Screen>
      <Sheet visible={stop} onClose={() => setStop(false)}>
        <H2>{t('Why can’t the visit go ahead?', 'विज़िट क्यों नहीं हो सकती?', 'ਵਿਜ਼ਿਟ ਕਿਉਂ ਨਹੀਂ ਹੋ ਸਕਦੀ?')}</H2>
        <T s m>{t('Do not give any medicine you are unsure of. Your doctor will call you.', 'जिस दवा पर शक हो, वह न दें। आपके डॉक्टर आपको कॉल करेंगे।', 'ਜਿਸ ਦਵਾਈ ਤੇ ਸ਼ੱਕ ਹੋਵੇ, ਉਹ ਨਾ ਦਿਓ। ਤੁਹਾਡੇ ਡਾਕਟਰ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰਨਗੇ।')}</T>
        <Button variant="plain" onPress={() => stopVisit(t('Patient not at home', 'मरीज़ घर पर नहीं', 'ਮਰੀਜ਼ ਘਰ ਨਹੀਂ'))}>{t('Patient not at home', 'मरीज़ घर पर नहीं', 'ਮਰੀਜ਼ ਘਰ ਨਹੀਂ')}</Button>
        {visit.rx && <Button variant="plain" onPress={() => stopVisit(t('Medicine does not match', 'दवा पर्चे से नहीं मिलती', 'ਦਵਾਈ ਪਰਚੀ ਨਾਲ ਨਹੀਂ ਮਿਲਦੀ'))}>{t('Medicine does not match', 'दवा पर्चे से नहीं मिलती', 'ਦਵਾਈ ਪਰਚੀ ਨਾਲ ਨਹੀਂ ਮਿਲਦੀ')}</Button>}
        <Button variant="plain" onPress={() => stopVisit(t('No consent', 'सहमति नहीं मिली', 'ਸਹਿਮਤੀ ਨਹੀਂ ਮਿਲੀ'))}>{t('Patient or family said no', 'मरीज़ या परिवार ने मना किया', 'ਮਰੀਜ਼ ਜਾਂ ਪਰਿਵਾਰ ਨੇ ਨਾਂਹ ਕੀਤੀ')}</Button>
        <Button variant="outline" danger onPress={() => stopVisit(t('Patient unwell, 112 called', 'मरीज़ की तबीयत ख़राब, 112 पर कॉल', 'ਮਰੀਜ਼ ਦੀ ਤਬੀਅਤ ਖ਼ਰਾਬ, 112 ਤੇ ਕਾਲ'))}>{t('Patient unwell: call 112', 'तबीयत ख़राब: 112 पर कॉल करें', 'ਤਬੀਅਤ ਖ਼ਰਾਬ: 112 ਤੇ ਕਾਲ ਕਰੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default VisitScreen;
