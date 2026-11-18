import React from 'react';
import { View } from 'react-native';
import { Hr } from '../../atoms/Hr';

export type RowsProps = {
  children: React.ReactNode;
  /** gap between a row and the line (default 10) */
  gap?: number;
};

/** Stacks its children with a <Hr> between each (falsy children are skipped). Use inside a Card, or use ListCard. */
export function Rows({ children, gap = 10 }: RowsProps) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={{ gap }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Hr />}
          {it}
        </React.Fragment>
      ))}
    </View>
  );
}
