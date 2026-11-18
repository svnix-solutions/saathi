import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Sheet, H2, T, Button } from '@/native/ui';
import { frame } from '../../storybook/frame';

const meta = {
  title: 'Components/Native/Organisms/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  decorators: [frame],
  args: { visible: true, children: null },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => (
    <View style={{ height: 320 }}>
      <Sheet visible onClose={() => {}}>
        <H2>Cancel this visit?</H2>
        <T s m>Free until 1 hour before.</T>
        <Button variant="outline" danger>Yes, cancel</Button>
      </Sheet>
    </View>
  ),
};
