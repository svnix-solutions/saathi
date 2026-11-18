import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Bubble, Lft, Pill } from '@/native/ui';
import type { ChatMessage } from '../data';

export type ChatLineProps = { message: ChatMessage; picked?: string; onChoose: (choice: string) => void };

/** One chat bubble, with its quick-reply pills underneath when it offers choices. */
export function ChatLine({ message, picked, onChoose }: ChatLineProps) {
  const body = typeof message.text === 'string'
    ? message.text
    : message.text.map((p, i) => (p.bold ? <Text key={i} style={styles.bold}>{p.text}</Text> : <React.Fragment key={i}>{p.text}</React.Fragment>));
  return (
    <>
      <Bubble me={message.me}>{body}</Bubble>
      {message.choices && (
        <Lft gap={6} style={styles.wrap}>
          {message.choices.map((ch) => (
            <Pill key={ch} s sel={picked === ch} onPress={() => onChoose(ch)} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>{ch}</Pill>
          ))}
        </Lft>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bold: { fontWeight: '700' },
  wrap: { flexWrap: 'wrap' },
});
