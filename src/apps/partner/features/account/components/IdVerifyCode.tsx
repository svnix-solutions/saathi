import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { palette, useTheme } from '@/native/ui';

/** The 72px checkerboard that stands in for the ID card's QR code (web-only CSS, so the style stays inline). */
export function IdVerifyCode({ label }: { label: string }) {
  const { c } = useTheme();
  return (
    <View accessibilityLabel={label}
      style={{ width: 72, height: 72, borderWidth: 5, borderColor: palette.white, outlineWidth: 1, outlineStyle: 'solid', outlineColor: c.line,
        backgroundImage: `conic-gradient(${palette.ink} 25%, ${palette.white} 0 50%, ${palette.ink} 0 75%, ${palette.white} 0)`, backgroundSize: '12px 12px' } as ViewStyle} />
  );
}

export default IdVerifyCode;
