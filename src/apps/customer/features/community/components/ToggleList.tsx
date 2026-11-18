import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Hr, Row, T, Toggle } from '@/native/ui';

export type ToggleItem = { label: string; on: boolean; onChange: (v: boolean) => void };

/** A card of "label …… switch" rows split by lines. */
export function ToggleList({ items }: { items: ToggleItem[] }) {
  return (
    <Card style={styles.gap}>
      {items.map((it, i) => (
        <React.Fragment key={it.label}>
          {i > 0 && <Hr />}
          <Row><View style={styles.label}><T>{it.label}</T></View><Toggle on={it.on} onChange={it.onChange} /></Row>
        </React.Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({ gap: { gap: 10 }, label: { flex: 1 } });
