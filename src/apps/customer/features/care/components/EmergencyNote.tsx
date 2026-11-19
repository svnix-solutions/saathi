import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Icon, Lft, T, useNav, useT, useTheme } from '@/native/ui';
import { CARE_EMERGENCY } from '@/domain';

/** "Not for emergencies. Call 112." Tapping it shows the number again as a toast. */
export function EmergencyNote() {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  return (
    <Card tone="red" onPress={() => nav.toast(t('Emergency: call 112', 'इमरजेंसी: 112 पर कॉल करें', 'ਐਮਰਜੈਂਸੀ: 112 ਤੇ ਕਾਲ ਕਰੋ'))}>
      <Lft style={styles.top}>
        <Icon name="alert" size={16} color={c.red} />
        <T s style={styles.grow}>{t(...CARE_EMERGENCY)}</T>
      </Lft>
    </Card>
  );
}

const styles = StyleSheet.create({ top: { alignItems: 'flex-start' }, grow: { flex: 1 } });
