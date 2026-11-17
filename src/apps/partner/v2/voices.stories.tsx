import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta<typeof PartnerApp> = { title: 'Partner app/V2/29 Partner stories', component: PartnerApp, parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj<typeof PartnerApp>;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="stories" caption="44 · Partner stories" sub="From other partners, with audio in Hindi" />
      <PartnerApp initial="kindWords" caption="45 · Kind words for me" sub="Testimonials that name this partner" />
      <PartnerApp initial="shareStory" caption="46 · Share my story" sub="By voice or text, with clear permission" />
    </PhoneRow>
  ),
};
export const Stories: S = { name: '44 · Partner stories', args: { initial: 'stories' } };
export const KindWords: S = { name: '45 · Kind words for me', args: { initial: 'kindWords' } };
export const ShareStory: S = { name: '46 · Share my story', args: { initial: 'shareStory' } };
