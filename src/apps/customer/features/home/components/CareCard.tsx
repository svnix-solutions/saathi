import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CharacterTile, H, H2, Lft, Pill, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { nurseHourly, perSession, physioPlans, rupees } from '@/domain';

/**
 * The Saathi Care card on Home (design page 37): physio and nurse care at home. Under "Helper in 15 minutes" for
 * cleaning; `hero` is the larger version at the top when the Care chip is picked, with shortcuts to physio and nurse.
 */
export function CareCard({ hero }: { hero?: boolean }) {
  const nav = useNav();
  const t = useT();
  const { device } = useTheme();
  const fromSession = Math.min(...physioPlans.map(perSession));
  const title = t('Physio and nurse care at home', 'घर पर फ़िज़ियो और नर्स', 'ਘਰ ਤੇ ਫ਼ਿਜ਼ੀਓ ਅਤੇ ਨਰਸ');
  return (
    <Card tone="ink" onPress={() => nav.push('care.home')} accessibilityLabel={`Saathi Care · ${title}`} style={styles.card}>
      <Lft style={styles.top}>
        <CharacterTile name="nurse" size={hero && device !== 'small' ? 64 : 50} />
        <View style={styles.grow}>
          <Lft gap={6} style={styles.wrap}>
            <T s b color={palette.yellow}>Saathi Care</T>
            <Tag tone="y">{t('New', 'नया', 'ਨਵਾਂ')}</Tag>
          </Lft>
          {hero ? <H size={18} color={palette.white}>{title}</H> : <H2 color={palette.white}>{title}</H2>}
          <T s color={palette.white} style={styles.dim}>{t(
            `Physio from ${rupees(fromSession)} a visit · nurse from ${rupees(nurseHourly[0].price)}`,
            `फ़िज़ियो ${rupees(fromSession)} प्रति विज़िट से · नर्स ${rupees(nurseHourly[0].price)} से`,
            `ਫ਼ਿਜ਼ੀਓ ${rupees(fromSession)} ਪ੍ਰਤੀ ਵਿਜ਼ਿਟ ਤੋਂ · ਨਰਸ ${rupees(nurseHourly[0].price)} ਤੋਂ`,
          )}</T>
        </View>
      </Lft>
      {hero && <>
        <T s color={palette.white} style={styles.dim}>{t(
          'Licensed, salaried Saathi staff, supervised by doctors. Book for yourself or a parent.',
          'लाइसेंस वाला, वेतन पर Saathi स्टाफ़, डॉक्टरों की निगरानी में। अपने लिए या माता-पिता के लिए बुक करें।',
          'ਲਾਇਸੈਂਸ ਵਾਲਾ, ਤਨਖ਼ਾਹ ਤੇ Saathi ਸਟਾਫ਼, ਡਾਕਟਰਾਂ ਦੀ ਨਿਗਰਾਨੀ ਹੇਠ। ਆਪਣੇ ਜਾਂ ਮਾਪਿਆਂ ਲਈ ਬੁੱਕ ਕਰੋ।',
        )}</T>
        <View style={[styles.links, device === 'small' && styles.stack]}>
          <Pill s onPress={() => nav.push('care.physio')} style={styles.pill}>{t('Physiotherapy', 'फ़िज़ियोथेरेपी', 'ਫ਼ਿਜ਼ੀਓਥੈਰੇਪੀ')}</Pill>
          <Pill s onPress={() => nav.push('care.nurse')} style={styles.pill}>{t('Nurse care', 'नर्स देखभाल', 'ਨਰਸ ਦੇਖਭਾਲ')}</Pill>
        </View>
      </>}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  top: { alignItems: 'flex-start' },
  grow: { flex: 1, gap: 2 },
  wrap: { flexWrap: 'wrap', rowGap: 2 },
  dim: { opacity: 0.85 },
  links: { flexDirection: 'row', gap: 8 },
  stack: { flexDirection: 'column' },
  pill: { flex: 1, paddingHorizontal: 8 },
});

export default CareCard;
