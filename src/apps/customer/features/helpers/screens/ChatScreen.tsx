import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Bubble, T, useNav, useT, useTheme } from '@/native/ui';
import { tr } from '../data';
import { ChatComposer } from '../components/ChatComposer';
import { ChatHeader } from '../components/ChatHeader';
import { useHelperChat } from '../hooks/useHelperChat';

/** Design page 11 · screen 38, chat with the helper. */
export function ChatScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { messages, draft, setDraft, typing, send } = useHelperChat();
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  return (
    <View style={[styles.root, { backgroundColor: c.surface }]}>
      <ChatHeader typing={typing} onCall={() => nav.toast(t('Calling Sunita through a private number…', 'प्राइवेट नंबर से सुनीता को कॉल हो रहा है…', 'ਪ੍ਰਾਈਵੇਟ ਨੰਬਰ ਰਾਹੀਂ ਸੁਨੀਤਾ ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…'))} />
      <ScrollView ref={scroller} style={styles.grow} contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 8 }}
        onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: true })}>
        {messages.map((m, i) => <Bubble key={i} me={m.me}>{tr(t, m.text)}</Bubble>)}
        {typing && <Bubble>…</Bubble>}
        <T s m center>{t('Numbers stay private. Chat closes after the visit.', 'नंबर प्राइवेट रहते हैं। विज़िट के बाद चैट बंद हो जाती है।', 'ਨੰਬਰ ਪ੍ਰਾਈਵੇਟ ਰਹਿੰਦੇ ਹਨ। ਵਿਜ਼ਿਟ ਤੋਂ ਬਾਅਦ ਚੈਟ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ।')}</T>
      </ScrollView>
      <ChatComposer draft={draft} onChangeDraft={setDraft} onSend={send} />
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  root: { flex: 1 },
  grow: { flex: 1 },
});
