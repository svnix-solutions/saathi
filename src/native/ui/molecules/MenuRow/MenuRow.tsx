import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../theme/index';
import { Icon, type IconName } from '../../atoms/Icon';
import { T } from '../../atoms/T';
import { Row } from '../../layout/Row';

export type MenuRowProps = {
  label: string;
  /** second line; when given the label turns bold */
  sub?: string;
  onPress?: () => void;
  /** accent icon before the label */
  icon?: IconName;
  /** replaces the chevron (a Tag, a Toggle, a value) */
  right?: React.ReactNode;
  /** label colour (e.g. red for "Delete account") */
  color?: string;
};

/** A tappable list row with a label, optional sub-line and a chevron (account and settings lists). */
export function MenuRow({ label, sub, onPress, icon, right, color }: MenuRowProps) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" hitSlop={4}>
      <Row>
        <View style={styles.left}>
          {icon && <Icon name={icon} color={c.accent} />}
          <View style={styles.text}>
            {sub ? <T b color={color}>{label}</T> : <T color={color}>{label}</T>}
            {sub && <T s m>{sub}</T>}
          </View>
        </View>
        {right ?? <Icon name="chevron" color={c.mut} />}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 },
  text: { flex: 1, minWidth: 0 },
});
