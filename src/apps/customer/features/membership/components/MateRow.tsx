import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Lft, Row, T, Tag } from '@/native/ui';
import { rupees } from '@/domain';
import type { Mate } from '../data';

export type MateRowProps = {
  mate: Mate;
  /** second line under the name */
  status: string;
  /** their share this week, or null while they are only invited */
  amount: number | null;
  onPress: () => void;
};

/** A person in a shared home with their share of the bill; tap to move them in or out of the split. */
export function MateRow({ mate, status, amount, onPress }: MateRowProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Row>
        <Lft style={styles.grow}>
          <Avatar face={mate.face} initials={mate.initials} size={26} />
          <View style={styles.grow}><T b>{mate.name}</T><T s m>{status}</T></View>
        </Lft>
        {amount === null ? <Tag tone="x">Invited</Tag> : <T b m={amount === 0}>{rupees(amount)}</T>}
      </Row>
    </Pressable>
  );
}

export default MateRow;

const styles = StyleSheet.create({ grow: { flex: 1 } });
