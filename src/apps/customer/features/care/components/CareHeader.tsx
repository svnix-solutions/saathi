import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Lft, TopBar } from '@/native/ui';

/** Green Saathi Care header: back arrow (when there is history), a small label, the headline and a line under it. */
export function CareHeader({ label, title, sub, right }: { label: string; title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <TopBar>
      <Lft><TopBar.Back /><TopBar.Text dim b style={styles.grow}>{label}</TopBar.Text>{right}</Lft>
      <View style={styles.body}>
        <TopBar.Title size={21}>{title}</TopBar.Title>
        {sub ? <TopBar.Text dim>{sub}</TopBar.Text> : null}
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  body: { marginTop: 8, gap: 2 },
});
