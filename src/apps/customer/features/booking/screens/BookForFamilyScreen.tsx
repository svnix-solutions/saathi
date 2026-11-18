/** Design page 12 · Helper profile, visit report and more ways to book — screen 42 · Book for family. */
import React, { useState } from 'react';
import { View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, H2, Icon, Input, Lft, Link, ListCard, Pill, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { ToggleRow } from '../components/ToggleRow';
import { FAMILY_HOMES } from '../data';
import { useBookingState } from '../state';

export function BookForFamilyScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useBookingState();
  const [who, setWho] = useState<'me' | 'family'>('family');
  const [home, setHome] = useState(0);
  const [name, setName] = useState(FAMILY_HOMES[0].contact);
  const [phone, setPhone] = useState(FAMILY_HOMES[0].phone);
  const [sms, setSms] = useState(true);
  const [hindi, setHindi] = useState(true);
  const [iPay, setIPay] = useState(true);
  const pick = (i: number) => { setHome(i); setName(FAMILY_HOMES[i].contact); setPhone(FAMILY_HOMES[i].phone); };
  const incomplete = who === 'family' && (!name.trim() || phone.replace(/\D/g, '').length < 10);
  const next = () => {
    if (who === 'family') {
      const h = FAMILY_HOMES[home];
      set({ address: { label: h.label, line: h.line, note: `${name} will open the door` }, bookingFor: { name, phone, sms, hindi, iPay } });
    }
    nav.push('time');
  };
  return (
    <Screen>
      <BackHeader title={t('Book for someone else', 'किसी और के लिए बुक करें')} onBack={nav.back} />
      <H>{t('Who is the visit for?', 'विज़िट किसके लिए है?')}</H>
      <Grid cols={2}>
        <Pill sel={who === 'me'} onPress={() => setWho('me')}>{t('Me', 'मैं')}</Pill>
        <Pill sel={who === 'family'} onPress={() => setWho('family')}>{t('Family', 'परिवार')}</Pill>
      </Grid>
      {who === 'me' ? (
        <Card sel><Lft><Icon name="pin" color={c.accent} /><View><H2>{st.address?.label ?? 'Home'}</H2><T s m>{st.address?.line ?? 'Flat 204, Block C'}</T></View></Lft></Card>
      ) : (
        <>
          {FAMILY_HOMES.map((h, i) => (
            <Card key={h.label} sel={home === i} onPress={() => pick(i)}>
              <Lft><Icon name="pin" color={home === i ? c.accent : c.mut} /><View><H2>{h.label}</H2><T s m>{h.line}</T></View></Lft>
            </Card>
          ))}
          <Link onPress={() => nav.push('addresses')}>+ Add another home</Link>
          <H2>Who will open the door?</H2>
          <Input small value={name} onChangeText={setName} placeholder="Name" />
          <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone number" />
          <ListCard>
            <ToggleRow label="Send them the door code by SMS" on={sms} onChange={setSms} />
            <ToggleRow label="Helper should speak Hindi" on={hindi} onChange={setHindi} />
            <ToggleRow label="I will pay and get the report" on={iPay} onChange={setIPay} />
          </ListCard>
        </>
      )}
      <Spacer />
      <Button disabled={incomplete} onPress={next}>{t('Continue', 'आगे बढ़ें')}</Button>
    </Screen>
  );
}

export default BookForFamilyScreen;
