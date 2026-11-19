/** Design page 37 · Saathi Care — screen 37.6 · Prescription: photo, doctor's name, checked by a Saathi doctor. */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  BackHeader, Button, Card, H2, Icon, IconTile, Input, Lft, PhotoTile, Screen, Sheet, Spacer, Steps, T, palette, useNav, useT, useTheme,
} from '@/native/ui';
import { tint } from '@/tokens';
import { procedureById } from '@/domain';
import { useCareDraft } from '../state';
import { CARE_DOCTOR } from '../data';
import { stepOf } from '../rules';

export function PrescriptionScreen() {
  const nav = useNav();
  const t = useT();
  const { c, device } = useTheme();
  const { draft: raw, setDraft } = useCareDraft();
  const draft = { ...raw, kind: 'procedure' as const };
  const [camera, setCamera] = useState(false);
  const [doctor, setDoctor] = useState(draft.rxDoctor);
  const photo = draft.rxPhoto;
  const proc = procedureById(draft.procedure);
  const take = (msg: string) => { setDraft({ rxPhoto: true }); setCamera(false); nav.toast(msg); };
  const next = () => { setDraft({ rxPhoto: true, rxDoctor: doctor.trim() }); nav.push('care.patient'); };
  return (
    <View style={styles.root}>
      <Screen>
        <BackHeader title={t('Doctor’s prescription', 'डॉक्टर की पर्ची', 'ਡਾਕਟਰ ਦੀ ਪਰਚੀ')} fallback="care.procedures" />
        <Steps {...stepOf(draft, 'care.prescription')} label={t(...proc.name)} />
        <T m>{t(
          'Add a clear photo of the prescription that names the medicine and the dose.',
          'पर्ची की साफ़ फ़ोटो लगाएँ, जिसमें दवा का नाम और खुराक लिखी हो।',
          'ਪਰਚੀ ਦੀ ਸਾਫ਼ ਫ਼ੋਟੋ ਲਾਓ, ਜਿਸ ਵਿੱਚ ਦਵਾਈ ਦਾ ਨਾਮ ਅਤੇ ਖ਼ੁਰਾਕ ਲਿਖੀ ਹੋਵੇ।',
        )}</T>
        <PhotoTile icon={photo ? 'check' : 'cam'} added={photo} bold height={96} onPress={() => setCamera(true)}
          label={photo ? t('Prescription added · tap to take again', 'पर्ची लग गई · दोबारा लेने के लिए दबाएँ', 'ਪਰਚੀ ਲੱਗ ਗਈ · ਦੁਬਾਰਾ ਲੈਣ ਲਈ ਦਬਾਓ') : t('Take a photo of the prescription', 'पर्ची की फ़ोटो लें', 'ਪਰਚੀ ਦੀ ਫ਼ੋਟੋ ਲਓ')} />
        <H2>{t('Doctor’s name', 'डॉक्टर का नाम', 'ਡਾਕਟਰ ਦਾ ਨਾਮ')}</H2>
        <Input value={doctor} onChangeText={setDoctor} placeholder={t('As written on the prescription', 'जैसा पर्ची पर लिखा है', 'ਜਿਵੇਂ ਪਰਚੀ ਤੇ ਲਿਖਿਆ ਹੈ')}
          accessibilityLabel={t('Doctor’s name', 'डॉक्टर का नाम', 'ਡਾਕਟਰ ਦਾ ਨਾਮ')} />
        <Card tone="mint">
          <Lft style={styles.top}>
            <IconTile name="shield" />
            <View style={styles.grow}>
              <T s b>{t(...CARE_DOCTOR)}</T>
              <T s>{t(
                'Checks every prescription before the nurse is sent, usually within 30 minutes. If anything is unclear, we call you.',
                'नर्स भेजने से पहले हर पर्ची जाँचती हैं, आम तौर पर 30 मिनट में। कुछ साफ़ न हो तो हम आपको कॉल करेंगे।',
                'ਨਰਸ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ ਹਰ ਪਰਚੀ ਜਾਂਚਦੇ ਹਨ, ਆਮ ਤੌਰ ਤੇ 30 ਮਿੰਟ ਵਿੱਚ। ਕੁਝ ਸਾਫ਼ ਨਾ ਹੋਵੇ ਤਾਂ ਅਸੀਂ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰਾਂਗੇ।',
              )}</T>
            </View>
          </Lft>
        </Card>
        <Lft style={styles.top}>
          <Icon name="key" size={16} color={c.accent} />
          <T s m style={styles.grow}>{t('Only the doctor and your nurse see the photo.', 'फ़ोटो सिर्फ़ डॉक्टर और आपकी नर्स देखते हैं।', 'ਫ਼ੋਟੋ ਸਿਰਫ਼ ਡਾਕਟਰ ਅਤੇ ਤੁਹਾਡੀ ਨਰਸ ਵੇਖਦੇ ਹਨ।')}</T>
        </Lft>
        <Spacer />
        <Button disabled={!photo} onPress={next}>{photo ? t('Continue', 'आगे बढ़ें', 'ਅੱਗੇ ਵਧੋ') : t('Add the photo to continue', 'आगे बढ़ने के लिए फ़ोटो लगाएँ', 'ਅੱਗੇ ਵਧਣ ਲਈ ਫ਼ੋਟੋ ਲਾਓ')}</Button>
      </Screen>
      <Sheet visible={camera} onClose={() => setCamera(false)}>
        <H2>{t('Photo of the prescription', 'पर्ची की फ़ोटो', 'ਪਰਚੀ ਦੀ ਫ਼ੋਟੋ')}</H2>
        <View style={[styles.camera, { backgroundColor: tint.cameraBg, height: device === 'small' ? 130 : 170 }]}>
          <View style={[styles.frame, { borderColor: palette.white }]}>
            <Icon name="list" size={26} color={palette.white} />
            <T s center color={palette.white}>{t('Fit the whole page in the frame', 'पूरा पन्ना फ़्रेम में रखें', 'ਪੂਰਾ ਪੰਨਾ ਫ਼੍ਰੇਮ ਵਿੱਚ ਰੱਖੋ')}</T>
          </View>
        </View>
        <Button icon="cam" onPress={() => take(t('Prescription photo added', 'पर्ची की फ़ोटो लग गई', 'ਪਰਚੀ ਦੀ ਫ਼ੋਟੋ ਲੱਗ ਗਈ'))}>{t('Take photo', 'फ़ोटो लें', 'ਫ਼ੋਟੋ ਲਓ')}</Button>
        <Button variant="outline" onPress={() => take(t('Photo chosen from gallery', 'गैलरी से फ़ोटो चुनी', 'ਗੈਲਰੀ ਤੋਂ ਫ਼ੋਟੋ ਚੁਣੀ'))}>{t('Choose from gallery', 'गैलरी से चुनें', 'ਗੈਲਰੀ ਤੋਂ ਚੁਣੋ')}</Button>
      </Sheet>
    </View>
  );
}

export default PrescriptionScreen;

const styles = StyleSheet.create({
  root: { flex: 1 }, top: { alignItems: 'flex-start' }, grow: { flex: 1, gap: 2 },
  camera: { borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 14 },
  frame: { flex: 1, alignSelf: 'stretch', borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 6, padding: 8 },
});
