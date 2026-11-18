import React from 'react';
import { Button, H, Sheet, T, useT } from '@/native/ui';
import { decisions } from '@/domain';

export type CancelVisitSheetProps = { visible: boolean; onClose: () => void; onCancel: () => void };

/** "Cancel this booking?" sheet while the helper is on the way (late-cancel fee applies). */
export function CancelVisitSheet({ visible, onClose, onCancel }: CancelVisitSheetProps) {
  const t = useT();
  const { lateCancelFee, cancelAfterArrival } = decisions.customer;
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H>{t('Cancel this booking?', 'यह बुकिंग रद्द करें?')}</H>
      <T m>{t(`Sunita is already on the way, so a ₹${lateCancelFee} fee applies. After she arrives it is ₹${cancelAfterArrival}.`,
        `सुनीता रास्ते में हैं, इसलिए ₹${lateCancelFee} शुल्क लगेगा। उनके पहुँचने के बाद ₹${cancelAfterArrival}।`)}</T>
      <Button variant="outline" danger onPress={onCancel}>
        {t(`Cancel · ₹${lateCancelFee}`, `रद्द करें · ₹${lateCancelFee}`)}
      </Button>
      <Button onPress={onClose}>{t('Keep my helper', 'हेल्पर रहने दें')}</Button>
    </Sheet>
  );
}

export default CancelVisitSheet;
