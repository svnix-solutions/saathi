/** Small helpers for the Foundations pages (not a story file). */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { font, palette } from '@/tokens';

export function Page({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
      {children}
    </View>
  );
}

export function Section({ title, children, dark }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <View style={[styles.section, dark && styles.sectionDark]}>
      <Text style={[styles.h2, dark && { color: '#eef3f1' }]}>{title}</Text>
      {children}
    </View>
  );
}

export function Swatch({ name, value, dark }: { name: string; value: string; dark?: boolean }) {
  return (
    <View style={styles.swatch}>
      <View style={[styles.chip, { backgroundColor: value }]} />
      <Text style={[styles.name, dark && { color: '#eef3f1' }]}>{name}</Text>
      <Text style={[styles.value, dark && { color: '#a3b3ae' }]}>{value}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  page: { padding: 24, gap: 18, maxWidth: 880 },
  title: { fontFamily: font.family, fontSize: 26, fontWeight: '700', color: palette.ink, letterSpacing: -0.3 },
  sub: { fontFamily: font.family, fontSize: 14, color: palette.mut, marginTop: -10 },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 20, gap: 14, borderWidth: 1, borderColor: palette.line },
  sectionDark: { backgroundColor: '#0e1614', borderColor: '#2a3a35' },
  h2: { fontFamily: font.family, fontSize: 14, fontWeight: '700', color: palette.ink },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  swatch: { width: 116, gap: 4 },
  chip: { height: 56, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,.08)' },
  name: { fontFamily: font.family, fontSize: 12, fontWeight: '700', color: palette.ink },
  value: { fontFamily: font.family, fontSize: 11, color: palette.mut },
});
