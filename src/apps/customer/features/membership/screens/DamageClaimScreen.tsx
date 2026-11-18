/** Design page 17 (CUSTOMER I) · Membership, protection and shared homes — screen 61 · Damage claim. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, H2, IconTile, Input, Lft, Row, Screen, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { rupees } from '@/domain';
import { useCustomerState } from '../../../state';
import { ClaimSteps } from '../components/ClaimSteps';
import { ItemChip } from '../components/ItemChip';
import { PhotoSlots } from '../components/PhotoSlots';
import { CLAIM_DEFAULTS, COVER, DAMAGE_ITEMS, MAX_CLAIM_PHOTOS, OTHER_ITEM } from '../data';
import { claimProblem } from '../rules';

export function DamageClaimScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useCustomerState();
  const [item, setItem] = useState(CLAIM_DEFAULTS.item);
  const [value, setValue] = useState(CLAIM_DEFAULTS.value);
  const [photos, setPhotos] = useState(CLAIM_DEFAULTS.photos);
  const [sent, setSent] = useState(false);
  const cap = st.plus ? COVER.plus : COVER.basic;
  const send = () => {
    const problem = claimProblem(item, photos, value, cap);
    if (problem) { nav.toast(problem); return; }
    setSent(true);
    nav.toast(t('Claim sent · we reply in one working day', 'दावा भेजा गया'));
  };
  if (sent) {
    return (
      <Screen>
        <BackHeader title={t('Damage protection', 'नुकसान सुरक्षा')} fallback="home" />
        <Card sel>
          <Row><H2>Claim #C-118</H2><Tag>Being checked</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{item} · {rupees(Number(value) || 0)} · visit #2041</T>
        </Card>
        <ClaimSteps steps={[
          { title: 'Claim sent', sub: 'Today, with ' + photos + ' photos', done: true },
          { title: 'Being checked', sub: 'We talk to Sunita and look at the photos', done: true },
          { title: 'Decision', sub: 'Within one working day', done: false },
          { title: 'Paid', sub: 'Into your Saathi wallet or bank', done: false },
        ]} />
        <T s m>You do not have to do anything else. We will message you here and on WhatsApp.</T>
        <Spacer />
        <Button onPress={() => nav.reset('home')}>{t('Back to home', 'होम पर जाएँ')}</Button>
        <Button variant="outline" onPress={() => nav.push('supportChat')}>{t('Talk to support', 'सहायता से बात करें')}</Button>
      </Screen>
    );
  }
  return (
    <Screen>
      <BackHeader title={t('Damage protection', 'नुकसान सुरक्षा')} fallback="home" />
      <Card sel>
        <Lft gap={10}>
          <IconTile name="shield" bg={c.card} />
          <View style={styles.grow}><H2>Every visit is covered</H2><T s m>Up to ₹2,000 · ₹10,000 with Plus</T></View>
        </Lft>
      </Card>
      <H>{t('What was damaged?', 'क्या टूटा या ख़राब हुआ?')}</H>
      <Input small value={item === OTHER_ITEM ? '' : item} onChangeText={setItem} placeholder="Describe the item" />
      <Lft gap={6} style={styles.wrap}>
        {DAMAGE_ITEMS.slice(1).map((x) => <ItemChip key={x} label={x} selected={item === x} onPress={() => setItem(x)} />)}
      </Lft>
      <Grid cols={2}>
        <Card style={styles.centre} onPress={() => nav.push('bookings')}><T s m>Visit</T><T b>#2041 · today</T></Card>
        <Card style={{ alignItems: 'center', paddingVertical: 6 }}>
          <T s m>Value</T>
          <Input small prefix="₹" value={value} onChangeText={(v) => setValue(v.replace(/\D/g, ''))} keyboardType="number-pad" style={{ borderWidth: 0, padding: 0, backgroundColor: 'transparent', justifyContent: 'center' }} />
        </Card>
      </Grid>
      <H2>Photos</H2>
      <PhotoSlots count={photos} max={MAX_CLAIM_PHOTOS} onAdd={() => setPhotos(photos + 1)}
        onRemove={(i) => { setPhotos(photos - 1); nav.toast(`Photo ${i + 1} removed`); }} />
      <T s m>Report within 24 hours. We reply in one working day and pay into your wallet or bank.</T>
      <Spacer />
      <Button onPress={send}>{t('Send claim', 'दावा भेजें')}</Button>
    </Screen>
  );
}

export default DamageClaimScreen;

const styles = StyleSheet.create({
  grow: { flex: 1 },
  wrap: { flexWrap: 'wrap' },
  centre: { alignItems: 'center' },
});
