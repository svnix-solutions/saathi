import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from 'react-native';
import { font, palette, text } from '@/tokens';
import { H, H2, Phone, Screen, T } from '@/native/ui';
import { Page, Section } from './Swatch';

/** The type scale: every named text style in `tokens/typography.ts`, and the components that use them. */
const meta: Meta = { title: 'Foundations/Typography', parameters: { layout: 'fullscreen' } };
export default meta;

export const Scale: StoryObj = {
  render: () => (
    <Page title="Typography" sub={font.family}>
      <Section title="text styles (px before the text scale)">
        {Object.entries(text).map(([k, s]) => (
          <View key={k} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 16 }}>
            <Text style={{ width: 90, fontFamily: font.family, fontSize: 11, color: palette.mut }}>{k}</Text>
            <Text style={{ width: 150, fontFamily: font.family, fontSize: 11, color: palette.mut }}>
              {s.size}px · {s.weight}{'lineHeight' in s ? ` · lh ${Math.round(s.lineHeight * 10) / 10}` : ''}
            </Text>
            <Text style={{ fontFamily: font.family, fontSize: s.size, fontWeight: s.weight, color: palette.ink, letterSpacing: 'letterSpacing' in s ? s.letterSpacing : undefined }}>
              Helper in 15 minutes · हेल्पर 15 मिनट में
            </Text>
          </View>
        ))}
      </Section>
    </Page>
  ),
};

export const InComponents: StoryObj = {
  name: 'In components (normal and large text)',
  render: () => (
    <View style={{ flexDirection: 'row', gap: 40, padding: 24 }}>
      {[1, 1.22].map((scale) => (
        <Phone key={scale} textScale={scale} caption={scale === 1 ? 'Normal text' : 'Large text (1.22)'}>
          <Screen>
            <H size={22}>Enter your number</H>
            <H>What needs doing today?</H>
            <H2>Your address</H2>
            <T>Flat 204, Block C · Gate 2, tell the guard flat 204</T>
            <T s m>Free cancellation until 1 hour before</T>
            <T b>₹158 · 1 hr</T>
          </Screen>
        </Phone>
      ))}
    </View>
  ),
};
