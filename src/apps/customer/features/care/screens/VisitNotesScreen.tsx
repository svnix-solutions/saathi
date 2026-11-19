/** Design page 37 · Saathi Care — screen 37.11 · Visit notes: vitals, pain before and after, what was done, next steps. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Check, Grid, H, H2, Icon, Lft, ListCard, ProgressBar, Row, Screen, T, Tag, useNav, useT, useTheme,
} from '@/native/ui';
import { useCareState } from '../state';
import { CARE_STAFF, EXERCISES, NOTE_DONE, NOTE_NEXT, NOTE_PAIN, NOTE_VITALS, dateLabel, fromIso } from '../data';
import { SAMPLE_PLAN } from '../rules';

export function VisitNotesScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [st] = useCareState();
  const plan = st.carePlan ?? SAMPLE_PLAN;
  const staff = CARE_STAFF[plan.kind === 'physio' ? 'physio' : 'nurse'];
  const doneVisits = plan.visits.filter((v) => v.done);
  const last = doneVisits[doneVisits.length - 1] ?? SAMPLE_PLAN.visits[2];
  const visitNo = doneVisits.length || 3;
  const doctor = plan.doctor;
  const pain = (label: string, v: number) => (
    <View style={styles.pain}>
      <Row><T s>{label}</T><T s b>{`${v}/10`}</T></Row>
      <ProgressBar value={v / 10} track={c.mint} fill={v > 5 ? c.red : c.accent} />
    </View>
  );
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Visit notes', 'विज़िट के नोट्स', 'ਵਿਜ਼ਿਟ ਦੇ ਨੋਟਸ')} fallback="care.plan" />
        <Lft>
          <Avatar face={staff.face} size={36} />
          <View style={styles.grow}>
            <H2>{t(`Visit ${visitNo} · ${dateLabel(t, fromIso(last.date))}`, `विज़िट ${visitNo} · ${dateLabel(t, fromIso(last.date))}`, `ਵਿਜ਼ਿਟ ${visitNo} · ${dateLabel(t, fromIso(last.date))}`)}</H2>
            <T s m>{t(`By ${t(...staff.name)} · for ${plan.patient}`, `${t(...staff.name)} द्वारा · ${plan.patient} के लिए`, `${t(...staff.name)} ਵੱਲੋਂ · ${plan.patient} ਲਈ`)}</T>
          </View>
        </Lft>
        {!doneVisits.length && (
          <Card tone="mint"><T s>{t(
            'A sample of the notes you get. Your own notes appear here after the first visit.',
            'आपको मिलने वाले नोट्स का नमूना। पहली विज़िट के बाद आपके नोट्स यहाँ दिखेंगे।',
            'ਤੁਹਾਨੂੰ ਮਿਲਣ ਵਾਲੇ ਨੋਟਸ ਦਾ ਨਮੂਨਾ। ਪਹਿਲੀ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ ਤੁਹਾਡੇ ਨੋਟਸ ਇੱਥੇ ਦਿਸਣਗੇ।',
          )}</T></Card>
        )}
        <Tag tone="g" style={styles.self}>{t(`Shared with ${doctor}`, `${doctor.replace('Dr.', 'डॉ.')} को भेजा गया`, `${doctor.replace('Dr.', 'ਡਾ.')} ਨੂੰ ਭੇਜਿਆ ਗਿਆ`)}</Tag>
        <H2>{t('Vitals', 'जाँच', 'ਜਾਂਚ')}</H2>
        <Grid cols={device === 'small' ? 1 : 2}>
          {NOTE_VITALS.map((v) => (
            <Card key={v.label[0]} style={styles.vital}>
              <T s m>{t(...v.label)}</T>
              <H size={18}>{v.value}</H>
              <T s m>{t(...v.unit)}</T>
            </Card>
          ))}
        </Grid>
        <H2>{t('Pain score', 'दर्द का स्कोर', 'ਦਰਦ ਦਾ ਸਕੋਰ')}</H2>
        <Card style={styles.gap}>
          {pain(t('Before the visit', 'विज़िट से पहले', 'ਵਿਜ਼ਿਟ ਤੋਂ ਪਹਿਲਾਂ'), NOTE_PAIN.before)}
          {pain(t('After the visit', 'विज़िट के बाद', 'ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ'), NOTE_PAIN.after)}
          <T s color={c.accent} b>{t(`Down ${NOTE_PAIN.before - NOTE_PAIN.after} points`, `${NOTE_PAIN.before - NOTE_PAIN.after} अंक कम`, `${NOTE_PAIN.before - NOTE_PAIN.after} ਅੰਕ ਘੱਟ`)}</T>
        </Card>
        <H2>{t('What was done', 'क्या किया गया', 'ਕੀ ਕੀਤਾ ਗਿਆ')}</H2>
        <ListCard gap={8}>
          {NOTE_DONE.map((w) => <Lft key={w[0]} style={styles.top}><Check on size={16} /><T s style={styles.grow}>{t(...w)}</T></Lft>)}
        </ListCard>
        <H2>{t('Exercises for home', 'घर पर कसरत', 'ਘਰ ਲਈ ਕਸਰਤ')}</H2>
        <ListCard gap={8}>
          {EXERCISES.map((e) => (
            <Row key={e.name[0]} style={styles.top}>
              <T s b style={styles.grow}>{t(...e.name)}</T>
              <T s m style={styles.reps}>{t(...e.reps)}</T>
            </Row>
          ))}
        </ListCard>
        <H2>{t('Next steps', 'आगे क्या करें', 'ਅੱਗੇ ਕੀ ਕਰੀਏ')}</H2>
        <ListCard gap={8}>
          {NOTE_NEXT.map((w) => <Lft key={w[0]} style={styles.top}><Icon name="chevron" size={14} color={c.accent} /><T s style={styles.grow}>{t(...w)}</T></Lft>)}
        </ListCard>
        <Grid cols={device === 'small' ? 1 : 2}>
          <Button variant="outline" onPress={() => nav.toast(t('Notes saved as PDF', 'नोट्स PDF में सेव हुए', 'ਨੋਟਸ PDF ਵਿੱਚ ਸੇਵ ਹੋਏ'))}>{t('Download', 'डाउनलोड', 'ਡਾਊਨਲੋਡ')}</Button>
          <Button variant="outline" onPress={() => nav.toast(t('Share link copied for WhatsApp', 'WhatsApp के लिए लिंक कॉपी हुआ', 'WhatsApp ਲਈ ਲਿੰਕ ਕਾਪੀ ਹੋਇਆ'))}>{t('Share', 'शेयर', 'ਸ਼ੇਅਰ')}</Button>
        </Grid>
      </Screen>
    </View>
  );
}

export default VisitNotesScreen;

const styles = StyleSheet.create({
  root: { flex: 1 }, grow: { flex: 1, gap: 2 }, gap: { gap: 10 }, top: { alignItems: 'flex-start' },
  self: { alignSelf: 'flex-start' },
  vital: { gap: 1 },
  pain: { gap: 5 },
  reps: { flex: 1, textAlign: 'right' },
});
