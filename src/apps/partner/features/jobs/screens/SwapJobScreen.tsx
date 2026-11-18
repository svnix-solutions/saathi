/** Design page 32 (section 58 "WORKER I"), screen 57 · Swap a job: pass it to a teammate or give it back. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, BackHeader, Button, Card, H, H2, Hr, Lft, Page, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { clockTime, rupees } from '@/domain';
import { swapMates } from '../data';
import { personName } from '../job';
import { useSwapRequest } from '../hooks/useSwapRequest';

export function SwapJobScreen() {
  const nav = useNav();
  const t = useT();
  const { sel, setSel, asked, accepted, mate, ask } = useSwapRequest();
  const [giveBack, setGiveBack] = useState(false);
  const when = t('Tue 2 pm', `मंगल ${clockTime(t, 14)}`, `ਮੰਗਲ ${clockTime(t, 14)}`);
  const confirmGiveBack = () => { setGiveBack(false); nav.toast(t('Job given back · no penalty', 'काम वापस किया · कोई जुर्माना नहीं', 'ਕੰਮ ਵਾਪਸ ਕੀਤਾ · ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ')); setTimeout(() => nav.reset('jobs'), 600); };
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={t('Cannot do this job?', 'यह काम नहीं कर सकतीं?', 'ਇਹ ਕੰਮ ਨਹੀਂ ਕਰ ਸਕਦੇ?')} onBack={nav.back} />
        <Card sel>
          <Row><H2 style={styles.fill}>{t('Kitchen & bath scrub', 'रसोई और बाथरूम', 'ਰਸੋਈ ਅਤੇ ਬਾਥਰੂਮ')}</H2><Tag>{when}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{t(`Block A · 2 hr · you earn ${rupees(206)}`, `ब्लॉक ए · 2 घंटे · आपकी कमाई ${rupees(206)}`, `ਬਲਾਕ ਏ · 2 ਘੰਟੇ · ਤੁਹਾਡੀ ਕਮਾਈ ${rupees(206)}`)}</T>
        </Card>
        <H>{t('Pass it to another partner', 'किसी और पार्टनर को दें', 'ਕਿਸੇ ਹੋਰ ਪਾਰਟਨਰ ਨੂੰ ਦਿਓ')}</H>
        <Card style={{ gap: 10 }}>
          {swapMates.map((m, i) => {
            const on = m.id === sel;
            const isAsked = asked === m.id;
            return (
              <React.Fragment key={m.id}>
                {i > 0 && <Hr />}
                <Pressable onPress={() => !asked && setSel(m.id)} accessibilityRole="button">
                  <Row>
                    <Lft style={styles.fill}>
                      <Avatar face={m.face} size={28} />
                      <View style={styles.fill}><T b>{personName(t, m.name)}</T><T s m>{isAsked ? (accepted ? t('Took the job', 'काम ले लिया', 'ਕੰਮ ਲੈ ਲਿਆ') : t('Asked · waiting for reply…', 'पूछा · जवाब का इंतज़ार…', 'ਪੁੱਛਿਆ · ਜਵਾਬ ਦੀ ਉਡੀਕ…')) : t(m.sub, m.subHi, m.subPa)}</T></View>
                    </Lft>
                    {isAsked ? <Tag tone={accepted ? 'g' : 'x'}>{accepted ? t('Taken', 'ले लिया', 'ਲੈ ਲਿਆ') : t('Asked', 'पूछा', 'ਪੁੱਛਿਆ')}</Tag> : (
                      <Button disabled={!!asked} variant={on ? 'primary' : 'outline'} style={{ paddingVertical: on ? 6 : 5, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }}
                        onPress={() => ask(m.id)}>{t('Ask', 'पूछें', 'ਪੁੱਛੋ')}</Button>
                    )}
                  </Row>
                </Pressable>
              </React.Fragment>
            );
          })}
        </Card>
        {accepted
          ? <Card tone="mint"><H2>{t(`${mate.name} will go on Tue 2 pm`, `${personName(t, mate.name)} ${when} जाएँगी`, `${personName(t, mate.name)} ${when} ਜਾਣਗੇ`)}</H2><T s m>{t('The customer has been told who is coming. No penalty for you.', 'ग्राहक को बता दिया है कि कौन आ रहा है। आप पर कोई जुर्माना नहीं।', 'ਗਾਹਕ ਨੂੰ ਦੱਸ ਦਿੱਤਾ ਹੈ ਕਿ ਕੌਣ ਆ ਰਿਹਾ ਹੈ। ਤੁਹਾਡੇ ਤੇ ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ।')}</T></Card>
          : <Card tone="yellow"><T s color={palette.ink}><T s b color={palette.ink}>{t('No penalty', 'कोई जुर्माना नहीं', 'ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ')}</T>{t(' if a partner takes it more than 3 hours before. The customer is told who is coming.', ' अगर कोई पार्टनर 3 घंटे से पहले ले ले। ग्राहक को बताया जाता है कि कौन आ रहा है।', ' ਜੇ ਕੋਈ ਪਾਰਟਨਰ 3 ਘੰਟੇ ਤੋਂ ਪਹਿਲਾਂ ਲੈ ਲਵੇ। ਗਾਹਕ ਨੂੰ ਦੱਸਿਆ ਜਾਂਦਾ ਹੈ ਕਿ ਕੌਣ ਆ ਰਿਹਾ ਹੈ।')}</T></Card>}
        <Spacer />
        {accepted
          ? <Button onPress={() => nav.reset('jobs')}>{t('Back to my jobs', 'मेरे काम', 'ਮੇਰੇ ਕੰਮ')}</Button>
          : <Button variant="plain" onPress={() => setGiveBack(true)}>{t('Give it back to Saathi', 'Saathi को वापस दें', 'Saathi ਨੂੰ ਵਾਪਸ ਦਿਓ')}</Button>}
      </Screen>
      <Sheet visible={giveBack} onClose={() => setGiveBack(false)}>
        <H2>{t('Give this job back?', 'यह काम वापस करें?', 'ਇਹ ਕੰਮ ਵਾਪਸ ਕਰਨਾ ਹੈ?')}</H2>
        <T s m>{t('More than 3 hours before, so there is no penalty. We will find another partner.', '3 घंटे से ज़्यादा पहले है, इसलिए कोई जुर्माना नहीं। हम दूसरा पार्टनर ढूँढ लेंगे।', '3 ਘੰਟੇ ਤੋਂ ਵੱਧ ਪਹਿਲਾਂ ਹੈ, ਇਸ ਲਈ ਕੋਈ ਜੁਰਮਾਨਾ ਨਹੀਂ। ਅਸੀਂ ਕੋਈ ਹੋਰ ਪਾਰਟਨਰ ਲੱਭ ਲਵਾਂਗੇ।')}</T>
        <Button danger variant="outline" onPress={confirmGiveBack}>{t('Yes, give it back', 'हाँ, वापस करें', 'ਹਾਂ, ਵਾਪਸ ਕਰੋ')}</Button>
        <Button onPress={() => setGiveBack(false)}>{t('Keep the job', 'काम रखें', 'ਕੰਮ ਰੱਖੋ')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default SwapJobScreen;
