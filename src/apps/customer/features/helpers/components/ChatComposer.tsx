import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Link, Pill, Row, useTheme } from '@/native/ui';
import { quickReplies } from '../data';

export type ChatComposerProps = { draft: string; onChangeDraft: (v: string) => void; onSend: (text: string) => void };

/** Quick-reply pills and the message field at the bottom of the chat. */
export function ChatComposer({ draft, onChangeDraft, onSend }: ChatComposerProps) {
  const { c } = useTheme();
  return (
    <View style={styles.root}>
      <View style={styles.quick}>
        {quickReplies.map((q) => (
          <Pill key={q} s onPress={() => onSend(q)} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>{q}</Pill>
        ))}
      </View>
      <Row style={{ borderWidth: 1.5, borderColor: c.line, borderRadius: 12, paddingVertical: 4, paddingLeft: 0, paddingRight: 12, backgroundColor: c.card }}>
        <Input small value={draft} onChangeText={onChangeDraft} placeholder="Type a message" style={{ flex: 1, borderWidth: 0, paddingVertical: 5, backgroundColor: 'transparent' }} />
        <Link onPress={() => onSend(draft)}>Send</Link>
      </Row>
    </View>
  );
}

export default ChatComposer;

const styles = StyleSheet.create({
  root: { paddingHorizontal: 16, paddingBottom: 14, gap: 8 },
  quick: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
