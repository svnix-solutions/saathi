import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H2, IconTile, ListCard, Lft, MenuRow, Screen, Spacer, T, Toggle, useNav, useT } from '@/native/ui';
import { problems } from '../data';
import { EmergencyCard } from '../components/EmergencyCard';
import { SafetyCallSheet } from '../components/SafetyCallSheet';

/** Design page 05 · Address, changes and safety — screen 15 · Help and safety. */
export function HelpScreen() {
  const nav = useNav();
  const t = useT();
  const [share, setShare] = useState(false);
  const [sos, setSos] = useState(false);
  const toggleShare = (v: boolean) => {
    setShare(v);
    nav.toast(v ? t('Link sent to your family', 'परिवार को लिंक भेजा गया', 'ਪਰਿਵਾਰ ਨੂੰ ਲਿੰਕ ਭੇਜਿਆ ਗਿਆ') : t('Sharing stopped', 'शेयर करना बंद', 'ਸ਼ੇਅਰ ਕਰਨਾ ਬੰਦ'));
  };
  return (
    <View style={styles.fill}>
      <Screen>
        <BackHeader title={t('Help and safety', 'मदद और सुरक्षा', 'ਮਦਦ ਅਤੇ ਸੁਰੱਖਿਆ')} onBack={nav.back} />
        <EmergencyCard onPress={() => setSos(true)} />
        <Card row>
          <Lft style={styles.fill}>
            <IconTile name="pin" />
            <View style={styles.fill}>
              <H2>{t('Share this visit', 'यह विज़िट शेयर करें', 'ਇਹ ਵਿਜ਼ਿਟ ਸ਼ੇਅਰ ਕਰੋ')}</H2>
              <T s m>{t('Family sees helper and timing', 'परिवार हेल्पर और समय देख सकता है', 'ਪਰਿਵਾਰ ਹੈਲਪਰ ਅਤੇ ਸਮਾਂ ਦੇਖ ਸਕਦਾ ਹੈ')}</T>
            </View>
          </Lft>
          <Toggle on={share} onChange={toggleShare} />
        </Card>
        <H2>{t('Something went wrong?', 'कुछ गलत हुआ?', 'ਕੁਝ ਗਲਤ ਹੋਇਆ?')}</H2>
        <ListCard gap={11}>
          {problems.map(([topic, en, hi, pa]) => <MenuRow key={topic} label={t(en, hi, pa)} onPress={() => nav.push('supportChat', { topic })} />)}
        </ListCard>
        <Spacer />
        <Button variant="outline" icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'Saathi सपोर्ट को कॉल हो रहा है…', 'Saathi ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))}>{t('Call support', 'सपोर्ट को कॉल करें', 'ਸਪੋਰਟ ਨੂੰ ਕਾਲ ਕਰੋ')}</Button>
      </Screen>
      <SafetyCallSheet visible={sos} onClose={() => setSos(false)} />
    </View>
  );
}

export default HelpScreen;

const styles = StyleSheet.create({ fill: { flex: 1 } });
