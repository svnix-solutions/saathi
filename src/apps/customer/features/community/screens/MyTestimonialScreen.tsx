import React, { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { BackHeader, Button, Card, H2, Row, Screen, Sheet, Spacer, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { useCustomerState } from '../../../state';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { defaultTestimonial, myQuote } from '../data';
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
  const where = [tm.app && 'app', tm.web && 'website'].filter(Boolean).join(' and ');
  const step = tm.status === 'Live' ? 3 : tm.status === 'Approved' ? 2 : 1;
  const takeDown = () => { set({ testimonial: { ...tm, status: 'Taken down' } }); setConfirm(false); nav.toast('Testimonial taken down'); };
  return (
    <View style={styles.fill}>
      <Screen>
        <BackHeader title={t('My testimonial', 'मेरा प्रशंसापत्र')} fallback="account" />
        <Card>
          <Row><Tag tone={down ? 'x' : tm.status === 'Live' ? 'g' : 'y'}>{tm.status}</Tag><T s m>{tm.sent}</T></Row>
          <T style={{ marginTop: 8 }} strike={down}>“{myQuote}”</T>
          <T s m style={{ marginTop: 6 }}>Shown as {tm.showAs} · {where || 'nowhere'}</T>
        </Card>
        {!down && (
          <Pressable onPress={() => nav.toast('An admin approves it on the Saathi Admin panel')} accessibilityRole="button" accessibilityLabel="How approval works">
            <ApprovalSteps step={step} />
          </Pressable>
        )}
        <Card><T s m>{down
          ? 'Your testimonial has been taken down. Nobody can see it. You can share a review again from any past visit.'
          : 'Nobody else can see it yet. Our team approves each testimonial before it is shown, usually within a day. We will tell you when it is live, or why not.'}</T></Card>
        <Card tone="yellow">
          <H2 color={palette.ink}>Thank you: 50 points added</H2>
          <T color={palette.ink}>For sharing your experience.</T>
        </Card>
        <Spacer />
        {down
          ? <Button variant="outline" onPress={() => nav.push('testimonialConsent')}>{t('Share it again', 'फिर से दिखाएँ')}</Button>
          : <Button variant="outline" danger style={{ borderColor: c.line }} onPress={() => setConfirm(true)}>{t('Take it down', 'हटा दें')}</Button>}
      </Screen>
      <CustomerTabs active="account" />
      <Sheet visible={confirm} onClose={() => setConfirm(false)}>
        <H2>Take your testimonial down?</H2>
        <T s m>It will not be shown in the app or on the website. Your {decisions.customer.pointsPerVisit * 5} points stay.</T>
        <Button style={{ backgroundColor: c.red }} onPress={takeDown}>{t('Yes, take it down', 'हाँ, हटा दें')}</Button>
        <Button variant="outline" onPress={() => setConfirm(false)}>Keep it</Button>
      </Sheet>
    </View>
  );
}

export default MyTestimonialScreen;

const styles = StyleSheet.create({ fill: { flex: 1 } });
