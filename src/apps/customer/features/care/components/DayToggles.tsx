import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Pill, useT } from '@/native/ui';
import { WEEKDAYS } from '../data';

/** Seven weekday chips you can switch on and off (visit days of a plan). Wraps on a small phone. */
export function DayToggles({ value, onChange }: { value: number[]; onChange: (v: number[]) => void }) {
  const t = useT();
  const flip = (i: number) => onChange(value.includes(i) ? value.filter((x) => x !== i) : [...value, i].sort());
  return (
    <View style={styles.row}>
      {WEEKDAYS.map((w, i) => (
        <Pill key={w[0]} s sel={value.includes(i)} onPress={() => flip(i)} style={styles.pill}>{t(...w)}</Pill>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  pill: { minWidth: 42, paddingHorizontal: 8 },
});
