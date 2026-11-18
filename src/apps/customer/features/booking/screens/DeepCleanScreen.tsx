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
      <BackHeader title={t('Deep clean', 'डीप क्लीन', 'ਡੀਪ ਕਲੀਨ')} onBack={nav.back} />
      <Lft><CharacterTile name="deep" size={64} /><H style={styles.grow}>{t('Build it room by room', 'कमरे के हिसाब से बनाएँ', 'ਕਮਰੇ ਦੇ ਹਿਸਾਬ ਨਾਲ ਬਣਾਓ')}</H></Lft>
      <ListCard>
        {ROOMS.map((r) => (
          <QuantityRow key={r.id} label={t(r.name, r.nameHi, r.namePa)} sub={t(r.sub, r.subHi, r.subPa)} value={qty[r.id] ?? 0} max={r.max} onChange={(n) => setQty({ ...qty, [r.id]: n })} />
        ))}
      </ListCard>
      <Card sel={two} row onPress={() => setTwo(!two)}>
        <View style={styles.grow}>
          <H2>{t('2 helpers together', '2 हेल्पर एक साथ', '2 ਹੈਲਪਰ ਇਕੱਠੇ')}</H2>
          <T s m>{minutes
            ? t(`Done in ${fmtMin(together)} instead of ${fmtMin(minutes)}`, `${fmtMin(together, t)} में पूरा, ${fmtMin(minutes, t)} की जगह`, `${fmtMin(together, t)} ਵਿੱਚ ਪੂਰਾ, ${fmtMin(minutes, t)} ਦੀ ਥਾਂ`)
            : t('Add a room first', 'पहले एक कमरा जोड़ें', 'ਪਹਿਲਾਂ ਇੱਕ ਕਮਰਾ ਜੋੜੋ')}</T>
        </View>
        <Toggle on={two} onChange={setTwo} />
      </Card>
      <Spacer />
      <Row gap={12}>
        <View><T s m>{t(`${fmtMin(minutes)} of work`, `${fmtMin(minutes, t)} का काम`, `${fmtMin(minutes, t)} ਦਾ ਕੰਮ`)}</T><H>{rupees(price)}</H></View>
        <Button style={styles.grow} disabled={!minutes} onPress={pickTime}>{t('Pick a time', 'समय चुनें', 'ਸਮਾਂ ਚੁਣੋ')}</Button>
      </Row>
    </Screen>
  );
}

const styles = StyleSheet.create({ grow: { flex: 1 } });

export default DeepCleanScreen;
