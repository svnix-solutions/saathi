import React from 'react';
import { H, Pill, Sheet, useT } from '@/native/ui';
import { rescheduleSlots } from '../data';

export type RescheduleSheetProps = { visible: boolean; slot: string; onPick: (slot: string, slotHi: string) => void; onClose: () => void };

/** "Pick a new time" sheet on Change booking. */
export function RescheduleSheet({ visible, slot, onPick, onClose }: RescheduleSheetProps) {
  const t = useT();
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H>{t('Pick a new time', 'नया समय चुनें')}</H>
      {rescheduleSlots.map(([en, hi]) => (
        <Pill key={en} sel={slot === en} onPress={() => onPick(en, hi)}>{t(en, hi)}</Pill>
      ))}
    </Sheet>
  );
}

export default RescheduleSheet;
