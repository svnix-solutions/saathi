import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Bubble, Lft, Pill, useT } from '@/native/ui';
import type { ChatMessage, L } from '../data';

export type ChatLineProps = { message: ChatMessage; picked?: string; onChoose: (choice: L) => void };

/** One chat bubble, with its quick-reply pills underneath when it offers choices. */
export function ChatLine({ message, picked, onChoose }: ChatLineProps) {
  const t = useT();
  const tr = (l: L) => t(l.en, l.hi, l.pa);
  const { text } = message;
  const body = typeof text === 'string'
    ? text
    : Array.isArray(text)
      ? text.map((p, i) => (p.bold ? <Text key={i} style={styles.bold}>{tr(p.text)}</Text> : <React.Fragment key={i}>{tr(p.text)}</React.Fragment>))
      : tr(text);
  return (
    <>
      <Bubble me={message.me}>{body}</Bubble>
      {message.choices && (
        <Lft gap={6} style={styles.wrap}>
          {message.choices.map((ch) => (
            <Pill key={ch.en} s sel={picked === ch.en} onPress={() => onChoose(ch)} style={{ paddingVertical: 7, paddingHorizontal: 10 }}>{tr(ch)}</Pill>
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
