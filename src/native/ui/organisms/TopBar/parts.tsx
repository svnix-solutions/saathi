import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import { palette } from '@/tokens';
import { useNav } from '../../../navigation/index';
import { H } from '../../atoms/H';
import { H2 } from '../../atoms/H2';
import { Icon } from '../../atoms/Icon';
import { ProgressBar } from '../../atoms/ProgressBar';
import { T } from '../../atoms/T';

const WHITE = palette.white;

/** White headline on the green header. Was `TopH` (partner/v1; partner/v3 used size 26). */
export const TopBarTitle = ({ children, size }: { children: React.ReactNode; /** default 19 */ size?: number }) => <H color={WHITE} size={size}>{children}</H>;

/** White section label on the green header. Was `TopH2` (partner/v1). */
export const TopBarHeading = ({ children }: { children: React.ReactNode }) => <H2 color={WHITE}>{children}</H2>;

/** Small white text on the green header; `dim` = the design's opacity .8 lines. Was `TopT` (partner/v1) and `TopS` (partner/v3, = `dim`). */
export function TopBarText({ children, dim, b, style }: { children: React.ReactNode; dim?: boolean; b?: boolean; style?: StyleProp<TextStyle> }) {
  return <T s color={WHITE} b={b} style={[dim ? styles.dim : null, style]}>{children}</T>;
}

/** Back arrow for a green header; renders nothing when there is no history. Was `TopBack` (customer/v2a). */
export function TopBarBack({ color = WHITE }: { color?: string }) {
  const nav = useNav();
  if (!nav.canGoBack) return null;
  return (
    <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel="Back" hitSlop={8}>
      <Icon name="back" color={color} />
    </Pressable>
  );
}

/** Small dimmed white label at the top of the header, with a back chevron when there is history. Was `TopLabel` (partner/v2). */
export function TopBarLabel({ children }: { children: React.ReactNode }) {
  const nav = useNav();
  const txt = <T s color={WHITE} style={styles.dim}>{children}</T>;
  if (!nav.canGoBack) return txt;
  return (
    <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel="Back" style={styles.labelRow}>
      <Icon name="back" size={14} color={WHITE} />
      {txt}
    </Pressable>
  );
}

/** Yellow progress bar on dark green, 10px below the header text. Was `TopProgress` (partner/v2). */
export const TopBarProgress = ({ value }: { /** 0–1 */ value: number }) => <ProgressBar value={value} style={styles.progress} />;

const styles = StyleSheet.create({
  dim: { opacity: 0.8 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  progress: { marginTop: 10 },
});
