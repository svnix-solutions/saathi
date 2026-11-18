import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, T } from '@/native/ui';

export type StatCardProps = { value: string; label: string; onPress?: () => void };

/** Small centred "4.8 / Rating" box on the helper profile. */
export function StatCard({ value, label, onPress }: StatCardProps) {
  return (
    <Card onPress={onPress} style={[styles.card, { paddingVertical: 9, paddingHorizontal: 4 }]}><T b>{value}</T><T s m>{label}</T></Card>
  );
}

export default StatCard;

const styles = StyleSheet.create({ card: { alignItems: 'center' } });
