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
  const [showAs, setShowAs] = useState(showAsOptions[0].en);
  const [photo, setPhoto] = useState(false);
  const [app, setApp] = useState(true);
  const [web, setWeb] = useState(true);
  const share = () => {
    if (!app && !web) { nav.toast(t('Choose the app, the website or both', 'ऐप, वेबसाइट या दोनों चुनें', 'ਐਪ, ਵੈੱਬਸਾਈਟ ਜਾਂ ਦੋਵੇਂ ਚੁਣੋ')); return; }
    set({ testimonial: { status: 'Waiting for approval', showAs, app, web, photo, sent: 'Sent today' } });
    nav.toast(t('Sent for approval · 50 points added', 'मंज़ूरी के लिए भेजा · 50 पॉइंट', 'ਮਨਜ਼ੂਰੀ ਲਈ ਭੇਜਿਆ · 50 ਪੁਆਇੰਟ'));
    nav.replace('myTestimonial');
  };
  const keepPrivate = () => { nav.toast(t('Kept private', 'निजी रखा गया', 'ਨਿੱਜੀ ਰੱਖਿਆ ਗਿਆ')); back(); };
  return (
    <Screen>
      <BackHeader title={t('Share your experience', 'अपना अनुभव बताएँ', 'ਆਪਣਾ ਤਜਰਬਾ ਦੱਸੋ')} fallback="home" />
      <H>{t('May we share your review?', 'क्या हम आपकी समीक्षा दिखा सकते हैं?', 'ਕੀ ਅਸੀਂ ਤੁਹਾਡੀ ਸਮੀਖਿਆ ਦਿਖਾ ਸਕਦੇ ਹਾਂ?')}</H>
      <Card sel>
        <Stars value={5} />
        <T style={{ marginTop: 6 }}>“{t(myQuote.en, myQuote.hi, myQuote.pa)}”</T>
        <T s m style={{ marginTop: 4 }}>{t('Your review of 14 Nov', '14 नवंबर की आपकी समीक्षा', '14 ਨਵੰਬਰ ਦੀ ਤੁਹਾਡੀ ਸਮੀਖਿਆ')}</T>
      </Card>
      <H2>{t('Show me as', 'मुझे ऐसे दिखाएँ', 'ਮੈਨੂੰ ਇੰਝ ਦਿਖਾਓ')}</H2>
      <Grid cols={2}>
        {showAsOptions.map((s) => <Pill key={s.en} sel={showAs === s.en} onPress={() => setShowAs(s.en)}>{t(s.en, s.hi, s.pa)}</Pill>)}
      </Grid>
      <ToggleList items={[
        { label: t('Use my photo', 'मेरी फ़ोटो लगाएँ', 'ਮੇਰੀ ਫ਼ੋਟੋ ਲਾਓ'), on: photo, onChange: setPhoto },
        { label: t('Show in the app', 'ऐप में दिखाएँ', 'ਐਪ ਵਿੱਚ ਦਿਖਾਓ'), on: app, onChange: setApp },
        { label: t('Show on the website', 'वेबसाइट पर दिखाएँ', 'ਵੈੱਬਸਾਈਟ ਤੇ ਦਿਖਾਓ'), on: web, onChange: setWeb },
      ]} />
      <T s m>{t('You can take it down any time from Account. We never edit your words.', 'आप इसे कभी भी अकाउंट से हटा सकते हैं। हम आपके शब्द कभी नहीं बदलते।', 'ਤੁਸੀਂ ਇਸਨੂੰ ਕਦੇ ਵੀ ਅਕਾਊਂਟ ਤੋਂ ਹਟਾ ਸਕਦੇ ਹੋ। ਅਸੀਂ ਤੁਹਾਡੇ ਸ਼ਬਦ ਕਦੇ ਨਹੀਂ ਬਦਲਦੇ।')}</T>
      <Spacer />
      <Button onPress={share}>{t('Yes, share it', 'हाँ, दिखाएँ', 'ਹਾਂ, ਦਿਖਾਓ')}</Button>
      <Button variant="plain" onPress={keepPrivate}>{t('No, keep it private', 'नहीं, निजी रखें', 'ਨਹੀਂ, ਨਿੱਜੀ ਰੱਖੋ')}</Button>
    </Screen>
  );
}

export default TestimonialConsentScreen;
