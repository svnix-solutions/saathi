import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CharacterTile, characterIds } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/CharacterTile',
  component: CharacterTile,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { name: { control: 'select', options: characterIds }, size: { control: { type: 'range', min: 32, max: 120 } }, zoom: { control: 'number' }, radius: { control: 'number' }, bg: { control: 'color' } },
  args: { name: 'hero', size: 64 },
} satisfies Meta<typeof CharacterTile>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Wide: Story = { args: { name: 'clean', width: 120, height: 80 } };
