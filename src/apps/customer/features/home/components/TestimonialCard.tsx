import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Lft, Stars, T, useTheme } from '@/native/ui';
import type { Quote } from '../../community';

/** One neighbour's quote with stars, face, name and plan. Tap to show the next one. */
export function TestimonialCard({ quote, onPress }: { quote: Quote; onPress?: () => void }) {
  const { c } = useTheme();
  return (
    <Card sel onPress={onPress}>
      <Stars value={quote.stars} />
      <Text style={[styles.quote, { color: c.ink }]}>“{quote.text}”</Text>
      <Lft>
        <Avatar face={quote.face} size={26} />
        <View><T b>{quote.name}</T><T s m>{quote.place} · {quote.plan}</T></View>
      </Lft>
    </Card>
  );
}

const styles = StyleSheet.create({ quote: { fontSize: 14, fontWeight: '600', marginTop: 6, marginBottom: 10, lineHeight: 19 } });

export default TestimonialCard;
