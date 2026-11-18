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
  const title = t('Share my story', 'अपनी कहानी बताएँ');

  if (sent) {
    return (
      <Page variant="bare">
        <Screen>
          <BackHeader title={title} onBack={nav.back} />
          <Spacer />
          <Circle size={96} bg={c.mint}><Icon name="check" size={36} color={c.accent} strokeWidth={3} /></Circle>
          <H center>{t('Sent for approval', 'मंज़ूरी के लिए भेजा')}</H>
          <T s m center>Our team will show you the final words before any partner sees them. Usually within 2 days.</T>
          <Spacer />
          <Button big onPress={nav.back}>{t('Back to stories', 'कहानियों पर वापस')}</Button>
        </Screen>
      </Page>
    );
  }
  return (
    <Page variant="bare">
      <Screen>
        <BackHeader title={title} onBack={nav.back} />
        <H>{t('Tell new partners what this work is like', 'नए पार्टनर को बताएँ यह काम कैसा है')}</H>
        <RecordButton recording={rec} onPress={() => setRec((r) => !r)} />
        <T s m center>
          {rec ? `Recording · ${clipTime(secs)} · tap to stop`
            : secs > 0 ? `Voice note saved · ${clipTime(secs)}`
              : t('Hold and speak, in any language. Or type below.', 'किसी भी भाषा में बोलें। या नीचे लिखें।')}
        </T>
        <Input small multiline value={text} onChangeText={setText} placeholder={t('Type your story', 'अपनी कहानी लिखें')} style={styles.story} />
        <Card style={styles.options}>
          <Row><T style={styles.grow}>{t('Use my name and photo', 'मेरा नाम और फ़ोटो दिखाएँ')}</T><Toggle on={useName} onChange={setUseName} /></Row>
          <Hr />
          <Row><T style={styles.grow}>{t('Show to people thinking of joining', 'जुड़ने वालों को दिखाएँ')}</T><Toggle on={showJoin} onChange={setShowJoin} /></Row>
        </Card>
        <T s m>Our team approves each story before other partners can see it, and shows you the final words first.</T>
        <Spacer />
        <Button big disabled={!ready} onPress={() => { setRec(false); setSent(true); nav.toast(t('Sent for approval', 'मंज़ूरी के लिए भेजा')); }}>
          {t('Send my story', 'मेरी कहानी भेजें')}
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
