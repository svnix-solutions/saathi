/** Non-UI helpers for the wallet feature. */

/** Copies text to the clipboard when the browser allows it (silently does nothing otherwise). */
export function copyText(text: string) {
  try {
    (globalThis as { navigator?: { clipboard?: { writeText?: (s: string) => unknown } } }).navigator?.clipboard?.writeText?.(text);
  } catch { /* prototype */ }
}

/** A phone number is usable once it has 10 digits. */
export const hasTenDigits = (phone: string) => phone.replace(/\D/g, '').length >= 10;
