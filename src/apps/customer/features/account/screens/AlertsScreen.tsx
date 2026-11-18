/** Design page 11 · Wallet, referrals and chat — screen 39 · Alerts. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, H, H2, Lft, Link, Row, Screen, T, TopBar, useNav, useT, useTheme } from '@/native/ui';
import { useCustomerState } from '../../../state';
import { AlertIcon } from '../components/AlertIcon';
import { ALERTS, READ_ALERTS_DEFAULT } from '../data';

export function AlertsScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [st, set] = useCustomerState();
  const read = st.readAlerts ?? READ_ALERTS_DEFAULT;
  const unread = ALERTS.length - read.length;
  const markAllRead = () => { set({ readAlerts: ALERTS.map((_, i) => i) }); nav.toast('All alerts marked read'); };
  return (
    <Screen>
      <Row>
        <Lft><TopBar.Back color={c.ink} /><H>{t('Alerts', 'सूचनाएँ')}</H></Lft>
        {unread > 0 ? <Link onPress={markAllRead}>Mark all read</Link> : <T s m>All read</T>}
      </Row>
      {ALERTS.map((a, i) => {
        const isNew = !read.includes(i);
        return (
          <Card key={i} sel={isNew} onPress={() => { if (isNew) set({ readAlerts: [...read, i] }); nav.push(a.go); }}>
            <Lft style={styles.top}>
              <AlertIcon name={a.icon} unread={isNew} fill={a.fill} />
              <View style={styles.grow}><H2>{a.title}</H2><T s m>{a.sub}</T></View>
            </Lft>
          </Card>
        );
      })}
    </Screen>
  );
}

export default AlertsScreen;

const styles = StyleSheet.create({
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});
