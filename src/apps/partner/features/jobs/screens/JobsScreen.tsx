/** Jobs tab (design page 20, not drawn): today's and upcoming jobs. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { clockTime, rupees } from '@/domain';
import { Button, Card, Grid, H2, Icon, Lft, Page, Pill, Row, Screen, Sheet, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { jobRows, type JobRow } from '../data';
import { placeName, serviceTitle } from '../job';
import { useJobsState } from '../state';

export function JobsScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useJobsState();
  const [tab, setTab] = useState<'today' | 'later'>('today');
  const [open, setOpen] = useState<JobRow | null>(null);
  const active = !!st.selfieIn && !st.selfieOut;
  const rows = jobRows.filter((r) => (tab === 'today' ? r.state !== 'later' : r.state === 'later'));
  return (
    <Page>
      <TopBar>
        <TopBar.Text dim>{t('My jobs', 'मेरे काम', 'ਮੇਰੇ ਕੰਮ')}</TopBar.Text>
        <TopBar.Title>{t(`${st.jobsToday ?? 3} today`, `आज ${st.jobsToday ?? 3}`, `ਅੱਜ ${st.jobsToday ?? 3}`)}</TopBar.Title>
        <TopBar.Text dim>{t('1 more booked this afternoon', 'आज दोपहर 1 और बुक', 'ਅੱਜ ਦੁਪਹਿਰ 1 ਹੋਰ ਬੁੱਕ')}</TopBar.Text>
      </TopBar>
      <Screen>
        <Grid cols={2}>
          <Pill sel={tab === 'today'} onPress={() => setTab('today')}>{t('Today', 'आज', 'ਅੱਜ')}</Pill>
          <Pill sel={tab === 'later'} onPress={() => setTab('later')}>{t('Upcoming', 'आगे के', 'ਅੱਗੇ ਦੇ')}</Pill>
        </Grid>
        {active && tab === 'today' && (
          <Card sel onPress={() => nav.push('onJob')}>
            <Row><H2 style={styles.fill}>{serviceTitle(t, st.job.service)}</H2><Tag tone="g">{t('Now', 'अभी', 'ਹੁਣ')}</Tag></Row>
            <T s m style={{ marginTop: 4 }}>{placeName(t, st.job.address)} · {t('tap to open', 'खोलने के लिए दबाएँ', 'ਖੋਲ੍ਹਣ ਲਈ ਦਬਾਓ')}</T>
          </Card>
        )}
        {rows.map((r, i) => (
          <Card key={i} onPress={() => setOpen(r)}>
            <Row>
              <H2 style={styles.fill}>{t(r.en, r.hi, r.pa)}</H2>
              {r.state === 'done' ? <Tag tone="n">{t('Done', 'हो गया', 'ਹੋ ਗਿਆ')}</Tag> : r.state === 'next' ? <Tag>{clockTime(t, 14)}</Tag> : <Tag tone="x">{t('Booked', 'बुक', 'ਬੁੱਕ')}</Tag>}
            </Row>
            <Row style={{ marginTop: 4 }}>
              <View style={styles.fill}><T s m>{t(r.when.en, r.when.hi, r.when.pa)} · {t(r.where.en, r.where.hi, r.where.pa)}</T></View>
              <T s b color={r.state === 'done' ? c.accent : undefined}>{rupees(r.earn)}</T>
            </Row>
          </Card>
        ))}
        <Card tone="clear" row onPress={() => nav.push('hours')}>
          <Lft style={styles.fill}><Icon name="clock" color={c.accent} /><T style={styles.fill}>{t('My working hours', 'मेरे काम के घंटे', 'ਮੇਰੇ ਕੰਮ ਦੇ ਘੰਟੇ')}</T></Lft>
          <Icon name="chevron" color={c.mut} />
        </Card>
      </Screen>
      <PartnerTabs active="jobs" />
      <Sheet visible={!!open} onClose={() => setOpen(null)}>
        {open && <>
          <Row><H2 style={styles.fill}>{t(open.en, open.hi, open.pa)}</H2><H2>{rupees(open.earn)}</H2></Row>
          <T s m>{t(open.when.en, open.when.hi, open.when.pa)} · {t(open.where.en, open.where.hi, open.where.pa)}</T>
          {open.state === 'done'
            ? <T s>{t('Finished and paid into this week. Customer rated 5 stars.', 'पूरा हुआ, इस हफ़्ते के भुगतान में जुड़ा। ग्राहक ने 5 स्टार दिए।', 'ਪੂਰਾ ਹੋਇਆ, ਇਸ ਹਫ਼ਤੇ ਦੇ ਭੁਗਤਾਨ ਵਿੱਚ ਜੁੜਿਆ। ਗਾਹਕ ਨੇ 5 ਸਟਾਰ ਦਿੱਤੇ।')}</T>
            : <T s>{t('We remind you 30 minutes before. Check in at the door with a selfie.', 'हम 30 मिनट पहले याद दिलाएँगे। दरवाज़े पर सेल्फ़ी से चेक-इन करें।', 'ਅਸੀਂ 30 ਮਿੰਟ ਪਹਿਲਾਂ ਯਾਦ ਕਰਾਵਾਂਗੇ। ਦਰਵਾਜ਼ੇ ਤੇ ਸੈਲਫ਼ੀ ਨਾਲ ਚੈੱਕ-ਇਨ ਕਰੋ।')}</T>}
          {open.state === 'next' && <Button size="tall" onPress={() => { setOpen(null); nav.push('jobRequest'); }}>{t('Open job', 'काम खोलें', 'ਕੰਮ ਖੋਲ੍ਹੋ')}</Button>}
          {open.state === 'later' && <Button variant="plain" onPress={() => { setOpen(null); nav.push('swapJob'); }}>{t('I cannot make it', 'मैं नहीं आ पाऊँगी', 'ਮੈਂ ਨਹੀਂ ਆ ਸਕਾਂਗੀ')}</Button>}
          <Button variant="plain" onPress={() => setOpen(null)}>{t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ')}</Button>
        </>}
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default JobsScreen;
