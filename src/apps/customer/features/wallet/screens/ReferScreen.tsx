/** Design page 11 · Wallet, referrals and chat — screen 37 · Refer a friend. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, BackHeader, Button, Card, H, H2, Lft, Link, ListCard, Row, Screen, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { PENDING_FRIEND, REFERRAL_CODE, REFERRED_FRIENDS } from '../data';
import { copyText } from '../rules';

export function ReferScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const r = decisions.customer.referralReward;
  const [reminded, setReminded] = useState(false);
  const copy = () => { copyText(REFERRAL_CODE); nav.toast(`Code ${REFERRAL_CODE} copied`); };
  const remind = () => { setReminded(true); nav.toast(`Reminder sent to ${PENDING_FRIEND.first}`); };
  return (
    <Screen>
      <BackHeader title={t('Invite friends', 'दोस्तों को बुलाएँ')} onBack={nav.back} />
      <Card tone="yellow" style={{ paddingVertical: 18, paddingHorizontal: 14 }}>
        <H size={22} color={palette.ink}>{t(`Give ₹${r},\nget ₹${r}`, `₹${r} दें,\n₹${r} पाएँ`)}</H>
        <T color={palette.ink} style={{ marginTop: 6 }}>Your friend gets ₹{r} off the first visit. You get ₹{r} in your wallet when it is done.</T>
      </Card>
      <H2>Your code</H2>
      <Card row onPress={copy} style={{ borderWidth: 1.5, borderRadius: 12, padding: 12 }}>
        <T b size={15} style={styles.code}>{REFERRAL_CODE}</T>
        <Link onPress={copy}>Copy</Link>
      </Card>
      <Button onPress={() => nav.toast('Opening WhatsApp with your invite…')}>{t('Share on WhatsApp', 'WhatsApp पर भेजें')}</Button>
      <H2 style={{ marginTop: 4 }}>{`${REFERRED_FRIENDS.length} friends joined · ₹`}{REFERRED_FRIENDS.length * r} earned</H2>
      <ListCard gap={9}>
        {REFERRED_FRIENDS.map((f) => (
          <Row key={f.name}><Lft><Avatar face={f.face} size={26} /><T>{f.name}</T></Lft><Tag tone="n">₹{r} added</Tag></Row>
        ))}
        <Row>
          <Lft><Avatar face={PENDING_FRIEND.face} size={26} /><T>{PENDING_FRIEND.name}</T></Lft>
          {reminded ? <Tag tone="x">Reminder sent</Tag> : <Link color={c.mut} onPress={remind}><Tag tone="x">Not booked yet</Tag></Link>}
        </Row>
      </ListCard>
    </Screen>
  );
}

export default ReferScreen;

const styles = StyleSheet.create({ code: { letterSpacing: 2 } });
