import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H2, IconTile, Lft, Radio, T, Tag, type IconName } from '@/native/ui';

export type ChoiceCardProps = {
  title: string;
  sub?: string;
  /** right column, e.g. a price */
  price?: string;
  priceSub?: string;
  /** small tag above the title ("Most chosen", "Prescription needed") */
  tag?: string;
  tagTone?: 'y' | 'g' | 'n' | 'x' | 'r';
  icon?: IconName;
  selected: boolean;
  onPress: () => void;
  children?: React.ReactNode;
};

/** A selectable row card with a radio: plans, shifts, procedures, physio problems. */
export function ChoiceCard({ title, sub, price, priceSub, tag, tagTone = 'y', icon, selected, onPress, children }: ChoiceCardProps) {
  return (
    <Card sel={selected} onPress={onPress} accessibilityLabel={title}>
      <Lft style={styles.top}>
        {icon ? <IconTile name={icon} /> : <Radio on={selected} />}
        <View style={styles.grow}>
          {tag ? <Tag tone={tagTone} style={styles.tag}>{tag}</Tag> : null}
          <H2>{title}</H2>
          {sub ? <T s m>{sub}</T> : null}
        </View>
        {price ? (
          <View style={styles.price}>
            <H2>{price}</H2>
            {priceSub ? <T s m>{priceSub}</T> : null}
          </View>
        ) : null}
      </Lft>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'flex-start' },
  grow: { flex: 1, gap: 2 },
  tag: { alignSelf: 'flex-start', marginBottom: 2 },
  price: { alignItems: 'flex-end', flexShrink: 0, maxWidth: '45%' },
});
