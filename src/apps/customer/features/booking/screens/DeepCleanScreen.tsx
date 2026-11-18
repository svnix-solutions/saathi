/** Design page 12 · Helper profile, visit report and more ways to book — screen 43 · Deep clean builder. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, CharacterTile, H, H2, Lft, ListCard, Row, Screen, Spacer, T, Toggle, useNav, useT } from '@/native/ui';
import { fmtMin, rupees } from '@/domain';
import { QuantityRow } from '../components/QuantityRow';
import { DEFAULT_ROOMS, ROOMS, deepCleanEstimate } from '../data';
import { useBookingState } from '../state';

export function DeepCleanScreen() {
  const nav = useNav();
  const t = useT();
  const [, set] = useBookingState();
  const [qty, setQty] = useState<Record<string, number>>(DEFAULT_ROOMS);
  const [two, setTwo] = useState(true);
  const { minutes, price, together, wall } = deepCleanEstimate(qty, two);
  const pickTime = () => {
    set({ service: 'kitchenBath', minutes: wall, deepClean: { rooms: qty, helpers: two ? 2 : 1, workMinutes: minutes, price } });
    nav.push('time', { deepClean: true });
  };
  return (
    <Screen>
      <BackHeader title={t('Deep clean', 'डीप क्लीन')} onBack={nav.back} />
      <Lft><CharacterTile name="deep" size={64} /><H style={styles.grow}>{t('Build it room by room', 'कमरे के हिसाब से बनाएँ')}</H></Lft>
      <ListCard>
        {ROOMS.map((r) => (
          <QuantityRow key={r.id} label={r.name} sub={r.sub} value={qty[r.id] ?? 0} max={r.max} onChange={(n) => setQty({ ...qty, [r.id]: n })} />
        ))}
      </ListCard>
      <Card sel={two} row onPress={() => setTwo(!two)}>
        <View style={styles.grow}>
          <H2>2 helpers together</H2>
          <T s m>{minutes ? `Done in ${fmtMin(together)} instead of ${fmtMin(minutes)}` : 'Add a room first'}</T>
        </View>
        <Toggle on={two} onChange={setTwo} />
      </Card>
      <Spacer />
      <Row gap={12}>
        <View><T s m>{fmtMin(minutes)} of work</T><H>{rupees(price)}</H></View>
        <Button style={styles.grow} disabled={!minutes} onPress={pickTime}>{t('Pick a time', 'समय चुनें')}</Button>
      </Row>
    </Screen>
  );
}

const styles = StyleSheet.create({ grow: { flex: 1 } });

export default DeepCleanScreen;
