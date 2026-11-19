/** Design page 38 · 3 · Visit notes: pain before and after, what was done, home exercises, next steps, doctor flag (params: { visit }). */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, CheckRow, ChipGroup, H2, Input, Page, Row, Rows, Screen, Spacer, Stepper, T, Toggle,
  useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { PainPicker } from '../components/PainPicker';
import { carePatients, flagReasons, nextStepOptions, patientLine, visitById, visitTitle, vitalFields, vitalWarning, type FlagReason } from '../data';
import { useCareState } from '../state';

export function NotesScreen({ params }: ScreenProps<{ visit?: string }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useCareState();
  const visit = visitById(params.visit);
  const p = carePatients[visit.patient];
  const vitals = st.careVitals?.[visit.id];
  const warn = vitals ? vitalWarning(vitals) : [];
  const last = p.pain[p.pain.length - 1] ?? 3;
  const [before, setBefore] = useState(last);
  const [after, setAfter] = useState(Math.max(0, last - 1));
  const [text, setText] = useState('');
  const [reps, setReps] = useState<Record<string, number>>(Object.fromEntries((visit.exercises ?? []).map((e) => [e.id, e.reps])));
  const [next, setNext] = useState<string[]>(['same']);
  const [flag, setFlag] = useState(warn.length > 0);
  const [reason, setReason] = useState<FlagReason>(warn.length > 0 ? 'vitals' : after > before ? 'pain' : 'other');
  const [why, setWhy] = useState('');
  const toggleNext = (id: string) => setNext((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));
  const readings = vitals ? vitalFields.filter((f) => vitals[f.key]).map((f) => `${t(...f.label)} ${vitals[f.key]}`).join(' · ') : '';

  const send = () => {
    if (!text.trim()) { nav.toast(t('Write a line about what you did', 'आपने क्या किया, एक लाइन लिखें', 'ਤੁਸੀਂ ਕੀ ਕੀਤਾ, ਇੱਕ ਲਾਈਨ ਲਿਖੋ')); return; }
    if (flag && reason === 'other' && !why.trim()) { nav.toast(t('Tell the doctor why you flagged it', 'डॉक्टर को बताएँ कि फ़्लैग क्यों किया', 'ਡਾਕਟਰ ਨੂੰ ਦੱਸੋ ਕਿ ਫ਼ਲੈਗ ਕਿਉਂ ਕੀਤਾ')); return; }
    set({
      careDone: [...new Set([...(st.careDone ?? []), visit.id])],
      careNotes: { ...(st.careNotes ?? {}), [visit.id]: { before, after, text: text.trim(), flag: flag ? reason : undefined } },
    });
    nav.toast(flag
      ? t('Notes sent. The doctor will review today.', 'नोट्स भेजे। डॉक्टर आज देखेंगे।', 'ਨੋਟਸ ਭੇਜੇ। ਡਾਕਟਰ ਅੱਜ ਦੇਖਣਗੇ।')
      : t(`Notes sent to ${p.family.name[0]} and the doctor`, `नोट्स ${p.family.name[1]} और डॉक्टर को भेजे`, `ਨੋਟਸ ${p.family.name[2]} ਅਤੇ ਡਾਕਟਰ ਨੂੰ ਭੇਜੇ`));
    nav.reset('care.today');
  };

  return (
    <Page>
      <Screen>
        <BackHeader title={t('Visit notes', 'विज़िट नोट्स', 'ਵਿਜ਼ਿਟ ਨੋਟਸ')} fallback="care.today" />
        <View>
          <H2>{patientLine(t, p)}</H2>
          <T s m>{visitTitle(t, visit)}</T>
          {readings ? <T s m>{readings}</T> : null}
        </View>

        <Card style={{ gap: 14 }}>
          <PainPicker label={t('Pain before', 'पहले दर्द', 'ਪਹਿਲਾਂ ਦਰਦ')} value={before} onChange={setBefore} />
          <PainPicker label={t('Pain after', 'बाद में दर्द', 'ਬਾਅਦ ਵਿੱਚ ਦਰਦ')} value={after} onChange={setAfter} />
          <T s color={after > before ? c.red : c.accent} b>
            {after < before ? t(`Pain down by ${before - after}`, `दर्द ${before - after} कम हुआ`, `ਦਰਦ ${before - after} ਘਟਿਆ`)
              : after > before ? t(`Pain up by ${after - before}: think about a doctor review`, `दर्द ${after - before} बढ़ा: डॉक्टर को दिखाने की सोचें`, `ਦਰਦ ${after - before} ਵਧਿਆ: ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਬਾਰੇ ਸੋਚੋ`)
                : t('Pain the same as before', 'दर्द पहले जैसा', 'ਦਰਦ ਪਹਿਲਾਂ ਵਰਗਾ')}
          </T>
        </Card>

        <H2>{t('What you did', 'आपने क्या किया', 'ਤੁਸੀਂ ਕੀ ਕੀਤਾ')}</H2>
        <Input small multiline value={text} onChangeText={setText} accessibilityLabel={t('What you did', 'आपने क्या किया', 'ਤੁਸੀਂ ਕੀ ਕੀਤਾ')}
          placeholder={visit.specialty ? t('e.g. knee bends to 90°, walked 30 m', 'जैसे घुटना 90° तक मुड़ा, 30 मीटर चले', 'ਜਿਵੇਂ ਗੋਡਾ 90° ਤੱਕ ਮੁੜਿਆ, 30 ਮੀਟਰ ਤੁਰੇ') : t('e.g. wound clean, no pus, dressing changed', 'जैसे घाव साफ़, पस नहीं, पट्टी बदली', 'ਜਿਵੇਂ ਜ਼ਖ਼ਮ ਸਾਫ਼, ਪਸ ਨਹੀਂ, ਪੱਟੀ ਬਦਲੀ')}
          style={{ minHeight: 70 }} />

        {visit.exercises && (
          <>
            <H2>{t('Exercises to do at home', 'घर पर करने की कसरत', 'ਘਰ ਤੇ ਕਰਨ ਵਾਲੀ ਕਸਰਤ')}</H2>
            <Card>
              <Rows gap={10}>
                {visit.exercises.map((e) => (
                  <Row key={e.id}>
                    <View style={styles.fill}>
                      <T b>{t(...e.name)}</T>
                      <T s m>{reps[e.id] ? t(`${reps[e.id]} times, twice a day`, `${reps[e.id]} बार, दिन में दो बार`, `${reps[e.id]} ਵਾਰ, ਦਿਨ ਵਿੱਚ ਦੋ ਵਾਰ`) : t('Not for now', 'अभी नहीं', 'ਹਾਲੇ ਨਹੀਂ')}</T>
                    </View>
                    <Stepper value={reps[e.id] ?? 0} min={0} max={30} addLabel={t('Add', 'जोड़ें', 'ਜੋੜੋ')} onChange={(n) => setReps({ ...reps, [e.id]: n })} />
                  </Row>
                ))}
              </Rows>
            </Card>
            <T s m>{t('The family sees these in the Saathi app with a reminder.', 'परिवार इन्हें Saathi ऐप में रिमाइंडर के साथ देखेगा।', 'ਪਰਿਵਾਰ ਇਹਨਾਂ ਨੂੰ Saathi ਐਪ ਵਿੱਚ ਰਿਮਾਈਂਡਰ ਨਾਲ ਦੇਖੇਗਾ।')}</T>
          </>
        )}

        <H2>{t('Next steps', 'आगे क्या', 'ਅੱਗੇ ਕੀ')}</H2>
        <Card style={{ gap: 12 }}>
          {nextStepOptions.filter((o) => visit.specialty || o.id !== 'more').map((o) => (
            <CheckRow key={o.id} size={20} on={next.includes(o.id)} label={t(...o.label)} onPress={() => toggleNext(o.id)} />
          ))}
        </Card>

        <Card tone={flag ? 'red' : undefined} style={{ gap: 10 }}>
          <Row>
            <View style={styles.fill}>
              <T b>{t('Flag for doctor review', 'डॉक्टर को दिखाने के लिए फ़्लैग', 'ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਲਈ ਫ਼ਲੈਗ')}</T>
              <T s m>{t('The supervising doctor sees it today', 'निगरानी वाले डॉक्टर आज देखेंगे', 'ਨਿਗਰਾਨੀ ਵਾਲੇ ਡਾਕਟਰ ਅੱਜ ਦੇਖਣਗੇ')}</T>
            </View>
            <Toggle on={flag} onChange={setFlag} accessibilityLabel={t('Flag for doctor review', 'डॉक्टर को दिखाने के लिए फ़्लैग', 'ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਉਣ ਲਈ ਫ਼ਲੈਗ')} />
          </Row>
          {flag && (
            <>
              <ChipGroup items={flagReasons.map((r) => ({ key: r.id, label: t(...r.label) }))} value={reason} onChange={setReason}
                accessibilityLabel={t('Reason', 'कारण', 'ਕਾਰਨ')} />
              <Input small value={why} onChangeText={setWhy} placeholder={t('Tell the doctor more', 'डॉक्टर को और बताएँ', 'ਡਾਕਟਰ ਨੂੰ ਹੋਰ ਦੱਸੋ')}
                accessibilityLabel={t('Reason', 'कारण', 'ਕਾਰਨ')} />
            </>
          )}
        </Card>

        <Spacer />
        <Button size="tall" onPress={send}>{t('Send notes', 'नोट्स भेजें', 'ਨੋਟਸ ਭੇਜੋ')}</Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default NotesScreen;
