import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow, Phone, Screen, H } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Device/PhoneRow',
  component: PhoneRow,
  tags: ['autodocs'],
  decorators: [frame],
  args: { children: null },
} satisfies Meta<typeof PhoneRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <PhoneRow><Phone caption="Light"><Screen><H>Home</H></Screen></Phone><Phone caption="Dark" dark><Screen><H>Home</H></Screen></Phone></PhoneRow> };
