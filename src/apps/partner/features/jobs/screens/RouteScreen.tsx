/** Design page 27, screen 36 · Route to the job. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button, Card, Grid, H, H2, Icon, IconTile, Lft, Link, MapMock, Page, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { initialPartnerState } from '../../../state';
import { etaStart, routeSteps } from '../data';
import { useEta } from '../hooks/useEta';
import { useJobsState } from '../state';

export function RouteScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useJobsState();
  const job = st.job ?? initialPartnerState.job;
  const mins = useEta();
  const [showSteps, setShowSteps] = useState(false);
  const km = (mins * 0.8 / 6).toFixed(1);
  const userX = 42 + (etaStart - mins) * 18; // walks along the green line
  return (
    <Page variant="bare">
      <MapMock height={230} route={false} dots={[{ x: Math.min(userX, 142), y: 84, icon: 'user', tone: 'yellow' }, { x: 142, y: 166, icon: 'home' }]}>
        <View style={styles.roadAcross} />
        <View style={styles.roadDown} />
      </MapMock>
      <Screen style={{ paddingTop: 14 }}>
        <Row><H>{mins} min · {km} km</H><Tag>{t('Reach by 11:08', '11:08 तक पहुँचें')}</Tag></Row>
        <Card row onPress={() => setShowSteps(true)}>
          <Lft style={styles.fill}>
            <Icon name="pin" color={c.accent} />
            <View><H2>{job.address}</H2><T s m>Gate 2, near the park</T></View>
          </Lft>
          <Link onPress={() => setShowSteps(true)}>{t('Steps', 'रास्ता')}</Link>
        </Card>
        <Grid cols={2}>
          <Button variant="outline" icon="call" style={{ paddingVertical: 10 }} onPress={() => nav.toast(`Calling ${job.customer}…`)}>{t('Call', 'कॉल')}</Button>
          <Button variant="outline" style={{ paddingVertical: 10 }} onPress={() => nav.toast(`Sent to ${job.customer}: “I am on my way, ${mins} min.”`)}>{t('Message', 'मैसेज')}</Button>
        </Grid>
        <Button variant="plain" onPress={() => nav.toast('Opening Google Maps…')}>{t('Open in maps', 'मैप में खोलें')}</Button>
        <Spacer />
        <Button big onPress={() => nav.push('checkIn')}>{t('I have arrived', 'मैं पहुँच गई')}</Button>
      </Screen>
      <Sheet visible={showSteps} onClose={() => setShowSteps(false)}>
        <Row><H2>{t('Steps to the door', 'दरवाज़े तक का रास्ता')}</H2><T s m>{km} km</T></Row>
        {routeSteps.map((s, i) => (
          <Lft key={i}>
            <IconTile name={s.icon} size={30} />
            <T style={styles.fill}>{s.text}</T>
            {s.d ? <T s m>{s.d}</T> : null}
          </Lft>
        ))}
        <Button onPress={() => setShowSteps(false)}>{t('OK', 'ठीक है')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  roadAcross: { position: 'absolute', left: 60, top: 98, width: 96, height: 4, backgroundColor: palette.green },
  roadDown: { position: 'absolute', left: 155, top: 98, width: 4, height: 84, backgroundColor: palette.green },
});

export default RouteScreen;
