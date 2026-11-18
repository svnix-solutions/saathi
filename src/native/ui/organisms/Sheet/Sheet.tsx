import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { radius, tint } from '@/tokens';
import { useTheme } from '../../../theme/index';

export type SheetProps = {
  visible: boolean;
  /** tap on the backdrop */
  onClose?: () => void;
  children: React.ReactNode;
};

/** A bottom sheet over the phone screen with a dimmed backdrop. Place it last inside a `Page`. */
export function Sheet({ visible, onClose, children }: SheetProps) {
  const { c } = useTheme();
  if (!visible) return null;
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onClose} accessibilityLabel="Close" style={styles.scrim} />
      <View style={[styles.panel, { backgroundColor: c.surface }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', inset: 0, zIndex: 50, justifyContent: 'flex-end' } as ViewStyle,
  scrim: { position: 'absolute', inset: 0, backgroundColor: tint.scrim } as ViewStyle,
  panel: { borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, padding: 16, paddingBottom: 20, gap: 11 },
});
