import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { View } from 'react-native';
import { H, T } from '@/native/ui';
import { palette } from '@/tokens';
import { decisions as d, rupees as r } from '@/data/decisions';

const meta: Meta = { title: 'Saathi/Decisions', parameters: { layout: 'fullscreen', backgrounds: { value: 'page' } } };
export default meta;

const pct = (n: number) => `${Math.round(n * 100)}%`;
const tables: [string, string, [string, string][]][] = [
  ['Prices', 'Item', [
    ['General cleaning, dishes', `${r(d.prices.general)} per 30 min`], ['Kitchen & bathroom scrub', `${r(d.prices.kitchenBath)} per 30 min`],
    ['Laundry · Custom help', `${r(d.prices.laundry)} · ${r(d.prices.custom)} per 30 min`], ['Arrival fee', r(d.prices.arrivalFee)],
    ['Monthly plan saving', pct(d.prices.monthlyPlanSaving)], ['Busy-hour price rise', `+${pct(d.prices.busyHourRise[0])} to +${pct(d.prices.busyHourRise[1])}`],
    ['Plus membership', `${r(d.prices.plusMonthly)} a month · ${r(d.prices.plusYearly)} a year`]]],
  ['Customer rules', 'Item', [
    ['Free cancellation', `until ${d.customer.freeCancelUntilHrs} hr before the visit`], ['Late cancellation fee', r(d.customer.lateCancelFee)],
    ['Cancel after arrival', r(d.customer.cancelAfterArrival)], ['Refund for a bad visit', 'Half the visit'],
    ['Referral reward', `${r(d.customer.referralReward)} each side`], ['Points', `${d.customer.pointsPerVisit} a visit · ${d.customer.pointsRedeem.points} = ${r(d.customer.pointsRedeem.rupees)} off`],
    ['Payment held on failure', `${d.customer.paymentHoldMinutes} minutes`]]],
  ['Partner pay', 'Item', [
    ['Share of the visit price', `About ${pct(d.partner.share)} (₹126 of ₹158)`], ['Payout day', `Every ${d.partner.payoutDay}`],
    ['Instant payout fee', r(d.partner.instantPayoutFee)], ['Weekly target bonus', `${r(d.partner.weeklyBonus.rupees)} for ${d.partner.weeklyBonus.jobs} jobs`],
    ['Busy-hour extra', `${r(d.partner.busyHourExtra)} per job`], ['Paid when customer cancels', r(d.partner.paidOnCustomerCancel)],
    ['Bringing a new partner', `${r(d.partner.referralBonus.rupees)} after their ${d.partner.referralBonus.afterJobs}th job`]]],
  ['Quality bars for partners', 'Item', [
    ['Minimum rating', String(d.quality.minRating)], ['Arrived on time', `${pct(d.quality.onTime)} or above`], ['Jobs finished', `${pct(d.quality.finished)} or above`],
    ['Top-rated badge', `${d.quality.topRated.rating} for ${d.quality.topRated.days} days`], ['Check-in distance allowed', `${d.quality.checkInDistanceM} m from the door`],
    ['When a score drops', d.quality.escalation.join(', then ')]]],
  ['Operations', 'Item', [
    ['Arrival promise', `${d.ops.arrivalPromiseMin} minutes`], ['Search distance', `${d.ops.searchKm[0]} km, then ${d.ops.searchKm[1]} km`],
    ['Hand to the team after', `${d.ops.handToTeamAfterMin} minutes with no partner`], ['Service hours', d.ops.serviceHours],
    ['No messages between', d.ops.quietHours], ['Offers per person', `At most ${d.ops.maxOffersPerWeek} a week`]]],
  ['Needs a licensed outside partner', 'Feature', [
    ['Customer wallet', 'Bank or licensed wallet issuer'], ['Partner pay advance', 'Licensed lender'], ['Partner savings pot', 'Bank'],
    ['Accident and health cover', 'Insurer'], ['Damage protection', 'Insurer, or a set-aside fund'], ['UPI AutoPay', 'Payment gateway']]],
];

export const Decisions: StoryObj = {
  render: () => (
    <View style={{ padding: 48, gap: 28, maxWidth: 1344 }}>
      <View>
        <H size={34}>Working values for launch</H>
        <T m size={15} style={{ maxWidth: 900 }}>Every screen in this prototype reads these from src/data/decisions.ts. They began as samples and are the launch defaults until the founders change them.</T>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {tables.map(([title, col, rows]) => (
          <View key={title} style={{ width: 400, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: palette.line, padding: 18, gap: 8 }}>
            <T b size={15}>{title}</T>
            <View style={{ flexDirection: 'row', backgroundColor: '#f1f7f4', borderRadius: 9, paddingVertical: 6, paddingHorizontal: 10 }}>
              <T s m b style={{ flex: 1 }}>{col.toUpperCase()}</T><T s m b style={{ flex: 1 }}>WORKING VALUE</T>
            </View>
            {rows.map(([a, b]) => (
              <View key={a} style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: palette.line }}>
                <T style={{ flex: 1 }}>{a}</T><T b style={{ flex: 1 }}>{b}</T>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  ),
};
