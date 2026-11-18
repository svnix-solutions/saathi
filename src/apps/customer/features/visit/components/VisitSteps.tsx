import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Row, T, palette, useT, useTheme } from '@/native/ui';

/** "Assigned — On the way — Arrived" step line under the helper card on Tracking. */
export function VisitSteps({ arrived }: { arrived: boolean }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Row gap={4}>
      <T s b color={c.accent}>{t('Assigned', 'तय', 'ਤੈਅ')}</T>
      <View style={[styles.segment, styles.done]} />
      <T s b color={c.accent}>{t('On the way', 'रास्ते में', 'ਰਾਹ ਵਿੱਚ')}</T>
      <View style={[styles.segment, { backgroundColor: arrived ? palette.green : c.line }]} />
      {arrived ? <T s b color={c.accent}>{t('Arrived', 'पहुँचीं', 'ਪਹੁੰਚ ਗਈ')}</T> : <T s m>{t('Arrived', 'पहुँचीं', 'ਪਹੁੰਚ ਗਈ')}</T>}
    </Row>
  );
}

export default VisitSteps;

const styles = StyleSheet.create({
  segment: { flex: 1, height: 3, borderRadius: 2 },
  done: { backgroundColor: palette.green },
});
