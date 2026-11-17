import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { Text, View } from 'react-native';
import { CharacterTile, H, Icon, Mark, T, type IconName } from '@/native/ui';
import { palette } from '@/tokens';

const meta: Meta = { title: 'Saathi/Brand', parameters: { layout: 'fullscreen', backgrounds: { value: 'page' } } };
export default meta;

const sw: [string, string, string, string?][] = [
  ['Saathi Green', '#0B5D4B', palette.green, '#fff'], ['Quick Yellow', '#FFC93C', palette.yellow], ['Ink', '#0F1F1C', palette.ink, '#fff'],
  ['Mint', '#E3F2EC', palette.mint], ['White', '#FFFFFF', '#fff'], ['Slate', '#5B6B67', palette.mut, '#fff'],
];
const card = { backgroundColor: '#fff', borderWidth: 1, borderColor: palette.line, borderRadius: 22 } as const;

export const Brand: StoryObj = {
  render: () => (
    <View style={{ padding: 48, gap: 34, maxWidth: 1344 }}>
      <View>
        <T b color={palette.green} style={{ letterSpacing: 1.6 }}>SAATHI · 01</T>
        <H size={34}>Brand</H>
        <T m size={15}>Logo, app icon, colour and type for the customer app, partner app and website.</T>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 40 }}>
        <View style={{ flex: 1.1, minWidth: 420, gap: 24 }}>
          <View style={[card, { padding: 44 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
              <Mark size={92} />
              <Text style={{ fontSize: 64, fontWeight: '700', letterSpacing: -1.3, color: palette.green, fontFamily: '"Avenir Next", Arial' }}>Saathi</Text>
            </View>
            <T m size={20} style={{ marginTop: 22 }}>House help at your door in 15 minutes.</T>
          </View>
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View style={[card, { flex: 1, padding: 28, backgroundColor: palette.green, borderWidth: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><Mark size={52} reversed /><Text style={{ fontSize: 34, fontWeight: '700', color: '#fff' }}>Saathi</Text></View>
              <T color="#cfe5dd" size={13} style={{ marginTop: 14 }}>Reversed, on brand green</T>
            </View>
            <View style={[card, { flex: 1, padding: 28 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 16 }}><Mark size={88} /><Mark size={56} /><Mark size={32} /></View>
              <T m size={13} style={{ marginTop: 14 }}>App icon at 88, 56 and 32 px</T>
            </View>
          </View>
          <View style={[card, { padding: 26, flexDirection: 'row', gap: 14, flexWrap: 'wrap' }]}>
            {(['clean', 'deep', 'kitchen', 'laundry', 'custom', 'hero'] as const).map((c) => <CharacterTile key={c} name={c} size={72} radius={18} />)}
            <T m size={13} style={{ width: '100%' }}>One character per service, plus the hero helper. Only the hero moves, once per screen.</T>
          </View>
        </View>
        <View style={{ flex: 1, minWidth: 380, gap: 24 }}>
          <View>
            <T b size={15} style={{ marginBottom: 12 }}>Colour</T>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
              {sw.map(([n, hex, bg, fg]) => (
                <View key={n} style={{ width: '31.5%', height: 96, borderRadius: 14, padding: 12, justifyContent: 'flex-end', backgroundColor: bg, borderWidth: bg === '#fff' ? 1 : 0, borderColor: palette.line }}>
                  <T b color={fg ?? palette.ink}>{n}</T><T color={fg ?? palette.ink} style={{ opacity: 0.8 }}>{hex}</T>
                </View>
              ))}
            </View>
            <T m size={13} style={{ marginTop: 12 }}>Green carries buttons and headers. Yellow is only for speed: the 15-minute promise, timers and the helper avatar.</T>
          </View>
          <View style={[card, { padding: 26 }]}>
            <T b size={15} style={{ marginBottom: 10 }}>Type · Avenir Next</T>
            <H size={40}>Help is 12 minutes away</H>
            <T size={20} style={{ fontWeight: '600', marginTop: 12 }}>General cleaning · 1 hour</T>
            <T m size={15} style={{ marginTop: 6 }}>Body 15 px regular. Sweep, mop, dust, wipe surfaces and clean interior windows or balconies.</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 }}>
              {(['sparkle', 'drop', 'dish', 'shirt', 'clock', 'pin'] as IconName[]).map((i) => <Icon key={i} name={i} size={26} color={palette.green} />)}
              <T m size={13}>1.8 px line icons, one per service</T>
            </View>
          </View>
        </View>
      </View>
    </View>
  ),
};
