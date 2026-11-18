import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  BackHeader, Button, Card, Circle, H, Hr, Icon, Input, Page, Row, Screen, Spacer, T, Toggle, useNav, useT, useTheme, useTimer,
} from '@/native/ui';
import { RecordButton } from '../components/RecordButton';
import { clipTime } from '../data';

/** Design page 29 · screen 46: record or type my story for new partners, sent to the team for approval. */
export function ShareStoryScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [text, setText] = useState('');
  const [rec, setRec] = useState(false);
  const [secs] = useTimer(rec);
  const [useName, setUseName] = useState(true);
  const [showJoin, setShowJoin] = useState(true);
  const [sent, setSent] = useState(false);
  const ready = text.trim().length > 0 || secs > 0;
  const title = t('Share my story', 'अपनी कहानी बताएँ', 'ਆਪਣੀ ਕਹਾਣੀ ਦੱਸੋ');

  if (sent) {
    return (
      <Page variant="bare">
        <Screen>
          <BackHeader title={title} onBack={nav.back} />
          <Spacer />
          <Circle size={96} bg={c.mint}><Icon name="check" size={36} color={c.accent} strokeWidth={3} /></Circle>
          <H center>{t('Sent for approval', 'मंज़ूरी के लिए भेजा', 'ਮਨਜ਼ੂਰੀ ਲਈ ਭੇਜਿਆ')}</H>
          <T s m center>{t('Our team will show you the final words before any partner sees them. Usually within 2 days.', 'किसी पार्टनर के देखने से पहले हमारी टीम आपको आख़िरी शब्द दिखाएगी। आमतौर पर 2 दिन में।', 'ਕਿਸੇ ਪਾਰਟਨਰ ਦੇ ਦੇਖਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਡੀ ਟੀਮ ਤੁਹਾਨੂੰ ਆਖ਼ਰੀ ਸ਼ਬਦ ਦਿਖਾਵੇਗੀ। ਆਮ ਤੌਰ ਤੇ 2 ਦਿਨਾਂ ਵਿੱਚ।')}</T>
          <Spacer />
          <Button big onPress={nav.back}>{t('Back to stories', 'कहानियों पर वापस', 'ਕਹਾਣੀਆਂ ਤੇ ਵਾਪਸ')}</Button>
        </Screen>
      </Page>
    );
  }
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={title} onBack={nav.back} />
        <H>{t('Tell new partners what this work is like', 'नए पार्टनर को बताएँ यह काम कैसा है', 'ਨਵੇਂ ਪਾਰਟਨਰਾਂ ਨੂੰ ਦੱਸੋ ਇਹ ਕੰਮ ਕਿਹੋ ਜਿਹਾ ਹੈ')}</H>
        <RecordButton recording={rec} onPress={() => setRec((r) => !r)} />
        <T s m center>
          {rec ? t(`Recording · ${clipTime(secs)} · tap to stop`, `रिकॉर्ड हो रहा है · ${clipTime(secs)} · रोकने के लिए दबाएँ`, `ਰਿਕਾਰਡ ਹੋ ਰਿਹਾ ਹੈ · ${clipTime(secs)} · ਰੋਕਣ ਲਈ ਦਬਾਓ`)
            : secs > 0 ? t(`Voice note saved · ${clipTime(secs)}`, `आवाज़ सेव हो गई · ${clipTime(secs)}`, `ਆਵਾਜ਼ ਸੇਵ ਹੋ ਗਈ · ${clipTime(secs)}`)
              : t('Hold and speak, in any language. Or type below.', 'किसी भी भाषा में बोलें। या नीचे लिखें।', 'ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲੋ। ਜਾਂ ਹੇਠਾਂ ਲਿਖੋ।')}
        </T>
        <Input small multiline value={text} onChangeText={setText} placeholder={t('Type your story', 'अपनी कहानी लिखें', 'ਆਪਣੀ ਕਹਾਣੀ ਲਿਖੋ')} style={styles.story} />
        <Card style={styles.options}>
          <Row><T style={styles.grow}>{t('Use my name and photo', 'मेरा नाम और फ़ोटो दिखाएँ', 'ਮੇਰਾ ਨਾਮ ਅਤੇ ਫ਼ੋਟੋ ਦਿਖਾਓ')}</T><Toggle on={useName} onChange={setUseName} /></Row>
          <Hr />
          <Row><T style={styles.grow}>{t('Show to people thinking of joining', 'जुड़ने वालों को दिखाएँ', 'ਜੁੜਨ ਵਾਲਿਆਂ ਨੂੰ ਦਿਖਾਓ')}</T><Toggle on={showJoin} onChange={setShowJoin} /></Row>
        </Card>
        <T s m>{t('Our team approves each story before other partners can see it, and shows you the final words first.', 'दूसरी पार्टनर के देखने से पहले हमारी टीम हर कहानी को मंज़ूरी देती है, और पहले आपको आख़िरी शब्द दिखाती है।', 'ਦੂਜੇ ਪਾਰਟਨਰਾਂ ਦੇ ਦੇਖਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਡੀ ਟੀਮ ਹਰ ਕਹਾਣੀ ਨੂੰ ਮਨਜ਼ੂਰੀ ਦਿੰਦੀ ਹੈ, ਅਤੇ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਆਖ਼ਰੀ ਸ਼ਬਦ ਦਿਖਾਉਂਦੀ ਹੈ।')}</T>
        <Spacer />
        <Button big disabled={!ready} onPress={() => { setRec(false); setSent(true); nav.toast(t('Sent for approval', 'मंज़ूरी के लिए भेजा', 'ਮਨਜ਼ੂਰੀ ਲਈ ਭੇਜਿਆ')); }}>
          {t('Send my story', 'मेरी कहानी भेजें', 'ਮੇਰੀ ਕਹਾਣੀ ਭੇਜੋ')}
        </Button>
      </Screen>
    </Page>
  );
}

const styles = StyleSheet.create({
  story: { minHeight: 60 },
  options: { gap: 10 },
  grow: { flex: 1 },
});

export default ShareStoryScreen;
