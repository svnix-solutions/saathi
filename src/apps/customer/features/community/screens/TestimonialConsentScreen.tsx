import React, { useState } from 'react';
import { BackHeader, Button, Card, Grid, H, H2, Pill, Screen, Spacer, Stars, T, useBack, useNav, useT } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { myQuote, showAsOptions } from '../data';
import { ToggleList } from '../components/ToggleList';

/** Design page 15 (CUSTOMER M) · Testimonials — screen 54 · Permission to share. */
export function TestimonialConsentScreen() {
  const t = useT();
  const nav = useNav();
  const back = useBack('home');
  const [, set] = useCustomerState();
  const [showAs, setShowAs] = useState(showAsOptions[0]);
  const [photo, setPhoto] = useState(false);
  const [app, setApp] = useState(true);
  const [web, setWeb] = useState(true);
  const share = () => {
    if (!app && !web) { nav.toast('Choose the app, the website or both'); return; }
    set({ testimonial: { status: 'Waiting for approval', showAs, app, web, photo, sent: 'Sent today' } });
    nav.toast(t('Sent for approval · 50 points added', 'मंज़ूरी के लिए भेजा · 50 पॉइंट'));
    nav.replace('myTestimonial');
  };
  const keepPrivate = () => { nav.toast(t('Kept private', 'निजी रखा गया')); back(); };
  return (
    <Screen>
      <BackHeader title={t('Share your experience', 'अपना अनुभव बताएँ')} fallback="home" />
      <H>{t('May we share your review?', 'क्या हम आपकी समीक्षा दिखा सकते हैं?')}</H>
      <Card sel>
        <Stars value={5} />
        <T style={{ marginTop: 6 }}>“{myQuote}”</T>
        <T s m style={{ marginTop: 4 }}>Your review of 14 Nov</T>
      </Card>
      <H2>{t('Show me as', 'मुझे ऐसे दिखाएँ')}</H2>
      <Grid cols={2}>
        {showAsOptions.map((s) => <Pill key={s} sel={showAs === s} onPress={() => setShowAs(s)}>{s}</Pill>)}
      </Grid>
      <ToggleList items={[
        { label: 'Use my photo', on: photo, onChange: setPhoto },
        { label: 'Show in the app', on: app, onChange: setApp },
        { label: 'Show on the website', on: web, onChange: setWeb },
      ]} />
      <T s m>You can take it down any time from Account. We never edit your words.</T>
      <Spacer />
      <Button onPress={share}>{t('Yes, share it', 'हाँ, दिखाएँ')}</Button>
      <Button variant="plain" onPress={keepPrivate}>{t('No, keep it private', 'नहीं, निजी रखें')}</Button>
    </Screen>
  );
}

export default TestimonialConsentScreen;
