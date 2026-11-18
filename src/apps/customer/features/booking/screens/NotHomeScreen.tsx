/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 63 · Not-at-home visit. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, CheckRow, H, H2, Radio, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { decisions } from '@/domain';
import { ENTRIES, PROOFS, toggleIn } from '../data';
import { useBookingState } from '../state';

export function NotHomeScreen() {
  const t = useT();
  const nav = useNav();
  const [, set] = useBookingState();
  const [entry, setEntry] = useState('guard');
  const [proof, setProof] = useState<string[]>(PROOFS);
  const sel = ENTRIES.find((e) => e.k === entry)!;
  const next = () => { set({ entry, entryProofs: proof, note: `Not at home: ${sel.title.toLowerCase()}` }); nav.push('confirm'); };
  return (
    <Screen>
      <BackHeader title={t('Visit while I am out', 'मेरी ग़ैरमौजूदगी में विज़िट')} fallback="home" />
      <H>{t('How does the helper get in?', 'हेल्पर अंदर कैसे आएगी?')}</H>
      {ENTRIES.map((e) => (
        <Card key={e.k} sel={entry === e.k} row onPress={() => setEntry(e.k)}>
          <View style={styles.grow}><H2>{t(e.title, e.hi)}</H2><T s m>{e.sub}</T></View>
          <Radio on={entry === e.k} checkSize={11.88} />
        </Card>
      ))}
      <T s m>{sel.detail}</T>
      <H2>{t('You will get', 'आपको मिलेगा')}</H2>
      <Card style={styles.proofs}>
        {PROOFS.map((p) => (
          <CheckRow key={p} on={proof.includes(p)} label={p} onPress={() => setProof((xs) => toggleIn(xs, p))} />
        ))}
      </Card>
      <T s m>Only helpers you have had before, rated {decisions.quality.topRated.rating} or above.</T>
      <Spacer />
      <Button onPress={next}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  proofs: { gap: 8 },
});

export default NotHomeScreen;
