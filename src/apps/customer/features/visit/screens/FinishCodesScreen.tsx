import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H, Link, Screen, T, Tag, useNav, useT, useTheme } from '@/native/ui';
import { codes } from '@/domain';
import { CodeCard } from '../components/CodeCard';
import { useVisitState } from '../state';

/** Design page 06 · screen 9d, the two finish codes. */
export function FinishCodesScreen() {
  const nav = useNav();
  const t = useT();
  const { c } = useTheme();
  const [, set] = useVisitState();
  // the prototype plays the partner: tapping a code is the partner typing it
  const happy = () => {
    set({ visitOutcome: 'satisfied' });
    nav.replace('rate');
    nav.toast(t('Sunita entered your happy code · job complete', 'सुनीता ने आपका खुश वाला कोड डाला · काम पूरा', 'ਸੁਨੀਤਾ ਨੇ ਤੁਹਾਡਾ ਖੁਸ਼ ਵਾਲਾ ਕੋਡ ਪਾਇਆ · ਕੰਮ ਪੂਰਾ'));
  };
  const notHappy = () => { set({ visitOutcome: 'not_satisfied' }); nav.replace('visit.notHappy'); };
  return (
    <Screen>
      <Tag style={styles.tag}>{t('Finishing', 'पूरा हो रहा है', 'ਪੂਰਾ ਹੋ ਰਿਹਾ ਹੈ')}</Tag>
      <H>{t('Sunita says the job is done', 'सुनीता ने काम पूरा बताया', 'ਸੁਨੀਤਾ ਨੇ ਕੰਮ ਪੂਰਾ ਦੱਸਿਆ')}</H>
      <T s m>{t('Check the work, then read out one code.', 'काम देख लें, फिर एक कोड बताएँ।', 'ਕੰਮ ਵੇਖ ਲਓ, ਫਿਰ ਇੱਕ ਕੋਡ ਦੱਸੋ।')}</T>
      <CodeCard sel icon="check" color={c.accent} title={t('Happy with the work', 'काम से खुश', 'ਕੰਮ ਤੋਂ ਖੁਸ਼')} code={codes.finishHappy} onPress={happy} />
      <CodeCard icon="alert" color={c.red} title={t('Not happy', 'खुश नहीं', 'ਖੁਸ਼ ਨਹੀਂ')} code={codes.finishNotHappy} onPress={notHappy}
        note={t('Sunita cannot tell which code is which. We call you within 15 minutes.', 'सुनीता को नहीं पता कि कौन-सा कोड कौन-सा है। हम 15 मिनट में आपको कॉल करेंगे।', 'ਸੁਨੀਤਾ ਨੂੰ ਨਹੀਂ ਪਤਾ ਕਿ ਕਿਹੜਾ ਕੋਡ ਕਿਹੜਾ ਹੈ। ਅਸੀਂ 15 ਮਿੰਟ ਵਿੱਚ ਤੁਹਾਨੂੰ ਕਾਲ ਕਰਾਂਗੇ।')} />
      <View style={styles.center}>
        <Link onPress={notHappy}>{t('Rather not say it aloud? Report a problem', 'ज़ोर से नहीं बोलना? समस्या बताएँ', 'ਉੱਚੀ ਨਹੀਂ ਬੋਲਣਾ? ਸਮੱਸਿਆ ਦੱਸੋ')}</Link>
      </View>
      <T s m center>{t('Tap a code to see what happens when Sunita enters it.', 'सुनीता के कोड डालने पर क्या होगा, देखने के लिए कोड दबाएँ।', 'ਸੁਨੀਤਾ ਦੇ ਕੋਡ ਪਾਉਣ ਤੇ ਕੀ ਹੋਵੇਗਾ, ਵੇਖਣ ਲਈ ਕੋਡ ਦਬਾਓ।')}</T>
    </Screen>
  );
}

export default FinishCodesScreen;

const styles = StyleSheet.create({
  tag: { alignSelf: 'flex-start' },
  center: { alignItems: 'center' },
});
