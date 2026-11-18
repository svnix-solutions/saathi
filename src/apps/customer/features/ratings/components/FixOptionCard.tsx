import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, Radio, T, useT } from '@/native/ui';
import { tr } from '../../helpers';
import type { FixOption } from '../data';

/** One "How should we fix it?" choice with a radio. */
export function FixOptionCard({ option, selected, onPress }: { option: FixOption; selected: boolean; onPress: () => void }) {
  const t = useT();
  return (
    <Card row sel={selected} onPress={onPress}>
      <View style={styles.grow}><H2>{tr(t, option.title)}</H2><T s m>{tr(t, option.sub)}</T></View>
      <Radio on={selected} />
    </Card>
  );
}

export default FixOptionCard;

const styles = StyleSheet.create({ grow: { flex: 1 } });
