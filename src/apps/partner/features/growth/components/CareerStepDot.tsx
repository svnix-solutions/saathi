import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, palette, useTheme } from '@/native/ui';
import type { CareerStepState } from '../data';

/** Round marker on the career path: green tick when done, yellow star where you are, empty ring ahead. */
export function CareerStepDot({ state }: { state: CareerStepState }) {
  const { c } = useTheme();
  const color = state === 'here' ? palette.yellow : state === 'done' ? palette.green : c.line;
  return (
    <View style={[styles.dot, { borderColor: color, backgroundColor: state === 'todo' ? 'transparent' : color }]}>
      {state === 'done' && <Icon name="check" size={14} color={palette.white} strokeWidth={3} />}
      {state === 'here' && <Icon name="star" size={14} color={palette.ink} />}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
});

export default CareerStepDot;
