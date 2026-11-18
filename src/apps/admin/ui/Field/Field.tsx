import React from 'react';

export type FieldProps = {
  /** Bold label above the control. */
  label: string;
  /** The control: `<input className="inp">`, `<select className="inp">`, `<textarea className="inp">`… */
  children: React.ReactNode;
};

/** Labelled form field (`label.fld`), used in modals. */
export const Field = ({ label, children }: FieldProps) => (
  <label className="fld"><span className="h2">{label}</span>{children}</label>
);
