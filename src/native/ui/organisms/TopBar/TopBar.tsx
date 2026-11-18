import React from 'react';
import { type StyleProp, type ViewStyle, View } from 'react-native';
import { palette, radius, space } from '@/tokens';
import { TopBarBack, TopBarHeading, TopBarLabel, TopBarProgress, TopBarText, TopBarTitle } from './parts';

export type TopBarProps = { children: React.ReactNode; style?: StyleProp<ViewStyle> };

function TopBarBase({ children, style }: TopBarProps) {
  return <View style={[{ backgroundColor: palette.green, paddingTop: space.scrTop, paddingHorizontal: space.scrX, paddingBottom: space.scrBottom, borderBottomLeftRadius: radius.topBar, borderBottomRightRadius: radius.topBar }, style]}>{children}</View>;
}

/**
 * Green header (the design's `.top`), used mostly by the partner app. White-text helpers hang off it:
 * `TopBar.Title` (H), `TopBar.Heading` (H2), `TopBar.Text` (small, `dim` = 80%), `TopBar.Back` (back arrow when
 * there is history), `TopBar.Label` (small label with a back chevron) and `TopBar.Progress` (yellow bar).
 */
export const TopBar = Object.assign(TopBarBase, {
  Title: TopBarTitle,
  Heading: TopBarHeading,
  Text: TopBarText,
  Back: TopBarBack,
  Label: TopBarLabel,
  Progress: TopBarProgress,
});
