/** Design page 07 · When something is empty or goes wrong (screens 20–23). */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BackHeader, Button, Card, H, H2, IconTile, Lft, Screen, Spacer, T, Tag, Toggle,
  palette, useNav, useT, useTheme,
} from '@/native/ui';
import { rupees } from '@/data/decisions';
import { CustomerTabs } from '../chrome';
import { BigIcon, Radio, clock, priceOf, useCountdown, useV1 } from './kit';

/* 20 · No helper free */
export function ErrNoHelper() {
  const nav = useNav();
  const t = useT();
  const [, set] = useV1();
  const [pick, setPick] = useState<'wait' | 'later'>('wait');
  return (
    <Screen>
      <BackHeader title={t('Finding your helper', 'आपका हेल्पर ढूँढ रहे हैं')} onBack={nav.back} />
      <BigIcon name="clock" />
      <H center>{t('No helper is free in 15 minutes', '15 मिनट में कोई हेल्पर खाली नहीं है')}</H>
      <T m center>{t('It is a busy hour in Block C. The earliest a helper can reach you is in about 35 minutes.', 'ब्लॉक सी में अभी व्यस्त समय है। हेल्पर सबसे जल्दी लगभग 35 मिनट में पहुँच सकता है।')}</T>
      <Card sel={pick === 'wait'} row onPress={() => setPick('wait')}>
        <View style={{ flex: 1 }}><H2>{t('Wait about 35 minutes', 'लगभग 35 मिनट रुकें')}</H2><T s m>{t('We keep looking for someone sooner', 'हम जल्दी आने वाले को ढूँढते रहेंगे')}</T></View>
        <Radio on={pick === 'wait'} />
      </Card>
      <Card sel={pick === 'later'} row onPress={() => setPick('later')}>
        <View style={{ flex: 1 }}><H2>{t('Book for later today', 'आज बाद के लिए बुक करें')}</H2><T s m>{t('Next sure slot: 1:00 pm', 'अगला पक्का समय: दोपहर 1:00')}</T></View>
        <Radio on={pick === 'later'} />
      </Card>
      <T s m>{t('You are not charged until a helper accepts.', 'हेल्पर के मानने तक कोई पैसा नहीं लगेगा।')}</T>
      <Spacer />
      <Button onPress={() => {
        if (pick === 'wait') { nav.reset('tracking'); nav.toast(t('Sunita D. accepted · about 35 min', 'सुनीता डी. ने माना · लगभग 35 मिनट')); return; }
        set({ when: 'later', day: 'today', upcoming: { service: 'general', minutes: 60, slot: 'Today · 1:00 pm', slotHi: 'आज · दोपहर 1:00', helper: 'Rekha M.' } });
        nav.reset('bookings');
        nav.toast(t('Booked for 1:00 pm today', 'आज दोपहर 1:00 के लिए बुक हुआ'));
      }}>{t('Confirm', 'पक्का करें')}</Button>
      <OutlineInk onPress={() => { nav.reset('home'); nav.toast(t('Cancelled · no charge', 'रद्द · कोई शुल्क नहीं')); }}>{t('Cancel, no charge', 'रद्द करें, कोई शुल्क नहीं')}</OutlineInk>
    </Screen>
  );
}

/** Grey-bordered ink outline button (design: .btn.o with border line, colour ink). */
function OutlineInk({ children, onPress }: { children: string; onPress: () => void }) {
  const { c } = useTheme();
  return <Button variant="outline" onPress={onPress} style={{ borderColor: c.line }} textStyle={{ color: c.ink }}>{children}</Button>;
}

/* 21 · No internet */
export function ErrOffline() {
  const nav = useNav();
  const t = useT();
  const [tries, setTries] = useState(0);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: palette.ink, paddingVertical: 10, paddingHorizontal: 16 }}>
        <T s b color="#fff">{t('No internet. Showing what we saved.', 'इंटरनेट नहीं है। सेव की गई जानकारी दिखा रहे हैं।')}</T>
      </View>
      <Screen>
        <H>{t('Your bookings', 'आपकी बुकिंग')}</H>
        <Card sel>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <H2>{t('General cleaning', 'सामान्य सफ़ाई')}</H2><Tag>{t('Today', 'आज')}</Tag>
          </View>
          <T s m style={{ marginTop: 4 }}>{t('Sunita D. · door code 4821', 'सुनीता डी. · दरवाज़ा कोड 4821')}</T>
          <T s m>{t('Last updated 11:02 am', 'आखिरी अपडेट सुबह 11:02')}</T>
        </Card>
        <Card onPress={() => nav.toast(t('Calling Sunita D.…', 'सुनीता डी. को कॉल हो रहा है…'))}>
          <Lft style={{ alignItems: 'flex-start' }}>
            <IconTile name="call" />
            <View><H2>{t('Call your helper', 'अपने हेल्पर को कॉल करें')}</H2><T s m>{t('Works without internet', 'इंटरनेट के बिना भी चलता है')}</T></View>
          </Lft>
        </Card>
        <Card><T s m>{t('New bookings and live tracking need a connection. Everything else stays here.', 'नई बुकिंग और लाइव ट्रैकिंग के लिए इंटरनेट चाहिए। बाकी सब यहीं रहेगा।')}</T></Card>
        <Spacer />
        <Button variant="outline" onPress={() => {
          if (tries === 0) { setTries(1); nav.toast(t('Still no connection', 'अभी भी कनेक्शन नहीं')); return; }
          nav.reset('bookings'); nav.toast(t('Back online', 'फिर से ऑनलाइन'));
        }}>{t('Try again', 'फिर कोशिश करें')}</Button>
      </Screen>
      <CustomerTabs active="bookings" />
    </View>
  );
}

/* 22 · Payment failed */
export function ErrPaymentFailed() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useV1();
  const [hold] = useCountdown(4 * 60 + 32);
  const price = priceOf(st);
  const go = (patch: Partial<typeof st>, msg: string) => { set({ extraMinutes: 0, ...patch }); nav.reset('tracking'); nav.toast(msg); };
  return (
    <Screen>
      <BackHeader title={t('Payment', 'भुगतान')} onBack={nav.back} />
      <BigIcon name="wallet" danger />
      <H center>{t('Payment did not go through', 'भुगतान नहीं हो पाया')}</H>
      <T m center>{t(`Your bank did not confirm ${rupees(price)}. No money was taken.`, `आपके बैंक ने ${rupees(price)} की पुष्टि नहीं की। कोई पैसा नहीं कटा।`)}</T>
      <Card tone="yellow">
        {hold > 0 ? (
          <>
            <T b color={palette.ink}>{t(`Your helper is held for ${clock(hold)}`, `आपका हेल्पर ${clock(hold)} तक रुका है`)}</T>
            <T s color={palette.ink}>{t('Sunita D. is still reserved for you.', 'सुनीता डी. अभी आपके लिए रुकी हैं।')}</T>
          </>
        ) : (
          <T b color={palette.ink}>{t('The hold has ended. We will find a new helper when you pay.', 'रुकने का समय खत्म। भुगतान होने पर नया हेल्पर ढूँढेंगे।')}</T>
        )}
      </Card>
      <Spacer />
      <Button onPress={() => go({ pay: 'upi' }, t(`Paid ${rupees(price)} by UPI`, `UPI से ${rupees(price)} का भुगतान हुआ`))}>{t('Try UPI again', 'UPI फिर से आज़माएँ')}</Button>
      <Button variant="outline" onPress={() => go({ pay: 'cash' }, t('Pay cash after the job', 'काम के बाद नकद दें'))}>{t('Pay cash after the job', 'काम के बाद नकद दें')}</Button>
      <OutlineInk onPress={() => nav.push('paymentMethods')}>{t('Use another method', 'दूसरा तरीका चुनें')}</OutlineInk>
    </Screen>
  );
}

/* 23 · Outside the service area */
export function ErrOutsideArea() {
  const nav = useNav();
  const t = useT();
  const [notify, setNotify] = useState(true);
  return (
    <Screen>
      <BackHeader title={t('Your address', 'आपका पता')} onBack={nav.back} />
      <BigIcon name="pin" />
      <H center>{t('We are not in Sector 40 yet', 'हम अभी सेक्टर 40 में नहीं हैं')}</H>
      <T m center>{t('Saathi opens area by area so helpers can reach you in 15 minutes.', 'साथी इलाका-दर-इलाका खुलता है ताकि हेल्पर 15 मिनट में पहुँच सकें।')}</T>
      <Card row>
        <View style={{ flex: 1 }}><H2>{t('Tell me when you open here', 'यहाँ शुरू होने पर बताएँ')}</H2><T s m>{t('One message, nothing else', 'बस एक मैसेज, और कुछ नहीं')}</T></View>
        <Toggle on={notify} onChange={setNotify} />
      </Card>
      <Card>
        <H2>{t('Nearest areas we serve', 'पास के इलाके जहाँ हम हैं')}</H2>
        <T s m style={{ marginTop: 4 }}>{t('Sector 21 · Sector 18 · Block C', 'सेक्टर 21 · सेक्टर 18 · ब्लॉक सी')}</T>
      </Card>
      <Spacer />
      <Button disabled={!notify} onPress={() => { nav.back(); nav.toast(t('We will message you when we open in Sector 40', 'सेक्टर 40 में शुरू होने पर हम मैसेज करेंगे')); }}>{t('Notify me', 'मुझे बताएँ')}</Button>
      <OutlineInk onPress={() => (nav.canGoBack ? nav.back() : nav.push('signin.address', { add: true }))}>{t('Try another address', 'दूसरा पता डालें')}</OutlineInk>
    </Screen>
  );
}
