/**
 * Compatibility shim: these helpers now live in the admin design system (../ui). See ../ui/README.md for the
 * old name → component table. New code should import from '../ui' directly.
 */
import React from 'react';
import { Button } from '../ui';

export { BarRow, Columns, TogRow, CardHead, Field, KPI_GRID } from '../ui';
export { inr } from '../fixtures/format';

/** `<Button size={sm ? 'compact' : 'md'} variant=…>`. */
export function Btn({ o, red, sm, style, onClick, children, disabled }: {
  o?: boolean; red?: boolean; sm?: boolean; style?: React.CSSProperties; onClick?: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  return (
    <Button size={sm ? 'compact' : 'md'} variant={o ? (red ? 'danger-outline' : 'outline') : (red ? 'danger' : 'primary')}
      disabled={disabled} style={style} onClick={onClick}>{children}</Button>
  );
}
