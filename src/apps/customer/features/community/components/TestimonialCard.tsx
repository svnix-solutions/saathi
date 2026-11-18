import React from 'react';
import { View } from 'react-native';
import { Avatar, Card, Lft, Row, Stars, T, useT } from '@/native/ui';
import type { Quote } from '../data';

/** One quote on All testimonials: face, name and place, stars, then the short quote. */
export function TestimonialCard({ quote }: { quote: Quote }) {
  const t = useT();
  return (
    <Card>
      <Row>
        <Lft><Avatar face={quote.face} size={26} /><View><T b>{t(quote.name, quote.nameHi, quote.namePa)}</T><T s m>{t(quote.place, quote.placeHi, quote.placePa)}</T></View></Lft>
        <Stars value={quote.stars} />
      </Row>
      <T style={{ marginTop: 8 }}>“{t(quote.short, quote.shortHi, quote.shortPa)}”</T>
    </Card>
  );
}
