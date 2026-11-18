import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Text, View } from 'react-native';
import { font, palette, radius, space, spacing } from '@/tokens';
import { Page, Section } from './Swatch';

/** The spacing scale (every gap / padding / margin the screens use), the semantic spacing and the corner radii. */
const meta: Meta = { title: 'Foundations/Spacing & radii', parameters: { layout: 'fullscreen' } };
export default meta;

const label = { fontFamily: font.family, fontSize: 11, color: palette.mut } as const;

export const Spacing: StoryObj = {
  render: () => (
    <Page title="Spacing & radii">
      <Section title="spacing (px)">
        {Object.values(spacing).map((v) => (
          <View key={v} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={[label, { width: 30 }]}>{v}</Text>
            <View style={{ width: v * 6, height: 12, borderRadius: 3, backgroundColor: palette.green }} />
          </View>
        ))}
      </Section>
      <Section title="space (semantic)">
        {Object.entries(space).map(([k, v]) => (
          <View key={k} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={[label, { width: 80 }]}>{k}</Text>
            <View style={{ width: v * 3, height: 12, borderRadius: 3, backgroundColor: palette.yellow }} />
            <Text style={label}>{v}</Text>
          </View>
        ))}
      </Section>
      <Section title="radius">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
          {Object.entries(radius).map(([k, v]) => (
            <View key={k} style={{ alignItems: 'center', gap: 6 }}>
              <View style={{ width: 76, height: 76, borderRadius: v, backgroundColor: palette.mint, borderWidth: 1.5, borderColor: palette.green }} />
              <Text style={label}>{k} · {v}</Text>
            </View>
          ))}
        </View>
      </Section>
    </Page>
  ),
};
