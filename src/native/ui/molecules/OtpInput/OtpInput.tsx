import React from 'react';
import { StyleSheet, TextInput, View, type TextStyle } from 'react-native';
import { font, radius } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type OtpInputProps = {
  /** number of boxes (default 4) */
  length?: number;
  value: string;
  onChange: (v: string) => void;
  /** red borders (wrong code) */
  error?: boolean;
};

/** 4 (or 6) box SMS / start-code input. Focus moves to the next box as digits are typed; Backspace moves back. */
export function OtpInput({ length = 4, value, onChange, error }: OtpInputProps) {
  const { c, fs } = useTheme();
  const refs = React.useRef<({ focus: () => void } | null)[]>([]);
  return (
    <View style={styles.row}>
      {Array.from({ length }).map((_, i) => {
        const active = value.length === i;
        return (
          <TextInput key={i} ref={(r: { focus: () => void } | null) => { refs.current[i] = r; }} value={value[i] ?? ''} maxLength={1} keyboardType="number-pad"
            accessibilityLabel={`Digit ${i + 1}`}
            onChangeText={(d) => {
              const digit = d.replace(/\D/g, '').slice(-1);
              const next = (value.slice(0, i) + digit + value.slice(i + 1)).slice(0, length);
              onChange(next);
              if (digit && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyPress={(e) => { if (e.nativeEvent.key === 'Backspace' && !value[i] && i > 0) { onChange(value.slice(0, i - 1)); refs.current[i - 1]?.focus(); } }}
            style={{
              flex: 1, minWidth: 0, minHeight: 50, textAlign: 'center', fontSize: fs(20), fontWeight: '600', fontFamily: font.family, color: c.ink,
              borderWidth: 1.5, borderRadius: radius.input, borderColor: error ? c.red : active ? c.selBorder : c.line,
              backgroundColor: active ? c.selBg : c.card, outlineStyle: 'none',
            } as unknown as TextStyle} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: 'row', gap: 9 } });
