import React from 'react';
import { View } from 'react-native';
import { Card, H2, Link, Row, T, useT } from '@/native/ui';
import { rupees, serviceName, type ServiceId } from '@/domain';

export type PastBookingCardProps = { service: ServiceId; price: number; meta: string; onBookAgain: () => void };

/** A finished booking with its price and a "Book again" link. */
export function PastBookingCard({ service, price, meta, onBookAgain }: PastBookingCardProps) {
  const t = useT();
  return (
    <Card>
      <Row><H2>{serviceName(t, service)}</H2><T>{rupees(price)}</T></Row>
      <T s m style={{ marginTop: 4 }}>{meta}</T>
      <View style={{ marginTop: 8 }}><Link onPress={onBookAgain}>{t('Book again', 'फिर से बुक करें', 'ਫਿਰ ਤੋਂ ਬੁੱਕ ਕਰੋ')}</Link></View>
    </Card>
  );
}

export default PastBookingCard;
