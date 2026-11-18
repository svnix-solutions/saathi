import React from 'react';
import { Button, Card, Grid, H2, Sheet, T } from '@/native/ui';
import type { FixOption } from '../data';

export type ConfirmFixSheetProps = {
  visible: boolean;
  fix: FixOption;
  reasons: string[];
  block: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

/** "Confirm the fix" sheet after a low rating. */
export function ConfirmFixSheet({ visible, fix, reasons, block, onConfirm, onClose }: ConfirmFixSheetProps) {
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>Confirm the fix</H2>
      <Card sel><H2>{fix.title}</H2><T s m>{fix.sub}</T></Card>
      <T s m>Reported: {reasons.join(', ')}{block ? ' · Sunita will not be sent again' : ''}</T>
      <Grid cols={2}>
        <Button variant="outline" onPress={onClose}>Back</Button>
        <Button onPress={onConfirm}>Confirm</Button>
      </Grid>
    </Sheet>
  );
}

export default ConfirmFixSheet;
