import React from 'react';
import { dateLabel, type Prescription } from '../data';

/** Placeholder for the family's photo of a prescription: blurred or cut off when the photo is bad. */
export function RxPhoto({ rx, tall }: { rx: Prescription; tall?: boolean }) {
  const cls = rx.photo === 'blurry' ? 'care-photo-blurry' : rx.photo === 'cut' ? 'care-photo-cut' : '';
  return (
    <div className={`care-photo ${cls} ${tall ? 'care-photo-tall' : ''}`} aria-label={`Prescription photo for ${rx.patient}`}>
      <div className="care-photo-head"><div><b>{rx.doctor}</b><div className="s m">{rx.clinic} · Reg. {rx.regNo}</div></div><span className="s">{dateLabel(rx.written)}</span></div>
      <div className="care-photo-lines"><span className="care-photo-rx">Rx</span><span>{rx.patient}, {rx.age} y</span><span>{rx.medicine}</span></div>
      <div className="care-photo-sign">{rx.doctor.replace('Dr. ', '')}</div>
    </div>
  );
}
