import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CustomerApp } from './App';

/**
 * The clickable customer app. Use the toolbar to switch dark mode, large text, Hindi and small phone.
 * Sign in with any number; the SMS code is 4821.
 */
const meta: Meta<typeof CustomerApp> = {
  title: 'Customer app/Prototype',
  component: CustomerApp,
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj<typeof CustomerApp>;

export const NewCustomer: S = { name: 'Sign up → book → rate', args: { initial: 'signin.phone', state: { signedIn: false } } };
export const ReturningCustomer: S = { name: 'Signed in (Home)', args: { initial: 'home' } };
export const HelperOnTheWay: S = { name: 'Live visit', args: { initial: 'tracking' } };
