import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { KeyValue, Card, Rows } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Molecules/KeyValue',
  component: KeyValue,
  tags: ['autodocs'],
  decorators: [frame],
  argTypes: { variant: { control: 'inline-radio', options: ["receipt", "total", "plain"] }, valueTone: { control: 'inline-radio', options: ["default", "accent"] } },
  args: { label: 'General cleaning · 1 hr', value: '₹158' },
} satisfies Meta<typeof KeyValue>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Receipt: Story = {};
export const Accent: Story = { args: { label: 'Plan saving', value: '− ₹16', valueTone: 'accent' } };
export const Total: Story = { args: { variant: 'total', label: 'Total', value: '₹142' } };
export const Plain: Story = { args: { variant: 'plain', label: 'Customer', value: 'Nitin K.' } };
export const ReceiptCard: Story = { render: () => <Card><Rows><KeyValue label="General cleaning · 1 hr" value="₹158" /><KeyValue label="Plan saving" value="− ₹16" valueTone="accent" /><KeyValue variant="total" label="Total" value="₹142" /></Rows></Card> };
