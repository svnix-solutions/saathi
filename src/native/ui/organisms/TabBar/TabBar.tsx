import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { elevation, font } from '@/tokens';
import { useTheme } from '../../../theme/index';
import { Badge } from '../../atoms/Badge';
import { Icon, type IconName } from '../../atoms/Icon';

export type TabItem<K extends string> = {
  key: K;
  label: string;
  icon: IconName;
  /** small red count on the icon (nothing drawn when 0 / omitted) */
  badge?: number;
};

export type TabBarProps<K extends string> = {
  tabs: TabItem<K>[];
  active: K;
  onChange?: (k: K) => void;
};

/** Bottom tab bar (the design's `.tabs`): the active tab gets a mint pill behind its icon. */
export function TabBar<K extends string>({ tabs, active, onChange }: TabBarProps<K>) {
  const { c, fs } = useTheme();
  return (
    <View style={[styles.bar, { borderTopColor: c.line, backgroundColor: c.tabBg, boxShadow: elevation.tabBar } as ViewStyle]}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} onPress={() => onChange?.(t.key)} accessibilityRole="tab" accessibilityState={{ selected: on }} style={styles.tab}>
            <View style={[styles.pill, { backgroundColor: on ? c.mint : 'transparent' }]}>
              <Icon name={t.icon} color={on ? c.accent : c.mut} />
              {!!t.badge && <Badge count={t.badge} style={styles.badge} />}
            </View>
            <Text style={[styles.label, { fontSize: fs(10), color: on ? c.accent : c.mut, fontWeight: on ? '700' : '400' }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 8, paddingBottom: 12 },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  pill: { paddingHorizontal: 13, paddingVertical: 3, borderRadius: 12 },
  badge: { position: 'absolute', top: -4, right: 6 },
  label: { fontFamily: font.family },
});
