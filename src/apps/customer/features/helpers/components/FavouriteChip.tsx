import React from 'react';
import { StyleSheet } from 'react-native';
import { Pill, T, palette, useT } from '@/native/ui';

/** Yellow "Favourite" chip on a helper card; tap to remove from favourites. */
export function FavouriteChip({ onPress }: { onPress: () => void }) {
  const t = useT();
  return (
    <Pill onPress={onPress} style={[styles.chip, { borderWidth: 0, paddingVertical: 3, paddingHorizontal: 9 }]}>
      <T s b color={palette.ink}>{t('Favourite', 'पसंदीदा', 'ਪਸੰਦੀਦਾ')}</T>
    </Pill>
  );
}

export default FavouriteChip;

const styles = StyleSheet.create({ chip: { backgroundColor: palette.yellow } });
