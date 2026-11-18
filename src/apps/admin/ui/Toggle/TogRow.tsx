import React from 'react';
import { Toggle } from './Toggle';

export type TogRowProps = {
  /** Text on the left. */
  label: React.ReactNode;
  on: boolean;
  onChange: (v: boolean) => void;
};

/** Settings row: label on the left, `<Toggle>` on the right. */
export const TogRow = ({ label, on, onChange }: TogRowProps) => (
  <div className="row"><span>{label}</span><Toggle on={on} onChange={onChange} /></div>
);
