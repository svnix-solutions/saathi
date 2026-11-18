import React from 'react';
import { CardHead } from '../CardHead/CardHead';

export type TableCardProps = {
  /** Card title; with `right`, rendered as a padded `<CardHead>`. */
  title?: React.ReactNode;
  right?: React.ReactNode;
  /** A custom header row instead of `title`/`right` (e.g. tabs on the left and a search box on the right). */
  head?: React.ReactNode;
  /** The table. */
  children: React.ReactNode;
  /** Under the table, usually `<Pager>`. */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
};

/** The card that holds a list table: padding `14px 8px 4px`, a header row, the table, then a footer. */
export const TableCard = ({ title, right, head, children, footer, style }: TableCardProps) => (
  <div className="card" style={{ padding: '14px 8px 4px', ...style }}>
    {head ?? (title !== undefined || right !== undefined ? <CardHead title={title} right={right} /> : null)}
    {children}
    {footer}
  </div>
);
