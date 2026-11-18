import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Row, T, useT, useTheme } from '@/native/ui';
import { decisions, rupees } from '@/domain';

/** "If you cancel" fee table on Change booking. */
export function CancelFeesCard() {
  const t = useT();
  const { c } = useTheme();
  return (
    <Card style={styles.card}>
      <Row><T s m>{t('More than 1 hr before', '1 घंटे से ज़्यादा पहले')}</T><T s b color={c.accent}>{t('Free', 'मुफ़्त')}</T></Row>
      <Row><T s m>{t('Less than 1 hr before', '1 घंटे से कम पहले')}</T><T s b>{rupees(decisions.customer.lateCancelFee)}</T></Row>
      <Row><T s m>{t('After the helper arrives', 'हेल्पर के पहुँचने के बाद')}</T><T s b>{rupees(decisions.customer.cancelAfterArrival)}</T></Row>
    </Card>
  );
}

export default CancelFeesCard;

const styles = StyleSheet.create({ card: { gap: 6 } });
