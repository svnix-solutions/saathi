import React from 'react';
import { Card, H2, Row, T, Tag, useT } from '@/native/ui';
import { dur, priceFor, rupees, serviceName } from '@/domain';
import type { UpcomingBooking } from '../../../state';
import { slotParts } from '../slot';

export type BookingSummaryCardProps = { booking: UpcomingBooking; children?: React.ReactNode };

/** Selected card with the upcoming booking: service, day tag, "time · length · price"; actions go in `children`. */
export function BookingSummaryCard({ booking, children }: BookingSummaryCardProps) {
  const t = useT();
  const { day, time } = slotParts(t, booking);
  return (
    <Card sel>
      <Row><H2>{serviceName(t, booking.service)}</H2><Tag>{day}</Tag></Row>
      <T s m style={{ marginTop: 4 }}>{`${time} · ${dur(t, booking.minutes)} · ${rupees(priceFor(booking.service, booking.minutes))}`}</T>
      {children}
    </Card>
  );
}

export default BookingSummaryCard;
