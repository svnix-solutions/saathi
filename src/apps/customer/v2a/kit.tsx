/** Small helpers shared by the v2a screens (candidates for the shared kit). */
import React from 'react';
import { Pressable, View } from 'react-native';
import { H2, Icon, Pill, Row, Sheet, T, Button, palette, useNav, useTheme, useAppState } from '@/native/ui';
import { decisions, rupees } from '@/data/decisions';
import { useCustomerState, type CustomerState } from '../state';

/** @deprecated use CustomerState / useCustomerState from '../state'. */
export type V2State = CustomerState;
export const useV2 = useCustomerState;

export const visitPrice = decisions.prices.general * 2; // 1 hr general cleaning = ₹158
export { rupees };

/** "− 2 +" counter (pills) or an "Add" pill when the count is 0. */
export function Stepper({ value, onChange, min = 0, max = 9 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  const { c } = useTheme();
  if (value <= 0) {
    return (
      <Pill onPress={() => onChange(Math.min(max, 1))} style={{ paddingVertical: 5, paddingHorizontal: 14 }}>
        <T s b color={c.accent}>Add</T>
      </Pill>
    );
  }
  return (
    <Row gap={10} style={{ justifyContent: 'flex-start' }}>
      <Pill onPress={() => onChange(Math.max(min, value - 1))} style={{ paddingVertical: 3, paddingHorizontal: 10 }}>−</Pill>
      <T b>{value}</T>
      <Pill sel onPress={() => onChange(Math.min(max, value + 1))} style={{ paddingVertical: 3, paddingHorizontal: 10 }}>+</Pill>
    </Row>
  );
}

/** "label ............ value" receipt line. */
export function Line({ label, value, green, bold }: { label: string; value: string; green?: boolean; bold?: boolean }) {
  const { c } = useTheme();
  return (
    <Row>
      {bold ? <H2>{label}</H2> : <T m>{label}</T>}
      {bold ? <H2>{value}</H2> : <T color={green ? c.accent : undefined}>{value}</T>}
    </Row>
  );
}

/** Round radio (the design's `.cb` with border-radius 50%). */
export function Radio({ on }: { on?: boolean }) {
  const { c } = useTheme();
  return (
    <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: on ? palette.green : c.line, backgroundColor: on ? palette.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      {on && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
    </View>
  );
}

/** Back arrow for screens whose header is a green top bar (only shown when there is history). */
export function TopBack({ color = '#fff' }: { color?: string }) {
  const nav = useNav();
  if (!nav.canGoBack) return null;
  return (
    <Pressable onPress={nav.back} accessibilityRole="button" accessibilityLabel="Back" hitSlop={8}>
      <Icon name="back" color={color} />
    </Pressable>
  );
}

/** Bottom sheet with a title and a list of pills to choose one option. */
export function PickSheet<V extends string | number>({ visible, title, options, value, onPick, onClose, cols = 2 }: {
  visible: boolean; title: string; options: { v: V; label: string }[]; value: V; onPick: (v: V) => void; onClose: () => void; cols?: number;
}) {
  return (
    <Sheet visible={visible} onClose={onClose}>
      <H2>{title}</H2>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 7 }}>
        {options.map((o) => (
          <Pill key={String(o.v)} sel={o.v === value} onPress={() => { onPick(o.v); onClose(); }} style={{ width: cols === 2 ? '48%' : '31%' }}>{o.label}</Pill>
        ))}
      </View>
      <Button variant="outline" onPress={onClose}>Close</Button>
    </Sheet>
  );
}

/** Minutes → "1 hr 30", "45 min", "3 hr". */
export const fmtMin = (m: number) => {
  const h = Math.floor(m / 60), r = m % 60;
  if (!h) return `${r} min`;
  return r ? `${h} hr ${r}` : `${h} hr`;
};
