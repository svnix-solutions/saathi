import React from 'react';
import { useTheme } from '../../../theme/index';
import { Icon } from '../Icon';

/** Muted right chevron at the end of a tappable row. Was `Chev` in partner/v1/kit. */
export function Chevron({ color, size }: { color?: string; size?: number }) {
  const { c } = useTheme();
  return <Icon name="chevron" color={color ?? c.mut} size={size} />;
}
