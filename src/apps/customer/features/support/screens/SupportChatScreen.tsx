import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Bubble, Lft, Link, T, useBack, useNav, useT, useTheme } from '@/native/ui';
import { ChatHeader } from '../components/ChatHeader';
import { ChatLine } from '../components/ChatLine';
import { ChatComposer } from '../components/ChatComposer';
import { useSupportChat } from '../hooks/useSupportChat';
import type { L } from '../data';

/** Design page 14 (CUSTOMER J) · Language, gifting, support and society — screen 50 · Support chat. */
export function SupportChatScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('help');
  const { c } = useTheme();
  const chat = useSupportChat();
  const [text, setText] = useState('');
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const send = (q: string) => { if (chat.send(q)) setText(''); };
  const choose = (i: number, choice: L) => {
    if (!chat.choose(i, choice)) { nav.toast(t('Already answered', 'पहले ही जवाब दे दिया', 'ਪਹਿਲਾਂ ਹੀ ਜਵਾਬ ਦੇ ਦਿੱਤਾ')); return; }
    setText('');
  };
  const askPerson = () => { chat.askPerson(); nav.toast(t('Connecting you to a person…', 'किसी व्यक्ति से जोड़ रहे हैं…', 'ਕਿਸੇ ਵਿਅਕਤੀ ਨਾਲ ਜੋੜ ਰਹੇ ਹਾਂ…')); };

  return (
    <View style={[styles.fill, { backgroundColor: c.surface }]}>
      <ChatHeader title={t('Saathi help', 'Saathi सहायता', 'Saathi ਸਹਾਇਤਾ')} subtitle={t('Answers in seconds, a person if needed', 'सेकंडों में जवाब, ज़रूरत हो तो कोई व्यक्ति', 'ਸਕਿੰਟਾਂ ਵਿੱਚ ਜਵਾਬ, ਲੋੜ ਹੋਵੇ ਤਾਂ ਕੋਈ ਵਿਅਕਤੀ')} onBack={back} />
      <ScrollView ref={scroll} style={styles.fill} contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 8 }}
        onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })} showsVerticalScrollIndicator={false}>
        {chat.messages.map((m, i) => <ChatLine key={i} message={m} picked={chat.picked[i]} onChoose={(ch) => choose(i, ch)} />)}
        {chat.typing && <Bubble>…</Bubble>}
        <Lft style={styles.center} gap={4}>
          <T s m>{t('Not solved?', 'हल नहीं हुआ?', 'ਹੱਲ ਨਹੀਂ ਹੋਇਆ?')}</T><Link onPress={askPerson}>{t('Talk to a person', 'किसी व्यक्ति से बात करें', 'ਕਿਸੇ ਵਿਅਕਤੀ ਨਾਲ ਗੱਲ ਕਰੋ')}</Link>
        </Lft>
      </ScrollView>
      <ChatComposer value={text} onChange={setText} onSend={() => send(text)}
        onVoice={() => nav.toast(t('Hold to record a voice message', 'आवाज़ संदेश के लिए दबाकर रखें', 'ਆਵਾਜ਼ ਸੁਨੇਹੇ ਲਈ ਦਬਾ ਕੇ ਰੱਖੋ'))} />
    </View>
  );
}

export default SupportChatScreen;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { justifyContent: 'center' },
});
