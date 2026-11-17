/** Design page 05 · Address, changes and safety (screens 13–15). */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  BackHeader, Button, Card, Grid, H, H2, Icon, IconTile, Lft, Pill, Row, Screen, Sheet, Spacer, T, Tag, Toggle,
  useNav, useT, useTheme, type ScreenProps,
} from '@/native/ui';
import { decisions, priceFor, rupees } from '@/data/decisions';
import { MenuRow, Rows, defaultUpcoming, dur, svcName, useV1 } from './kit';

const addrs = [
  { label: 'Home', labelHi: 'घर', line: 'Flat 204, Block C', lineHi: 'फ़्लैट 204, ब्लॉक सी', note: 'Gate 2, tell the guard flat 204' },
  { label: "Parents' home", labelHi: 'माता-पिता का घर', line: 'House 18, Sector 21', lineHi: 'मकान 18, सेक्टर 21', note: '' },
];

/* 13 · Addresses and home details */
export function Addresses() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const size = st.homeSize ?? '2';
  const baths = st.bathrooms ?? 2;
  return (
    <Screen>
      <BackHeader title={t('My addresses', 'मेरे पते')} onBack={nav.back} />
      {addrs.map((a, i) => {
        const on = st.address.line === a.line;
        return (
          <Card key={a.line} sel={on} onPress={() => { set({ address: { label: a.label, line: a.line, note: a.note } }); if (!on) nav.toast(t(`${a.label} is now the default`, `${a.labelHi} अब मुख्य पता है`)); }}>
            <Row>
              <Lft>
                <Icon name={i === 0 ? 'home' : 'pin'} color={c.accent} />
                <View><H2>{t(a.label, a.labelHi)}</H2><T s m>{t(a.line, a.lineHi)}</T></View>
              </Lft>
              {on && <Tag>{t('Default', 'मुख्य')}</Tag>}
            </Row>
          </Card>
        );
      })}
      <H2>{t('About this home', 'इस घर के बारे में')}</H2>
      <Grid cols={3}>
        <Pill sel={size === '1'} onPress={() => set({ homeSize: '1' })}>1 BHK</Pill>
        <Pill sel={size === '2'} onPress={() => set({ homeSize: '2' })}>2 BHK</Pill>
        <Pill sel={size === '3'} onPress={() => set({ homeSize: '3' })}>3 BHK+</Pill>
      </Grid>
      <Card>
        <Rows>
          <Row>
            <T>{t('Bathrooms', 'बाथरूम')}</T>
            <Lft gap={10}>
              <Pressable onPress={() => set({ bathrooms: Math.max(1, baths - 1) })} accessibilityLabel="Fewer"><T b color={c.accent}>−</T></Pressable>
              <T b>{baths}</T>
              <Pressable onPress={() => set({ bathrooms: Math.min(5, baths + 1) })} accessibilityLabel="More"><T b color={c.accent}>+</T></Pressable>
            </Lft>
          </Row>
          <Row><T>{t('Pets at home', 'घर में पालतू')}</T><Toggle on={st.pets ?? true} onChange={(v) => set({ pets: v })} /></Row>
          <Row><T>{t('Elderly person at home', 'घर में बुज़ुर्ग')}</T><Toggle on={st.elderly ?? false} onChange={(v) => set({ elderly: v })} /></Row>
        </Rows>
      </Card>
      <Card>
        <T s b>{t('How to reach', 'कैसे पहुँचें')}</T>
        <T s m>{st.address.note ? (st.address.line === addrs[0].line ? t('Gate 2, near the park. Tell the guard flat 204.', 'गेट 2, पार्क के पास। गार्ड को फ़्लैट 204 बताएँ।') : st.address.note) : t('No note yet.', 'अभी कोई नोट नहीं।')}</T>
      </Card>
      <Spacer />
      <Button variant="outline" onPress={() => nav.push('signin.address', { add: true })}>{t('Add new address', 'नया पता जोड़ें')}</Button>
    </Screen>
  );
}

const slots = [['Tomorrow · 10:00 am', 'कल · सुबह 10:00'], ['Tomorrow · 4:00 pm', 'कल · शाम 4:00'], ['Wed 18 · 10:00 am', 'बुध 18 · सुबह 10:00']] as const;

/* 14 · Change or cancel */
export function ChangeBooking({ params }: ScreenProps<{ cancel?: boolean }>) {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useV1();
  const b = st.upcoming ?? defaultUpcoming;
  const [sheet, setSheet] = useState<null | 'time' | 'length' | 'cancel'>(params.cancel ? 'cancel' : null);
  const close = () => setSheet(null);
  const update = (patch: Partial<typeof b>) => set({ upcoming: { ...b, ...patch } });
  const [day, slot] = [t(b.slot.split(' · ')[0], b.slotHi.split(' · ')[0]), t(b.slot.split(' · ')[1], b.slotHi.split(' · ')[1])];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Change booking', 'बुकिंग बदलें')} onBack={nav.back} />
        <Card sel>
          <Row><H2>{svcName(t, b.service)}</H2><Tag>{day}</Tag></Row>
          <T s m style={{ marginTop: 4 }}>{`${slot} · ${dur(t, b.minutes)} · ${rupees(priceFor(b.service, b.minutes))}`}</T>
        </Card>
        <Card>
          <Rows gap={11}>
            <MenuRow label={t('Move to another time', 'दूसरे समय पर करें')} sub={t(`Free until ${decisions.customer.freeCancelUntilHrs} hr before`, `${decisions.customer.freeCancelUntilHrs} घंटा पहले तक मुफ़्त`)} onPress={() => setSheet('time')} />
            <MenuRow label={t('Make it longer or shorter', 'समय बढ़ाएँ या घटाएँ')} sub={t(`Now ${dur(t, b.minutes)}`, `अभी ${dur(t, b.minutes)}`)} onPress={() => setSheet('length')} />
            <MenuRow label={t('Ask for a different helper', 'दूसरा हेल्पर माँगें')} sub={t(`Now ${b.helper}`, `अभी ${b.helper}`)}
              onPress={() => { update({ helper: b.helper === 'Rekha M.' ? 'Geeta K.' : 'Rekha M.' }); nav.toast(t('We will send a different helper', 'हम दूसरा हेल्पर भेजेंगे')); }} />
          </Rows>
        </Card>
        <H2>{t('If you cancel', 'अगर आप रद्द करें')}</H2>
        <Card style={{ gap: 6 }}>
          <Row><T s m>{t('More than 1 hr before', '1 घंटे से ज़्यादा पहले')}</T><T s b color={c.accent}>{t('Free', 'मुफ़्त')}</T></Row>
          <Row><T s m>{t('Less than 1 hr before', '1 घंटे से कम पहले')}</T><T s b>{rupees(decisions.customer.lateCancelFee)}</T></Row>
          <Row><T s m>{t('After the helper arrives', 'हेल्पर के पहुँचने के बाद')}</T><T s b>{rupees(decisions.customer.cancelAfterArrival)}</T></Row>
        </Card>
        <Spacer />
        <Button variant="outline" danger style={{ borderColor: c.red }} onPress={() => setSheet('cancel')}>{t('Cancel booking · free now', 'बुकिंग रद्द करें · अभी मुफ़्त')}</Button>
      </Screen>

      <Sheet visible={sheet === 'time'} onClose={close}>
        <H>{t('Pick a new time', 'नया समय चुनें')}</H>
        {slots.map(([en, hi]) => (
          <Pill key={en} sel={b.slot === en} onPress={() => { update({ slot: en, slotHi: hi }); close(); nav.toast(t(`Moved to ${en}`, `${hi} पर किया गया`)); }}>{t(en, hi)}</Pill>
        ))}
      </Sheet>
      <Sheet visible={sheet === 'length'} onClose={close}>
        <H>{t('How long?', 'कितनी देर?')}</H>
        <Grid cols={3}>
          {[60, 90, 120, 150, 180].map((m) => (
            <Pill key={m} sel={b.minutes === m} onPress={() => { update({ minutes: m }); close(); nav.toast(t(`Now ${dur(t, m)} · ${rupees(priceFor(b.service, m))}`, `अब ${dur(t, m)} · ${rupees(priceFor(b.service, m))}`)); }}>{dur(t, m)}</Pill>
          ))}
        </Grid>
      </Sheet>
      <Sheet visible={sheet === 'cancel'} onClose={close}>
        <H>{t('Cancel this booking?', 'यह बुकिंग रद्द करें?')}</H>
        <T m>{t('It is more than 1 hour away, so there is no fee.', 'अभी 1 घंटे से ज़्यादा बाकी है, इसलिए कोई शुल्क नहीं।')}</T>
        <Button variant="outline" danger style={{ borderColor: c.red }} onPress={() => { set({ upcoming: null }); close(); nav.reset('bookings'); nav.toast(t('Booking cancelled · no charge', 'बुकिंग रद्द · कोई शुल्क नहीं')); }}>{t('Yes, cancel', 'हाँ, रद्द करें')}</Button>
        <Button onPress={close}>{t('Keep booking', 'बुकिंग रहने दें')}</Button>
      </Sheet>
    </View>
  );
}

/* 15 · Help and safety */
export function Help() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [share, setShare] = useState(false);
  const [sos, setSos] = useState(false);
  const problems: [string, string, string][] = [
    ['notArrived', 'Helper has not arrived', 'हेल्पर नहीं पहुँचा'],
    ['notFinished', 'Work was not finished', 'काम पूरा नहीं हुआ'],
    ['damaged', 'Something is damaged or missing', 'कुछ टूटा या गायब है'],
    ['charged', 'I was charged wrongly', 'मुझसे गलत पैसे लिए गए'],
  ];
  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <BackHeader title={t('Help and safety', 'मदद और सुरक्षा')} onBack={nav.back} />
        <Card onPress={() => setSos(true)} style={{ backgroundColor: c.red, borderWidth: 0 }}>
          <Lft>
            <Icon name="shield" size={26} color="#fff" />
            <View>
              <H2 color="#fff" style={{ fontSize: 15 }}>{t('Emergency', 'आपातकाल')}</H2>
              <T s color="#fff">{t('Calls our safety team right now', 'हमारी सुरक्षा टीम को अभी कॉल करता है')}</T>
            </View>
          </Lft>
        </Card>
        <Card row>
          <Lft style={{ flex: 1 }}>
            <IconTile name="pin" />
            <View style={{ flex: 1 }}>
              <H2>{t('Share this visit', 'यह विज़िट शेयर करें')}</H2>
              <T s m>{t('Family sees helper and timing', 'परिवार हेल्पर और समय देख सकता है')}</T>
            </View>
          </Lft>
          <Toggle on={share} onChange={(v) => { setShare(v); nav.toast(v ? t('Link sent to your family', 'परिवार को लिंक भेजा गया') : t('Sharing stopped', 'शेयर करना बंद')); }} />
        </Card>
        <H2>{t('Something went wrong?', 'कुछ गलत हुआ?')}</H2>
        <Card>
          <Rows gap={11}>
            {problems.map(([k, en, hi]) => <MenuRow key={k} label={t(en, hi)} onPress={() => nav.push('supportChat', { topic: k })} />)}
          </Rows>
        </Card>
        <Spacer />
        <Button variant="outline" icon="call" onPress={() => nav.toast(t('Calling Saathi support…', 'साथी सपोर्ट को कॉल हो रहा है…'))}>{t('Call support', 'सपोर्ट को कॉल करें')}</Button>
      </Screen>
      <Sheet visible={sos} onClose={() => setSos(false)}>
        <Lft><Icon name="shield" size={26} color={c.red} /><H>{t('Calling the safety team', 'सुरक्षा टीम को कॉल')}</H></Lft>
        <T m>{t('Stay on the line. We can see this visit and your helper, and we have shared your location.', 'लाइन पर रहें। हमें यह विज़िट और हेल्पर दिख रहे हैं, और आपकी जगह शेयर की गई है।')}</T>
        <Button danger variant="outline" style={{ borderColor: c.red }} onPress={() => setSos(false)}>{t('End call', 'कॉल खत्म करें')}</Button>
      </Sheet>
    </View>
  );
}
