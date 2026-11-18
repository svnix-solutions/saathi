import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Check, Lft, T } from '@/native/ui';

export type ClaimStep = { title: string; sub: string; done: boolean };

/** Ticked checklist of where a damage claim is (sent, checked, decision, paid). */
export function ClaimSteps({ steps }: { steps: ClaimStep[] }) {
  return (
    <Card style={styles.list}>
      {steps.map((s) => (
        <Lft key={s.title} style={styles.top}>
          <Check on={s.done} />
          <View style={styles.grow}><T b={s.done}>{s.title}</T><T s m>{s.sub}</T></View>
        </Lft>
      ))}
    </Card>
  );
}

export default ClaimSteps;

const styles = StyleSheet.create({
  list: { gap: 10 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
