/** Story decorator for the component stories: a phone-width surface with screen padding. Not exported from the barrel. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { palette } from '@/tokens';
import { useTheme } from '../../theme/index';

function Frame({ children }: { children: React.ReactNode }) {
  const { c } = useTheme();
  return <View style={[styles.frame, { backgroundColor: c.surface }]}>{children}</View>;
}

export const frame = (Story: React.ComponentType) => <Frame><Story /></Frame>;

const styles = StyleSheet.create({
  frame: { width: 280, padding: 16, gap: 11, borderRadius: 16, borderWidth: 1, borderColor: palette.line },
});
