import React from 'react';
import { View } from 'react-native';
import { H2, Icon, Lft, T, useT, useTheme } from '@/native/ui';
import type { CustomerState } from '../../../state';

/** Pin + address label + line. The sample "Home / Flat 204, Block C" is translated; typed addresses are shown as written. */
export function SavedAddress({ address }: { address: CustomerState['address'] }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Lft>
      <Icon name="pin" color={c.accent} />
      <View>
        <H2>{address.label === 'Home' ? t('Home', 'घर') : address.label}</H2>
        <T s m>{address.line === 'Flat 204, Block C' ? t('Flat 204, Block C', 'फ़्लैट 204, ब्लॉक सी') : address.line}</T>
      </View>
    </Lft>
  );
}

export default SavedAddress;
