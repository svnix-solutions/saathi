import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, Radio, T } from '@/native/ui';

export type ChoiceCardProps = { title: string; sub: string; selected: boolean; onPress: () => void };

/** A selectable card with a title, a muted line and a radio at the right end. */
export function ChoiceCard({ title, sub, selected, onPress }: ChoiceCardProps) {
  return (
    <Card sel={selected} row onPress={onPress}>
      <View style={styles.text}><H2>{title}</H2><T s m>{sub}</T></View>
      <Radio on={selected} />
    </Card>
  );
}

const styles = StyleSheet.create({ text: { flex: 1 } });
