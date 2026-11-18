import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Meter, Row, T } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Atoms/Meter',
  component: Meter,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.05 } }, mark: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
  args: { value: 0.82 },
} satisfies Meta<typeof Meter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (a) => <Row><T s>5 ★</T><Meter {...a} /></Row> };
export const WithThreshold: Story = { args: { mark: 0.84 }, render: (a) => <Row><T s>4.6</T><Meter {...a} /></Row> };
