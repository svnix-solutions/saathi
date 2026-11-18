import { useState } from 'react';
import { useCountdown } from '@/native/ui';
import { OTP_FIRST_WAIT, OTP_RESEND_WAIT, OTP_TRIES, SMS_CODE } from '../data';

/**
 * State of the SMS code step: the typed code, tries left, the wrong-code flag and the resend countdown.
 * `check(v)` returns true when the code is right; `resend()` starts over with a fresh code.
 */
export function useOtp() {
  const [code, setCode] = useState('');
  const [tries, setTries] = useState(OTP_TRIES);
  const [wrong, setWrong] = useState(false);
  const [left, setLeft] = useCountdown(OTP_FIRST_WAIT);

  const canVerify = (v: string) => v.length >= 4 && tries > 0;

  const check = (v = code) => {
    if (!canVerify(v)) return false;
    if (v === SMS_CODE) { setWrong(false); return true; }
    setWrong(true);
    setTries((n) => Math.max(n - 1, 0));
    return false;
  };

  const type = (v: string) => { setCode(v); if (wrong) setWrong(false); };

  const resend = () => { setLeft(OTP_RESEND_WAIT); setTries(OTP_TRIES); setCode(''); setWrong(false); };

  return { code, tries, wrong, left, type, check, resend, ready: canVerify(code) };
}
