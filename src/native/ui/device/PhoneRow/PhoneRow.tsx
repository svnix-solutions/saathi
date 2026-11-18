import React from 'react';
import { StyleSheet, View } from 'react-native';
import { space } from '@/tokens';

/** Lays several phones side by side, like a design page (the design's `.phones`). */
export function PhoneRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space.phones, justifyContent: 'center', alignItems: 'flex-start', padding: 24 },
});
