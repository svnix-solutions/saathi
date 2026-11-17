/** Small helpers shared by the v2b and v3 customer areas (candidates for the shared kit). */
import React from 'react';
import { Pressable, View } from 'react-native';
import { BackHeader, Icon, palette, useNav, useTheme } from '@/native/ui';

/** Round radio (.cb with border-radius:50%). */
export function Radio({ on, size = 18 }: { on?: boolean; size?: number }) {
  const { c } = useTheme();
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 1.5, borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      {on && <Icon name="check" size={size * 0.66} color="#fff" strokeWidth={3} />}
    </View>
  );
}

/** Back that falls back to a tab when the screen was opened on its own. */
export function useBack(fallback = 'home') {
  const nav = useNav();
  return () => (nav.canGoBack ? nav.back() : nav.reset(fallback));
}

/** "‹ Title" row wired to useBack. */
export function Back({ title, fallback, right }: { title: string; fallback?: string; right?: React.ReactNode }) {
  const back = useBack(fallback);
  return <BackHeader title={title} onBack={back} right={right} />;
}

/** Three little dots/pills for carousels. */
export function Dots({ count, active, onPress }: { count: number; active: number; onPress?: (i: number) => void }) {
  const { c } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Pressable key={i} onPress={() => onPress?.(i)} hitSlop={6} accessibilityLabel={`Show ${i + 1}`}
          style={{ width: i === active ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: i === active ? palette.green : c.line }} />
      ))}
    </View>
  );
}
