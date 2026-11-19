/** Design page 37 · Saathi Care — screen 37.3 · Session plans: pay once, same physio, visits booked up front. */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BackHeader, Button, Card, H2, Icon, Lft, Screen, Spacer, Steps, T, useNav, useT, useTheme } from '@/native/ui';
import { perSession, physioPlans, physioSpecialties, planSaving, rupees } from '@/domain';
import { useCareDraft } from '../state';
import { ChoiceCard } from '../components/ChoiceCard';
import { PLAN_POINTS } from '../data';
import { physioPlan } from '../rules';

export function PlansScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const { draft, setDraft } = useCareDraft();
  const chosen = physioPlan(draft);
  const problem = physioSpecialties.find((s) => s.id === draft.specialty) ?? physioSpecialties[0];
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Choose a plan', 'प्लान चुनें', 'ਪਲਾਨ ਚੁਣੋ')} fallback="care.physio" />
        <Steps step={2} total={5} label={t(...problem.name)} />
        {physioPlans.map((p) => {
          const one = p.sessions === 1;
          const save = planSaving(p);
          return (
            <ChoiceCard key={p.sessions} selected={chosen.sessions === p.sessions} onPress={() => setDraft({ kind: 'physio', sessions: p.sessions })}
              tag={p.popular ? t('Most chosen', 'सबसे ज़्यादा चुना गया', 'ਸਭ ਤੋਂ ਵੱਧ ਚੁਣਿਆ') : undefined}
              title={one ? t('1 visit', '1 विज़िट', '1 ਵਿਜ਼ਿਟ') : t(`${p.sessions} visits`, `${p.sessions} विज़िट`, `${p.sessions} ਵਿਜ਼ਿਟਾਂ`)}
              sub={one ? t('Try it once', 'एक बार आज़माएँ', 'ਇੱਕ ਵਾਰ ਅਜ਼ਮਾਓ') : t(`${rupees(perSession(p))} a visit · save ${rupees(save)}`, `${rupees(perSession(p))} प्रति विज़िट · ${rupees(save)} की बचत`, `${rupees(perSession(p))} ਪ੍ਰਤੀ ਵਿਜ਼ਿਟ · ${rupees(save)} ਦੀ ਬੱਚਤ`)}
              price={rupees(p.price)} />
          );
        })}
        <Card style={styles.points}>
          <H2>{t('How a plan works', 'प्लान कैसे चलता है', 'ਪਲਾਨ ਕਿਵੇਂ ਚੱਲਦਾ ਹੈ')}</H2>
          {PLAN_POINTS.map((p) => (
            <Lft key={p.text[0]} style={styles.top}>
              <Icon name={p.icon} size={16} color={c.accent} />
              <T s style={styles.grow}>{t(...p.text)}</T>
            </Lft>
          ))}
        </Card>
        <Spacer />
        <Button onPress={() => nav.push('care.patient')}>{t(`Continue · ${rupees(chosen.price)}`, `आगे बढ़ें · ${rupees(chosen.price)}`, `ਅੱਗੇ ਵਧੋ · ${rupees(chosen.price)}`)}</Button>
      </Screen>
    </View>
  );
}

export default PlansScreen;

const styles = StyleSheet.create({ root: { flex: 1 }, points: { gap: 8 }, top: { alignItems: 'flex-start' }, grow: { flex: 1 } });
