import React from 'react';
import { StyleSheet, Text, TextInput, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { font, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type InputProps = {
  value?: string;
  onChangeText?: (s: string) => void;
  placeholder?: string;
  /** fixed text before the value ("+91") */
  prefix?: string;
  keyboardType?: 'default' | 'phone-pad' | 'number-pad' | 'email-address';
  style?: StyleProp<ViewStyle>;
  /** 13px regular text instead of 15px semibold */
  small?: boolean;
  multiline?: boolean;
  maxLength?: number;
  /** password field */
  secure?: boolean;
  accessibilityLabel?: string;
};

/** Text field (the design's `.inp`): 1.5px border, 12px radius. */
export function Input({ value, onChangeText, placeholder, prefix, keyboardType, style, small, multiline, maxLength, secure, accessibilityLabel }: InputProps) {
  const { c, fs } = useTheme();
  return (
    <View style={[styles.box, { borderWidth: 1.5, borderRadius: radius.input, padding: 12, borderColor: c.line, backgroundColor: c.card, alignItems: multiline ? 'flex-start' : 'center' }, style]}>
      {prefix && <Text style={[styles.prefix, { color: c.mut, fontSize: fs(15) }]}>{prefix}</Text>}
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={c.mut}
        keyboardType={keyboardType} multiline={multiline} maxLength={maxLength} secureTextEntry={secure} accessibilityLabel={accessibilityLabel}
        style={{ flex: 1, minWidth: 0, fontFamily: font.family, fontSize: fs(small ? 13 : 15), fontWeight: small ? '400' : '600', color: c.ink, padding: 0, outlineStyle: 'none', minHeight: multiline ? 46 : undefined } as unknown as TextStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', gap: 6 },
  prefix: { fontFamily: font.family, fontWeight: '600' },
});
