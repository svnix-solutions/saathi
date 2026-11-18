import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { Avatar, CharacterTile, characterIds, faceIds, T } from '@/native/ui';
import { Page, Section } from './Swatch';

/** Service characters (`<CharacterTile name>`) and the faces of the sample people (`<Avatar face>`). */
const meta: Meta = { title: 'Foundations/Characters & faces', parameters: { layout: 'fullscreen' } };
export default meta;

export const CharactersAndFaces: StoryObj = {
  name: 'Characters & faces',
  render: () => (
    <Page title="Characters & faces">
      <Section title="CharacterTile">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
          {characterIds.map((c) => <View key={c} style={{ alignItems: 'center', gap: 4 }}><CharacterTile name={c} size={72} /><T s m>{c}</T></View>)}
        </View>
      </Section>
      <Section title="Avatar">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
          {faceIds.map((f) => <View key={f} style={{ alignItems: 'center', gap: 4 }}><Avatar face={f} size={52} /><T s m>{f}</T></View>)}
          <View style={{ alignItems: 'center', gap: 4 }}><Avatar initials="NK" size={52} /><T s m>initials</T></View>
        </View>
      </Section>
    </Page>
  ),
};
