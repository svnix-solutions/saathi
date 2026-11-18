/** Design page 20 (section 4), screen 10 · New job request (timed accept). */
import React from 'react';
import { View } from 'react-native';
import { dur, mmss, rupees, taskNamesHiPartner } from '@/domain';
import { tint } from '@/tokens';
import { Button, Card, CharacterTile, H, H2, Hr, Icon, Lft, Page, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { jobReset } from '../../../state';
import { jobColors, newJob } from '../data';
import { useOfferCountdown } from '../hooks/useOfferCountdown';
import { serviceTitle } from '../job';
import { useJobsState } from '../state';

export function JobRequestScreen() {
  const t = useT();
  const nav = useNav();
  const { fs } = useTheme();
  const [st, set] = useJobsState();
  const job = st.offer ?? newJob;
  const left = useOfferCountdown(() => {
    set({ offerShown: true, offer: undefined });
    nav.reset('home');
    nav.toast(t('Missed: the job went to another partner', 'छूट गया: काम दूसरे पार्टनर को गया'));
  });
  const accept = () => {
    set({ ...jobReset, job: { ...job, done: [] }, offer: undefined, offerShown: true });
    nav.replace('checkIn');
    nav.toast(t('Job accepted. Head to Block C.', 'काम मंज़ूर। ब्लॉक सी जाएँ।'));
  };
  const decline = () => { set({ offerShown: true, offer: undefined }); nav.reset('home'); nav.toast(t('Job declined', 'काम मना किया')); };
  const home = job.id === newJob.id;
  return (
    <Page bg={palette.greenD}>
      <Screen bg={palette.greenD}>
        <Row><H2 color={palette.white}>{t('New job', 'नया काम')}</H2><Tag>{t(`Accept in ${mmss(left)}`, `${mmss(left)} में मंज़ूर करें`)}</Tag></Row>
        <Card style={{ marginTop: 8 }}>
          <Lft>
            <CharacterTile name={job.service.startsWith('Dish') ? 'kitchen' : 'clean'} />
            <View><H>{serviceTitle(t, job.service)}</H><T s m>{`${dur(t, job.minutes)} · ${t('start now', 'अभी शुरू')}`}</T></View>
          </Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Lft>
            <Icon name="pin" color={palette.green} />
            <View>
              <H2>{t(home ? 'Block C · 0.8 km' : 'Block C · 0.4 km', home ? 'ब्लॉक सी · 0.8 किमी' : 'ब्लॉक सी · 0.4 किमी')}</H2>
              <T s m>{t(home ? 'About 6 min by cycle' : 'About 3 min walk', home ? 'साइकिल से लगभग 6 मिनट' : 'पैदल लगभग 3 मिनट')}</T>
            </View>
          </Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Row><T m>{t('You earn', 'आपकी कमाई')}</T><H size={26}>{rupees(job.earn)}</H></Row>
        </Card>
        <Card tone="clear" style={{ borderColor: tint.greenTrack, borderWidth: 1 }}>
          <T s color={jobColors.onDarkDim}>{t('Tasks', 'काम')}: {job.tasks.map((x) => t(x.toLowerCase(), taskNamesHiPartner[x])).join(', ')}</T>
        </Card>
        <Spacer />
        <Button variant="yellow" size="tall" onPress={accept} style={{ paddingVertical: 18 }} textStyle={{ fontSize: fs(16) }}>{t('Accept job', 'काम मंज़ूर करें')}</Button>
        <Button variant="ghostDark" onPress={decline}>{t('Decline', 'मना करें')}</Button>
      </Screen>
    </Page>
  );
}

export default JobRequestScreen;
