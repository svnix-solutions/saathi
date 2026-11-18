import React from 'react';
import { Button, Card, Spacer, T, palette, useCountdown, useNav, useT } from '@/native/ui';
import { clock, priceOf, rupees } from '@/domain';
import { useCustomerState, type CustomerState } from '../../../state';
import { StatusScreen } from '../components/StatusScreen';

/** How long the helper stays reserved after a failed payment (4:32). */
const HOLD_SECONDS = 4 * 60 + 32;

/** Design page 07 · When something is empty or goes wrong — screen 22 · Payment failed. */
export function PaymentFailedScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const [hold] = useCountdown(HOLD_SECONDS);
  const price = priceOf(st);
  const settle = (patch: Partial<CustomerState>, msg: string) => { set({ extraMinutes: 0, ...patch }); nav.reset('tracking'); nav.toast(msg); };
  return (
    <StatusScreen
      title={t('Payment', 'भुगतान')}
      onBack={nav.back}
      icon="wallet"
      tone="danger"
      heading={t('Payment did not go through', 'भुगतान नहीं हो पाया')}
      message={t(`Your bank did not confirm ${rupees(price)}. No money was taken.`, `आपके बैंक ने ${rupees(price)} की पुष्टि नहीं की। कोई पैसा नहीं कटा।`)}
    >
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
      <Button onPress={() => settle({ pay: 'upi' }, t(`Paid ${rupees(price)} by UPI`, `UPI से ${rupees(price)} का भुगतान हुआ`))}>{t('Try UPI again', 'UPI फिर से आज़माएँ')}</Button>
      <Button variant="outline" onPress={() => settle({ pay: 'cash' }, t('Pay cash after the job', 'काम के बाद नकद दें'))}>{t('Pay cash after the job', 'काम के बाद नकद दें')}</Button>
      <Button variant="plain" onPress={() => nav.push('paymentMethods')}>{t('Use another method', 'दूसरा तरीका चुनें')}</Button>
    </StatusScreen>
  );
}

export default PaymentFailedScreen;
