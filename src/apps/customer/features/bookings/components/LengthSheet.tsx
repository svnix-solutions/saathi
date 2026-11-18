import React from 'react';
import { Grid, H, Pill, Sheet, useT } from '@/native/ui';
import { dur } from '@/domain';
import { bookingLengths } from '../data';

export type LengthSheetProps = { visible: boolean; minutes: number; onPick: (minutes: number) => void; onClose: () => void };

/** "How long?" sheet on Change booking. */
export function LengthSheet({ visible, minutes, onPick, onClose }: LengthSheetProps) {
  const t = useT();
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H>{t('How long?', 'कितनी देर?', 'ਕਿੰਨਾ ਸਮਾਂ?')}</H>
      <Grid cols={3}>
        {bookingLengths.map((m) => (
          <Pill key={m} sel={minutes === m} onPress={() => onPick(m)}>{dur(t, m)}</Pill>
        ))}
      </Grid>
    </Sheet>
  );
}

export default LengthSheet;
