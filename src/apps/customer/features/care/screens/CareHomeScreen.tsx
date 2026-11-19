/** Design page 37 · Saathi Care — screen 37.1 · Care home: who it is for, physio or nurse, short procedures, trust. */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Avatar, Card, CharacterTile, ChipGroup, Chevron, H, H2, Icon, IconTile, Lft, Link, ListCard, ProgressBar, Row, Screen, T, Tag, useNav, useT, useTheme,
} from '@/native/ui';
import { CARE_RESCHEDULE_HOURS, nurseHourly, perSession, physioPlans, procedures, relations, rupees, type Relation } from '@/domain';
import { useCareState } from '../state';
import { CareHeader } from '../components/CareHeader';
import { TrustList } from '../components/TrustList';
import { EmergencyNote } from '../components/EmergencyNote';
import { CARE_STAFF, PROCEDURE_ICON, dateLabel, fromIso } from '../data';
import type { CareKind } from '../rules';

/** Procedures shown on the landing; the rest are one tap away. */
const SHORT_LIST = 4;

export function CareHomeScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const [st, set] = useCareState();
  const forWhom: Relation = st.careFor ?? 'parent';
  const cheapestSession = Math.min(...physioPlans.map(perSession));
  const plan = st.carePlan;
  const done = plan ? plan.visits.filter((v) => v.done).length : 0;
  const next = plan?.visits.find((v) => !v.done);
  const start = (kind: CareKind, route: string) => {
    set({ careDraft: { ...st.careDraft, kind } });
    nav.push(route);
  };
  const tile = (kind: CareKind, route: string, title: string, sub: string, from: string) => (
    <Card onPress={() => start(kind, route)} accessibilityLabel={title}>
      <Lft gap={10}>
        {kind === 'physio'
          ? <Avatar face={CARE_STAFF.physio.face} size={device === 'small' ? 48 : 60} />
          : <CharacterTile name="nurse" size={device === 'small' ? 48 : 60} />}
        <View style={styles.grow}>
          <H size={17}>{title}</H>
          <T s m>{sub}</T>
          <T s b color={c.accent}>{from}</T>
        </View>
        <Chevron />
      </Lft>
    </Card>
  );
  return (
    <View style={styles.root}>
      <CareHeader
        label="Saathi Care"
        title={t('Physio and nurse care at home', 'घर पर फ़िज़ियो और नर्स', 'ਘਰ ਤੇ ਫ਼ਿਜ਼ੀਓ ਅਤੇ ਨਰਸ')}
        sub={t('Licensed staff, supervised by Saathi doctors', 'लाइसेंस वाला स्टाफ़, Saathi डॉक्टरों की निगरानी में', 'ਲਾਇਸੈਂਸ ਵਾਲਾ ਸਟਾਫ਼, Saathi ਡਾਕਟਰਾਂ ਦੀ ਨਿਗਰਾਨੀ ਹੇਠ')}
      />
      <Screen>
        {plan && next && (
          <Card tone="mint" onPress={() => nav.push('care.plan')}>
            <Row>
              <H2 style={styles.grow}>{t(...plan.title)}</H2>
              <Chevron />
            </Row>
            <T s m>{t(`For ${plan.patient} · next visit ${dateLabel(t, fromIso(next.date), true)}`, `${plan.patient} के लिए · अगली विज़िट ${dateLabel(t, fromIso(next.date), true)}`, `${plan.patient} ਲਈ · ਅਗਲੀ ਵਿਜ਼ਿਟ ${dateLabel(t, fromIso(next.date), true)}`)}</T>
            <ProgressBar value={done / plan.visits.length} track={c.surface} fill={c.accent} style={styles.bar} />
            <T s>{t(`${done} of ${plan.visits.length} done`, `${plan.visits.length} में से ${done} पूरी`, `${plan.visits.length} ਵਿੱਚੋਂ ${done} ਪੂਰੀਆਂ`)}</T>
          </Card>
        )}
        <H2>{t('Who is the care for?', 'देखभाल किसके लिए है?', 'ਦੇਖਭਾਲ ਕਿਸ ਲਈ ਹੈ?')}</H2>
        <ChipGroup accessibilityLabel={t('Who is the care for?', 'देखभाल किसके लिए है?', 'ਦੇਖਭਾਲ ਕਿਸ ਲਈ ਹੈ?')} value={forWhom}
          onChange={(r) => set({ careFor: r })} items={relations.map((r) => ({ key: r.id, label: t(...r.name) }))} />
        {tile('physio', 'care.physio', t('Physio', 'फ़िज़ियो', 'ਫ਼ਿਜ਼ੀਓ'),
            t('Physiotherapy at home: pain, surgery, stroke, elders', 'घर पर फ़िज़ियोथेरेपी: दर्द, ऑपरेशन, लकवा, बुज़ुर्ग', 'ਘਰ ਤੇ ਫ਼ਿਜ਼ੀਓਥੈਰੇਪੀ: ਦਰਦ, ਅਪਰੇਸ਼ਨ, ਅਧਰੰਗ, ਬਜ਼ੁਰਗ'),
            t(`from ${rupees(cheapestSession)} a visit`, `${rupees(cheapestSession)} प्रति विज़िट से`, `${rupees(cheapestSession)} ਪ੍ਰਤੀ ਵਿਜ਼ਿਟ ਤੋਂ`))}
        {tile('nurse', 'care.nurse', t('Nurse', 'नर्स', 'ਨਰਸ'),
            t('Nurse care by the hour or by the day', 'नर्स देखभाल, घंटे या दिन के हिसाब से', 'ਨਰਸ ਦੇਖਭਾਲ, ਘੰਟੇ ਜਾਂ ਦਿਨ ਦੇ ਹਿਸਾਬ ਨਾਲ'),
            t(`from ${rupees(nurseHourly[0].price)} for 2 hours`, `2 घंटे ${rupees(nurseHourly[0].price)} से`, `2 ਘੰਟੇ ${rupees(nurseHourly[0].price)} ਤੋਂ`))}
        <Row>
          <H2>{t('Short nurse visits', 'छोटी नर्स विज़िट', 'ਛੋਟੀਆਂ ਨਰਸ ਵਿਜ਼ਿਟਾਂ')}</H2>
          <Link onPress={() => start('procedure', 'care.procedures')}>{t('See all', 'सब देखें', 'ਸਭ ਵੇਖੋ')}</Link>
        </Row>
        <ListCard>
          {procedures.slice(0, SHORT_LIST).map((p) => (
            <Pressable key={p.id} accessibilityRole="button" accessibilityLabel={t(...p.name)} style={styles.proc}
              onPress={() => { set({ careDraft: { ...st.careDraft, kind: 'procedure', procedure: p.id } }); nav.push('care.procedures'); }}>
              <IconTile name={PROCEDURE_ICON[p.id]} size={30} />
              <View style={styles.grow}>
                <T b>{t(...p.name)}</T>
                {p.rx && <Tag tone="n" style={styles.tag}>{t('Prescription needed', 'डॉक्टर की पर्ची ज़रूरी', 'ਡਾਕਟਰ ਦੀ ਪਰਚੀ ਜ਼ਰੂਰੀ')}</Tag>}
              </View>
              <T b color={c.accent}>{rupees(p.price)}</T>
            </Pressable>
          ))}
        </ListCard>
        <H2>{t('Why families trust Saathi Care', 'परिवार Saathi Care पर भरोसा क्यों करते हैं', 'ਪਰਿਵਾਰ Saathi Care ਤੇ ਭਰੋਸਾ ਕਿਉਂ ਕਰਦੇ ਹਨ')}</H2>
        <TrustList />
        <Lft style={styles.top}>
          <Icon name="clock" size={16} color={c.accent} />
          <T s m style={styles.grow}>{t(`Free reschedule up to ${CARE_RESCHEDULE_HOURS} hours before a visit.`, `विज़िट से ${CARE_RESCHEDULE_HOURS} घंटे पहले तक बदलना मुफ़्त।`, `ਵਿਜ਼ਿਟ ਤੋਂ ${CARE_RESCHEDULE_HOURS} ਘੰਟੇ ਪਹਿਲਾਂ ਤੱਕ ਬਦਲਣਾ ਮੁਫ਼ਤ।`)}</T>
        </Lft>
        <EmergencyNote />
      </Screen>
    </View>
  );
}

export default CareHomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
  top: { alignItems: 'flex-start' },
  proc: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  tag: { alignSelf: 'flex-start', marginTop: 3 },
  bar: { marginVertical: 6 },
});
