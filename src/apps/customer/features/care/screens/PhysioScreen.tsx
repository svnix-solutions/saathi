/** Design page 37 · Saathi Care — screen 37.2 · Physiotherapy: what is the problem? */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, Icon, Lft, Screen, Spacer, Steps, T, useNav, useT, useTheme } from '@/native/ui';
import { PHYSIO_SESSION_MIN, PHYSIO_SESSION_PRICE, physioSpecialties, rupees } from '@/domain';
import { useCareDraft } from '../state';
import { ChoiceCard } from '../components/ChoiceCard';

export function PhysioScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { draft, setDraft } = useCareDraft();
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Physiotherapy at home', 'घर पर फ़िज़ियोथेरेपी', 'ਘਰ ਤੇ ਫ਼ਿਜ਼ੀਓਥੈਰੇਪੀ')} fallback="care.home" />
        <Steps step={1} total={5} label={t('What is the problem?', 'क्या तकलीफ़ है?', 'ਕੀ ਤਕਲੀਫ਼ ਹੈ?')} />
        {physioSpecialties.map((s) => (
          <ChoiceCard key={s.id} icon={s.icon} title={t(...s.name)} sub={t(...s.sub)} selected={draft.specialty === s.id}
            onPress={() => setDraft({ kind: 'physio', specialty: s.id })} />
        ))}
        <Card tone="mint">
          <Lft style={styles.top}>
            <Icon name="clock" size={16} color={c.accent} />
            <T s style={styles.grow}>{t(
              `Each visit is ${PHYSIO_SESSION_MIN} minutes at home with a licensed physio. One visit ${rupees(PHYSIO_SESSION_PRICE)}, less in a plan.`,
              `हर विज़िट ${PHYSIO_SESSION_MIN} मिनट, घर पर, लाइसेंस वाले फ़िज़ियो के साथ। एक विज़िट ${rupees(PHYSIO_SESSION_PRICE)}, प्लान में कम।`,
              `ਹਰ ਵਿਜ਼ਿਟ ${PHYSIO_SESSION_MIN} ਮਿੰਟ, ਘਰ ਤੇ, ਲਾਇਸੈਂਸ ਵਾਲੇ ਫ਼ਿਜ਼ੀਓ ਨਾਲ। ਇੱਕ ਵਿਜ਼ਿਟ ${rupees(PHYSIO_SESSION_PRICE)}, ਪਲਾਨ ਵਿੱਚ ਘੱਟ।`,
            )}</T>
          </Lft>
        </Card>
        <Spacer />
        <Button onPress={() => { setDraft({ kind: 'physio', specialty: draft.specialty }); nav.push('care.plans'); }}>{t('Choose a plan', 'प्लान चुनें', 'ਪਲਾਨ ਚੁਣੋ')}</Button>
      </Screen>
    </View>
  );
}

export default PhysioScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, top: { alignItems: 'flex-start' }, grow: { flex: 1 } });
