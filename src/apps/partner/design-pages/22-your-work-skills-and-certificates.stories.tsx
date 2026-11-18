import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React from 'react';
import { PhoneRow } from '@/native/ui';
import { PartnerApp } from '../App';

const meta: Meta = { title: 'Partner app/Design pages/V1 · Launch/22 Your work, skills and certificates', tags: ['v1', 'design-page'], parameters: { layout: 'centered' } };
export default meta;
type S = StoryObj;

const nurse = { approved: false, profession: 'nurse' as const, specs: ['elderly', 'post_surgery'] };
const barber = { approved: false, profession: 'barber' as const, specs: ['men', 'kids'] };

export const DesignPage: S = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <PhoneRow>
      <PartnerApp initial="signin.work" state={{ approved: false }} caption="9 · Your work" sub="Step 2 of 6. One profession at a time; the list comes from the database" />
      <PartnerApp initial="signin.specializations" state={nurse} caption="10 · Specialisations" sub="Step 2 of 6. Several allowed, all from the chosen work" />
      <PartnerApp initial="signin.skills" state={nurse} caption="11 · Skills" sub="Step 2 of 6. Many allowed" />
      <PartnerApp initial="signin.documents" state={nurse} caption="12 · Documents list" sub="Step 6 of 6. Built from the work and specialisations picked" />
      <PartnerApp initial="signin.docUpload" params={{ doc: 'nursing_registration', sample: true }} state={nurse} caption="13 · Certificate upload" sub="Number and expiry asked only where the document type needs them" />
      <PartnerApp initial="signin.documents" state={barber} caption="14 · Another example" sub="A specialisation (Kids) adds its own document" />
    </PhoneRow>
  ),
};

export const SigninWork: S = { name: 'Your work', render: () => <PartnerApp initial="signin.work" state={{ approved: false }} /> };
export const SigninSpecializations: S = { name: 'Specialisations', render: () => <PartnerApp initial="signin.specializations" state={nurse} /> };
export const SigninSkills: S = { name: 'Skills', render: () => <PartnerApp initial="signin.skills" state={nurse} /> };
export const SigninDocuments: S = { name: 'Documents list', render: () => <PartnerApp initial="signin.documents" state={nurse} /> };
export const SigninDocUpload: S = { name: 'Certificate upload', render: () => <PartnerApp initial="signin.docUpload" params={{ doc: 'nursing_registration' }} state={nurse} /> };
export const BarberDocuments: S = { name: 'Another example · Barber', render: () => <PartnerApp initial="signin.documents" state={barber} /> };
