import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type RingProps = {
  /** elapsed share, 0–1 */
  pct: number;
  /** diameter in px (default 150) */
  size?: number;
  /** centre content (time left) */
  children?: React.ReactNode;
};

/** Circular countdown (the "Job in progress" ring): green arc on mint. */
export function Ring({ pct, size = 150, children }: RingProps) {
  const { c } = useTheme();
  return (
    <View style={{ alignSelf: 'center', width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', backgroundImage: `conic-gradient(${palette.green} 0 ${pct * 100}%, ${c.mint} 0)` } as ViewStyle}>
      <View style={{ width: size - 28, height: size - 28, borderRadius: size, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }}>{children}</View>
    </View>
  );
}
