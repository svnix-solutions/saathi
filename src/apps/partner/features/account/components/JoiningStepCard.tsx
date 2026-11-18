import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Check, H2, Lft, T } from '@/native/ui';

/** One joining step: a 24px tick box, the step name and a status line, with an optional tag on the right. */
export function JoiningStepCard({ done, title, sub, right, sel, onPress }: {
  done?: boolean; title: string; sub: string; right?: React.ReactNode; sel?: boolean; onPress?: () => void;
}) {
  return (
    <Card row sel={sel} onPress={onPress}>
      <Lft style={styles.fill}><Check on={done} size={24} /><View style={styles.fill}><H2>{title}</H2><T s m>{sub}</T></View></Lft>
      {right}
    </Card>
  );
}

export default JoiningStepCard;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
