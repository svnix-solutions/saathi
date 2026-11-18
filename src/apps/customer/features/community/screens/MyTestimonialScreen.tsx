import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { BackHeader, Button, Card, H2, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { defaultTestimonial, myQuote, testimonialLabels, type L } from '../data';
import { ApprovalSteps } from '../components/ApprovalSteps';

/** Design page 15 (CUSTOMER M) · Testimonials — screen 55 · My testimonial. */
export function MyTestimonialScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const [confirm, setConfirm] = useState(false);
  const tm = st.testimonial ?? defaultTestimonial;
  const down = tm.status === 'Taken down';
  const tr = (l: L) => t(l.en, l.hi, l.pa);
  const label = (en: string) => (testimonialLabels[en] ? tr(testimonialLabels[en]) : en);
  const where = tm.app && tm.web ? t('app and website', 'ऐप और वेबसाइट', 'ਐਪ ਅਤੇ ਵੈੱਬਸਾਈਟ')
    : tm.app ? t('app', 'ऐप', 'ਐਪ') : tm.web ? t('website', 'वेबसाइट', 'ਵੈੱਬਸਾਈਟ') : t('nowhere', 'कहीं नहीं', 'ਕਿਤੇ ਨਹੀਂ');
  const points = decisions.customer.pointsPerVisit * 5;
  const step = tm.status === 'Live' ? 3 : tm.status === 'Approved' ? 2 : 1;
  const takeDown = () => { set({ testimonial: { ...tm, status: 'Taken down' } }); setConfirm(false); nav.toast(t('Testimonial taken down', 'प्रशंसापत्र हटा दिया गया', 'ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ ਹਟਾ ਦਿੱਤਾ ਗਿਆ')); };
  return (
    <View style={styles.fill}>
      <Screen>
        <BackHeader title={t('My testimonial', 'मेरा प्रशंसापत्र', 'ਮੇਰਾ ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ')} fallback="account" />
        <Card>
          <Row style={styles.wrap}><Tag tone={down ? 'x' : tm.status === 'Live' ? 'g' : 'y'}>{label(tm.status)}</Tag><T s m>{label(tm.sent)}</T></Row>
          <T style={{ marginTop: 8 }} strike={down}>“{tr(myQuote)}”</T>
          <T s m style={{ marginTop: 6 }}>{t(`Shown as ${tm.showAs} · ${where}`, `${label(tm.showAs)} के नाम से · ${where}`, `${label(tm.showAs)} ਦੇ ਨਾਂ ਨਾਲ · ${where}`)}</T>
        </Card>
        {!down && (
          <Pressable onPress={() => nav.toast(t('An admin approves it on the Saathi Admin panel', 'Saathi एडमिन पैनल पर एक एडमिन इसे मंज़ूर करता है', 'Saathi ਐਡਮਿਨ ਪੈਨਲ ਤੇ ਇੱਕ ਐਡਮਿਨ ਇਸਨੂੰ ਮਨਜ਼ੂਰ ਕਰਦਾ ਹੈ'))} accessibilityRole="button" accessibilityLabel={t('How approval works', 'मंज़ूरी कैसे होती है', 'ਮਨਜ਼ੂਰੀ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ')}>
            <ApprovalSteps step={step} />
          </Pressable>
        )}
        <Card><T s m>{down
          ? t('Your testimonial has been taken down. Nobody can see it. You can share a review again from any past visit.',
            'आपका प्रशंसापत्र हटा दिया गया है। इसे कोई नहीं देख सकता। आप किसी भी पिछली विज़िट से फिर से समीक्षा शेयर कर सकते हैं।',
            'ਤੁਹਾਡਾ ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਇਸਨੂੰ ਕੋਈ ਨਹੀਂ ਦੇਖ ਸਕਦਾ। ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਪਿਛਲੀ ਵਿਜ਼ਿਟ ਤੋਂ ਫਿਰ ਸਮੀਖਿਆ ਸ਼ੇਅਰ ਕਰ ਸਕਦੇ ਹੋ।')
          : t('Nobody else can see it yet. Our team approves each testimonial before it is shown, usually within a day. We will tell you when it is live, or why not.',
            'अभी इसे और कोई नहीं देख सकता। हमारी टीम हर प्रशंसापत्र को दिखाने से पहले मंज़ूर करती है, आमतौर पर एक दिन में। लाइव होने पर हम बताएँगे, या बताएँगे कि क्यों नहीं।',
            'ਅਜੇ ਇਸਨੂੰ ਹੋਰ ਕੋਈ ਨਹੀਂ ਦੇਖ ਸਕਦਾ। ਸਾਡੀ ਟੀਮ ਹਰ ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ ਨੂੰ ਦਿਖਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਮਨਜ਼ੂਰ ਕਰਦੀ ਹੈ, ਆਮ ਤੌਰ ਤੇ ਇੱਕ ਦਿਨ ਵਿੱਚ। ਲਾਈਵ ਹੋਣ ਤੇ ਅਸੀਂ ਦੱਸਾਂਗੇ, ਜਾਂ ਦੱਸਾਂਗੇ ਕਿ ਕਿਉਂ ਨਹੀਂ।')}</T></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>{t('Thank you: 50 points added', 'धन्यवाद: 50 पॉइंट जोड़े गए', 'ਧੰਨਵਾਦ: 50 ਪੁਆਇੰਟ ਜੋੜੇ ਗਏ')}</H2>
          <T color={palette.ink}>{t('For sharing your experience.', 'अपना अनुभव बताने के लिए।', 'ਆਪਣਾ ਤਜਰਬਾ ਦੱਸਣ ਲਈ।')}</T>
        </Card>
        <Spacer />
        {down
          ? <Button variant="outline" onPress={() => nav.push('testimonialConsent')}>{t('Share it again', 'फिर से दिखाएँ', 'ਫਿਰ ਤੋਂ ਦਿਖਾਓ')}</Button>
          : <Button variant="outline" danger style={{ borderColor: c.line }} onPress={() => setConfirm(true)}>{t('Take it down', 'हटा दें', 'ਹਟਾ ਦਿਓ')}</Button>}
      </Screen>
      <CustomerTabs active="account" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>{t('Take your testimonial down?', 'अपना प्रशंसापत्र हटाएँ?', 'ਆਪਣਾ ਪ੍ਰਸ਼ੰਸਾ ਪੱਤਰ ਹਟਾਉਣਾ ਹੈ?')}</H2>
        <T s m>{t(`It will not be shown in the app or on the website. Your ${points} points stay.`, `यह ऐप या वेबसाइट पर नहीं दिखेगा। आपके ${points} पॉइंट बने रहेंगे।`, `ਇਹ ਐਪ ਜਾਂ ਵੈੱਬਸਾਈਟ ਤੇ ਨਹੀਂ ਦਿਖੇਗਾ। ਤੁਹਾਡੇ ${points} ਪੁਆਇੰਟ ਬਣੇ ਰਹਿਣਗੇ।`)}</T>
        <Button style={{ backgroundColor: c.red }} onPress={takeDown}>{t('Yes, take it down', 'हाँ, हटा दें', 'ਹਾਂ, ਹਟਾ ਦਿਓ')}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>{t('Keep it', 'रहने दें', 'ਰਹਿਣ ਦਿਓ')}</Button>
      </Sheet>
    </View>
  );
}

export default MyTestimonialScreen;

const styles = StyleSheet.create({ fill: { flex: 1 }, wrap: { flexWrap: 'wrap', rowGap: 4 } });
