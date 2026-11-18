import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, H2, Icon, Sheet, T, useT, useTheme } from '@/native/ui';
import { tr, type Tri } from '../../helpers';

/** Bottom sheet with one helper photo from the visit report (`photo` null hides it). */
export function PhotoSheet({ photo, onClose }: { photo: Tri | null; onClose: () => void }) {
  const t = useT();
  const { c } = useTheme();
  const name = photo ? tr(t, photo) : '';
  return (
    <Sheet visible={!!photo} onClose={onClose}>
      <H2>{t(`${name} · after cleaning`, `${name} · सफ़ाई के बाद`, `${name} · ਸਫ਼ਾਈ ਤੋਂ ਬਾਅਦ`)}</H2>
      <View style={[styles.photo, { backgroundColor: c.mint }]}>
        <Icon name="cam" size={32} color={c.accent} />
        <T s color={c.accent}>{t('Photo taken 12:08 pm', 'फ़ोटो दोपहर 12:08 पर ली गई', 'ਫ਼ੋਟੋ ਦੁਪਹਿਰ 12:08 ਵਜੇ ਲਈ ਗਈ')}</T>
      </View>
      <Button variant="outline" onPress={onClose}>{t('Close', 'बंद करें', 'ਬੰਦ ਕਰੋ')}</Button>
    </Sheet>
  );
}

export default PhotoSheet;

const styles = StyleSheet.create({
  photo: { height: 200, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
