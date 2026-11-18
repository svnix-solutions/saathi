import React from 'react';

export type ToggleProps = {
  /** Switched on (green) or off (grey). */
  on: boolean;
  /** Called with the new value on click, Space or Enter. */
  onChange?: (v: boolean) => void;
};

/** On/off switch (`.tog`), keyboard accessible (`role="switch"`). */
export const Toggle = ({ on, onChange }: ToggleProps) => (
  <span role="switch" aria-checked={on} tabIndex={0} className={`tog ${on ? '' : 'off'} clk`} onClick={() => onChange?.(!on)}
    onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange?.(!on); } }}><span /></span>
);
