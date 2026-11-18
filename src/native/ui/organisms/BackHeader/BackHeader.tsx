import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/index';
import { useBack } from '../../../navigation/index';
import { H2 } from '../../atoms/H2';
import { Icon } from '../../atoms/Icon';
import { Row } from '../../layout/Row';

export type BackHeaderProps = {
  title: string;
  /** custom back action; wins over `fallback` */
  onBack?: () => void;
  /**
   * Route to reset to when there is no history (screen opened on its own). When set and `onBack` is not,
   * the arrow goes back if it can, else resets to this route. Was `Back` / `useBack` in customer/v2b/kit.
   */
  fallback?: string;
  /** content at the right end (a Link, a Tag) */
  right?: React.ReactNode;
  /** arrow and title colour (default ink) */
  color?: string;
};

/** "‹ Title" back row at the top of most inner screens. */
export function BackHeader({ title, onBack, fallback, right, color }: BackHeaderProps) {
  const { c } = useTheme();
  const back = useBack(fallback);
  return (
    <Row>
      <Pressable onPress={onBack ?? (fallback !== undefined ? back : undefined)} accessibilityRole="button" accessibilityLabel="Back" style={styles.press} hitSlop={8}>
        <Icon name="back" color={color ?? c.ink} />
        <H2 color={color}>{title}</H2>
      </Pressable>
      {right}
    </Row>
  );
}

const styles = StyleSheet.create({ press: { flexDirection: 'row', alignItems: 'center', gap: 8 } });
