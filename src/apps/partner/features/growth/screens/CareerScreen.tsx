import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, H, H2, Lft, ProgressBar, Screen, Spacer, T, palette, useNav, useT, useTheme } from '@/native/ui';
import { CareerStepDot } from '../components/CareerStepDot';
import { careerSteps } from '../data';

/** Design page 32 · screen 55: my career path from partner to area lead, and the next step. */
export function CareerScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [lessons, setLessons] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const expert = lessons >= 2;
  const steps = careerSteps(expert, t);
  return (
    <Screen>
      <Lft><Avatar face="sd" size={56} /><H>{t('My path', 'मेरा रास्ता', 'ਮੇਰਾ ਰਾਹ')}</H></Lft>
      <Card style={styles.path}>
        {steps.map((s, i) => (
          <Pressable key={s.id} onPress={() => setOpen(open === i ? null : i)} accessibilityRole="button">
            <Lft style={styles.top}>
              <CareerStepDot state={s.state} />
              <View style={styles.grow}>
                <H2>{s.title}</H2>
                <T s m>{s.sub}</T>
                {open === i && <T s style={{ marginTop: 3 }}>{s.more}</T>}
              </View>
            </Lft>
          </Pressable>
        ))}
      </Card>
      <Card sel>
        <H2>{expert ? t('Next step: Trainer', 'अगला कदम: ट्रेनर', 'ਅਗਲਾ ਕਦਮ: ਟ੍ਰੇਨਰ') : t('Next step: Deep clean expert', 'अगला कदम: डीप क्लीन एक्सपर्ट', 'ਅਗਲਾ ਕਦਮ: ਡੀਪ ਕਲੀਨ ਐਕਸਪਰਟ')}</H2>
        <ProgressBar value={expert ? 142 / 300 : lessons / 2} track={c.card} fill={palette.green} height={7} style={{ marginTop: 6 }} />
        <T s m style={{ marginTop: 3 }}>{expert ? t('142 of 300 visits done', '300 में से 142 विज़िट हुईं', '300 ਵਿੱਚੋਂ 142 ਵਿਜ਼ਿਟਾਂ ਹੋਈਆਂ') : t(`${lessons} of 2 lessons done`, `2 में से ${lessons} पाठ पूरे`, `2 ਵਿੱਚੋਂ ${lessons} ਪਾਠ ਪੂਰੇ`)}</T>
      </Card>
      <Spacer />
      {expert
        ? <Button variant="outline" onPress={() => nav.push('jobs')}>{t('See ₹129 jobs', '₹129 वाले काम देखें', '₹129 ਵਾਲੇ ਕੰਮ ਦੇਖੋ')}</Button>
        : <Button onPress={() => { setLessons(2); nav.toast(t('Lesson 2 done · you are now a Deep clean expert', 'पाठ 2 पूरा · अब आप डीप क्लीन एक्सपर्ट हैं', 'ਪਾਠ 2 ਪੂਰਾ · ਹੁਣ ਤੁਸੀਂ ਡੀਪ ਕਲੀਨ ਐਕਸਪਰਟ ਹੋ')); }}>{t('Do lesson 2 · 12 min', 'पाठ 2 करें · 12 मिनट', 'ਪਾਠ 2 ਕਰੋ · 12 ਮਿੰਟ')}</Button>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  path: { gap: 12 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1 },
});

export default CareerScreen;
