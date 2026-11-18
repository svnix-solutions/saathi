/** Design page 22 (section 54), screen 17 · Check in: location, time, start code, selfie. */
import React from 'react';
import { clockTime, codes } from '@/domain';
import { Button, Card, H2, OtpInput, Page, Row, Screen, Spacer, T, Tag, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { useStartCode } from '../../../state';
import { CheckLine } from '../components/CheckLine';
import { useLocationMatch } from '../hooks/useLocationMatch';
import { hoursLabel, placeName, serviceTitle } from '../job';
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
        <Row><TopBar.Heading>{t('Check in', 'चेक-इन', 'ਚੈੱਕ-ਇਨ')}</TopBar.Heading><Tag>{t('Job', 'काम', 'ਕੰਮ')} {job.id}</Tag></Row>
        <TopBar.Text dim style={{ marginTop: 4 }}>{placeName(t, job.address)} · {serviceTitle(t, job.service)} · {hoursLabel(t, job.minutes)}</TopBar.Text>
      </TopBar>
      <Screen>
        <CheckLine on={located} busy={!located} icon="pin"
          title={located ? t('Location matched', 'लोकेशन मिल गई', 'ਲੋਕੇਸ਼ਨ ਮਿਲ ਗਈ') : t('Checking location…', 'लोकेशन जाँच रहे हैं…', 'ਲੋਕੇਸ਼ਨ ਜਾਂਚ ਰਹੇ ਹਾਂ…')}
          sub={located ? t('You are 12 m from the door', 'आप दरवाज़े से 12 मीटर दूर हैं', 'ਤੁਸੀਂ ਦਰਵਾਜ਼ੇ ਤੋਂ 12 ਮੀਟਰ ਦੂਰ ਹੋ') : t('Stand near the door', 'दरवाज़े के पास खड़े हों', 'ਦਰਵਾਜ਼ੇ ਦੇ ਕੋਲ ਖੜ੍ਹੇ ਹੋਵੋ')}
          onPress={() => !located && nav.push('err.locationOff')} />
        <CheckLine on icon="clock" title={t('Time 11:08 am', `समय ${clockTime(t, 11, 8)}`, `ਸਮਾਂ ${clockTime(t, 11, 8)}`)} sub={t('On time · due by 11:10', 'समय पर · 11:10 तक पहुँचना था', 'ਸਮੇਂ ਤੇ · 11:10 ਤੱਕ ਪਹੁੰਚਣਾ ਸੀ')} />
        {verified
          ? <CheckLine on title={t('Start code matched', 'स्टार्ट कोड मिल गया', 'ਸਟਾਰਟ ਕੋਡ ਮਿਲ ਗਿਆ')} sub={t('Read out by the customer', 'ग्राहक ने बताया', 'ਗਾਹਕ ਨੇ ਦੱਸਿਆ')} />
          : locked
            ? <Card tone="red" style={{ gap: 8 }}>
                <H2>{t('Only support can start this job now', 'अब यह काम सिर्फ़ सपोर्ट शुरू कर सकता है', 'ਹੁਣ ਇਹ ਕੰਮ ਸਿਰਫ਼ ਸਪੋਰਟ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ')}</H2>
                <T s m>{t(`${codes.maxTries} wrong start codes were typed.`, `${codes.maxTries} बार गलत स्टार्ट कोड डाला गया।`, `${codes.maxTries} ਵਾਰ ਗ਼ਲਤ ਸਟਾਰਟ ਕੋਡ ਪਾਇਆ ਗਿਆ।`)}</T>
                <Button icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल हो रहा है…', 'Saathi ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))}>{t('Call support', 'सपोर्ट को कॉल करें', 'ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
              </Card>
            : <Card sel style={{ gap: 9 }}>
                <H2>{t('Ask the customer for the start code', 'ग्राहक से स्टार्ट कोड पूछें', 'ਗਾਹਕ ਤੋਂ ਸਟਾਰਟ ਕੋਡ ਪੁੱਛੋ')}</H2>
                <OtpInput value={code} error={wrong} onChange={type} />
                {wrong
                  ? <T s color={c.red}>{t(`That code does not match. ${left} ${left === 1 ? 'try' : 'tries'} left.`, `कोड मेल नहीं खाता। ${left} कोशिश बाकी।`, `ਕੋਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ। ${left} ਕੋਸ਼ਿਸ਼ਾਂ ਬਾਕੀ।`)}</T>
                  : <T s m>{t(`It is in the customer's app. Prototype code: ${codes.start}`, `यह ग्राहक के ऐप में है। प्रोटोटाइप कोड: ${codes.start}`, `ਇਹ ਗਾਹਕ ਦੇ ਐਪ ਵਿੱਚ ਹੈ। ਪ੍ਰੋਟੋਟਾਈਪ ਕੋਡ: ${codes.start}`)}</T>}
                <Button disabled={code.length < 4} onPress={() => verify() && nav.toast(t('Start code matches', 'स्टार्ट कोड सही है', 'ਸਟਾਰਟ ਕੋਡ ਸਹੀ ਹੈ'))}>{t('Verify code', 'कोड जाँचें', 'ਕੋਡ ਜਾਂਚੋ')}</Button>
              </Card>}
        <CheckLine on={selfie} sel={verified && !selfie} icon="user" title={t('Selfie', 'सेल्फ़ी', 'ਸੈਲਫ਼ੀ')}
          sub={selfie ? t('Added · clock started', 'जुड़ गई · समय शुरू', 'ਜੁੜ ਗਈ · ਸਮਾਂ ਸ਼ੁਰੂ') : verified ? t('Needed to start the clock', 'समय शुरू करने के लिए ज़रूरी', 'ਸਮਾਂ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਜ਼ਰੂਰੀ') : t('After the start code', 'स्टार्ट कोड के बाद', 'ਸਟਾਰਟ ਕੋਡ ਤੋਂ ਬਾਅਦ')}
          onPress={() => (verified ? nav.push('selfie', { mode: 'in' }) : nav.toast(t('Enter the start code first', 'पहले स्टार्ट कोड डालें', 'ਪਹਿਲਾਂ ਸਟਾਰਟ ਕੋਡ ਪਾਓ')))} />
        <Spacer />
        {selfie
          ? <Button size="tall" onPress={() => nav.reset('onJob')}>{t('Start the job', 'काम शुरू करें', 'ਕੰਮ ਸ਼ੁਰੂ ਕਰੋ')}</Button>
          : <Button size="tall" disabled={!located || !verified} onPress={() => nav.push('selfie', { mode: 'in' })}>{t('Take selfie and check in', 'सेल्फ़ी लें और चेक-इन करें', 'ਸੈਲਫ਼ੀ ਲਓ ਅਤੇ ਚੈੱਕ-ਇਨ ਕਰੋ')}</Button>}
      </Screen>
    </Page>
  );
}

export default CheckInScreen;
