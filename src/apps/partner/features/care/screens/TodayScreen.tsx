/** Design page 38 · 1 · Today's care visits (nurse or physiotherapist). */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card, Chevron, H2, IconTile, Lft, Page, Row, Screen, T, Tag, TopBar, useNav, useT } from '@/native/ui';
import { PartnerTabs } from '../../../navigation/PartnerTabs';
import { partnerName } from '../../jobs';
import { VisitCard } from '../components/VisitCard';
import { credentials, roleName, visitsFor } from '../data';
import { useCareState } from '../state';

export function TodayScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useCareState();
  const role = st.careRole ?? 'nurse';
  const visits = visitsFor(role);
  const done = st.careDone ?? [];
  const doneCount = visits.filter((v) => done.includes(v.id)).length;
  const next = visits.find((v) => !done.includes(v.id));
  const cred = credentials[role];
  return (
    <Page>
      <TopBar>
        <Row>
          <View style={styles.fill}>
            <TopBar.Text dim>{'Saathi Care'} · {roleName(t, role)}</TopBar.Text>
            <TopBar.Title>{partnerName(t, st.name)}</TopBar.Title>
          </View>
          <Pressable onPress={() => nav.push('care.credentials')} accessibilityRole="button" accessibilityLabel={t('Licence and registration', 'लाइसेंस और रजिस्ट्रेशन', 'ਲਾਇਸੈਂਸ ਅਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ')}>
            <Tag tone="n">{t('Verified', 'सत्यापित', 'ਤਸਦੀਕਸ਼ੁਦਾ')}</Tag>
          </Pressable>
        </Row>
        <TopBar.Text style={{ marginTop: 8 }}>{t(`${doneCount} of ${visits.length} visits done today`, `आज ${visits.length} में से ${doneCount} विज़िट पूरी`, `ਅੱਜ ${visits.length} ਵਿੱਚੋਂ ${doneCount} ਵਿਜ਼ਿਟਾਂ ਪੂਰੀਆਂ`)}</TopBar.Text>
        <TopBar.Progress value={visits.length ? doneCount / visits.length : 0} />
      </TopBar>
      <Screen>
        <H2>{t('Today’s visits', 'आज की विज़िट', 'ਅੱਜ ਦੀਆਂ ਵਿਜ਼ਿਟਾਂ')}</H2>
        {visits.map((v) => (
          <VisitCard key={v.id} visit={v} done={done.includes(v.id)} next={next?.id === v.id}
            onStart={() => nav.push('care.visit', { visit: v.id })}
            onPatient={() => nav.push('care.patient', { patient: v.patient })} />
        ))}
        {!next && (
          <Card tone="mint"><T b>{t('All visits done. Thank you!', 'सारी विज़िट पूरी। धन्यवाद!', 'ਸਾਰੀਆਂ ਵਿਜ਼ਿਟਾਂ ਪੂਰੀਆਂ। ਧੰਨਵਾਦ!')}</T><T s m>{t('Your notes have gone to the families and the doctor.', 'आपके नोट्स परिवार और डॉक्टर को पहुँच गए।', 'ਤੁਹਾਡੇ ਨੋਟਸ ਪਰਿਵਾਰ ਅਤੇ ਡਾਕਟਰ ਨੂੰ ਪਹੁੰਚ ਗਏ।')}</T></Card>
        )}
        <Card row onPress={() => nav.toast(t(`Calling ${cred.supervisor.name[0]}, your supervising doctor`, `आपके डॉक्टर ${cred.supervisor.name[1]} को कॉल`, `ਤੁਹਾਡੇ ਡਾਕਟਰ ${cred.supervisor.name[2]} ਨੂੰ ਕਾਲ`))}>
          <Lft style={styles.fill}>
            <IconTile name="call" />
            <View style={styles.fill}>
              <H2>{t('Call your doctor', 'अपने डॉक्टर को कॉल करें', 'ਆਪਣੇ ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ')}</H2>
              <T s m>{t(`${cred.supervisor.name[0]} · for any doubt during a visit`, `${cred.supervisor.name[1]} · विज़िट में कोई भी शक हो तो`, `${cred.supervisor.name[2]} · ਵਿਜ਼ਿਟ ਦੌਰਾਨ ਕੋਈ ਵੀ ਸ਼ੱਕ ਹੋਵੇ ਤਾਂ`)}</T>
            </View>
          </Lft>
          <Chevron />
        </Card>
        <Card row onPress={() => nav.push('care.credentials')}>
          <Lft style={styles.fill}>
            <IconTile name="shield" />
            <View style={styles.fill}>
              <H2>{t('My licence', 'मेरा लाइसेंस', 'ਮੇਰਾ ਲਾਇਸੈਂਸ')}</H2>
              <T s m>{t(...cred.council)}</T>
            </View>
          </Lft>
          <Chevron />
        </Card>
        <T s m>{t('In an emergency at a visit, call 112 first, then your doctor.', 'विज़िट पर इमरजेंसी हो तो पहले 112 पर कॉल करें, फिर अपने डॉक्टर को।', 'ਵਿਜ਼ਿਟ ਤੇ ਐਮਰਜੈਂਸੀ ਹੋਵੇ ਤਾਂ ਪਹਿਲਾਂ 112 ਤੇ ਕਾਲ ਕਰੋ, ਫਿਰ ਆਪਣੇ ਡਾਕਟਰ ਨੂੰ।')}</T>
      </Screen>
      <PartnerTabs active="home" />
    </Page>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });

export default TodayScreen;
