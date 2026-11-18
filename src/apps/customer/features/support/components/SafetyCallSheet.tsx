import React from 'react';
import { Button, H, Icon, Lft, Sheet, T, useT, useTheme } from '@/native/ui';

/** Bottom sheet shown while the emergency call to the safety team is on. */
export function SafetyCallSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Sheet visible={visible} onClose={onClose}>
      <Lft><Icon name="shield" size={26} color={c.red} /><H>{t('Calling the safety team', 'सुरक्षा टीम को कॉल', 'ਸੁਰੱਖਿਆ ਟੀਮ ਨੂੰ ਕਾਲ')}</H></Lft>
      <T m>{t('Stay on the line. We can see this visit and your helper, and we have shared your location.', 'लाइन पर रहें। हमें यह विज़िट और हेल्पर दिख रहे हैं, और आपकी जगह शेयर की गई है।', 'ਲਾਈਨ ਤੇ ਰਹੋ। ਸਾਨੂੰ ਇਹ ਵਿਜ਼ਿਟ ਅਤੇ ਹੈਲਪਰ ਦਿਖ ਰਹੇ ਹਨ, ਅਤੇ ਤੁਹਾਡੀ ਲੋਕੇਸ਼ਨ ਸ਼ੇਅਰ ਕੀਤੀ ਗਈ ਹੈ।')}</T>
      <Button danger variant="outline" style={{ borderColor: c.red }} onPress={onClose}>{t('End call', 'कॉल खत्म करें', 'ਕਾਲ ਖਤਮ ਕਰੋ')}</Button>
    </Sheet>
  );
}
