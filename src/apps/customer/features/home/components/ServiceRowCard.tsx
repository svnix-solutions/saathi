import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CharacterTile, H2, Lft, T, useT } from '@/native/ui';
import { rupees, serviceName, type services } from '@/domain';
import { SERVICE_SUB_PA } from '../data';

/** A service in a non-cleaning category: character, name, sub line and the price per 30 min. */
export function ServiceRowCard({ service, onPress }: { service: (typeof services)[number]; onPress: () => void }) {
  const t = useT();
  return (
    <Card row onPress={onPress}>
      <Lft style={styles.grow}>
        <CharacterTile name={service.character} />
        <View style={styles.grow}>
          <H2>{serviceName(t, service.id)}</H2>
          <T s m>{t(service.sub ?? '', service.subHi, SERVICE_SUB_PA[service.id])}</T>
        </View>
      </Lft>
      <View style={styles.price}>
        <T b>{rupees(service.per30)}</T>
        <T s m size={11}>{t('per 30 min', 'प्रति 30 मिनट', 'ਪ੍ਰਤੀ 30 ਮਿੰਟ')}</T>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  grow: { flex: 1 },
  price: { alignItems: 'flex-end' },
});

export default ServiceRowCard;
