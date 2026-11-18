import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, H2, Icon, Sheet, T, useTheme } from '@/native/ui';

/** Bottom sheet with one helper photo from the visit report (`photo` null hides it). */
export function PhotoSheet({ photo, onClose }: { photo: string | null; onClose: () => void }) {
  const { c } = useTheme();
  return (
    <Sheet visible={!!photo} onClose={onClose}>
      <H2>{photo} · after cleaning</H2>
      <View style={[styles.photo, { backgroundColor: c.mint }]}>
        <Icon name="cam" size={32} color={c.accent} />
        <T s color={c.accent}>Photo taken 12:08 pm</T>
      </View>
      <Button variant="outline" onPress={onClose}>Close</Button>
    </Sheet>
  );
}

export default PhotoSheet;

const styles = StyleSheet.create({
  photo: { height: 200, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});
