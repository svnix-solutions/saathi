/** Design page 06 · Start code and finish codes (screens 9b–9e). The start code screen is Tracking with { arrived: true }. */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Card, CheckRow, H, H2, Icon, Input, Lft, Link, Pill, Screen, Spacer, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { codes } from '@/data/decisions';
import { useV1 } from './kit';

/** A big one-time code, as the design draws it (34 px, wide letter spacing). */
export function CodeCard({ title, code, note, sel, color, icon, onPress }: {
  title: string; code: string; note?: string; sel?: boolean; color?: string; icon?: 'check' | 'alert'; onPress?: () => void;
}) {
  const { c } = useTheme();
  return (
    <Card sel={sel} onPress={onPress} style={[{ gap: 4 }, color && !sel ? { borderColor: color } : null]}>
      <Lft style={{ justifyContent: icon ? 'flex-start' : 'center' }}>
        {icon && <Icon name={icon} color={color ?? c.accent} />}
        <H2 color={color}>{title}</H2>
      </Lft>
      <T b size={34} center color={color ?? c.ink} style={{ letterSpacing: 10, lineHeight: 38 }}>{code}</T>
      {note && <T s m center={!icon}>{note}</T>}
    </Card>
  );
}

/* 9d · Two finish codes */
export function FinishCodes() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useV1();
  // the prototype plays the partner: tapping a code is the partner typing it
  const happy = () => {
    set({ visitOutcome: 'satisfied' });
    nav.replace('rate');
    nav.toast(t('Sunita entered your happy code · job complete', 'सुनीता ने आपका खुश वाला कोड डाला · काम पूरा'));
  };
  const notHappy = () => { set({ visitOutcome: 'not_satisfied' }); nav.replace('visit.notHappy'); };
  return (
    <Screen>
      <Tag style={{ alignSelf: 'flex-start' }}>{t('Finishing', 'पूरा हो रहा है')}</Tag>
      <H>{t('Sunita says the job is done', 'सुनीता ने काम पूरा बताया')}</H>
      <T s m>{t('Check the work, then read out one code.', 'काम देख लें, फिर एक कोड बताएँ।')}</T>
      <CodeCard sel icon="check" color={c.accent} title={t('Happy with the work', 'काम से खुश')} code={codes.finishHappy} onPress={happy} />
      <CodeCard icon="alert" color={c.red} title={t('Not happy', 'खुश नहीं')} code={codes.finishNotHappy} onPress={notHappy}
        note={t('Sunita cannot tell which code is which. We call you within 15 minutes.', 'सुनीता को नहीं पता कि कौन-सा कोड कौन-सा है। हम 15 मिनट में आपको कॉल करेंगे।')} />
      <View style={{ alignItems: 'center' }}>
        <Link onPress={notHappy}>{t('Rather not say it aloud? Report a problem', 'ज़ोर से नहीं बोलना? समस्या बताएँ')}</Link>
      </View>
      <T s m center>{t('Tap a code to see what happens when Sunita enters it.', 'सुनीता के कोड डालने पर क्या होगा, देखने के लिए कोड दबाएँ।')}</T>
    </Screen>
  );
}

const problems = [['Work not finished', 'काम अधूरा'], ['Poor quality', 'खराब काम'], ['Late', 'देर से आईं'], ['Behaviour', 'व्यवहार'], ['Something damaged', 'कुछ टूटा']] as const;

/* 9e · After the not-happy code */
export function NotHappy() {
  const nav = useNav();
  const t = useT();
  const [picked, setPicked] = useState<string[]>(['Work not finished']);
  const [text, setText] = useState('Bathroom floor not mopped');
  const toggle = (p: string) => setPicked((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]));
  return (
    <Screen>
      <H>{t('Sorry the job was not right', 'माफ़ कीजिए, काम ठीक नहीं हुआ')}</H>
      <Card style={{ gap: 8 }}>
        <CheckRow on label={t('Job closed with your not-happy code', 'आपके खुश-नहीं वाले कोड से काम बंद हुआ')} />
        <CheckRow on label={t('Your payment is on hold', 'आपका भुगतान रोका गया है')} />
        <CheckRow on label={t('Support will call you by 11:20', 'सपोर्ट 11:20 तक कॉल करेगा')} />
      </Card>
      <H2>{t('What went wrong?', 'क्या गलत हुआ?')}</H2>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
        {problems.map(([en, hi]) => (
          <Pill key={en} s sel={picked.includes(en)} onPress={() => toggle(en)} style={{ paddingHorizontal: 11 }}>{t(en, hi)}</Pill>
        ))}
      </View>
      <Input small multiline value={text} onChangeText={setText} style={{ minHeight: 58 }} placeholder={t('Tell us more (optional)', 'और बताएँ (वैकल्पिक)')} />
      <Spacer />
      <Button disabled={!picked.length && !text.trim()} onPress={() => {
        nav.reset('bookings');
        nav.toast(t('Sent to support · ticket opened, they will call you by 11:20', 'सपोर्ट को भेजा · टिकट खुला, 11:20 तक कॉल आएगी'));
      }}>{t('Send to support', 'सपोर्ट को भेजें')}</Button>
      <T s m center>{t('Codes are one-time: 3 per booking, shown only in your app.', 'कोड एक बार के हैं: हर बुकिंग में 3, सिर्फ़ आपके ऐप में।')}</T>
    </Screen>
  );
}
