/** Jobs tab (design page 20, not drawn): today's and upcoming jobs. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, Grid, H2, Icon, Lft, Page, Pill, Row, Screen, Sheet, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { jobRows, type JobRow } from '../data';
import { serviceTitle } from '../job';
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
        <TopBar.Text dim>{t('My jobs', 'मेरे काम')}</TopBar.Text>
        <TopBar.Title>{t(`${st.jobsToday ?? 3} today`, `आज ${st.jobsToday ?? 3}`)}</TopBar.Title>
        <TopBar.Text dim>{t('1 more booked this afternoon', 'आज दोपहर 1 और बुक')}</TopBar.Text>
      </TopBar>
      <Screen>
        <Grid cols={2}>
          <Pill sel={tab === 'today'} onPress={() => setTab('today')}>{t('Today', 'आज')}</Pill>
          <Pill sel={tab === 'later'} onPress={() => setTab('later')}>{t('Upcoming', 'आगे के')}</Pill>
        </Grid>
        {active && tab === 'today' && (
          <Card sel onPress={() => nav.push('onJob')}>
            <Row><H2>{serviceTitle(t, st.job.service)}</H2><Tag tone="g">{t('Now', 'अभी')}</Tag></Row>
            <T s m style={{ marginTop: 4 }}>{st.job.address} · {t('tap to open', 'खोलने के लिए दबाएँ')}</T>
          </Card>
        )}
        {rows.map((r, i) => (
          <Card key={i} onPress={() => setOpen(r)}>
            <Row>
              <H2 style={styles.fill}>{t(r.en, r.hi)}</H2>
              {r.state === 'done' ? <Tag tone="n">{t('Done', 'हो गया')}</Tag> : r.state === 'next' ? <Tag>2:00 pm</Tag> : <Tag tone="x">{t('Booked', 'बुक')}</Tag>}
            </Row>
            <Row style={{ marginTop: 4 }}>
              <T s m>{r.when} · {t(r.whereEn, r.whereHi)}</T>
              <T s b color={r.state === 'done' ? c.accent : undefined}>{rupees(r.earn)}</T>
            </Row>
          </Card>
        ))}
        <Card tone="clear" row onPress={() => nav.push('hours')}>
          <Lft><Icon name="clock" color={c.accent} /><T>{t('My working hours', 'मेरे काम के घंटे')}</T></Lft>
          <Icon name="chevron" color={c.mut} />
        </Card>
      </Screen>
      <PartnerTabs active="jobs" />
      <Sheet visible={!!open} onClose={() => setOpen(null)}>
        {open && <>
          <Row><H2>{t(open.en, open.hi)}</H2><H2>{rupees(open.earn)}</H2></Row>
          <T s m>{open.when} · {t(open.whereEn, open.whereHi)}</T>
          {open.state === 'done'
            ? <T s>{t('Finished and paid into this week. Customer rated 5 stars.', 'पूरा हुआ, इस हफ़्ते के भुगतान में जुड़ा। ग्राहक ने 5 स्टार दिए।')}</T>
            : <T s>{t('We remind you 30 minutes before. Check in at the door with a selfie.', 'हम 30 मिनट पहले याद दिलाएँगे। दरवाज़े पर सेल्फ़ी से चेक-इन करें।')}</T>}
          {open.state === 'next' && <Button size="tall" onPress={() => { setOpen(null); nav.push('jobRequest'); }}>{t('Open job', 'काम खोलें')}</Button>}
          {open.state === 'later' && <Button variant="plain" onPress={() => { setOpen(null); nav.push('swapJob'); }}>{t('I cannot make it', 'मैं नहीं आ पाऊँगी')}</Button>}
          <Button variant="plain" onPress={() => setOpen(null)}>{t('Close', 'बंद करें')}</Button>
        </>}
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default JobsScreen;
