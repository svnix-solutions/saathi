import React from 'react';
import { BackHeader, H, Screen, StatusIcon, T, type IconName } from '@/native/ui';

export type StatusScreenProps = {
  /** title in the "‹ Title" header row */
  title: string;
  onBack: () => void;
  /** icon in the big round badge */
  icon: IconName;
  /** `danger` draws the badge in pale red (payment failed) */
  tone?: 'neutral' | 'danger';
  /** centred headline under the badge */
  heading: string;
  /** centred muted line under the headline */
  message: string;
  /** cards, notes and buttons below the message */
  children?: React.ReactNode;
};

/** Shared shape of the empty and error screens (design page 07): back header, round icon, headline, message, actions. */
export function StatusScreen({ title, onBack, icon, tone = 'neutral', heading, message, children }: StatusScreenProps) {
  return (
    <Screen>
      <BackHeader title={title} onBack={onBack} />
      <StatusIcon name={icon} tone={tone} style={{ marginTop: 18 }} />
      <H center>{heading}</H>
      <T m center>{message}</T>
      {children}
    </Screen>
  );
}

export default StatusScreen;
