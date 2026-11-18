import React, { useState } from 'react';
import { BackHeader, Button, Lft, Pill, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { quoteFilters, quotes } from '../data';
import { TestimonialCard } from '../components/TestimonialCard';

/** Design page 15 (CUSTOMER M) · Testimonials — screen 53 · All testimonials. */
export function TestimonialsScreen() {
  const t = useT();
  const nav = useNav();
  const [filter, setFilter] = useState(0);
  const list = quotes.filter(quoteFilters[filter].f);
  return (
    <Screen>
      <BackHeader title={t('What customers say', 'ग्राहक क्या कहते हैं')} fallback="home" />
      <Lft gap={6}>
        {quoteFilters.map((x, i) => (
          <Pill key={x.k} s sel={filter === i} onPress={() => setFilter(i)} style={{ paddingVertical: 6, paddingHorizontal: 12 }}>{t(x.k, x.hi)}</Pill>
        ))}
      </Lft>
      {list.map((q) => <TestimonialCard key={q.name} quote={q} />)}
      {list.length === 0 && <T s m center>No testimonials here yet.</T>}
      <Spacer />
      <Button variant="outline" onPress={() => nav.push('testimonialConsent')}>{t('Share your experience', 'अपना अनुभव बताएँ')}</Button>
    </Screen>
  );
}

export default TestimonialsScreen;
