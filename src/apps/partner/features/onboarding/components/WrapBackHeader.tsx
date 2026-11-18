import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { H2, Icon, useT, useTheme } from '@/native/ui';

/**
 * The shared `BackHeader` ("‹ Title"), but the title wraps instead of running off a small phone. The shared one keeps
 * its title on one line (its Pressable does not shrink); this copy can go once `BackHeader` lets the title shrink.
 */
export function WrapBackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const { c } = useTheme();
  const t = useT();
  return (
    <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel={t('Back', 'वापस', 'ਵਾਪਸ')} style={styles.press} hitSlop={8}>
      <Icon name="back" color={c.ink} />
      <H2 style={styles.title}>{title}</H2>
    </Pressable>
  );
}

export default WrapBackHeader;

const styles = StyleSheet.create({
  press: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', maxWidth: '100%' },
  title: { flexShrink: 1 },
});
