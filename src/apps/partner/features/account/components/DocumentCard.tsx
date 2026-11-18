import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, IconTile, Lft, T, Tag, useTheme, type IconName } from '@/native/ui';
import type { DocStatus } from '../data';

/** One document on "My documents": red card while it needs an update, a status tag on the right. */
export function DocumentCard({ icon, title, status, sub, onPress }: { icon: IconName; title: string; status: DocStatus; sub: string; onPress: () => void }) {
  const { c } = useTheme();
  return (
    <Card row tone={status === 'update' ? 'red' : undefined} onPress={onPress}>
      <Lft style={styles.fill}>
        <IconTile name={icon} />
        <View style={styles.fill}>
          <H2>{title}</H2>
          {status === 'update' ? <T s color={c.red}>{sub}</T> : <T s m>{sub}</T>}
        </View>
      </Lft>
      {status === 'valid' && <Tag tone="n">Valid</Tag>}
      {status === 'update' && <Tag tone="r">Update</Tag>}
      {status === 'checking' && <Tag tone="x">Checking</Tag>}
    </Card>
  );
}

export default DocumentCard;

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
