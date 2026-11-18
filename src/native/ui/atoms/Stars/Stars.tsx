import React from 'react';
import { Pressable, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon } from '../Icon';

export type StarsProps = {
  /** rating, rounded to whole stars */
  value: number;
  /** makes the stars tappable */
  onChange?: (n: number) => void;
  /** star size in px (default 16; above 20 the gap grows to 6) */
  size?: number;
  max?: number;
};

/** Star rating. Interactive when `onChange` is given. */
export function Stars({ value, onChange, size = 16, max = 5 }: StarsProps) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: size > 20 ? 6 : 2 }} accessibilityLabel={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => {
        const on = i < Math.round(value);
        const star = <Icon name="star" size={size} color={on ? palette.yellow : c.line} fill={on} />;
        return onChange ? <Pressable key={i} onPress={() => onChange(i + 1)} accessibilityLabel={`${i + 1} stars`}>{star}</Pressable> : <View key={i}>{star}</View>;
      })}
    </View>
  );
}
