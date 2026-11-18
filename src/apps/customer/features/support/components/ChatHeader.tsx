import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { H2, Icon, Lft, T, TopBar, useTheme } from '@/native/ui';

export type ChatHeaderProps = { title: string; subtitle: string; onBack: () => void };

/** Green header of the support chat; the whole title block is the back button. */
export function ChatHeader({ title, subtitle, onBack }: ChatHeaderProps) {
  const { c } = useTheme();
  return (
    <TopBar style={{ paddingBottom: 12 }}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back"><Lft>
        <Icon name="back" color={c.onGreen} />
        <View>
          <H2 color={c.onGreen}>{title}</H2>
          <T s color={c.onGreen} style={styles.dim}>{subtitle}</T>
        </View>
      </Lft></Pressable>
    </TopBar>
  );
}

const styles = StyleSheet.create({ dim: { opacity: 0.8 } });
