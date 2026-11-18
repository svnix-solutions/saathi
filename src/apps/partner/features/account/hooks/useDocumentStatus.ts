import { useState } from 'react';
import { useTimeout } from '@/native/ui';
import { initialDocStatus, type DocStatus, type PartnerDocId } from '../data';

/**
 * Status of each document on "My documents". `upload()` puts the profile photo into checking; it is approved
 * 2.2 s later and `onApproved` runs.
 */
export function useDocumentStatus(onApproved: () => void) {
  const [status, setStatus] = useState<Record<PartnerDocId, DocStatus>>(initialDocStatus);
  const checking = status.photo === 'checking';
  useTimeout(() => { setStatus((s) => ({ ...s, photo: 'valid' })); onApproved(); }, 2200, checking, status.photo);
  const upload = () => setStatus((s) => ({ ...s, photo: 'checking' }));
  return { status, upload };
}
