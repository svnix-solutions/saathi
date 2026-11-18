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
  const items = `${count} item${count === 1 ? '' : 's'}`;
  const done = () => {
    set({ supplies: qty });
    nav.toast(count ? `${items} added to the visit · ${rupees(total)}` : 'No supplies added');
    nav.back();
  };
  return (
    <Screen>
      <BackHeader title={t('Add supplies', 'सामान जोड़ें')} onBack={nav.back} />
      <Lft><CharacterTile name="kitchen" size={64} /><H size={16} style={styles.grow}>{t('Nothing at home? The helper brings it.', 'घर पर सामान नहीं? हेल्पर ले आएगी।')}</H></Lft>
      <ListCard>
        {SUPPLIES.map((s) => (
          <QuantityRow key={s.id} label={s.name} sub={rupees(s.price)} value={qty[s.id] ?? 0} onChange={(n) => setQty({ ...qty, [s.id]: n })} />
        ))}
      </ListCard>
      <T s m>Supplies are yours to keep. Added to the visit bill.</T>
      <Spacer />
      <Button onPress={done}>{count ? `Add ${items} · ${rupees(total)}` : t('Continue without supplies', 'बिना सामान आगे बढ़ें')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({ grow: { flex: 1 } });

export default SuppliesScreen;
