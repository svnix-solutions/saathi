import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { elevation, font, palette, radius, text, tint } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../../atoms/Icon';

export type ButtonVariant = 'primary' | 'outline' | 'yellow' | 'ghost' | 'ghostDark' | 'plain';

export type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  /**
   * `primary` green · `outline` accent border · `yellow` Quick Yellow (speed only) · `ghost` text only ·
   * `ghostDark` white text + dark-green border (on the green header) · `plain` grey border + ink text
   * (was partner/v1 `Plain` and customer/v1 errors `OutlineInk`).
   */
  variant?: ButtonVariant;
  /**
   * `regular` 13px label, 13px padding (default) · `big` 16px label, 17px padding (same as the `big` flag) ·
   * `tall` 15px label, 16px padding (the partner app's bottom button; was partner/v1 `Big`).
   */
  size?: 'regular' | 'big' | 'tall';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  /** same as `size="big"` */
  big?: boolean;
  disabled?: boolean;
  /** red label on an outline button */
  danger?: boolean;
  /** icon before the label (bolt and star are drawn filled) */
  icon?: IconName;
  accessibilityLabel?: string;
};

/** Full-width button (the design's `.btn`, `.btn.o`, `.btn.y`). */
export function Button({ children, onPress, variant = 'primary', size, style, textStyle, big, disabled, danger, icon, accessibilityLabel }: ButtonProps) {
  const { c, fs } = useTheme();
  const sz = size ?? (big ? 'big' : 'regular');
  const v: Record<ButtonVariant, { bg: string; fg: string; border?: string }> = {
    primary: { bg: palette.green, fg: '#fff' },
    outline: { bg: 'transparent', fg: danger ? c.red : c.accent, border: danger ? c.line : c.accent },
    yellow: { bg: palette.yellow, fg: palette.ink },
    ghost: { bg: 'transparent', fg: c.accent },
    ghostDark: { bg: 'transparent', fg: '#fff', border: tint.greenTrack },
    plain: { bg: 'transparent', fg: c.ink, border: c.line },
  };
  const k = v[variant];
  const padY = sz === 'big' ? 17 : sz === 'tall' ? 16 : 13;
  const label = sz === 'big' ? text.buttonBig.size : sz === 'tall' ? text.buttonTall.size : font.size.btn;
  return (
    <Pressable disabled={disabled} onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.base, {
        backgroundColor: k.bg, borderRadius: radius.btn, paddingVertical: padY, paddingHorizontal: 13,
        borderWidth: k.border ? 1.5 : 0, borderColor: k.border, opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        ...(variant === 'primary' && !disabled ? { boxShadow: elevation.buttonPrimary } : {}),
        ...(variant === 'yellow' && !disabled ? { boxShadow: elevation.buttonYellow } : {}),
      } as ViewStyle, style]}>
      {icon && <Icon name={icon} size={16} color={k.fg} fill={icon === 'bolt' || icon === 'star'} />}
      <Text style={[styles.label, { color: k.fg, fontSize: fs(label) }, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  label: { fontFamily: font.family, fontWeight: '700', textAlign: 'center' },
});
