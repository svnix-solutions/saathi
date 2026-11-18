import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { H, Icon, Link, Page, Row, Screen, useNav, useT, useTheme } from '@/native/ui';
import { AlertCard } from '../components/AlertCard';
import { alerts, defaultAlertsRead, type PartnerAlert } from '../data';
import { useAccountState } from '../state';

/** Design page 24 (section 60), screen 27 · Alerts. */
export function AlertsScreen() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const [st, set] = useAccountState();
  const read = st.alertsRead ?? defaultAlertsRead;
  const open = (a: PartnerAlert) => { set({ alertsRead: [...new Set([...read, a.id])] }); nav.push(a.go); };
  return (
    <Page>
      <Screen>
        <Row>
          <Pressable onPress={nav.back} disabled={!nav.canGoBack} accessibilityRole="button" style={styles.back}>
            {nav.canGoBack && <Icon name="back" color={c.ink} />}
            <H>{t('Alerts', 'सूचनाएँ')}</H>
          </Pressable>
          <Link onPress={() => { set({ alertsRead: alerts.map((a) => a.id) }); nav.toast(t('All marked as read', 'सब पढ़ा हुआ')); }}>{t('Mark all read', 'सब पढ़ा हुआ करें')}</Link>
        </Row>
        {alerts.map((a) => (
          <AlertCard key={a.id} icon={a.icon} title={t(a.en, a.hi)} sub={t(a.subEn, a.subHi)} unread={!read.includes(a.id)} onPress={() => open(a)} />
        ))}
      </Screen>
    </Page>
  );
}

export default AlertsScreen;

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
