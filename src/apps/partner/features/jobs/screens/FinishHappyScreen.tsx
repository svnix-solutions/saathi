/** Design page 30 (section 100), screen 43 · Happy code: the earning is added straight away. */
import React from 'react';
import { View } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, H, Page, Screen, Spacer, StatusIcon, T, useNav, useT } from '@/native/ui';
import { earnOf, firstName } from '../job';
import { useJobsState } from '../state';

export function FinishHappyScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useJobsState();
  const name = firstName(st);
  return (
    <Page>
      <Screen>
        <View style={{ marginTop: 14 }}><StatusIcon name="check" /></View>
        <H center>{t('Job complete', 'काम पूरा हुआ')}</H>
        <T m center>{t(`${name} was happy with the work.`, `${name} काम से ख़ुश थे।`)}</T>
        <Card row><T m>{t('Added to this week', 'इस हफ़्ते में जुड़े')}</T><H size={20}>{rupees(earnOf(st))}</H></Card>
        <Spacer />
        <Button size="tall" onPress={() => nav.push('rateCustomer')}>{t(`Rate ${name}`, `${name} को रेटिंग दें`)}</Button>
      </Screen>
    </Page>
  );
}

export default FinishHappyScreen;
