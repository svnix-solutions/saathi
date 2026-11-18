import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, H, H2, ListCard, Page, Screen, Spacer, T, Tag, palette, useNav, useT } from '@/native/ui';
import { docType, profession, requiredDocs, specializations } from '@/data/professions';
import { SignupSteps } from '../components/SignupSteps';
import { addedOf, askedLine, profOf, specsFor } from '../signup';
import { docName, professionName, specName } from '../words';
import { useOnboardingState } from '../state';

/** Design page 22 (section 96), screens 12 / 14 · Documents for your work (step 6), built from the work and specialisations picked. */
export function SigninDocumentsScreen() {
  const t = useT();
  const nav = useNav();
  const [st] = useOnboardingState();
  const p = profession(profOf(st));
  const specs = specsFor(st);
  const added = addedOf(st);
  const list = requiredDocs(p.id, specs);
  const toAdd = list.filter((r) => r.required && !added.includes(r.doc)).length;
  const specNames = specs.map((id) => specializations.find((s) => s.id === id)).filter(Boolean).map((s) => specName(t, s!)).join(', ');
  const needsChildSafety = list.some((r) => r.doc === 'child_safety') && !added.includes('child_safety');
  return (
    <Page>
      <Screen>
        <SignupSteps step={6} />
        <H size={21}>{t('Documents for your work', 'आपके काम के दस्तावेज़', 'ਤੁਹਾਡੇ ਕੰਮ ਦੇ ਦਸਤਾਵੇਜ਼')}</H>
        <T s m>{professionName(t, p)}{specNames ? ` · ${specNames}` : ''}</T>
        <ListCard gap={9}>
          {list.map((r) => {
            const d = docType(r.doc);
            const on = added.includes(r.doc);
            return (
              <Pressable key={r.doc} onPress={() => nav.push('signin.docUpload', { doc: r.doc })} accessibilityRole="button" style={styles.row}>
                <View style={styles.fill}><H2 style={styles.docName}>{docName(t, d)}</H2><T s m>{askedLine(r, t)}</T></View>
                {on ? <Tag tone="n">{t('Added', 'जुड़ गया', 'ਜੁੜ ਗਿਆ')}</Tag> : r.required ? <Tag>{t('Add', 'जोड़ें', 'ਜੋੜੋ')}</Tag> : <Tag tone="x">{t('Optional', 'वैकल्पिक', 'ਮਰਜ਼ੀ ਨਾਲ')}</Tag>}
              </Pressable>
            );
          })}
        </ListCard>
        {needsChildSafety && (
          <Card tone="yellow" onPress={() => nav.push('training')}>
            <T s color={palette.ink}>{t('No child safety training yet? Take the free 20-minute Saathi course in Training.', 'अभी बाल सुरक्षा प्रशिक्षण नहीं है? ट्रेनिंग में Saathi का मुफ़्त 20 मिनट का कोर्स करें।', 'ਅਜੇ ਬੱਚਿਆਂ ਦੀ ਸੁਰੱਖਿਆ ਦੀ ਟ੍ਰੇਨਿੰਗ ਨਹੀਂ? ਟ੍ਰੇਨਿੰਗ ਵਿੱਚ Saathi ਦਾ ਮੁਫ਼ਤ 20 ਮਿੰਟ ਦਾ ਕੋਰਸ ਕਰੋ।')}</T>
          </Card>
        )}
        <Spacer />
        <Button size="tall" disabled={toAdd > 0} onPress={() => nav.push('signin.waiting')}>
          {toAdd ? t(`Submit for checking · ${toAdd} to add`, `जाँच के लिए भेजें · ${toAdd} जोड़ना बाकी`, `ਜਾਂਚ ਲਈ ਭੇਜੋ · ${toAdd} ਜੋੜਨੇ ਬਾਕੀ`) : t('Submit for checking', 'जाँच के लिए भेजें', 'ਜਾਂਚ ਲਈ ਭੇਜੋ')}
        </Button>
      </Screen>
    </Page>
  );
}

export default SigninDocumentsScreen;

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fill: { flex: 1 },
  docName: { fontSize: 13.5 },
});
