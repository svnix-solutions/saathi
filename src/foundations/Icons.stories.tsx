import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { palette } from '@/tokens';
import { Icon, iconNames, Mark, T, type IconName } from '@/native/ui';
import { Page, Section } from './Swatch';

/** The line icon set (24 grid, 1.8px stroke) and the Saathi mark. */
const meta: Meta<{ size: number; color: string; fill: boolean }> = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
  argTypes: { size: { control: { type: 'range', min: 14, max: 40 } }, color: { control: 'color' }, fill: { control: 'boolean' } },
  args: { size: 26, color: palette.green, fill: false },
};
export default meta;

export const AllIcons: StoryObj<typeof meta> = {
  name: 'All icons',
  render: (a) => (
    <Page title="Icons" sub={`${iconNames.length} icons · <Icon name="…" />`}>
      <Section title="Icon">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
          {iconNames.map((n: IconName) => <View key={n} style={{ alignItems: 'center', width: 64, gap: 6 }}><Icon name={n} size={a.size} color={a.color} fill={a.fill} /><T s m>{n}</T></View>)}
        </View>
      </Section>
      <Section title="Mark">
        <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }}>
          <Mark size={64} />
          <View style={{ backgroundColor: palette.green, padding: 12, borderRadius: 18 }}><Mark size={64} reversed /></View>
          <Mark size={36} />
        </View>
      </Section>
    </Page>
  ),
};
