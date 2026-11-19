import React from 'react';
import { View } from 'react-native';
import { ChipGroup, H2, Row, T, useT } from '@/native/ui';

const scores = Array.from({ length: 11 }, (_, i) => String(i));

/** Pain score 0–10 as a row of chips (scrolls sideways on a small phone), with the chosen score's meaning. */
export function PainPicker({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  const t = useT();
  const meaning = value === 0 ? t('No pain', 'कोई दर्द नहीं', 'ਕੋਈ ਦਰਦ ਨਹੀਂ')
    : value <= 3 ? t('Mild', 'हल्का', 'ਹਲਕਾ')
      : value <= 6 ? t('Moderate', 'मध्यम', 'ਦਰਮਿਆਨਾ')
        : t('Severe', 'तेज़', 'ਤੇਜ਼');
  return (
    <View>
      <Row><H2>{label}</H2><T s m>{value} · {meaning}</T></Row>
      <View style={{ marginTop: 6 }}>
        <ChipGroup items={scores.map((s) => ({ key: s, label: s }))} value={String(value)} onChange={(k) => onChange(Number(k))} gap={5} accessibilityLabel={label} />
      </View>
    </View>
  );
}

export default PainPicker;
