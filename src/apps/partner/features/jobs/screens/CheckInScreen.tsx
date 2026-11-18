/** Design page 22 (section 54), screen 17 · Check in: location, time, start code, selfie. */
import React from 'react';
import { codes } from '@/domain';
import { Button, Card, H2, OtpInput, Page, Row, Screen, Spacer, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { useStartCode } from '../../../state';
import { CheckLine } from '../components/CheckLine';
import { useLocationMatch } from '../hooks/useLocationMatch';
import { hoursLabel, serviceTitle } from '../job';
import { useJobsState } from '../state';

export function CheckInScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st] = useJobsState();
  const located = useLocationMatch();
  const job = st.job;
  const selfie = !!st.selfieIn;
  // start code: typed by the partner, read out by the customer (same rule and tries as the start-code screen)
  const { code, type, wrong, left, locked, verified, verify } = useStartCode();
  return (
    <Page>
      <TopBar>
        <Row><TopBar.Heading>{t('Check in', 'चेक-इन')}</TopBar.Heading><Tag>{t('Job', 'काम')} {job.id}</Tag></Row>
        <TopBar.Text dim style={{ marginTop: 4 }}>{job.address} · {serviceTitle(t, job.service)} · {hoursLabel(t, job.minutes)}</TopBar.Text>
      </TopBar>
      <Screen>
        <CheckLine on={located} busy={!located} icon="pin"
          title={located ? t('Location matched', 'लोकेशन मिल गई') : t('Checking location…', 'लोकेशन जाँच रहे हैं…')}
          sub={located ? t('You are 12 m from the door', 'आप दरवाज़े से 12 मीटर दूर हैं') : t('Stand near the door', 'दरवाज़े के पास खड़े हों')}
          onPress={() => !located && nav.push('err.locationOff')} />
        <CheckLine on icon="clock" title={t('Time 11:08 am', 'समय 11:08 am')} sub={t('On time · due by 11:10', 'समय पर · 11:10 तक पहुँचना था')} />
        {verified
          ? <CheckLine on title={t('Start code matched', 'स्टार्ट कोड मिल गया')} sub={t('Read out by the customer', 'ग्राहक ने बताया')} />
          : locked
            ? <Card tone="red" style={{ gap: 8 }}>
                <H2>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है')}</H2>
                <T s m>{t(`${codes.maxTries} wrong start codes were typed.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया।`)}</T>
                <Button icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'साथी सपोर्ट को कॉल हो रहा है…'))}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
              </Card>
            : <Card sel style={{ gap: 9 }}>
                <H2>{t('Ask the customer for the start code', 'ग्राहक से स्टार्ट कोड पूछें')}</H2>
                <OtpInput value={code} error={wrong} onChange={type} />
                {wrong
                  ? <T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`)}</T>
                  : <T s m>{t(`It is in the customer's app. Prototype code: ${codes.start}`, `यह ग्राहक के ऐप में है। प्रोटोटाइप कोड: ${codes.start}`)}</T>}
                <Button disabled={code.length < 4} onPress={() => verify() && nav.toast(t('Start code matches', 'स्टार्ट कोड सही है'))}>{t('Verify code', 'कोड जाँचें')}</Button>
              </Card>}
        <CheckLine on={selfie} sel={verified && !selfie} icon="user" title={t('Selfie', 'सेल्फ़ी')}
          sub={selfie ? t('Added · clock started', 'जुड़ गई · समय शुरू') : verified ? t('Needed to start the clock', 'समय शुरू करने के लिए ज़रूरी') : t('After the start code', 'स्टार्ट कोड के बाद')}
          onPress={() => (verified ? nav.push('selfie', { mode: 'in' }) : nav.toast(t('Enter the start code first', 'पहले स्टार्ट कोड डालें')))} />
        <Spacer />
        {selfie
          ? <Button size="tall" onPress={() => nav.reset('onJob')}>{t('Start the job', 'काम शुरू करें')}</Button>
          : <Button size="tall" disabled={!located || !verified} onPress={() => nav.push('selfie', { mode: 'in' })}>{t('Take selfie and check in', 'सेल्फ़ी लें और चेक-इन करें')}</Button>}
      </Screen>
    </Page>
  );
}

export default CheckInScreen;
