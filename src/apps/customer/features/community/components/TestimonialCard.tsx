import React from 'react';
import { View } from 'react-native';
import { Avatar, Card, Lft, Row, Stars, T } from '@/native/ui';
import type { Quote } from '../data';

/** One quote on All testimonials: face, name and place, stars, then the short quote. */
export function TestimonialCard({ quote }: { quote: Quote }) {
  return (
    <Card>
      <Row>
        <Lft><Avatar face={quote.face} size={26} /><View><T b>{quote.name}</T><T s m>{quote.place}</T></View></Lft>
        <Stars value={quote.stars} />
      </Row>
      <T style={{ marginTop: 8 }}>“{quote.short}”</T>
    </Card>
  );
}
