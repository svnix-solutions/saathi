import React from 'react';
import { I } from '../Icon/Icon';

export type CheckProps = {
  /** Ticked. */
  on: boolean;
  /** Called with the new value on click. */
  onChange?: (v: boolean) => void;
};

/** Square checkbox (`.cb`), green with a tick when on. */
export const Check = ({ on, onChange }: CheckProps) => (
  <span role="checkbox" aria-checked={on} tabIndex={0} className={`cb ${on ? 'on' : ''} clk`} onClick={() => onChange?.(!on)}>{on && <I n="check" />}</span>
);
