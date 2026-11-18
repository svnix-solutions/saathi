/** Design page 30 (section 100), screen 44 · Not-happy code: the job is closed and the earning held (not taken). */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { rupees } from '@/domain';
import { Button, Card, H, H2, Icon, Input, Page, Screen, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { earnOf, firstName, firstNameT } from '../job';
import { useJobsState } from '../state';

export function FinishNotHappyScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useJobsState();
  const name = firstName(st);
  const nameT = firstNameT(t, st);
  const [note, setNote] = useState('');
  const send = () => {
    nav.reset('home');
    nav.toast(note.trim() ? t('Note sent to support', 'नोट सपोर्ट को भेजा', 'ਨੋਟ ਸਪੋਰਟ ਨੂੰ ਭੇਜਿਆ') : t('Support will call you', 'सपोर्ट आपको कॉल करेगा', 'ਸਪੋਰਟ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰੇਗਾ'));
  };
  return (
    <Page>
      <Screen>
        <View style={styles.alert}>
          <Icon name="alert" size={30} color={palette.ink} />
        </View>
        <H center>{t('Job closed', 'काम बंद हुआ', 'ਕੰਮ ਬੰਦ ਹੋਇਆ')}</H>
        <T m center>{t(`${name} was not happy with this visit. Support will call him, then you.`, `${nameT} इस बार के काम से ख़ुश नहीं थे। सपोर्ट पहले उन्हें, फिर आपको कॉल करेगा।`, `${nameT} ਇਸ ਵਾਰ ਦੇ ਕੰਮ ਤੋਂ ਖ਼ੁਸ਼ ਨਹੀਂ ਸਨ। ਸਪੋਰਟ ਪਹਿਲਾਂ ਉਹਨਾਂ ਨੂੰ, ਫਿਰ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰੇਗਾ।`)}</T>
        <Card row><T m style={styles.fill}>{t(`${rupees(earnOf(st))} on hold until then`, `तब तक ${rupees(earnOf(st))} रुके रहेंगे`, `ਉਦੋਂ ਤੱਕ ${rupees(earnOf(st))} ਰੁਕੇ ਰਹਿਣਗੇ`)}</T><Tag>{t('Usually 1 day', 'आमतौर पर 1 दिन', 'ਆਮ ਤੌਰ ਤੇ 1 ਦਿਨ')}</Tag></Card>
        <H2>{t('Anything support should know?', 'सपोर्ट को कुछ बताना है?', 'ਸਪੋਰਟ ਨੂੰ ਕੁਝ ਦੱਸਣਾ ਹੈ?')}</H2>
        <Input multiline value={note} onChangeText={setNote} placeholder={t('Customer asked me to skip the balcony', 'ग्राहक ने बालकनी छोड़ने को कहा', 'ਗਾਹਕ ਨੇ ਬਾਲਕਨੀ ਛੱਡਣ ਲਈ ਕਿਹਾ')} style={{ minHeight: 58 }} />
        <Spacer />
        <Button size="tall" onPress={send}>{t('Send note', 'नोट भेजें', 'ਨੋਟ ਭੇਜੋ')}</Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  alert: { width: 64, height: 64, borderRadius: 32, alignSelf: 'center', marginTop: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.yellow },
});

export default FinishNotHappyScreen;
