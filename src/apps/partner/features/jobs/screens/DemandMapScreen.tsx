/** Design page 30 (section 56 "WORKER G"), screen 48 · Demand map: where the work is right now. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, CharacterTile, Grid, H, H2, Lft, MapMock, Page, Pill, Screen, T, Tag, palette, useNav, useT } from '@/native/ui';
import { demandAreas, type DemandArea } from '../data';
import { tint } from '@/tokens';

const zoneBg: Record<DemandArea['tone'], string> = { r: tint.zoneBusiest, y: tint.zoneBusy, x: tint.mapHalo };

export function DemandMapScreen() {
  const nav = useNav();
  const t = useT();
  const [sel, setSel] = useState('D');
  const go = (a: DemandArea) => nav.toast(`${t('Directions to', 'रास्ता')} ${a.name} · ${a.min} min${a.extra ? ` · ₹${a.extra} extra per job` : ''}`);
  return (
    <Page variant="bare">
      <MapMock height={250} route={false} dots={[{ x: 142, y: 120, icon: 'user' }]}>
        {demandAreas.map((a) => {
          const on = a.id === sel;
          return (
            <Pressable key={a.id} onPress={() => setSel(a.id)} accessibilityRole="button" accessibilityLabel={a.name}
              style={[styles.zone, a.zone, { backgroundColor: zoneBg[a.tone], borderWidth: on ? 2.5 : 0, opacity: on ? 1 : 0.65 }]}>
              <Tag tone={a.tone}>{on ? a.name : a.busy}</Tag>
            </Pressable>
          );
        })}
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Lft><CharacterTile name="custom" /><H>{t('Where the work is', 'काम कहाँ है')}</H></Lft>
        <Grid cols={3}>
          {demandAreas.map((a) => <Pill key={a.id} s sel={a.id === sel} onPress={() => setSel(a.id)}>{a.name}</Pill>)}
        </Grid>
        {demandAreas.filter((a) => a.waiting > 0).map((a) => (
          <Card key={a.id} row sel={a.id === sel} onPress={() => setSel(a.id)}>
            <View style={styles.fill}>
              <H2>{a.name} · {a.min} min away</H2>
              <T s m>{a.waiting} customers waiting{a.extra ? ` · ₹${a.extra} extra per job` : ''}</T>
            </View>
            <Button variant={a.id === sel ? 'primary' : 'outline'} style={{ paddingVertical: a.id === sel ? 7 : 6, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }} onPress={() => go(a)}>{t('Go', 'चलें')}</Button>
          </Card>
        ))}
        {sel === 'C'
          ? <Card sel><H2>Block C · you are here</H2><T s m>Quiet now. Busy again around 6 pm.</T></Card>
          : <T s m>Busy again around 6 pm in Block C.</T>}
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  zone: { position: 'absolute', borderRadius: 999, borderColor: palette.green, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
});

export default DemandMapScreen;
