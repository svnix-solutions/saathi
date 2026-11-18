import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, T, Toggle } from '@/native/ui';

export type ToggleCardProps = {
  title: string;
  sub: string;
  on: boolean;
  onChange: (v: boolean) => void;
  /** makes the card itself a button (the toggle still works on its own) */
  onPress?: () => void;
};

/** A card with a bold title, a muted sub-line and a switch at the right end (payment and alert settings). */
export function ToggleCard({ title, sub, on, onChange, onPress }: ToggleCardProps) {
  return (
    <Card row onPress={onPress}>
      <View style={styles.text}><H2>{title}</H2><T s m>{sub}</T></View>
      <Toggle on={on} onChange={onChange} />
    </Card>
  );
}

export default ToggleCard;

const styles = StyleSheet.create({ text: { flex: 1 } });
