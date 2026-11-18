import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhotoTile, Grid, iconNames } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/PhotoTile',
  component: PhotoTile,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'inline-radio', options: ["add", "thumb"] }, added: { control: 'boolean' }, bold: { control: 'boolean' }, dark: { control: 'boolean' }, height: { control: { type: 'range', min: 50, max: 120 } }, icon: { control: 'select', options: iconNames } },
  args: { label: 'Kitchen', icon: 'cam' },
} satisfies Meta<typeof PhotoTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Add: Story = {};
export const Added: Story = { args: { added: true, label: 'Kitchen ✓' } };
export const Thumb: Story = { args: { variant: 'thumb', label: 'After' } };
export const ThumbDark: Story = { args: { variant: 'thumb', dark: true, label: 'Before' } };
export const Grid2: Story = { name: 'In a grid', render: () => <Grid><PhotoTile label="Floor" icon="cam" added /><PhotoTile label="Kitchen" icon="cam" /></Grid> };
