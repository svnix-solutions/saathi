import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { CustomerApp } from '../App';

const meta: Meta = { title: 'Customer app/Design pages/V2/17 Testimonials', tags: ['v2', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <CustomerApp initial="homeTestimonial" caption="52 · Testimonial on home" sub="One quote at a time, swipe for more" />
      <CustomerApp initial="testimonials" caption="53 · All testimonials" sub="Filter by area or service" />
      <CustomerApp initial="testimonialConsent" caption="54 · Permission to share" sub="The customer chooses name, photo and where" />
      <CustomerApp initial="myTestimonial" caption="55 · My testimonial" sub="Not public until an admin approves it" />
    </PhoneRow>
  ),
};

export const HomeTestimonial: S = { name: '52 · Testimonial on home', render: () => <CustomerApp initial="homeTestimonial" /> };
export const Testimonials: S = { name: '53 · All testimonials', render: () => <CustomerApp initial="testimonials" /> };
export const TestimonialConsent: S = { name: '54 · Permission to share', render: () => <CustomerApp initial="testimonialConsent" /> };
export const MyTestimonial: S = { name: '55 · My testimonial', render: () => <CustomerApp initial="myTestimonial" /> };
export const MyTestimonialTakenDown: S = { name: '55 · My testimonial (taken down)', render: () => <CustomerApp initial="myTestimonial" state={{ testimonial: { status: 'Taken down', showAs: 'A customer', app: true, web: false, photo: false, sent: 'Sent 2 days ago' } }} /> };
