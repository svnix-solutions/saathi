import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Bubble, T, useNav, useTheme } from '@/native/ui';
import { ChatComposer } from '../components/ChatComposer';
import { ChatHeader } from '../components/ChatHeader';
import { useHelperChat } from '../hooks/useHelperChat';

/** Design page 11 · screen 38, chat with the helper. */
export function ChatScreen() {
  const nav = useNav();
  const { c } = useTheme();
  const { messages, draft, setDraft, typing, send } = useHelperChat();
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  return (
    <View style={[styles.root, { backgroundColor: c.surface }]}>
      <ChatHeader typing={typing} onCall={() => nav.toast('Calling Sunita through a private number…')} />
      <ScrollView ref={scroller} style={styles.grow} contentContainerStyle={{ padding: 16, paddingTop: 20, gap: 8 }}
        onContentSizeChange={() => scroller.current?.scrollToEnd({ animated: true })}>
        {messages.map((m, i) => <Bubble key={i} me={m.me}>{m.text}</Bubble>)}
        {typing && <Bubble>…</Bubble>}
        <T s m center>Numbers stay private. Chat closes after the visit.</T>
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
