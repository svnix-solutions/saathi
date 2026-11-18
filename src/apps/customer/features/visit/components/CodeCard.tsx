import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, H2, Icon, Lft, T, useTheme } from '@/native/ui';

export type CodeCardProps = {
  title: string;
  code: string;
  note?: string;
  sel?: boolean;
  color?: string;
  icon?: 'check' | 'alert';
  onPress?: () => void;
};

/** A big one-time code, as the design draws it (34 px, wide letter spacing). */
export function CodeCard({ title, code, note, sel, color, icon, onPress }: CodeCardProps) {
  const { c } = useTheme();
  return (
    <Card sel={sel} onPress={onPress} style={[styles.card, color && !sel ? { borderColor: color } : null]}>
      <Lft style={icon ? styles.start : styles.center}>
        {icon && <Icon name={icon} color={color ?? c.accent} />}
        <H2 color={color}>{title}</H2>
      </Lft>
      <T b size={34} center color={color ?? c.ink} style={styles.code}>{code}</T>
      {note && <T s m center={!icon}>{note}</T>}
    </Card>
  );
}

export default CodeCard;

const styles = StyleSheet.create({
  card: { gap: 4 },
  start: { justifyContent: 'flex-start' },
  center: { justifyContent: 'center' },
  code: { letterSpacing: 10, lineHeight: 38 },
});
