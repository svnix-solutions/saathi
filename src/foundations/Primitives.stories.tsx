import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Avatar, Button, Card, CharacterTile, Check, CheckRow, Grid, H, H2, Icon, iconNames, Lft, Mark, OtpInput, Phone,
  Pill, Row, Screen, Stars, T, TabBar, Tag, Toggle, faceIds, Input,
} from '@/native/ui';

const meta: Meta = { title: 'Foundations/Native primitives' };
export default meta;

export const Kit: StoryObj = {
  render: () => {
    const [on, setOn] = useState(true);
    const [otp, setOtp] = useState('48');
    const [stars, setStars] = useState(4);
    return (
      <Phone caption="Primitive kit" sub="Every building block, themed">
        <Screen>
          <Lft><Mark size={36} /><H>Saathi</H></Lft>
          <Card tone="yellow"><Lft><CharacterTile name="hero" /><View><H2>Helper in 15 minutes</H2><T s>Or schedule for later</T></View></Lft></Card>
          <Grid cols={3}><Pill>30 min</Pill><Pill sel>1 hr</Pill><Pill>1.5 hr</Pill></Grid>
          <Row><Tag>On the way</Tag><Tag tone="g">Paid</Tag><Tag tone="n">Plan</Tag><Tag tone="r">Late</Tag></Row>
          <CheckRow on={on} label="Sweep and mop floors" onPress={() => setOn(!on)} />
          <Row><Check on /><Toggle on={on} onChange={setOn} /><Stars value={stars} onChange={setStars} /></Row>
          <Input prefix="+91" placeholder="98765 43210" keyboardType="phone-pad" />
          <OtpInput value={otp} onChange={setOtp} />
          <Button>Book helper · ₹158</Button>
          <Button variant="outline">Change</Button>
          <Button variant="yellow">Add 30 minutes · ₹79</Button>
        </Screen>
        <TabBar active="home" tabs={[{ key: 'home', label: 'Home', icon: 'home' }, { key: 'b', label: 'Bookings', icon: 'list' }, { key: 'a', label: 'Account', icon: 'user' }]} />
      </Phone>
    );
  },
};

export const Icons: StoryObj = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18, maxWidth: 560, backgroundColor: '#fff', padding: 24, borderRadius: 16 }}>
      {iconNames.map((n) => <View key={n} style={{ alignItems: 'center', width: 64, gap: 6 }}><Icon name={n} size={26} color="#0b5d4b" /><T s m>{n}</T></View>)}
    </View>
  ),
};

export const Faces: StoryObj = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, maxWidth: 620, backgroundColor: '#fff', padding: 24, borderRadius: 16 }}>
      {faceIds.map((f) => <View key={f} style={{ alignItems: 'center', gap: 4 }}><Avatar face={f} size={48} /><T s m>{f}</T></View>)}
      {(['clean', 'deep', 'kitchen', 'laundry', 'custom', 'hero'] as const).map((c) => <View key={c} style={{ alignItems: 'center', gap: 4 }}><CharacterTile name={c} size={64} /><T s m>{c}</T></View>)}
    </View>
  ),
};
