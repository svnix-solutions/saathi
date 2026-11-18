import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Grid, H, H2, IconTile, Lft, Mark, Row, Screen, Spacer, T, Tag, palette, useNav } from '@/native/ui';
import { useLockScreenEta } from '../hooks/useLockScreenEta';

/** Design page 16 (CUSTOMER H) · screen 59, live updates on the lock screen and WhatsApp. */
export function LockScreenScreen() {
  const nav = useNav();
  const { mins, pct, clock } = useLockScreenEta();
  const [reply, setReply] = useState(false);
  const onTheWay = mins > 0;
  return (
    <Screen bg={palette.ink}>
      <View style={[styles.clockBox, { marginTop: 10 }]}>
        <Text style={styles.date}>Saturday 21 November</Text>
        <Text style={styles.clock}>{clock}</Text>
      </View>
      <Card style={{ marginTop: 10 }} onPress={() => nav.push('tracking')}>
        <Row>
          <Lft><Mark size={20} /><T b>Saathi</T></Lft>
          <Tag>{onTheWay ? 'Live' : 'Arrived'}</Tag>
        </Row>
        <H style={{ marginTop: 8 }}>{onTheWay ? `Sunita arrives in ${mins} min` : 'Sunita is at your door'}</H>
        <View style={[styles.track, { marginTop: 9 }]}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>
        <Row style={{ marginTop: 5 }}><T s m>{onTheWay ? 'On the way' : 'At the door'}</T><T s m>Door code 4821</T></Row>
      </Card>
      <Card onPress={() => setReply(!reply)}>
        <Lft style={styles.top} gap={10}>
          <IconTile name="call" bg={palette.green} color={palette.white} />
          <View style={styles.grow}>
            <H2>WhatsApp · Saathi</H2>
            <T s m>{onTheWay ? `Your helper Sunita is ${mins} min away.` : 'Sunita has reached your door.'} Reply 1 to call her, 2 to change the time.</T>
          </View>
        </Lft>
        {reply && (
          <Grid cols={2} style={{ marginTop: 10 }}>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.toast('Calling Sunita…')}>1 · Call</Button>
            <Button variant="outline" style={{ paddingVertical: 9 }} onPress={() => nav.push('changeBooking')}>2 · Change</Button>
          </Grid>
        )}
      </Card>
      <Spacer />
      <Text style={[styles.date, styles.footnote]}>Updates on the lock screen and on WhatsApp, without opening the app</Text>
    </Screen>
  );
}

export default LockScreenScreen;

const styles = StyleSheet.create({
  clockBox: { alignItems: 'center' },
  date: { color: palette.white, opacity: 0.7, fontSize: 11 },
  clock: { color: palette.white, fontSize: 54, fontWeight: '700', letterSpacing: -1.6, lineHeight: 59 },
  footnote: { textAlign: 'center' },
  track: { height: 7, borderRadius: 4, backgroundColor: palette.mint },
  fill: { height: '100%', borderRadius: 4, backgroundColor: palette.green },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
