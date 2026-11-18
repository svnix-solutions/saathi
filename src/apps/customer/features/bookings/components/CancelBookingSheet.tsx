import React from 'react';
import { Button, H, Sheet, T, useT, useTheme } from '@/native/ui';

export type CancelBookingSheetProps = { visible: boolean; onCancel: () => void; onClose: () => void };

/** "Cancel this booking?" sheet when it is more than 1 hour away (no fee). */
export function CancelBookingSheet({ visible, onCancel, onClose }: CancelBookingSheetProps) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H>{t('Cancel this booking?', 'यह बुकिंग रद्द करें?', 'ਕੀ ਇਹ ਬੁਕਿੰਗ ਰੱਦ ਕਰਨੀ ਹੈ?')}</H>
      <T m>{t('It is more than 1 hour away, so there is no fee.', 'अभी 1 घंटे से ज़्यादा बाकी है, इसलिए कोई शुल्क नहीं।', 'ਹਾਲੇ 1 ਘੰਟੇ ਤੋਂ ਵੱਧ ਬਾਕੀ ਹੈ, ਇਸ ਲਈ ਕੋਈ ਫੀਸ ਨਹੀਂ।')}</T>
      <Button variant="outline" danger style={{ borderColor: c.red }} onPress={onCancel}>{t('Yes, cancel', 'हाँ, रद्द करें', 'ਹਾਂ, ਰੱਦ ਕਰੋ')}</Button>
      <Button onPress={onClose}>{t('Keep booking', 'बुकिंग रहने दें', 'ਬੁਕਿੰਗ ਰਹਿਣ ਦਿਓ')}</Button>
    </Sheet>
  );
}

export default CancelBookingSheet;
