/** Design page 32 (section 58 "WORKER I"), screen 57 · Swap a job: pass it to a teammate or give it back. */
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, BackHeader, Button, Card, H, H2, Hr, Lft, Page, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { swapMates } from '../data';
import { useSwapRequest } from '../hooks/useSwapRequest';

export function SwapJobScreen() {
  const nav = useNav();
  const t = useT();
  const { sel, setSel, asked, accepted, mate, ask } = useSwapRequest();
  const [giveBack, setGiveBack] = useState(false);
  const confirmGiveBack = () => { setGiveBack(false); nav.toast('Job given back · no penalty'); setTimeout(() => nav.reset('jobs'), 600); };
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={t('Cannot do this job?', 'यह काम नहीं कर सकतीं?')} onBack={nav.back} />
        <Card sel>
          <Row><H2>Kitchen &amp; bath scrub</H2><Tag>Tue 2 pm</Tag></Row>
          <T s m style={{ marginTop: 4 }}>Block A · 2 hr · you earn ₹206</T>
        </Card>
        <H>{t('Pass it to another partner', 'किसी और पार्टनर को दें')}</H>
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
                      <View><T b>{m.name}</T><T s m>{isAsked ? (accepted ? 'Took the job' : 'Asked · waiting for reply…') : m.sub}</T></View>
                    </Lft>
                    {isAsked ? <Tag tone={accepted ? 'g' : 'x'}>{accepted ? 'Taken' : 'Asked'}</Tag> : (
                      <Button disabled={!!asked} variant={on ? 'primary' : 'outline'} style={{ paddingVertical: on ? 6 : 5, paddingHorizontal: 12 }} textStyle={{ fontSize: 12 }}
                        onPress={() => ask(m.id)}>{t('Ask', 'पूछें')}</Button>
                    )}
                  </Row>
                </Pressable>
              </React.Fragment>
            );
          })}
        </Card>
        {accepted
          ? <Card tone="mint"><H2>{mate.name} will go on Tue 2 pm</H2><T s m>The customer has been told who is coming. No penalty for you.</T></Card>
          : <Card tone="yellow"><T s color={palette.ink}><T s b color={palette.ink}>No penalty</T> if a partner takes it more than 3 hours before. The customer is told who is coming.</T></Card>}
        <Spacer />
        {accepted
          ? <Button onPress={() => nav.reset('jobs')}>{t('Back to my jobs', 'मेरे काम')}</Button>
          : <Button variant="plain" onPress={() => setGiveBack(true)}>{t('Give it back to Saathi', 'साथी को वापस दें')}</Button>}
      </Screen>
      <Sheet visible={giveBack} onClose={() => setGiveBack(false)}>
        <H2>{t('Give this job back?', 'यह काम वापस करें?')}</H2>
        <T s m>More than 3 hours before, so there is no penalty. We will find another partner.</T>
        <Button danger variant="outline" onPress={confirmGiveBack}>{t('Yes, give it back', 'हाँ, वापस करें')}</Button>
        <Button onPress={() => setGiveBack(false)}>{t('Keep the job', 'काम रखें')}</Button>
      </Sheet>
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default SwapJobScreen;
