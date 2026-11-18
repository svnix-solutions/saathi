import React from 'react';
import { Card, type CardProps } from '../Card';
import { Rows } from '../Rows';

export type ListCardProps = Omit<CardProps, 'row' | 'children'> & {
  children: React.ReactNode;
  /** gap between a row and the line (default 10) */
  gap?: number;
};

/** A Card whose children are split by lines: `<Card><Rows>…</Rows></Card>` in one component. */
export function ListCard({ children, gap, ...card }: ListCardProps) {
  return <Card {...card}><Rows gap={gap}>{children}</Rows></Card>;
}
