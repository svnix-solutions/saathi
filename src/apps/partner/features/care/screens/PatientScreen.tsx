/** Design page 38 · 4 · The patient across the plan: sessions, pain trend, notes, family, allergies (params: { patient }). */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Bars, Button, Card, H, H2, IconTile, ListCard, Lft, Meter, Page, Row, Screen, T, Tag, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { WordChips } from '../components/WordChips';
import { carePatients, flagReasons, patientLine, relationName, visitTitle, visitToday, type PatientId } from '../data';
import { useCareState } from '../state';

export function PatientScreen({ params }: ScreenProps<{ patient?: PatientId }>) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useCareState();
  const p = carePatients[params.patient ?? 'harbans'] ?? carePatients.harbans;
  const today = visitToday(p.id);
  const sent = today ? st.careNotes?.[today.id] : undefined;
  const done = p.done + (sent ? 1 : 0);
  const pain = sent ? [...p.pain, sent.after] : p.pain;
  /** one bar per visit on the plan: the pain score after it, empty for visits still to come */
  const slots: (number | undefined)[] = Array.from({ length: Math.max(p.total, pain.length) }, (_, i) => pain[i]);
  const flag = sent?.flag ? flagReasons.find((r) => r.id === sent.flag) : undefined;
  const callFamily = () => nav.toast(t(`Calling ${p.family.name[0]} (number hidden)`, `${p.family.name[1]} को कॉल (नंबर छुपा)`, `${p.family.name[2]} ਨੂੰ ਕਾਲ (ਨੰਬਰ ਲੁਕਿਆ)`));

  return (
    <Page>
      <Screen>
        <BackHeader title={t('Patient', 'मरीज़', 'ਮਰੀਜ਼')} fallback="care.today" />
        <Card style={{ gap: 8 }}>
          <H>{patientLine(t, p)}</H>
          <T s m>{t(...p.plan)}</T>
          <Row><T s b>{t(`${done} of ${p.total} done`, `${p.total} में से ${done} पूरे`, `${p.total} ਵਿੱਚੋਂ ${done} ਪੂਰੇ`)}</T><T s m>{t(`${p.total - done} left`, `${p.total - done} बाक़ी`, `${p.total - done} ਬਾਕੀ`)}</T></Row>
          <Lft><Meter value={done / p.total} /></Lft>
        </Card>

        <H2>{t('Pain after each visit', 'हर विज़िट के बाद दर्द', 'ਹਰ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ ਦਰਦ')}</H2>
        <Card>
          {pain.length > 0 ? (
            <>
              <Bars values={slots.map((x) => (x === undefined ? 0 : Math.max(x, 1) / 10))} highlight={pain.length - 1} labels={slots.map((x) => (x === undefined ? '' : String(x)))} height={80} />
              <T s m style={{ marginTop: 6 }}>
                {pain.length > 1 && pain[pain.length - 1] < pain[0]
                  ? t(`Down from ${pain[0]} to ${pain[pain.length - 1]} out of 10`, `10 में से ${pain[0]} से घटकर ${pain[pain.length - 1]}`, `10 ਵਿੱਚੋਂ ${pain[0]} ਤੋਂ ਘਟ ਕੇ ${pain[pain.length - 1]}`)
                  : t('Pain out of 10 after each visit. Grey: visits still to come.', 'हर विज़िट के बाद 10 में से दर्द। ग्रे: आने वाली विज़िट।', 'ਹਰ ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ 10 ਵਿੱਚੋਂ ਦਰਦ। ਸਲੇਟੀ: ਆਉਣ ਵਾਲੀਆਂ ਵਿਜ਼ਿਟਾਂ।')}
              </T>
            </>
          ) : (
            <T s m>{t('No pain scores yet. The first one comes with today’s notes.', 'अभी कोई दर्द स्कोर नहीं। पहला आज के नोट्स के साथ आएगा।', 'ਹਾਲੇ ਕੋਈ ਦਰਦ ਸਕੋਰ ਨਹੀਂ। ਪਹਿਲਾ ਅੱਜ ਦੇ ਨੋਟਸ ਨਾਲ ਆਵੇਗਾ।')}</T>
          )}
        </Card>

        <Card style={{ gap: 8 }}>
          <H2>{t('Allergies', 'एलर्जी', 'ਐਲਰਜੀ')}</H2>
          {p.allergies.length ? <WordChips tone="red" items={p.allergies.map((a) => t(...a))} /> : <T s m>{t('No known allergies', 'कोई ज्ञात एलर्जी नहीं', 'ਕੋਈ ਜਾਣੀ-ਪਛਾਣੀ ਐਲਰਜੀ ਨਹੀਂ')}</T>}
          <H2>{t('Conditions', 'बीमारियाँ', 'ਬੀਮਾਰੀਆਂ')}</H2>
          <WordChips items={p.conditions.map((x) => t(...x))} />
        </Card>

        <Card row>
          <Lft style={styles.fill}>
            <IconTile name="user" />
            <View style={styles.fill}>
              <H2>{t(...p.family.name)}</H2>
              <T s m>{t(`Family contact · ${relationName(t, p.family.relation)}`, `परिवार से संपर्क · ${relationName(t, p.family.relation)}`, `ਪਰਿਵਾਰ ਨਾਲ ਸੰਪਰਕ · ${relationName(t, p.family.relation)}`)}</T>
            </View>
          </Lft>
          <IconTile name="call" onPress={callFamily} />
        </Card>

        <H2>{t('Previous notes', 'पिछले नोट्स', 'ਪਿਛਲੇ ਨੋਟਸ')}</H2>
        {sent || p.notes.length ? (
          <ListCard>
            {sent && today && (
              <View style={{ gap: 3 }}>
                <Row><T s b>{t('Today · you', 'आज · आप', 'ਅੱਜ · ਤੁਸੀਂ')}</T>{flag ? <Tag tone="r">{t(...flag.label)}</Tag> : <Tag tone="n">{t(`Pain ${sent.before} → ${sent.after}`, `दर्द ${sent.before} → ${sent.after}`, `ਦਰਦ ${sent.before} → ${sent.after}`)}</Tag>}</Row>
                <T s m>{visitTitle(t, today)}</T>
                <T s>{sent.text}</T>
              </View>
            )}
            {p.notes.map((n) => (
              <View key={n.text[0]} style={{ gap: 3 }}>
                <Row><T s b style={styles.fill}>{t(...n.when)} · {t(...n.by)}</T>{n.pain !== undefined && <Tag tone="x">{t(`Pain ${n.pain}`, `दर्द ${n.pain}`, `ਦਰਦ ${n.pain}`)}</Tag>}</Row>
                <T s>{t(...n.text)}</T>
              </View>
            ))}
          </ListCard>
        ) : (
          <Card tone="clear"><T s m>{t('This is the first visit. No notes yet.', 'यह पहली विज़िट है। अभी कोई नोट्स नहीं।', 'ਇਹ ਪਹਿਲੀ ਵਿਜ਼ਿਟ ਹੈ। ਹਾਲੇ ਕੋਈ ਨੋਟਸ ਨਹੀਂ।')}</T></Card>
        )}

        {today && !sent && (
          <Button size="tall" onPress={() => nav.push('care.visit', { visit: today.id })}>{t('Start today’s visit', 'आज की विज़िट शुरू करें', 'ਅੱਜ ਦੀ ਵਿਜ਼ਿਟ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
        )}
        <T s m color={c.mut}>{t('Share nothing about the patient outside Saathi.', 'मरीज़ की कोई बात Saathi के बाहर शेयर न करें।', 'ਮਰੀਜ਼ ਦੀ ਕੋਈ ਗੱਲ Saathi ਤੋਂ ਬਾਹਰ ਸ਼ੇਅਰ ਨਾ ਕਰੋ।')}</T>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default PatientScreen;
