import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Toast } from './Toast';
import { withAdmin } from '../storyDecorator';

/** Short confirmation at the bottom of the screen. */
const meta: Meta<typeof Toast> = {
  title: 'Components/Admin/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [withAdmin],
  parameters: { layout: 'fullscreen' },
  args: { msg: 'Report downloaded: dashboard-16-nov.csv' },
  argTypes: { msg: { control: 'text' } },
};
export default meta;
export const Default: StoryObj<typeof Toast> = {};
