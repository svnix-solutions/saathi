/** Design page 30 (section 56 "WORKER G"), screen 48 · Demand map: where the work is right now. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, CharacterTile, Grid, H, H2, Lft, MapMock, Page, Pill, Screen, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { demandAreas, type DemandArea } from '../data';
import { tint } from '@/tokens';

const zoneBg: Record<DemandArea['tone'], string> = { r: tint.zoneBusiest, y: tint.zoneBusy, x: tint.mapHalo };
/** Zones are drawn for the regular phone (264 px inside the frame). The small phone is 220 px inside, so there a zone that
 * would pass the edge is pinned 6 px from the right instead, keeping its label on screen. */
const smallMapW = 220, zoneEdge = 6;

export function DemandMapScreen() {
  const nav = useNav();
  const t = useT();
  const [sel, setSel] = useState('D');
  const name = (a: DemandArea) => t(a.name.en, a.name.hi, a.name.pa);
  const extra = (a: DemandArea) => (a.extra ? t(` · ₹${a.extra} extra per job`, ` · हर काम पर ₹${a.extra} ज़्यादा`, ` · ਹਰ ਕੰਮ ਤੇ ₹${a.extra} ਵਾਧੂ`) : '');
  const go = (a: DemandArea) => nav.toast(t(
    `Directions to ${a.name.en} · ${a.min} min${extra(a)}`, `${a.name.hi} का रास्ता · ${a.min} मिनट${extra(a)}`, `${a.name.pa} ਦਾ ਰਸਤਾ · ${a.min} ਮਿੰਟ${extra(a)}`,
  ));
  const { device } = useTheme();
  const zone = (a: DemandArea) => (device === 'small' && a.zone.left + a.zone.width > smallMapW - zoneEdge
    ? { top: a.zone.top, width: a.zone.width, height: a.zone.height, right: zoneEdge } : a.zone);
  return (
    <Page variant="bare">
      <MapMock height={250} route={false} dots={[{ x: 142, y: 120, icon: 'user' }]}>
        {demandAreas.map((a) => {
          const on = a.id === sel;
          return (
            <Pressable key={a.id} onPress={() => setSel(a.id)} accessibilityRole="button" accessibilityLabel={name(a)}
              style={[styles.zone, zone(a), { backgroundColor: zoneBg[a.tone], borderWidth: on ? 2.5 : 0, opacity: on ? 1 : 0.65 }]}>
              <Tag tone={a.tone}>{on ? name(a) : t(a.busy.en, a.busy.hi, a.busy.pa)}</Tag>
            </Pressable>
          );
        })}
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Lft><CharacterTile name="custom" /><H style={styles.fill}>{t('Where the work is', 'काम कहाँ है', 'ਕੰਮ ਕਿੱਥੇ ਹੈ')}</H></Lft>
        <Grid cols={3}>
          {demandAreas.map((a) => <Pill key={a.id} s sel={a.id === sel} onPress={() => setSel(a.id)}>{name(a)}</Pill>)}
        </Grid>
        {demandAreas.filter((a) => a.waiting > 0).map((a) => (
          <Card key={a.id} row sel={a.id === sel} onPress={() => setSel(a.id)}>
            <View style={styles.fill}>
              <H2>{t(`${a.name.en} · ${a.min} min away`, `${a.name.hi} · ${a.min} मिनट दूर`, `${a.name.pa} · ${a.min} ਮਿੰਟ ਦੂਰ`)}</H2>
              <T s m>{t(`${a.waiting} customers waiting`, `${a.waiting} ग्राहक इंतज़ार में`, `${a.waiting} ਗਾਹਕ ਉਡੀਕ ਵਿੱਚ`)}{extra(a)}</T>
            </View>
            <Button variant={a.id === sel ? 'primary' : 'outline'} style={{ paddingVertical: a.id === sel ? 7 : 6, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }} onPress={() => go(a)}>{t('Go', 'चलें', 'ਚੱਲੋ')}</Button>
          </Card>
        ))}
        {sel === 'C'
          ? <Card sel><H2>{t('Block C · you are here', 'ब्लॉक सी · आप यहाँ हैं', 'ਬਲਾਕ ਸੀ · ਤੁਸੀਂ ਇੱਥੇ ਹੋ')}</H2><T s m>{t('Quiet now. Busy again around 6 pm.', 'अभी कम काम है। शाम 6 बजे के आसपास फिर काम होगा।', 'ਹੁਣ ਕੰਮ ਘੱਟ ਹੈ। ਸ਼ਾਮ 6 ਵਜੇ ਦੇ ਕਰੀਬ ਫਿਰ ਕੰਮ ਹੋਵੇਗਾ।')}</T></Card>
          : <T s m>{t('Busy again around 6 pm in Block C.', 'ब्लॉक सी में शाम 6 बजे के आसपास फिर काम होगा।', 'ਬਲਾਕ ਸੀ ਵਿੱਚ ਸ਼ਾਮ 6 ਵਜੇ ਦੇ ਕਰੀਬ ਫਿਰ ਕੰਮ ਹੋਵੇਗਾ।')}</T>}
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  zone: { position: 'absolute', borderRadius: 999, borderColor: palette.green, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
});

export default DemandMapScreen;
