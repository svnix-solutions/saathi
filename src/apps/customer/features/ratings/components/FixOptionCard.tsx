import React from 'react';
import { View } from 'react-native';
import { Card, H2, Radio, T } from '@/native/ui';
import type { FixOption } from '../data';

/** One "How should we fix it?" choice with a radio. */
export function FixOptionCard({ option, selected, onPress }: { option: FixOption; selected: boolean; onPress: () => void }) {
  return (
    <Card row sel={selected} onPress={onPress}>
      <View><H2>{option.title}</H2><T s m>{option.sub}</T></View>
      <Radio on={selected} />
    </Card>
  );
}

export default FixOptionCard;
