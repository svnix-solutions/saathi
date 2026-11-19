import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, H2, Icon, Lft, Link, Row, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import type { CareStaff } from '../data';

/** The Saathi physio or nurse on a plan: face, role, rating, verified, call. */
export function StaffCard({ staff }: { staff: CareStaff }) {
  const t = useT();
  const nav = useNav();
  const { c } = useTheme();
  const name = t(...staff.name);
  return (
    <Card>
      <Lft style={styles.top}>
        <Avatar face={staff.face} size={44} />
        <View style={styles.grow}>
          <H2>{name}</H2>
          <T s m>{t(...staff.role)}</T>
          <Lft gap={4} style={styles.wrap}>
            <Icon name="star" size={13} color={c.accent} fill />
            <T s b>{staff.rating.toFixed(1)}</T>
            <T s m>{t(`· ${staff.visits} visits · ${staff.years} years`, `· ${staff.visits} विज़िट · ${staff.years} साल`, `· ${staff.visits} ਵਿਜ਼ਿਟਾਂ · ${staff.years} ਸਾਲ`)}</T>
          </Lft>
        </View>
      </Lft>
      <Row style={styles.foot}>
        <Tag tone="g">{t('Verified Saathi staff', 'जाँचे हुए Saathi स्टाफ़', 'ਜਾਂਚਿਆ Saathi ਸਟਾਫ਼')}</Tag>
        <Lft gap={4}>
          <Icon name="call" color={c.accent} size={16} />
          <Link onPress={() => nav.toast(t(`Calling ${name}…`, `${name} को कॉल हो रही है…`, `${name} ਨੂੰ ਕਾਲ ਹੋ ਰਹੀ ਹੈ…`))}>{t('Call', 'कॉल', 'ਕਾਲ')}</Link>
        </Lft>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'flex-start' },
  grow: { flex: 1, gap: 1 },
  wrap: { flexWrap: 'wrap' },
  foot: { marginTop: 10, flexWrap: 'wrap', rowGap: 6 },
});
