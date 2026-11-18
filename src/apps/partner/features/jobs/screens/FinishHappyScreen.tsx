/** Design page 30 (section 100), screen 43 · Happy code: the earning is added straight away. */
import React from 'react';
import { View } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, H, Page, Screen, Spacer, StatusIcon, T, useNav, useT } from '@/native/ui';
import { earnOf, firstName, firstNameT } from '../job';
import { useJobsState } from '../state';

export function FinishHappyScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useJobsState();
  const name = firstName(st);
  const nameT = firstNameT(t, st);
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 14 }}><StatusIcon name="check" /></View>
        <H center>{t('Job complete', 'काम पूरा हुआ', 'ਕੰਮ ਪੂਰਾ ਹੋਇਆ')}</H>
        <T m center>{t(`${name} was happy with the work.`, `${nameT} काम से ख़ुश थे।`, `${nameT} ਕੰਮ ਤੋਂ ਖ਼ੁਸ਼ ਸਨ।`)}</T>
        <Card row><View style={{ flex: 1 }}><T m>{t('Added to this week', 'इस हफ़्ते में जुड़े', 'ਇਸ ਹਫ਼ਤੇ ਵਿੱਚ ਜੁੜੇ')}</T></View><H size={20}>{rupees(earnOf(st))}</H></Card>
        <Spacer />
        <Button size="tall" onPress={() => nav.push('rateCustomer')}>{t(`Rate ${name}`, `${nameT} को रेटिंग दें`, `${nameT} ਨੂੰ ਰੇਟਿੰਗ ਦਿਓ`)}</Button>
      </Screen>
    </Page>
  );
}

export default FinishHappyScreen;
