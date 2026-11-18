/** Design page 20 (section 4), screen 10 · New job request (timed accept). */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { dur, mmss, rupees, taskNamesHiPartner, taskNamesPa } from '@/domain';
import { tint } from '@/tokens';
import { Button, Card, CharacterTile, H, H2, Hr, Icon, Lft, Page, Row, Screen, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { jobReset } from '../../../state';
import { newJob } from '../data';
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
    nav.toast(t('Missed: the job went to another partner', 'छूट गया: काम दूसरे पार्टनर को गया', 'ਖੁੰਝ ਗਿਆ: ਕੰਮ ਕਿਸੇ ਹੋਰ ਪਾਰਟਨਰ ਨੂੰ ਗਿਆ'));
  });
  const accept = () => {
    set({ ...jobReset, job: { ...job, done: [] }, offer: undefined, offerShown: true });
    nav.replace('checkIn');
    nav.toast(t('Job accepted. Head to Block C.', 'काम मंज़ूर। ब्लॉक सी जाएँ।', 'ਕੰਮ ਮਨਜ਼ੂਰ। ਬਲਾਕ ਸੀ ਜਾਓ।'));
  };
  const decline = () => { set({ offerShown: true, offer: undefined }); nav.reset('home'); nav.toast(t('Job declined', 'काम मना किया', 'ਕੰਮ ਤੋਂ ਮਨ੍ਹਾ ਕੀਤਾ')); };
  const home = job.id === newJob.id;
  return (
    <Page bg={palette.greenD}>
      <Screen bg={palette.greenD}>
        <Row><H2 color={palette.white} style={styles.fill}>{t('New job', 'नया काम', 'ਨਵਾਂ ਕੰਮ')}</H2><Tag>{t(`Accept in ${mmss(left)}`, `${mmss(left)} में मंज़ूर करें`, `${mmss(left)} ਵਿੱਚ ਮਨਜ਼ੂਰ ਕਰੋ`)}</Tag></Row>
        <Card style={{ marginTop: 8 }}>
          <Lft>
            <CharacterTile name={job.service.startsWith('Dish') ? 'kitchen' : 'clean'} />
            <View style={styles.fill}><H>{serviceTitle(t, job.service)}</H><T s m>{`${dur(t, job.minutes)} · ${t('start now', 'अभी शुरू', 'ਹੁਣੇ ਸ਼ੁਰੂ')}`}</T></View>
          </Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Lft>
            <Icon name="pin" color={palette.green} />
            <View style={styles.fill}>
              <H2>{t(home ? 'Block C · 0.8 km' : 'Block C · 0.4 km', home ? 'ब्लॉक सी · 0.8 किमी' : 'ब्लॉक सी · 0.4 किमी', home ? 'ਬਲਾਕ ਸੀ · 0.8 ਕਿ.ਮੀ.' : 'ਬਲਾਕ ਸੀ · 0.4 ਕਿ.ਮੀ.')}</H2>
              <T s m>{t(home ? 'About 6 min by cycle' : 'About 3 min walk', home ? 'साइकिल से लगभग 6 मिनट' : 'पैदल लगभग 3 मिनट', home ? 'ਸਾਈਕਲ ਤੇ ਲਗਭਗ 6 ਮਿੰਟ' : 'ਪੈਦਲ ਲਗਭਗ 3 ਮਿੰਟ')}</T>
            </View>
          </Lft>
          <Hr style={{ marginVertical: 12 }} />
          <Row><T m>{t('You earn', 'आपकी कमाई', 'ਤੁਹਾਡੀ ਕਮਾਈ')}</T><H size={26}>{rupees(job.earn)}</H></Row>
        </Card>
        <Card tone="clear" style={{ borderColor: tint.greenTrack, borderWidth: 1 }}>
          <T s color={tint.onDeepGreenMuted}>{t('Tasks', 'काम', 'ਕੰਮ')}: {job.tasks.map((x) => t(x.toLowerCase(), taskNamesHiPartner[x], taskNamesPa[x])).join(', ')}</T>
        </Card>
        <Spacer />
        <Button variant="yellow" size="tall" onPress={accept} style={{ paddingVertical: 18 }} textStyle={{ fontSize: fs(16) }}>{t('Accept job', 'काम मंज़ूर करें', 'ਕੰਮ ਮਨਜ਼ੂਰ ਕਰੋ')}</Button>
        <Button variant="ghostDark" onPress={decline}>{t('Decline', 'मना करें', 'ਮਨ੍ਹਾ ਕਰੋ')}</Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default JobRequestScreen;
