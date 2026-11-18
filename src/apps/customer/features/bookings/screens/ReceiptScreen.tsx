import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, Hr, Icon, KeyValue, Link, Row, Screen, Spacer, T, palette, useNav, useT, type ScreenProps } from '@/native/ui';
import { sampleReceipt } from '../data';

/** Design page 10 · screen 35, receipt. */
export function ReceiptScreen({ params }: ScreenProps<{ id?: string }>) {
  const nav = useNav();
  const t = useT();
  const id = params.id ?? sampleReceipt.id;
  return (
    <Screen>
      <BackHeader title={`${t('Receipt', 'रसीद')} · #${id}`} onBack={nav.back} />
      <View style={styles.center}>
        <View style={styles.paidIcon}>
          <Icon name="check" size={22} color={palette.white} strokeWidth={3} />
        </View>
        <H size={24}>{t('Paid', 'भुगतान')} {sampleReceipt.paid}</H>
        <T s m>{sampleReceipt.when}</T>
      </View>
      <Card style={styles.lines}>
        {sampleReceipt.lines.map((l) => <KeyValue key={l.label} label={l.label} value={l.value} valueTone={l.accent ? 'accent' : 'default'} />)}
        <Hr />
        <KeyValue variant="total" label="Total" value={sampleReceipt.total} />
      </Card>
      <Card style={styles.paidWith}>
        {sampleReceipt.paidWith.map((p) => <Row key={p.label}><T s m>{p.label}</T><T s>{p.value}</T></Row>)}
      </Card>
      <Link onPress={() => nav.push('visitReport', { id })}>See the visit report</Link>
      <Spacer />
      <Grid cols={2}>
        <Button variant="outline" style={{ paddingVertical: 11 }} onPress={() => nav.toast(`Invoice #${id} downloaded (PDF)`)}>{t('Get invoice', 'इनवॉइस लें')}</Button>
        <Button style={{ paddingVertical: 12 }} onPress={() => nav.push('chores', { service: 'general', helper: 'Sunita D.' })}>{t('Book again', 'फिर से बुक करें')}</Button>
      </Grid>
    </Screen>
  );
}

export default ReceiptScreen;

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  paidIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: palette.green, alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
  lines: { gap: 7 },
  paidWith: { gap: 6 },
});
