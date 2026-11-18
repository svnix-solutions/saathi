import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Row, palette, useT, useTheme } from '@/native/ui';

/** Sent → Approved → Live progress for a testimonial. `step` is 1, 2 or 3. */
export function ApprovalSteps({ step }: { step: number }) {
  const t = useT();
  const { c } = useTheme();
  const label = (text: string, n: number) => (
    <Text style={[styles.label, { fontWeight: step >= n ? '700' : '400', color: step >= n ? c.accent : c.mut }]}>{text}</Text>
  );
  const bar = (on: boolean) => <View style={[styles.bar, { backgroundColor: on ? palette.green : c.line }]} />;
  return <Row gap={4}>{label(t('Sent', 'भेजा', 'ਭੇਜਿਆ'), 1)}{bar(step >= 2)}{label(t('Approved', 'मंज़ूर', 'ਮਨਜ਼ੂਰ'), 2)}{bar(step >= 3)}{label(t('Live', 'लाइव', 'ਲਾਈਵ'), 3)}</Row>;
}

const styles = StyleSheet.create({
  label: { fontSize: 11 },
  bar: { flex: 1, height: 3, borderRadius: 2 },
});
