import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type ToggleProps = {
  on: boolean;
  onChange?: (v: boolean) => void;
  /** 46×26 instead of 34×20 */
  big?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
};

/** On/off switch (the design's `.tog`). Green when on. */
export function Toggle({ on, onChange, big, disabled, accessibilityLabel }: ToggleProps) {
  const { c } = useTheme();
  const w = big ? 46 : 34, h = big ? 26 : 20, k = big ? 20 : 14;
  return (
    <Pressable accessibilityRole="switch" accessibilityState={{ checked: on, disabled: !!disabled }} accessibilityLabel={accessibilityLabel}
      disabled={disabled} onPress={() => onChange?.(!on)}
      style={[styles.track, { width: w, height: h, backgroundColor: on ? palette.green : c.line, justifyContent: on ? 'flex-end' : 'flex-start' }, disabled ? styles.disabled : null]}>
      <View style={[styles.knob, { width: k, height: k, borderRadius: k / 2 }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: { borderRadius: 20, padding: 3, flexDirection: 'row' },
  knob: { backgroundColor: palette.white },
  disabled: { opacity: 0.45 },
});
