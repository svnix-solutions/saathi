import React from 'react';
import { Button, Card, Grid, H2, Sheet, T, useT } from '@/native/ui';
import { tr } from '../../helpers';
import { lowReasons, type FixOption } from '../data';

export type ConfirmFixSheetProps = {
  visible: boolean;
  fix: FixOption;
  /** picked reasons, by their English text */
  reasons: string[];
  block: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

/** "Confirm the fix" sheet after a low rating. */
export function ConfirmFixSheet({ visible, fix, reasons, block, onConfirm, onClose }: ConfirmFixSheetProps) {
  const t = useT();
  const reasonText = (en: string) => { const r = lowReasons.find((x) => x.en === en); return r ? tr(t, r) : en; };
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>{t('Confirm the fix', 'समाधान पक्का करें', 'ਹੱਲ ਪੱਕਾ ਕਰੋ')}</H2>
      <Card sel><H2>{tr(t, fix.title)}</H2><T s m>{tr(t, fix.sub)}</T></Card>
      <T s m>
        {t('Reported: ', 'बताया गया: ', 'ਦੱਸਿਆ: ')}{reasons.map(reasonText).join(', ')}
        {block ? t(' · Sunita will not be sent again', ' · सुनीता को दोबारा नहीं भेजा जाएगा', ' · ਸੁਨੀਤਾ ਨੂੰ ਦੁਬਾਰਾ ਨਹੀਂ ਭੇਜਿਆ ਜਾਵੇਗਾ') : ''}
      </T>
      <Grid cols={2}>
        <Button variant="outline" onPress={onClose}>{t('Back', 'वापस', 'ਵਾਪਸ')}</Button>
        <Button onPress={onConfirm}>{t('Confirm', 'पक्का करें', 'ਪੱਕਾ ਕਰੋ')}</Button>
      </Grid>
    </Sheet>
  );
}

export default ConfirmFixSheet;
