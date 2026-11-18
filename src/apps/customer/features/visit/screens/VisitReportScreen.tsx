import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Avatar, BackHeader, Button, Card, Check, CheckRow, Grid, H2, Lft, Screen, Spacer, T, useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { taskName } from '@/domain';
import { tr, type Tri } from '../../helpers';
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
  const [photo, setPhoto] = useState<Tri | null>(null);
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={`${t('Visit report', 'विज़िट रिपोर्ट', 'ਵਿਜ਼ਿਟ ਰਿਪੋਰਟ')} · #${id}`} onBack={nav.back} />
        <Grid cols={3}>
          <TimeBox label={t('In', 'आईं', 'ਆਈ')} value="11:08" />
          <TimeBox label={t('Out', 'गईं', 'ਗਈ')} value="12:10" />
          <TimeBox label={t('Worked', 'काम किया', 'ਕੰਮ ਕੀਤਾ')} value={t('1 hr 2 min', '1 घंटा 2 मिनट', '1 ਘੰਟਾ 2 ਮਿੰਟ')} sel />
        </Grid>
        <Card row onPress={() => nav.push('helperProfile')}>
          <Lft style={styles.grow}><Avatar face="sd" /><View style={styles.grow}><H2>{t('Sunita D.', 'सुनीता डी.', 'ਸੁਨੀਤਾ ਡੀ.')}</H2><T s m>{t('Selfie matched at check-in and check-out', 'चेक-इन और चेक-आउट पर सेल्फ़ी मिली', 'ਚੈੱਕ-ਇਨ ਅਤੇ ਚੈੱਕ-ਆਊਟ ਤੇ ਸੈਲਫ਼ੀ ਮਿਲ ਗਈ')}</T></View></Lft>
          <Check on />
        </Card>
        <H2>{t('Work done', 'किया गया काम', 'ਕੀਤਾ ਗਿਆ ਕੰਮ')}</H2>
        <Card style={styles.work}>
          {reportWorkDone.map((w) => <CheckRow key={w} on label={taskName(t, w)} />)}
        </Card>
        <H2>{t('Photos from the helper', 'हेल्पर की फ़ोटो', 'ਹੈਲਪਰ ਦੀਆਂ ਫ਼ੋਟੋਆਂ')}</H2>
        <Grid cols={3}>
          {reportPhotos.map((p) => (
            <Card key={p.en} pad={false} onPress={() => setPhoto(p)} style={[styles.photo, { borderRadius: 11, backgroundColor: c.mint, borderWidth: 0 }]}>
              <T s color={c.accent}>{tr(t, p)}</T>
            </Card>
          ))}
        </Grid>
        <Spacer />
        <Button variant="outline" danger onPress={() => nav.push('ratingLow', { stars: 2 })}>{t('Something is not right', 'कुछ ठीक नहीं है', 'ਕੁਝ ਠੀਕ ਨਹੀਂ ਹੈ')}</Button>
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
