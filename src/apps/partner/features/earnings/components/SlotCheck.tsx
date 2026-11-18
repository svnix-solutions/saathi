import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, palette, useTheme } from '@/native/ui';

/** The planner's small 16px tick box (radius 5, 11px tick), drawn slightly smaller than the `Check` atom. */
export function SlotCheck({ on }: { on: boolean }) {
  const { c } = useTheme();
  return (
    <View style={[styles.box, { borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent' }]}>
      {on && <Icon name="check" size={11} color={palette.white} strokeWidth={3} />}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 16, height: 16, borderRadius: 5, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
});

export default SlotCheck;
