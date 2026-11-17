import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PartnerApp } from './App';

/** The clickable Saathi Partner app. Sign in with any number; the SMS code is 4821. */
const meta: Meta<typeof PartnerApp> = {
  title: 'Partner app/Prototype',
  component: PartnerApp,
  parameters: { layout: 'centered' },
};
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const SignUp: S = { name: 'Sign up → approval', args: { initial: 'signin.phone', state: { approved: false } } };
export const Online: S = { name: 'Online (Home)', args: { initial: 'home' } };
export const NewJob: S = { name: 'A job comes in', args: { initial: 'jobRequest' } };
export const Hindi: S = { name: 'Home · Hindi', args: { initial: 'home', locale: 'hi' } };
