import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, T, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import type { Txn } from '../data';

/** One wallet line: title and date on the left, "+ ₹79" (green) or "− ₹158" on the right. */
export function TxnRow({ txn }: { txn: Txn }) {
  const { c } = useTheme();
  const t = useT();
  const credit = txn.amt > 0;
  return (
    <Row>
      <View style={styles.grow}><T b>{t(txn.title.en, txn.title.hi, txn.title.pa)}</T><T s m>{t(txn.sub.en, txn.sub.hi, txn.sub.pa)}</T></View>
      <T b color={credit ? c.accent : undefined}>{credit ? '+' : '−'} {rupees(Math.abs(txn.amt))}</T>
    </Row>
  );
}

export default TxnRow;

const styles = StyleSheet.create({ grow: { flex: 1 } });
