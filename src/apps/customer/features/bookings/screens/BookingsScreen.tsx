import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H, H2, Link, Row, Screen, T, useNav, useT, useTheme } from '@/native/ui';
import { dur, priceFor, type ServiceId } from '@/domain';
import { CustomerTabs } from '../../../navigation/CustomerTabs';
import { defaultUpcoming, useCustomerState } from '../../../state';
import { BookingSummaryCard } from '../components/BookingSummaryCard';
import { PastBookingCard } from '../components/PastBookingCard';
import { olderPastBooking, sampleLastVisit } from '../data';
import { helperName } from '../../helpers';

/** Design page 04 · screen 12, my bookings. */
export function BookingsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st] = useCustomerState();
  const up = st.upcoming === undefined ? defaultUpcoming : st.upcoming;
  const last = st.lastVisit ?? sampleLastVisit;
  const again = (service: ServiceId) => nav.push('chores', { service });
  return (
    <View style={styles.root}>
      <Screen>
        <H>{t('Your bookings', 'आपकी बुकिंग', 'ਤੁਹਾਡੀਆਂ ਬੁਕਿੰਗਾਂ')}</H>
        <H2 m>{t('Upcoming', 'आने वाली', 'ਆਉਣ ਵਾਲੀਆਂ')}</H2>
        {up ? (
          <BookingSummaryCard booking={up}>
            <Row style={{ marginTop: 10 }}>
              <Link onPress={() => nav.push('changeBooking')}>{t('Reschedule', 'समय बदलें', 'ਸਮਾਂ ਬਦਲੋ')}</Link>
              <Link color={c.red} onPress={() => nav.push('changeBooking', { cancel: true })}>{t('Cancel', 'रद्द करें', 'ਰੱਦ ਕਰੋ')}</Link>
            </Row>
          </BookingSummaryCard>
        ) : (
          <Card><T s m>{t('Nothing booked. Tap Home to book a helper.', 'कोई बुकिंग नहीं। हेल्पर बुक करने के लिए होम दबाएँ।', 'ਕੋਈ ਬੁਕਿੰਗ ਨਹੀਂ। ਹੈਲਪਰ ਬੁੱਕ ਕਰਨ ਲਈ ਹੋਮ ਦਬਾਓ।')}</T></Card>
        )}
        <H2 m>{t('Past', 'पिछली', 'ਪਿਛਲੀਆਂ')}</H2>
        <PastBookingCard service={last.service} price={last.price} onBookAgain={() => again(last.service)}
          meta={`${t('Today', 'आज', 'ਅੱਜ')} · ${dur(t, last.minutes)} · ${helperName(t, 'Sunita D.')}`} />
        <PastBookingCard service={olderPastBooking.service} price={priceFor(olderPastBooking.service, olderPastBooking.minutes)}
          onBookAgain={() => again(olderPastBooking.service)}
          meta={`${t(...olderPastBooking.date)} · ${dur(t, olderPastBooking.minutes)}`} />
      </Screen>
      <CustomerTabs active="bookings" />
    </View>
  );
}

export default BookingsScreen;

const styles = StyleSheet.create({ root: { flex: 1 } });
