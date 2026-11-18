/** Design page 28, screen 40 · Rate the customer (the home), or report a problem. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, Grid, H, H2, Icon, Page, Pill, Row, Screen, Sheet, Spacer, Stars, T, Tag, TopBar, palette, useNav, useT, useTheme } from '@/native/ui';
import { initialPartnerState } from '../../../state';
import { homeProblems, homeTags, homeTagsStart } from '../data';
import { useJobsState } from '../state';

export function RateCustomerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useJobsState();
  const job = st.job ?? initialPartnerState.job;
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(homeTagsStart);
  const [report, setReport] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const toggle = (k: string) => setTags((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const finish = (msg: string) => { nav.reset('home'); nav.toast(msg); };
  return (
    <Page variant="bare">
      <TopBar>
        <Row><H2 color={palette.white}>{t(`Job done · ${rupees(job.earn)} earned`, `काम पूरा · ${rupees(job.earn)} कमाए`)}</H2><Tag>{job.id}</Tag></Row>
      </TopBar>
      <Screen>
        <H>{t('How was this home?', 'यह घर कैसा था?')}</H>
        <View style={styles.stars}><Stars size={32} value={stars} onChange={setStars} /></View>
        <Grid cols={2}>
          {homeTags.map(([en, hi]) => <Pill key={en} sel={tags.includes(en)} onPress={() => toggle(en)}>{t(en, hi)}</Pill>)}
        </Grid>
        <Card row tone="red" onPress={() => setReport(true)}>
          <View style={styles.fill}>
            <H2 color={c.red}>{t('Report a problem', 'समस्या बताएँ')}</H2>
            <T s m>Unsafe, abusive, or asked for extra work</T>
          </View>
          <Icon name="shield" color={c.red} />
        </Card>
        <T s m>{t('The customer does not see your rating. It helps us send partners to good homes.', 'ग्राहक आपकी रेटिंग नहीं देखते। इससे हम पार्टनर को अच्छे घरों में भेजते हैं।')}</T>
        <Spacer />
        <Button big onPress={() => { set({ lastHomeRating: { stars, tags } }); finish(t('Thanks. Your rating is saved.', 'धन्यवाद। रेटिंग सेव हो गई।')); }}>
          {t('Submit', 'भेजें')}
        </Button>
        <Button variant="plain" onPress={() => finish(t('Skipped', 'छोड़ दिया'))}>{t('Skip', 'छोड़ें')}</Button>
      </Screen>
      <Sheet visible={report} onClose={() => setReport(false)}>
        <H2 color={c.red}>{t('Report a problem', 'समस्या बताएँ')}</H2>
        <T s m>Only our safety team sees this. The customer is not told who reported.</T>
        {homeProblems.map((p) => <Card key={p} sel={problem === p} onPress={() => setProblem(p)} style={{ paddingVertical: 9 }}><T>{p}</T></Card>)}
        <Button danger disabled={!problem} onPress={() => { setReport(false); finish('Reported. Our safety team will call you in 2 minutes.'); }}>
          {t('Send report', 'रिपोर्ट भेजें')}
        </Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  stars: { alignSelf: 'center' },
});

export default RateCustomerScreen;
