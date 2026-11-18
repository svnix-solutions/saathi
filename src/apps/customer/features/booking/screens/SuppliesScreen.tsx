/** Design page 10 · Plans, favourites, supplies and receipts — screen 34 · Supplies. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BackHeader, Button, CharacterTile, H, Lft, ListCard, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { rupees } from '@/domain';
import { useCustomerState } from '../../../state';
import { QuantityRow } from '../components/QuantityRow';
import { DEFAULT_SUPPLIES, SUPPLIES } from '../data';

export function SuppliesScreen() {
  const nav = useNav();
  const t = useT();
  const [st, set] = useCustomerState();
  const [qty, setQty] = useState<Record<string, number>>(st.supplies ?? DEFAULT_SUPPLIES);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = SUPPLIES.reduce((a, s) => a + (qty[s.id] ?? 0) * s.price, 0);
  const items = t(
    `${count} item${count === 1 ? '' : 's'}`,
    count === 1 ? '1 चीज़' : `${count} चीज़ें`,
    count === 1 ? '1 ਚੀਜ਼' : `${count} ਚੀਜ਼ਾਂ`,
  );
  const done = () => {
    set({ supplies: qty });
    nav.toast(count
      ? t(`${items} added to the visit · ${rupees(total)}`, `विज़िट में ${items} ${count === 1 ? 'जोड़ी गई' : 'जोड़ी गईं'} · ${rupees(total)}`, `ਵਿਜ਼ਿਟ ਵਿੱਚ ${items} ${count === 1 ? 'ਜੋੜੀ' : 'ਜੋੜੀਆਂ'} · ${rupees(total)}`)
      : t('No supplies added', 'कोई सामान नहीं जोड़ा', 'ਕੋਈ ਸਮਾਨ ਨਹੀਂ ਜੋੜਿਆ'));
    nav.back();
  };
  return (
    <Screen>
      <BackHeader title={t('Add supplies', 'सामान जोड़ें', 'ਸਮਾਨ ਜੋੜੋ')} onBack={nav.back} />
      <Lft><CharacterTile name="kitchen" size={64} /><H size={16} style={styles.grow}>{t('Nothing at home? The helper brings it.', 'घर पर सामान नहीं? हेल्पर ले आएगी।', 'ਘਰ ਵਿੱਚ ਸਮਾਨ ਨਹੀਂ? ਹੈਲਪਰ ਲੈ ਆਵੇਗੀ।')}</H></Lft>
      <ListCard>
        {SUPPLIES.map((s) => (
          <QuantityRow key={s.id} label={t(s.name, s.hi, s.pa)} sub={rupees(s.price)} value={qty[s.id] ?? 0} onChange={(n) => setQty({ ...qty, [s.id]: n })} />
        ))}
      </ListCard>
      <T s m>{t('Supplies are yours to keep. Added to the visit bill.', 'सामान आपका रहेगा। विज़िट के बिल में जुड़ जाएगा।', 'ਸਮਾਨ ਤੁਹਾਡਾ ਰਹੇਗਾ। ਵਿਜ਼ਿਟ ਦੇ ਬਿੱਲ ਵਿੱਚ ਜੁੜ ਜਾਵੇਗਾ।')}</T>
      <Spacer />
      <Button onPress={done}>{count
        ? t(`Add ${items} · ${rupees(total)}`, `${items} जोड़ें · ${rupees(total)}`, `${items} ਜੋੜੋ · ${rupees(total)}`)
        : t('Continue without supplies', 'बिना सामान आगे बढ़ें', 'ਬਿਨਾਂ ਸਮਾਨ ਅੱਗੇ ਵਧੋ')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({ grow: { flex: 1 } });

export default SuppliesScreen;
