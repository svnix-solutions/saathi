import React from 'react';
import { StyleSheet, View } from 'react-native';
import { clockTime } from '@/domain';
import { Button, Card, H2, Icon, Lft, Row, T, Tag, useT, useTheme } from '@/native/ui';
import { carePatients, minutesLabel, patientLine, visitSub, visitTitle, type CareVisit } from '../data';
import { ButtonRow } from './ButtonRow';
import { RxTag } from './RxTag';

export type VisitCardProps = {
  visit: CareVisit;
  /** notes sent: the card turns quiet and offers the patient page only */
  done?: boolean;
  /** the next visit to start: highlighted */
  next?: boolean;
  onStart: () => void;
  onPatient: () => void;
};

/** One care visit on Today: time, patient (first name, age), what the visit is, area, prescription check, start. */
export function VisitCard({ visit, done, next, onStart, onPatient }: VisitCardProps) {
  const t = useT();
  const { c } = useTheme();
  const p = carePatients[visit.patient];
  return (
    <Card sel={next} style={{ gap: 7 }}>
      <Row>
        <Lft gap={6}><Icon name="clock" size={15} color={c.mut} /><T s b>{clockTime(t, visit.hour, visit.min)} · {minutesLabel(t, visit.minutes)}</T></Lft>
        {done ? <Tag tone="n">{t('Notes sent', 'नोट्स भेजे', 'ਨੋਟਸ ਭੇਜੇ')}</Tag> : next ? <Tag>{t('Next', 'अगला', 'ਅਗਲਾ')}</Tag> : null}
      </Row>
      <View>
        <H2>{patientLine(t, p)}</H2>
        <T>{visitTitle(t, visit)}</T>
        <T s m>{visitSub(t, visit)}</T>
      </View>
      <Lft gap={6}><Icon name="pin" size={15} color={c.mut} /><T s m style={styles.fill}>{t(...visit.area)}</T></Lft>
      {visit.rx && <RxTag>{t(`Prescription checked by ${visit.rx.doctor[0]}`, `पर्चा ${visit.rx.doctor[1]} ने जाँचा`, `ਪਰਚੀ ${visit.rx.doctor[2]} ਨੇ ਜਾਂਚੀ`)}</RxTag>}
      {done ? (
        <Button variant="plain" onPress={onPatient}>{t('See patient and notes', 'मरीज़ और नोट्स देखें', 'ਮਰੀਜ਼ ਅਤੇ ਨੋਟਸ ਦੇਖੋ')}</Button>
      ) : (
        <ButtonRow>
          <Button onPress={onStart}>{t('Start visit', 'विज़िट शुरू करें', 'ਵਿਜ਼ਿਟ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
          <Button variant="outline" onPress={onPatient}>{t('Patient', 'मरीज़', 'ਮਰੀਜ਼')}</Button>
        </ButtonRow>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default VisitCard;
