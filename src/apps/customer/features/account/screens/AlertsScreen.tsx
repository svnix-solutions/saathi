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
  const markAllRead = () => { set({ readAlerts: ALERTS.map((_, i) => i) }); nav.toast(t('All alerts marked read', 'सभी सूचनाएँ पढ़ी हुई मानी गईं', 'ਸਾਰੀਆਂ ਸੂਚਨਾਵਾਂ ਪੜ੍ਹੀਆਂ ਮੰਨੀਆਂ ਗਈਆਂ')); };
  return (
    <Screen>
      <Row>
        <Lft style={styles.grow}><TopBar.Back color={c.ink} /><H style={styles.grow}>{t('Alerts', 'सूचनाएँ', 'ਸੂਚਨਾਵਾਂ')}</H></Lft>
        {unread > 0 ? <Link onPress={markAllRead}>{t('Mark all read', 'सब पढ़ा हुआ करें', 'ਸਭ ਪੜ੍ਹਿਆ ਕਰੋ')}</Link> : <T s m>{t('All read', 'सब पढ़ लिया', 'ਸਭ ਪੜ੍ਹ ਲਿਆ')}</T>}
      </Row>
      {ALERTS.map((a, i) => {
        const isNew = !read.includes(i);
        return (
          <Card key={i} sel={isNew} onPress={() => { if (isNew) set({ readAlerts: [...read, i] }); nav.push(a.go); }}>
            <Lft style={styles.top}>
              <AlertIcon name={a.icon} unread={isNew} fill={a.fill} />
              <View style={styles.grow}><H2>{t(a.title.en, a.title.hi, a.title.pa)}</H2><T s m>{t(a.sub.en, a.sub.hi, a.sub.pa)}</T></View>
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
