/** Design page 11 · Wallet, referrals and chat — screen 37 · Refer a friend. */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, BackHeader, Button, Card, H, H2, Lft, Link, ListCard, Row, Screen, T, Tag, palette, useNav, useT, useTheme } from '@/native/ui';
import { decisions } from '@/domain';
import { PENDING_FRIEND, REFERRAL_CODE, REFERRED_FRIENDS } from '../data';
import { copyText } from '../rules';

export function ReferScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const r = decisions.customer.referralReward;
  const [reminded, setReminded] = useState(false);
  const joined = REFERRED_FRIENDS.length;
  const pending = PENDING_FRIEND.name;
  const copy = () => { copyText(REFERRAL_CODE); nav.toast(t(`Code ${REFERRAL_CODE} copied`, `कोड ${REFERRAL_CODE} कॉपी हुआ`, `ਕੋਡ ${REFERRAL_CODE} ਕਾਪੀ ਹੋ ਗਿਆ`)); };
  const remind = () => { setReminded(true); const f = PENDING_FRIEND.first; nav.toast(t(`Reminder sent to ${f.en}`, `${f.hi} को याद दिलाया गया`, `${f.pa} ਨੂੰ ਯਾਦ ਕਰਾਇਆ ਗਿਆ`)); };
  return (
    <Screen>
      <BackHeader title={t('Invite friends', 'दोस्तों को बुलाएँ', 'ਦੋਸਤਾਂ ਨੂੰ ਬੁਲਾਓ')} onBack={nav.back} />
      <Card tone="yellow" style={{ paddingVertical: 18, paddingHorizontal: 14 }}>
        <H size={22} color={palette.ink}>{t(`Give ₹${r},\nget ₹${r}`, `₹${r} दें,\n₹${r} पाएँ`, `₹${r} ਦਿਓ,\n₹${r} ਲਓ`)}</H>
        <T color={palette.ink} style={{ marginTop: 6 }}>
          {t(
            `Your friend gets ₹${r} off the first visit. You get ₹${r} in your wallet when it is done.`,
            `आपके दोस्त को पहली विज़िट पर ₹${r} की छूट मिलेगी। विज़िट पूरी होने पर आपके वॉलेट में ₹${r} आएँगे।`,
            `ਤੁਹਾਡੇ ਦੋਸਤ ਨੂੰ ਪਹਿਲੀ ਵਿਜ਼ਿਟ ’ਤੇ ₹${r} ਦੀ ਛੋਟ ਮਿਲੇਗੀ। ਵਿਜ਼ਿਟ ਪੂਰੀ ਹੋਣ ’ਤੇ ਤੁਹਾਡੇ ਵਾਲੇਟ ਵਿੱਚ ₹${r} ਆਉਣਗੇ।`,
          )}
        </T>
      </Card>
      <H2>{t('Your code', 'आपका कोड', 'ਤੁਹਾਡਾ ਕੋਡ')}</H2>
      <Card row onPress={copy} style={{ borderWidth: 1.5, borderRadius: 12, padding: 12 }}>
        <T b size={15} style={styles.code}>{REFERRAL_CODE}</T>
        <Link onPress={copy}>{t('Copy', 'कॉपी करें', 'ਕਾਪੀ ਕਰੋ')}</Link>
      </Card>
      <Button onPress={() => nav.toast(t('Opening WhatsApp with your invite…', 'आपके न्योते के साथ WhatsApp खुल रहा है…', 'ਤੁਹਾਡੇ ਸੱਦੇ ਨਾਲ WhatsApp ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ…'))}>{t('Share on WhatsApp', 'WhatsApp पर भेजें', 'WhatsApp ’ਤੇ ਭੇਜੋ')}</Button>
      <H2 style={{ marginTop: 4 }}>{t(`${joined} friends joined · ₹${joined * r} earned`, `${joined} दोस्त जुड़े · ₹${joined * r} कमाए`, `${joined} ਦੋਸਤ ਜੁੜੇ · ₹${joined * r} ਕਮਾਏ`)}</H2>
      <ListCard gap={9}>
        {REFERRED_FRIENDS.map((f) => (
          <Row key={f.name.en}>
            <Lft style={styles.grow}><Avatar face={f.face} size={26} /><T style={styles.grow}>{t(f.name.en, f.name.hi, f.name.pa)}</T></Lft>
            <Tag tone="n">{t(`₹${r} added`, `₹${r} जुड़े`, `₹${r} ਜੁੜੇ`)}</Tag>
          </Row>
        ))}
        {/* wraps the tag under the name when both do not fit on one line (small phone) */}
        <Row style={styles.wrap}>
          <Lft style={styles.fill}><Avatar face={PENDING_FRIEND.face} size={26} /><T>{t(pending.en, pending.hi, pending.pa)}</T></Lft>
          {reminded ? <Tag tone="x">{t('Reminder sent', 'याद दिलाया', 'ਯਾਦ ਕਰਾਇਆ')}</Tag>
            : <Link color={c.mut} onPress={remind}><Tag tone="x">{t('Not booked yet', 'अभी बुक नहीं किया', 'ਅਜੇ ਬੁੱਕ ਨਹੀਂ ਕੀਤਾ')}</Tag></Link>}
        </Row>
      </ListCard>
    </Screen>
  );
}

export default ReferScreen;

const styles = StyleSheet.create({ code: { letterSpacing: 2 }, grow: { flex: 1 }, wrap: { flexWrap: 'wrap' }, fill: { flexGrow: 1, flexShrink: 1 } });
