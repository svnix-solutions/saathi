/** Small helpers shared by the v1 customer screens (local to this area). */
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Hr, Icon, Row, T, useTheme, useAppState, type IconName } from '@/native/ui';
import { services, priceFor, type ServiceId } from '@/data/decisions';
import type { CustomerState } from '../chrome';

/** v1 adds a few optional fields to the shared CustomerState. */
export type V1State = CustomerState & {
  /** confirm screen: UPI fails once when true (default false) */
  simulatePaymentFail?: boolean;
  paymentFailedOnce?: boolean;
  /** minutes added during the visit */
  extraMinutes?: number;
  /** scheduled day when `when` is 'later' */
  day?: 'today' | 'tomorrow' | 'wed';
  /** the upcoming sample booking (bookings / changeBooking) */
  upcoming?: { service: ServiceId; minutes: number; slot: string; slotHi: string; helper: string } | null;
  /** set once the visit is rated */
  lastVisit?: { service: ServiceId; minutes: number; price: number };
  homeSize?: '1' | '2' | '3';
  bathrooms?: number;
  pets?: boolean;
  elderly?: boolean;
  email?: string;
};
export const useV1 = () => useAppState<V1State>();

export const defaultUpcoming = { service: 'kitchenBath' as ServiceId, minutes: 120, slot: 'Tomorrow · 10:00 am', slotHi: 'कल · सुबह 10:00', helper: 'Rekha M.' };

/** Service names as the v1 design writes them (Hindi from design page 18). */
const svcHi: Record<ServiceId, string> = {
  general: 'सामान्य सफ़ाई', kitchenBath: 'रसोई और बाथरूम', dishes: 'बर्तन और तैयारी', laundry: 'कपड़े और अलमारी', custom: 'घंटे के हिसाब से मदद',
};
export const svc = (id: ServiceId) => services.find((s) => s.id === id) ?? services[0];
export const svcName = (t: TFn, id: ServiceId) => t(svc(id).name, svcHi[id]);
export const shortName = (t: TFn, id: ServiceId) => t(svc(id).name.split(' ')[0], svcHi[id].split(' ')[0]);

export const taskHi: Record<string, string> = {
  'Sweep and mop floors': 'झाड़ू और पोछा', Dusting: 'धूल झाड़ना', 'Wipe surfaces': 'सतहें पोंछना', 'Interior windows': 'अंदर की खिड़कियाँ', Balcony: 'बालकनी',
  'Scrub kitchen counters': 'किचन काउंटर रगड़ना', 'Clean stove top': 'चूल्हा साफ़ करना', 'Scrub toilet and basin': 'टॉयलेट और बेसिन रगड़ना',
  'Clean bathroom tiles': 'बाथरूम टाइल साफ़ करना', 'Wipe mirrors': 'शीशे पोंछना', 'Wash dishes': 'बर्तन धोना', 'Chop vegetables': 'सब्ज़ी काटना',
  'Knead dough': 'आटा गूँथना', 'Wipe kitchen': 'किचन पोंछना', 'Load washing machine': 'वॉशिंग मशीन चलाना', 'Hang clothes to dry': 'कपड़े सुखाना',
  'Fold clothes': 'कपड़े तह करना', 'Organize wardrobe': 'अलमारी जमाना', 'You choose the chores': 'काम आप चुनें',
};
export const taskName = (t: TFn, task: string) => t(task, taskHi[task]);

export type TFn = (en: string, hi?: string, pa?: string) => string;

/** "1 hr", "1.5 hr", "30 min" (and Hindi). */
export const dur = (t: TFn, min: number) =>
  min < 60 ? t(`${min} min`, `${min} मिनट`) : t(`${min / 60} hr`, `${min / 60} घंटा`);

/** Total price of the booking being built (service × minutes). */
export const priceOf = (st: Pick<CustomerState, 'service' | 'minutes'>) => priceFor(st.service, st.minutes);

/** mm:ss */
export const clock = (sec: number) => `${Math.floor(Math.max(sec, 0) / 60)}:${String(Math.max(sec, 0) % 60).padStart(2, '0')}`;

/** Counts down once a second from `from` while `running`; returns [value, setValue]. */
export function useCountdown(from: number, running = true, stepMs = 1000) {
  const [v, setV] = useState(from);
  const ref = useRef(v);
  ref.current = v;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setV((x) => (x > 0 ? x - 1 : 0)), stepMs);
    return () => clearInterval(id);
  }, [running, stepMs]);
  return [v, setV] as const;
}

/** A tappable list row with a chevron (the design's rotated back icon). */
export function MenuRow({ label, sub, onPress, icon, right, color }: {
  label: string; sub?: string; onPress?: () => void; icon?: IconName; right?: React.ReactNode; color?: string;
}) {
  const { c } = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" hitSlop={4}>
      <Row>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
          {icon && <Icon name={icon} color={c.accent} />}
          <View style={{ flex: 1, minWidth: 0 }}>
            {sub ? <T b color={color}>{label}</T> : <T color={color}>{label}</T>}
            {sub && <T s m>{sub}</T>}
          </View>
        </View>
        {right ?? <Icon name="chevron" color={c.mut} />}
      </Row>
    </Pressable>
  );
}

/** Rows separated by <Hr>, inside a card body (design: display:grid; gap:10px). */
export function Rows({ children, gap = 10 }: { children: React.ReactNode; gap?: number }) {
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={{ gap }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Hr />}
          {it}
        </React.Fragment>
      ))}
    </View>
  );
}

/** Round icon badge used on the error screens (.ic 64px round). */
export function BigIcon({ name, danger }: { name: IconName; danger?: boolean }) {
  const { c, dark } = useTheme();
  return (
    <View style={{ width: 64, height: 64, borderRadius: 32, alignSelf: 'center', marginTop: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: danger ? (dark ? '#3a1f1c' : '#fbe9e7') : c.mint }}>
      <Icon name={name} size={30} color={danger ? c.red : c.accent} />
    </View>
  );
}

/** Radio dot (design: .cb with border-radius 50%). */
export function Radio({ on }: { on?: boolean }) {
  const { c } = useTheme();
  return (
    <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: on ? c.green : c.line, backgroundColor: on ? c.green : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      {on && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
    </View>
  );
}

