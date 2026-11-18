import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2 } from '../../atoms/H2';
import { Button } from '../../molecules/Button';
import { Pill } from '../../molecules/Pill';
import { Sheet } from '../Sheet';

export type PickOption<V> = { v: V; label: string };

export type PickSheetProps<V extends string | number> = {
  visible: boolean;
  title: string;
  options: PickOption<V>[];
  /** the chosen option */
  value: V;
  /** called with the tapped option; the sheet then closes */
  onPick: (v: V) => void;
  onClose: () => void;
  /** 2 (default) or 3 pills per line */
  cols?: 2 | 3 | number;
  /** label of the outline button (default "Close") */
  closeLabel?: string;
};

/** Bottom sheet with a title and pills to choose one option (time, size, frequency). */
export function PickSheet<V extends string | number>({ visible, title, options, value, onPick, onClose, cols = 2, closeLabel = 'Close' }: PickSheetProps<V>) {
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>{title}</H2>
      <View style={styles.wrap}>
        {options.map((o) => (
          <Pill key={String(o.v)} sel={o.v === value} onPress={() => { onPick(o.v); onClose(); }} style={{ width: cols === 2 ? '48%' : '31%' }}>{o.label}</Pill>
        ))}
      </View>
      <Button variant="outline" onPress={onClose}>{closeLabel}</Button>
    </Sheet>
  );
}

const styles = StyleSheet.create({ wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 } });
