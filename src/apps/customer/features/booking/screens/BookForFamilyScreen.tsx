/** Design page 12 · Helper profile, visit report and more ways to book — screen 42 · Book for family. */
import React, { useState } from 'react';
import { View } from 'react-native';
import { BackHeader, Button, Card, Grid, H, H2, Icon, Input, Lft, Link, ListCard, Pill, Screen, Spacer, T, useNav, useT, useTheme } from '@/native/ui';
import { SavedAddress } from '../components/SavedAddress';
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
  const contactOf = (i: number) => t(FAMILY_HOMES[i].contact, FAMILY_HOMES[i].contactHi, FAMILY_HOMES[i].contactPa);
  const [name, setName] = useState(() => contactOf(0));
  const [phone, setPhone] = useState(FAMILY_HOMES[0].phone);
  const [sms, setSms] = useState(true);
  const [hindi, setHindi] = useState(true);
  const [iPay, setIPay] = useState(true);
  const pick = (i: number) => { setHome(i); setName(contactOf(i)); setPhone(FAMILY_HOMES[i].phone); };
  const incomplete = who === 'family' && (!name.trim() || phone.replace(/\D/g, '').length < 10);
  const next = () => {
    if (who === 'family') {
      const h = FAMILY_HOMES[home];
      set({ address: { label: h.label, line: h.line, note: t(`${name} will open the door`, `${name} दरवाज़ा खोलेंगे`, `${name} ਦਰਵਾਜ਼ਾ ਖੋਲ੍ਹਣਗੇ`) }, bookingFor: { name, phone, sms, hindi, iPay } });
    }
    nav.push('time');
  };
  return (
    <Screen>
      <BackHeader title={t('Book for someone else', 'किसी और के लिए बुक करें', 'ਕਿਸੇ ਹੋਰ ਲਈ ਬੁੱਕ ਕਰੋ')} onBack={nav.back} />
      <H>{t('Who is the visit for?', 'विज़िट किसके लिए है?', 'ਵਿਜ਼ਿਟ ਕਿਸ ਲਈ ਹੈ?')}</H>
      <Grid cols={2}>
        <Pill sel={who === 'me'} onPress={() => setWho('me')}>{t('Me', 'मैं', 'ਮੈਂ')}</Pill>
        <Pill sel={who === 'family'} onPress={() => setWho('family')}>{t('Family', 'परिवार', 'ਪਰਿਵਾਰ')}</Pill>
      </Grid>
      {who === 'me' ? (
        <Card sel><SavedAddress address={st.address ?? { label: 'Home', line: 'Flat 204, Block C', note: '' }} /></Card>
      ) : (
        <>
          {FAMILY_HOMES.map((h, i) => (
            <Card key={h.label} sel={home === i} onPress={() => pick(i)}>
              <Lft><Icon name="pin" color={home === i ? c.accent : c.mut} /><View><H2>{t(h.label, h.labelHi, h.labelPa)}</H2><T s m>{t(h.line, h.lineHi, h.linePa)}</T></View></Lft>
            </Card>
          ))}
          <Link onPress={() => nav.push('addresses')}>{t('+ Add another home', '+ एक और घर जोड़ें', '+ ਇੱਕ ਹੋਰ ਘਰ ਜੋੜੋ')}</Link>
          <H2>{t('Who will open the door?', 'दरवाज़ा कौन खोलेगा?', 'ਦਰਵਾਜ਼ਾ ਕੌਣ ਖੋਲ੍ਹੇਗਾ?')}</H2>
          <Input small value={name} onChangeText={setName} placeholder={t('Name', 'नाम', 'ਨਾਂ')} />
          <Input small prefix="+91" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder={t('Phone number', 'फ़ोन नंबर', 'ਫ਼ੋਨ ਨੰਬਰ')} />
          <ListCard>
            <ToggleRow label={t('Send them the door code by SMS', 'उन्हें दरवाज़े का कोड SMS से भेजें', 'ਉਨ੍ਹਾਂ ਨੂੰ ਦਰਵਾਜ਼ੇ ਦਾ ਕੋਡ SMS ਰਾਹੀਂ ਭੇਜੋ')} on={sms} onChange={setSms} />
            <ToggleRow label={t('Helper should speak Hindi', 'हेल्पर हिंदी बोले', 'ਹੈਲਪਰ ਹਿੰਦੀ ਬੋਲੇ')} on={hindi} onChange={setHindi} />
            <ToggleRow label={t('I will pay and get the report', 'भुगतान मैं करूँगा, रिपोर्ट मुझे मिले', 'ਭੁਗਤਾਨ ਮੈਂ ਕਰਾਂਗਾ, ਰਿਪੋਰਟ ਮੈਨੂੰ ਮਿਲੇ')} on={iPay} onChange={setIPay} />
          </ListCard>
        </>
      )}
      <Spacer />
      <Button disabled={incomplete} onPress={next}>{t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ')}</Button>
    </Screen>
  );
}

export default BookForFamilyScreen;
