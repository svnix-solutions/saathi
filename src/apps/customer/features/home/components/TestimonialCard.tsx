import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Lft, Stars, T, useT, useTheme } from '@/native/ui';
import type { Quote } from '../../community';

/** One neighbour's quote with stars, face, name and plan. Tap to show the next one. */
export function TestimonialCard({ quote, onPress }: { quote: Quote; onPress?: () => void }) {
  const { c } = useTheme();
  const t = useT();
  return (
    <Card sel onPress={onPress}>
      <Stars value={quote.stars} />
      <Text style={[styles.quote, { color: c.ink }]}>“{t(quote.text, quote.textHi, quote.textPa)}”</Text>
      <Lft>
        <Avatar face={quote.face} size={26} />
        <View><T b>{t(quote.name, quote.nameHi, quote.namePa)}</T><T s m>{t(quote.place, quote.placeHi, quote.placePa)} · {quote.plan ? t(quote.plan, quote.planHi, quote.planPa) : quote.plan}</T></View>
      </Lft>
    </Card>
  );
}

const styles = StyleSheet.create({ quote: { fontSize: 14, fontWeight: '600', marginTop: 6, marginBottom: 10, lineHeight: 19 } });

export default TestimonialCard;
