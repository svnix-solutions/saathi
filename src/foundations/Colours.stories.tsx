import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { dark, elevation, light, palette, tint } from '@/tokens';
import { Page, Section, Swatch, styles } from './Swatch';

/** Brand palette, the one-off tints, and the light and dark theme schemes (`useTheme().c`). */
const meta: Meta = { title: 'Foundations/Colours', parameters: { layout: 'fullscreen' } };
export default meta;

const grid = (o: Record<string, string>, d?: boolean) => (
  <View style={styles.grid}>{Object.entries(o).map(([k, v]) => <Swatch key={k} name={k} value={v} dark={d} />)}</View>
);

export const Palette: StoryObj = {
  render: () => (
    <Page title="Colours" sub="palette is fixed brand colour; light / dark are the theme schemes components read through useTheme().c">
      <Section title="palette (brand)">{grid(palette)}</Section>
      <Section title="tint (one-off component colours)">{grid(tint)}</Section>
    </Page>
  ),
};

export const LightScheme: StoryObj = {
  name: 'Light scheme',
  render: () => <Page title="Light scheme"><Section title="light">{grid(light)}</Section></Page>,
};

export const DarkScheme: StoryObj = {
  name: 'Dark scheme',
  render: () => <Page title="Dark scheme"><Section title="dark" dark>{grid(dark, true)}</Section></Page>,
};

export const Elevation: StoryObj = {
  render: () => (
    <Page title="Elevation">
      <Section title="elevation (box shadows)">
        <View style={[styles.grid, { gap: 28 }]}>
          {Object.entries(elevation).map(([k, v]) => (
            <View key={k} style={{ gap: 8, width: 150 }}>
              <View style={{ height: 70, borderRadius: 14, backgroundColor: '#fff', boxShadow: v } as object} />
              <Swatch name={k} value={v.length > 30 ? v.slice(0, 30) + '…' : v} />
            </View>
          ))}
        </View>
      </Section>
    </Page>
  ),
};
