import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Check, CheckRow, Grid, H2, Lft, Screen, Spacer, T, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { PhotoSheet } from '../components/PhotoSheet';
import { reportPhotos, reportWorkDone } from '../data';

/** One "In / Out / Worked" box. */
function TimeBox({ label, value, sel }: { label: string; value: string; sel?: boolean }) {
  return (
    <Card sel={sel} style={[styles.center, { paddingVertical: 9, paddingHorizontal: 4 }]}><T s m>{label}</T><T b>{value}</T></Card>
  );
}

/** Design page 12 · screen 41, visit report. */
export function VisitReportScreen({ params }: ScreenProps<{ id?: string }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const id = params.id ?? '2041';
  const [photo, setPhoto] = useState<string | null>(null);
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={`${t('Visit report', 'विज़िट रिपोर्ट')} · #${id}`} onBack={nav.back} />
        <Grid cols={3}><TimeBox label="In" value="11:08" /><TimeBox label="Out" value="12:10" /><TimeBox label="Worked" value="1 hr 2 min" sel /></Grid>
        <Card row onPress={() => nav.push('helperProfile')}>
          <Lft style={styles.grow}><Avatar face="sd" /><View style={styles.grow}><H2>Sunita D.</H2><T s m>Selfie matched at check-in and check-out</T></View></Lft>
          <Check on />
        </Card>
        <H2>Work done</H2>
        <Card style={styles.work}>
          {reportWorkDone.map((w) => <CheckRow key={w} on label={w} />)}
        </Card>
        <H2>Photos from the helper</H2>
        <Grid cols={3}>
          {reportPhotos.map((p) => (
            <Card key={p} pad={false} onPress={() => setPhoto(p)} style={[styles.photo, { borderRadius: 11, backgroundColor: c.mint, borderWidth: 0 }]}>
              <T s color={c.accent}>{p}</T>
            </Card>
          ))}
        </Grid>
        <Spacer />
        <Button variant="outline" danger onPress={() => nav.push('ratingLow', { stars: 2 })}>{t('Something is not right', 'कुछ ठीक नहीं है')}</Button>
      </Screen>
      <PhotoSheet photo={photo} onClose={() => setPhoto(null)} />
    </View>
  );
}

export default VisitReportScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
  center: { alignItems: 'center' },
  work: { gap: 9 },
  photo: { height: 62, alignItems: 'center', justifyContent: 'center' },
});
