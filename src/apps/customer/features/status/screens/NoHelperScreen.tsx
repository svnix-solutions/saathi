import React, { useState } from 'react';
import { Button, Spacer, T, useNav, useT } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { StatusScreen } from '../components/StatusScreen';
import { ChoiceCard } from '../components/ChoiceCard';

/** Design page 07 · When something is empty or goes wrong — screen 20 · No helper free. */
export function NoHelperScreen() {
  const nav = useNav();
  const t = useT();
  const [, set] = useCustomerState();
  const [pick, setPick] = useState<'wait' | 'later'>('wait');
  const confirm = () => {
    if (pick === 'wait') {
      nav.reset('tracking');
      nav.toast(t('Sunita D. accepted · about 35 min', 'सुनीता डी. ने माना · लगभग 35 मिनट'));
      return;
    }
    set({ when: 'later', day: 'today', upcoming: { service: 'general', minutes: 60, slot: 'Today · 1:00 pm', slotHi: 'आज · दोपहर 1:00', helper: 'Rekha M.' } });
    nav.reset('bookings');
    nav.toast(t('Booked for 1:00 pm today', 'आज दोपहर 1:00 के लिए बुक हुआ'));
  };
  const cancel = () => { nav.reset('home'); nav.toast(t('Cancelled · no charge', 'रद्द · कोई शुल्क नहीं')); };
  return (
    <StatusScreen
      title={t('Finding your helper', 'आपका हेल्पर ढूँढ रहे हैं')}
      onBack={nav.back}
      icon="clock"
      heading={t('No helper is free in 15 minutes', '15 मिनट में कोई हेल्पर खाली नहीं है')}
      message={t('It is a busy hour in Block C. The earliest a helper can reach you is in about 35 minutes.', 'ब्लॉक सी में अभी व्यस्त समय है। हेल्पर सबसे जल्दी लगभग 35 मिनट में पहुँच सकता है।')}
    >
      <ChoiceCard selected={pick === 'wait'} onPress={() => setPick('wait')}
        title={t('Wait about 35 minutes', 'लगभग 35 मिनट रुकें')} sub={t('We keep looking for someone sooner', 'हम जल्दी आने वाले को ढूँढते रहेंगे')} />
      <ChoiceCard selected={pick === 'later'} onPress={() => setPick('later')}
        title={t('Book for later today', 'आज बाद के लिए बुक करें')} sub={t('Next sure slot: 1:00 pm', 'अगला पक्का समय: दोपहर 1:00')} />
      <T s m>{t('You are not charged until a helper accepts.', 'हेल्पर के मानने तक कोई पैसा नहीं लगेगा।')}</T>
      <Spacer />
      <Button onPress={confirm}>{t('Confirm', 'पक्का करें')}</Button>
      <Button variant="plain" onPress={cancel}>{t('Cancel, no charge', 'रद्द करें, कोई शुल्क नहीं')}</Button>
    </StatusScreen>
  );
}

export default NoHelperScreen;
