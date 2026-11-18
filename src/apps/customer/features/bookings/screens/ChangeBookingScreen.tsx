import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, H2, ListCard, MenuRow, Screen, Spacer, useNav, useT, useTheme, type ScreenProps } from '@/native/ui';
import { decisions, dur, priceFor, rupees } from '@/domain';
import { defaultUpcoming, useCustomerState, type UpcomingBooking } from '../../../state';
import { BookingSummaryCard } from '../components/BookingSummaryCard';
import { CancelBookingSheet } from '../components/CancelBookingSheet';
import { CancelFeesCard } from '../components/CancelFeesCard';
import { LengthSheet } from '../components/LengthSheet';
import { RescheduleSheet } from '../components/RescheduleSheet';
import { helperSwap } from '../data';
import { slotPa } from '../slot';
import { helperName } from '../../helpers';

/** Design page 05 · screen 14, change or cancel a booking (params `{ cancel: true }` opens the cancel sheet). */
export function ChangeBookingScreen({ params }: ScreenProps<{ cancel?: boolean }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const b = st.upcoming ?? defaultUpcoming;
  const [sheet, setSheet] = useState<null | 'time' | 'length' | 'cancel'>(params.cancel ? 'cancel' : null);
  const close = () => setSheet(null);
  const update = (patch: Partial<UpcomingBooking>) => set({ upcoming: { ...b, ...patch } });
  const swapHelper = () => {
    update({ helper: b.helper === helperSwap[0] ? helperSwap[1] : helperSwap[0] });
    nav.toast(t('We will send a different helper', 'हम दूसरा हेल्पर भेजेंगे', 'ਅਸੀਂ ਦੂਜਾ ਹੈਲਪਰ ਭੇਜਾਂਗੇ'));
  };
  const move = (slot: string, slotHi: string) => {
    update({ slot, slotHi, slotPa: slotPa(slot) });
    close();
    nav.toast(t(`Moved to ${slot}`, `${slotHi} पर किया गया`, `${slotPa(slot)} ਤੇ ਕਰ ਦਿੱਤੀ`));
  };
  const resize = (m: number) => {
    update({ minutes: m });
    close();
    nav.toast(t(`Now ${dur(t, m)} · ${rupees(priceFor(b.service, m))}`, `अब ${dur(t, m)} · ${rupees(priceFor(b.service, m))}`, `ਹੁਣ ${dur(t, m)} · ${rupees(priceFor(b.service, m))}`));
  };
  const cancel = () => {
    set({ upcoming: null });
    close();
    nav.reset('bookings');
    nav.toast(t('Booking cancelled · no charge', 'बुकिंग रद्द · कोई शुल्क नहीं', 'ਬੁਕਿੰਗ ਰੱਦ · ਕੋਈ ਫੀਸ ਨਹੀਂ'));
  };
  const freeHrs = decisions.customer.freeCancelUntilHrs;
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Change booking', 'बुकिंग बदलें', 'ਬੁਕਿੰਗ ਬਦਲੋ')} onBack={nav.back} />
        <BookingSummaryCard booking={b} />
        <ListCard gap={11}>
          <MenuRow label={t('Move to another time', 'दूसरे समय पर करें', 'ਕਿਸੇ ਹੋਰ ਸਮੇਂ ਤੇ ਕਰੋ')} sub={t(`Free until ${freeHrs} hr before`, `${freeHrs} घंटा पहले तक मुफ़्त`, `${freeHrs} ਘੰਟਾ ਪਹਿਲਾਂ ਤੱਕ ਮੁਫ਼ਤ`)} onPress={() => setSheet('time')} />
          <MenuRow label={t('Make it longer or shorter', 'समय बढ़ाएँ या घटाएँ', 'ਸਮਾਂ ਵਧਾਓ ਜਾਂ ਘਟਾਓ')} sub={t(`Now ${dur(t, b.minutes)}`, `अभी ${dur(t, b.minutes)}`, `ਹੁਣ ${dur(t, b.minutes)}`)} onPress={() => setSheet('length')} />
          <MenuRow label={t('Ask for a different helper', 'दूसरा हेल्पर माँगें', 'ਦੂਜਾ ਹੈਲਪਰ ਮੰਗੋ')} sub={t(`Now ${b.helper}`, `अभी ${helperName(t, b.helper)}`, `ਹੁਣ ${helperName(t, b.helper)}`)} onPress={swapHelper} />
        </ListCard>
        <H2>{t('If you cancel', 'अगर आप रद्द करें', 'ਜੇ ਤੁਸੀਂ ਰੱਦ ਕਰੋ')}</H2>
        <CancelFeesCard />
        <Spacer />
        <Button variant="outline" danger style={{ borderColor: c.red }} onPress={() => setSheet('cancel')}>{t('Cancel booking · free now', 'बुकिंग रद्द करें · अभी मुफ़्त', 'ਬੁਕਿੰਗ ਰੱਦ ਕਰੋ · ਹੁਣ ਮੁਫ਼ਤ')}</Button>
      </Screen>

      <RescheduleSheet visible={sheet === 'time'} slot={b.slot} onPick={move} onClose={close} />
      <LengthSheet visible={sheet === 'length'} minutes={b.minutes} onPick={resize} onClose={close} />
      <CancelBookingSheet visible={sheet === 'cancel'} onCancel={cancel} onClose={close} />
    </View>
  );
}

export default ChangeBookingScreen;

const styles = StyleSheet.create({ root: { flex: 1 } });
