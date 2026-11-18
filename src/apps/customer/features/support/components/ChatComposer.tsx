import React from 'react';
import { Pressable, StyleSheet, TextInput, View, type TextStyle } from 'react-native';
import { Icon, useT, useTheme } from '@/native/ui';
import { font } from '@/tokens';

export type ChatComposerProps = {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  /** pressed with an empty field (voice message) */
  onVoice: () => void;
};

/** The message field at the bottom of the chat: send arrow when there is text, microphone when empty. */
export function ChatComposer({ value, onChange, onSend, onVoice }: ChatComposerProps) {
  const t = useT();
  const { c, fs } = useTheme();
  const hasText = !!value.trim();
  return (
    <View style={styles.outer}>
      <View style={[styles.field, { borderWidth: 1.5, borderColor: c.line, borderRadius: 12, paddingVertical: 9, paddingHorizontal: 12, backgroundColor: c.card }]}>
        <TextInput value={value} onChangeText={onChange} placeholder={t('Type a message', 'संदेश लिखें')} placeholderTextColor={c.mut}
          onSubmitEditing={onSend} returnKeyType="send"
          style={[styles.input, { fontSize: fs(13), color: c.ink, padding: 0 }]} />
        <Pressable onPress={hasText ? onSend : onVoice} accessibilityLabel={hasText ? 'Send' : 'Voice message'} hitSlop={6}>
          <Icon name={hasText ? 'chevron' : 'mic'} color={c.accent} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { paddingHorizontal: 16, paddingBottom: 14 },
  field: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, minWidth: 0, fontFamily: font.family, outlineStyle: 'none' } as unknown as TextStyle,
});
