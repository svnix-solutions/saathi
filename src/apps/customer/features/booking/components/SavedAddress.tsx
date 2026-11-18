import React from 'react';
import { View } from 'react-native';
import { H2, Icon, Lft, T, useT, useTheme } from '@/native/ui';
import type { CustomerState } from '../../../state';
import { addressText } from '../data';

/** Pin + address label + line. The sample addresses ("Home / Flat 204, Block C", the family homes) are translated; typed addresses are shown as written. */
export function SavedAddress({ address }: { address: CustomerState['address'] }) {
  const t = useT();
  const { c } = useTheme();
  return (
    <Lft>
      <Icon name="pin" color={c.accent} />
      <View>
        <H2>{addressText(t, address.label)}</H2>
        <T s m>{addressText(t, address.line)}</T>
      </View>
    </Lft>
  );
}

export default SavedAddress;
