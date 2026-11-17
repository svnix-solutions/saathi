/** Design page 22 (section 96): your work, specialisations, skills and the certificates they need. */
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  BackHeader, Card, CharacterTile, Check, Grid, H, H2, Hr, Input, Lft, Pill, Screen, Spacer, T, Tag, palette, useAppState, useNav, useT, useTheme,
} from '@/native/ui';
import {
  docType, profession, professions, requiredDocs, skillsOf, specializations, specsOf, type DocId, type ProfessionId, type Requirement,
} from '@/data/professions';
import { Big, Page, PhotoTile, SignupSteps, type V1State } from './kit';

/* Defaults when a screen is opened alone: the design's Nurse sample, first specialisations and skills of the profession. */
const profOf = (st: V1State): ProfessionId => st.profession ?? 'nurse';
const specsFor = (st: V1State) => st.specs ?? specsOf(profOf(st)).slice(0, 2).map((s) => s.id);
const skillsFor = (st: V1State) => st.skills ?? skillsOf(profOf(st)).slice(0, 3).map((s) => s.id);
const addedOf = (st: V1State): DocId[] => st.docsAdded ?? ['aadhaar', 'pan'];

/** True when the chosen work needs a document beyond Aadhaar and PAN (then step 6 is shown). */
export const needsCertificates = (st: V1State) =>
  !!st.profession && requiredDocs(st.profession, st.specs ?? []).some((r) => r.doc !== 'aadhaar' && r.doc !== 'pan');

/** Round radio (`.cb` with border-radius 50%). */
function Radio({ on }: { on: boolean }) {
  const { c } = useTheme();
  return <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
    {on && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' }} />}
  </View>;
}

/* 9 · Your work: one profession */
export function SigninWork() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const { c } = useTheme();
  const [pick, setPick] = useState<ProfessionId>(profOf(st));
  const go = () => {
    // A new profession clears the old picks so the next screens start from its own list.
    set(pick === st.profession ? {} : { profession: pick, specs: undefined, skills: undefined, docsAdded: undefined });
    nav.push('signin.specializations');
  };
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} />
        <H size={21}>{t('What work do you do?', 'आप क्या काम करते हैं?')}</H>
        <T s m>{t('Pick one. To change it later, ask the team.', 'एक चुनें। बाद में बदलने के लिए टीम से कहें।')}</T>
        {professions.filter((p) => p.live).map((p) => (
          <Card key={p.id} row sel={pick === p.id} onPress={() => setPick(p.id)}>
            <Lft style={{ flex: 1 }}>
              <CharacterTile name={p.character} bg={pick === p.id ? c.card : undefined} />
              <View style={{ flex: 1 }}><H2>{t(p.name, p.nameHi)}</H2><T s m>{t(p.sub, p.subHi)}</T></View>
            </Lft>
            <Radio on={pick === p.id} />
          </Card>
        ))}
        <Spacer />
        <Big onPress={go}>{t('Continue', 'आगे बढ़ें')}</Big>
      </Screen>
    </Page>
  );
}

/* 10 · Specialisations: many, from the chosen work */
export function SigninSpecializations() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const p = profession(profOf(st));
  const [picked, setPicked] = useState<string[]>(specsFor(st));
  const toggle = (id: string) => setPicked(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id]);
  const extra = requiredDocs(p.id, picked).some((r) => r.specialization);
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} label={false} />
        <BackHeader title={t(p.name, p.nameHi)} onBack={nav.back} />
        <H size={21}>{t('What do you specialise in?', 'आप किसमें माहिर हैं?')}</H>
        <T s m>{t('Pick all that apply. You are sent jobs that match.', 'जो भी लागू हों सब चुनें। आपको उन्हीं से मिलते काम भेजे जाएँगे।')}</T>
        {specsOf(p.id).map((s) => (
          <Card key={s.id} row sel={picked.includes(s.id)} onPress={() => toggle(s.id)}>
            <View style={{ flex: 1 }}><H2>{t(s.name, s.nameHi)}</H2><T s m>{t(s.sub, s.subHi)}</T></View>
            <Check on={picked.includes(s.id)} size={22} />
          </Card>
        ))}
        <Card tone="yellow">
          <T s color={palette.ink}>{extra
            ? t('One of your choices needs one more certificate. We show the full list before you upload.', 'आपकी एक पसंद के लिए एक और सर्टिफ़िकेट चाहिए। अपलोड से पहले पूरी सूची दिखाएँगे।')
            : t('Some choices need one more certificate. We show the full list before you upload.', 'कुछ पसंद के लिए एक और सर्टिफ़िकेट चाहिए। अपलोड से पहले पूरी सूची दिखाएँगे।')}</T>
        </Card>
        <Spacer />
        <Big disabled={!picked.length} onPress={() => { set({ specs: picked }); nav.push('signin.skills'); }}>
          {t(`Continue · ${picked.length} picked`, `आगे बढ़ें · ${picked.length} चुने`)}
        </Big>
      </Screen>
    </Page>
  );
}

/* 11 · Skills: many chips */
export function SigninSkills() {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const p = profession(profOf(st));
  const [picked, setPicked] = useState<string[]>(skillsFor(st));
  const toggle = (id: string) => setPicked(picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id]);
  return (
    <Page>
      <Screen>
        <SignupSteps step={2} label={false} />
        <BackHeader title={t(`${p.name} · skills`, `${p.nameHi} · हुनर`)} onBack={nav.back} />
        <H size={21}>{t('What can you do?', 'आप क्या-क्या कर सकते हैं?')}</H>
        <T s m>{t('Tick every skill. Customers see these on your profile.', 'हर हुनर पर टिक करें। ग्राहक इन्हें आपकी प्रोफ़ाइल पर देखते हैं।')}</T>
        <Lft gap={8} style={{ flexWrap: 'wrap' }}>
          {skillsOf(p.id).map((s) => (
            <Pill key={s.id} s sel={picked.includes(s.id)} onPress={() => toggle(s.id)} style={{ paddingVertical: 7, paddingHorizontal: 11 }}>
              {(picked.includes(s.id) ? '✓ ' : '') + t(s.name, s.nameHi)}
            </Pill>
          ))}
        </Lft>
        <Card onPress={() => nav.push('help')}>
          <T s m>{t('A skill you do not see? Tell the team in Help; they add skills for everyone.', 'आपका हुनर नहीं दिख रहा? मदद में टीम को बताएँ; वे सबके लिए जोड़ देंगे।')}</T>
        </Card>
        <Spacer />
        <Big disabled={!picked.length} onPress={() => { set({ skills: picked }); nav.push('signin.references'); }}>
          {t(`Continue · ${picked.length} skills`, `आगे बढ़ें · ${picked.length} हुनर`)}
        </Big>
      </Screen>
    </Page>
  );
}

/** "Everyone", "Every nurse · GNM, ANM or B.Sc", "Because you picked Kids", "Every barber · add if you have one". */
function askedLine(r: Requirement, hi: boolean) {
  const d = docType(r.doc);
  const spec = specializations.find((s) => s.id === r.specialization);
  const p = r.profession && profession(r.profession);
  const who = spec ? (hi ? `क्योंकि आपने ${spec.nameHi} चुना` : `Because you picked ${spec.name}`)
    : p ? (hi ? `हर ${p.nameHi} के लिए` : `Every ${p.name.toLowerCase()}`) : hi ? 'सभी के लिए' : 'Everyone';
  const more = !r.required ? (hi ? 'हो तो जोड़ें' : 'add if you have one')
    : d.asksNumber && d.asksExpiry ? (hi ? 'नंबर और कब तक मान्य' : 'number and valid-until date')
      : p && !d.asksExpiry ? d.help : '';
  return more ? `${who} · ${more}` : who;
}

/* 12 / 14 · Documents for your work (step 6), built from the work and specialisations picked */
export function SigninDocuments() {
  const t = useT();
  const nav = useNav();
  const hi = useTheme().locale === 'hi';
  const [st] = useAppState<V1State>();
  const p = profession(profOf(st));
  const specs = specsFor(st);
  const added = addedOf(st);
  const list = requiredDocs(p.id, specs);
  const toAdd = list.filter((r) => r.required && !added.includes(r.doc)).length;
  const specNames = specs.map((id) => specializations.find((s) => s.id === id)).filter(Boolean).map((s) => t(s!.name, s!.nameHi)).join(', ');
  const needsChildSafety = list.some((r) => r.doc === 'child_safety') && !added.includes('child_safety');
  return (
    <Page>
      <Screen>
        <SignupSteps step={6} />
        <H size={21}>{t('Documents for your work', 'आपके काम के दस्तावेज़')}</H>
        <T s m>{t(p.name, p.nameHi)}{specNames ? ` · ${specNames}` : ''}</T>
        <Card style={{ gap: 9 }}>
          {list.map((r, i) => {
            const d = docType(r.doc);
            const on = added.includes(r.doc);
            return (
              <View key={r.doc} style={{ gap: 9 }}>
                {i > 0 && <Hr />}
                <Pressable onPress={() => nav.push('signin.docUpload', { doc: r.doc })} accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ flex: 1 }}><H2 style={{ fontSize: 13.5 }}>{t(d.name, d.nameHi)}</H2><T s m>{askedLine(r, hi)}</T></View>
                  {on ? <Tag tone="n">{t('Added', 'जुड़ गया')}</Tag> : r.required ? <Tag>{t('Add', 'जोड़ें')}</Tag> : <Tag tone="x">{t('Optional', 'वैकल्पिक')}</Tag>}
                </Pressable>
              </View>
            );
          })}
        </Card>
        {needsChildSafety && (
          <Card tone="yellow" onPress={() => nav.push('training')}>
            <T s color={palette.ink}>{t('No child safety training yet? Take the free 20-minute Saathi course in Training.', 'अभी बाल सुरक्षा प्रशिक्षण नहीं है? ट्रेनिंग में Saathi का मुफ़्त 20 मिनट का कोर्स करें।')}</T>
          </Card>
        )}
        <Spacer />
        <Big disabled={toAdd > 0} onPress={() => nav.push('signin.waiting')}>
          {toAdd ? t(`Submit for checking · ${toAdd} to add`, `जाँच के लिए भेजें · ${toAdd} जोड़ना बाकी`) : t('Submit for checking', 'जाँच के लिए भेजें')}
        </Big>
      </Screen>
    </Page>
  );
}

/** Shows only the last 4 characters: XXXXXX3307. */
const mask = (s: string) => (s.length <= 4 ? s : 'X'.repeat(s.length - 4) + s.slice(-4));
const numLabel: Partial<Record<DocId, [string, string]>> = {
  aadhaar: ['Aadhaar number', 'आधार नंबर'], pan: ['PAN number', 'पैन नंबर'],
  nursing_registration: ['Registration number', 'रजिस्ट्रेशन नंबर'], electrical_licence: ['Licence number', 'लाइसेंस नंबर'],
};

/* 13 · Certificate upload: number and expiry only where the document type asks */
export function SigninDocUpload({ params }: { params: { doc?: DocId; sample?: boolean } }) {
  const t = useT();
  const nav = useNav();
  const [st, set] = useAppState<V1State>();
  const d = docType(params.doc ?? 'nursing_registration');
  const sample = !!params.sample;
  const [front, setFront] = useState(sample);
  const [back, setBack] = useState(sample);
  const [num, setNum] = useState(sample ? 'MH203307' : '');
  const [until, setUntil] = useState(sample ? '31 Mar 2029' : '');
  // The field shows the masked value; a longer string means a character was typed, a shorter one means backspace.
  const onNum = (v: string) => setNum(v.length < mask(num).length ? num.slice(0, -1) : (num + v.slice(-1)).toUpperCase().replace(/[^A-Z0-9]/g, ''));
  const ok = front && (!d.hasBack || back) && (!d.asksNumber || num.length >= 4) && (!d.asksExpiry || until.trim().length >= 4);
  const [nl, nlHi] = numLabel[d.id] ?? ['Number', 'नंबर'];
  const save = () => {
    set({ docsAdded: [...addedOf(st).filter((x) => x !== d.id), d.id] });
    nav.toast(t(`${d.name} added`, `${d.nameHi} जुड़ गया`));
    nav.back();
  };
  const tile = (on: boolean, flip: () => void, en: [string, string], hiL: [string, string]) =>
    <PhotoTile added={on} icon={on ? 'check' : 'cam'} label={on ? t(en[0], hiL[0]) : t(en[1], hiL[1])} onPress={flip} />;
  return (
    <Page>
      <Screen>
        <SignupSteps step={6} label={false} />
        <BackHeader title={t(d.name, d.nameHi)} onBack={nav.back} />
        {d.hasBack
          ? <Grid cols={2}>
            {tile(front, () => setFront(!front), ['Front added', 'Add front side'], ['आगे का हिस्सा जुड़ा', 'आगे का हिस्सा जोड़ें'])}
            {tile(back, () => setBack(!back), ['Back added', 'Add back side'], ['पीछे का हिस्सा जुड़ा', 'पीछे का हिस्सा जोड़ें'])}
          </Grid>
          : tile(front, () => setFront(!front), ['Photo added', 'Add photo'], ['फ़ोटो जुड़ गई', 'फ़ोटो जोड़ें'])}
        {d.asksNumber && <>
          <H2>{t(nl, nlHi)}</H2>
          <Input value={mask(num)} onChangeText={onNum} placeholder="XXXXXX3307" />
        </>}
        {d.asksExpiry && <>
          <H2>{t('Valid until', 'कब तक मान्य')}</H2>
          <Input value={until} onChangeText={setUntil} placeholder="31 Mar 2029" />
        </>}
        <T s m>{[
          d.asksExpiry ? t('We remind you 30 days before it runs out.', 'ख़त्म होने से 30 दिन पहले याद दिलाएँगे।') : '',
          d.asksNumber ? t('Only the last 4 characters are kept.', 'सिर्फ़ आख़िरी 4 अक्षर रखे जाते हैं।') : '',
          !d.asksExpiry && !d.asksNumber ? d.help : '',
        ].filter(Boolean).join(' ')}</T>
        <Spacer />
        <Big disabled={!ok} onPress={save}>{t('Save', 'सेव करें')}</Big>
      </Screen>
    </Page>
  );
}
