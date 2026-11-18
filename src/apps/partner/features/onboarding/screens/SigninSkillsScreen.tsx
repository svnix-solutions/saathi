import React, { useState } from 'react';
import { BackHeader, Button, Card, H, Lft, Page, Pill, Screen, Spacer, T, useNav, useT } from '@/native/ui';
import { profession, skillsOf } from '@/data/professions';
import { SignupSteps } from '../components/SignupSteps';
import { profOf, skillsFor, toggleIn } from '../signup';
import { useOnboardingState } from '../state';

/** Design page 22 (section 96), screen 11 · Skills: many chips. */
export function SigninSkillsScreen() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useOnboardingState();
  const p = profession(profOf(st));
  const [picked, setPicked] = useState<string[]>(skillsFor(st));
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} label={false} />
        <BackHeader title={t(`${p.name} · skills`, `${p.nameHi} · हुनर`)} onBack={nav.back} />
        <H size={21}>{t('What can you do?', 'आप क्या-क्या कर सकते हैं?')}</H>
        <T s m>{t('Tick every skill. Customers see these on your profile.', 'हर हुनर पर टिक करें। ग्राहक इन्हें आपकी प्रोफ़ाइल पर देखते हैं।')}</T>
        <Lft gap={8} style={{ flexWrap: 'wrap' }}>
          {skillsOf(p.id).map((s) => (
            <Pill key={s.id} s sel={picked.includes(s.id)} onPress={() => setPicked(toggleIn(picked, s.id))} style={{ paddingVertical: 7, paddingHorizontal: 11 }}>
              {(picked.includes(s.id) ? '✓ ' : '') + t(s.name, s.nameHi)}
            </Pill>
          ))}
        </Lft>
        <Card onPress={() => nav.push('help')}>
          <T s m>{t('A skill you do not see? Tell the team in Help; they add skills for everyone.', 'आपका हुनर नहीं दिख रहा? मदद में टीम को बताएँ; वे सबके लिए जोड़ देंगे।')}</T>
        </Card>
        <Spacer />
        <Button size="tall" disabled={!picked.length} onPress={() => { set({ skills: picked }); nav.push('signin.references'); }}>
          {t(`Continue · ${picked.length} skills`, `आगे बढ़ें · ${picked.length} हुनर`)}
        </Button>
      </Screen>
    </Page>
  );
}

export default SigninSkillsScreen;
