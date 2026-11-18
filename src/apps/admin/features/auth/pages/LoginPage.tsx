/** 70 · Admin sign in: email + password → 6-digit code → dashboard. Demo: password "saathi", code 482193. */
import React, { useRef, useState } from 'react';
import { Check, Mark, TextLink } from '../../../ui';
import { useAdmin } from '../../../session';
import { CODE, PASSWORD, accountFor, zonesFor, type LoginError } from '../data';
import { useResendCountdown } from '../hooks/useResendCountdown';
import '../auth.css';

const EMPTY_CODE = ['', '', '', '', '', ''];

export function LoginPage() {
  const { go, setSession, toast } = useAdmin();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('admin@saathi.example');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);
  const [tries, setTries] = useState(3);
  const [err, setErr] = useState<LoginError>(null);
  const [code, setCode] = useState<string[]>(EMPTY_CODE);
  const resend = useResendCountdown(step === 2);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  const who = accountFor(email);

  const submit = () => {
    if (err === 'locked') return;
    const e = email.toLowerCase();
    if (pw !== PASSWORD) {
      const left = tries - 1;
      setTries(left);
      setErr(left <= 0 ? 'locked' : 'wrong');
      return;
    }
    if (e.startsWith('norole')) return setErr('norole');
    if (e.startsWith('off')) return setErr('off');
    setErr(null); setStep(2); resend.restart(); setCode(EMPTY_CODE);
    setTimeout(() => boxes.current[0]?.focus(), 30);
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '');
    if (d.length > 1) { // pasted
      const all = d.slice(0, 6).split('');
      setCode([0, 1, 2, 3, 4, 5].map((k) => all[k] ?? ''));
      boxes.current[Math.min(all.length, 5)]?.focus();
      return;
    }
    setCode((c) => c.map((x, k) => (k === i ? d : x)));
    if (err === 'code') setErr(null);
    if (d && i < 5) boxes.current[i + 1]?.focus();
  };

  const verify = () => {
    if (code.join('') !== CODE) { setErr('code'); return; }
    setErr(null); setStep(3);
    setSession({ roles: who.roles, zones: zonesFor(who), name: who.name, face: who.face });
    setTimeout(() => go('dashboard'), 1100);
  };

  const unlock = () => { setTries(3); setErr(null); setPw(''); toast('Unlocked (demo). An Owner does this from Team.'); };

  return (
    <div className="win auth-screen">
      <div className="auth-brand">
        <div className="logo auth-logo"><Mark size={38} />Saathi</div>
        <div className="auth-brand-title">Admin panel</div>
        <div className="auth-brand-sub">For the Saathi team only. Bookings, partners, payouts and support.</div>
        <div className="ch c6 auth-hero" />
        <div className="s auth-brand-note">Every sign-in and every change is recorded.</div>
      </div>

      <div className="auth-steps">
        {/* Step 1 */}
        <form className="card auth-card" style={{ opacity: step === 1 ? 1 : 0.55 }}
          onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="s auth-step">Step 1</div>
          <div className="h auth-title">Sign in</div>
          <div className="h2">Work email</div>
          <input className="inp auth-input" value={email} disabled={step !== 1} onChange={(e) => { setEmail(e.target.value); if (err !== 'locked') setErr(null); }} />
          <div className="h2">Password</div>
          <div className="inp row auth-pw">
            <input type={show ? 'text' : 'password'} value={pw} disabled={step !== 1} placeholder="saathi" autoFocus
              style={{ letterSpacing: show ? 0 : '.2em' }}
              onChange={(e) => { setPw(e.target.value); if (err === 'wrong') setErr(null); }} />
            <TextLink onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</TextLink>
          </div>
          <div className="row s"><span className="lft"><Check on={keep} onChange={setKeep} />Keep me signed in for 8 hours</span></div>
          {err === 'wrong' && <div className="card s auth-msg auth-msg-error"><b>Email or password is not right.</b> {tries} {tries === 1 ? 'try' : 'tries'} left.</div>}
          {err === 'locked' && <div className="card s auth-msg auth-msg-error"><b>Too many tries.</b> This account is locked for 15 minutes. An Owner can unlock it. <span className="clk auth-unlock" role="button" onClick={unlock}>Unlock (demo)</span></div>}
          {err === 'norole' && <div className="card s auth-msg auth-msg-warn"><b>No role yet.</b> Your account exists but has no role. Ask an Owner to give you one.</div>}
          {err === 'off' && <div className="card s auth-msg"><b>Access removed.</b> This account is switched off. Speak to your manager.</div>}
          <button type="submit" className="btn auth-submit" style={{ opacity: err === 'locked' ? 0.5 : 1 }} disabled={step !== 1}>Continue</button>
          <div className="s clk auth-link" role="button" onClick={() => toast('Reset link sent to your work email')}>Forgot password</div>
          <div className="s m auth-center">No account? An Owner invites you from Team.</div>
        </form>

        {/* Step 2 */}
        <form className="card auth-card" style={{ opacity: step === 1 ? 0.55 : 1 }}
          onSubmit={(e) => { e.preventDefault(); if (step === 2) verify(); }}>
          <div className="s auth-step">Step 2</div>
          <div className="h auth-title">Enter your code</div>
          <div className="m">We sent a 6-digit code to your phone ending 0034. It works for 5 minutes.</div>
          <div className="auth-otp">
            {code.map((d, i) => (
              <input key={i} ref={(el) => { boxes.current[i] = el; }} aria-label={`Digit ${i + 1}`}
                className={`inp otp auth-otp-box ${step === 2 && !d && code.findIndex((x) => !x) === i ? 'sel' : ''}`}
                inputMode="numeric" maxLength={6} value={d} disabled={step !== 2}
                style={err === 'code' ? { borderColor: 'var(--red)' } : undefined}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Backspace' && !d && i > 0) boxes.current[i - 1]?.focus(); }} />
            ))}
          </div>
          {err === 'code'
            ? <div className="card s auth-msg auth-msg-error"><b>That code is not right.</b> Check the latest SMS and try again.</div>
            : null}
          <div className="s m">{step === 1 ? 'Send again in 0:24' : resend.secs > 0
            ? `Send again in 0:${String(resend.secs).padStart(2, '0')}`
            : <TextLink onClick={() => { resend.restart(); toast('New code sent (demo code 482193)'); }}>Send again</TextLink>}</div>
          <button type="submit" className="btn auth-submit" disabled={step !== 2}>Sign in</button>
          {step === 3
            ? <div className="card sel s auth-msg"><b>Signed in as {who.name}.</b> {who.label}</div>
            : <div className="card s m auth-msg auth-msg-demo">Demo: any email, password <b>saathi</b>, code <b>482193</b>. Emails starting <b>opslead</b>, <b>support</b>, <b>norole</b> or <b>off</b> show other roles and errors.</div>}
          <div className="s m">The code step is asked on every new device and once a day.</div>
        </form>

        {/* Error states (reference) */}
        <div className="card auth-card">
          <div className="s auth-step-alert">When something is wrong</div>
          <div className="card s auth-msg auth-msg-error"><b>Email or password is not right.</b> 3 tries left.</div>
          <div className="card s auth-msg auth-msg-error"><b>Too many tries.</b> This account is locked for 15 minutes. An Owner can unlock it.</div>
          <div className="card s auth-msg auth-msg-warn"><b>No role yet.</b> Your account exists but has no role. Ask an Owner to give you one.</div>
          <div className="card s auth-msg"><b>Access removed.</b> This account is switched off. Speak to your manager.</div>
          <div className="card s auth-msg"><b>Signed out.</b> You were signed out after 8 hours. Sign in again to carry on.</div>
          <div className="s m end">The message never says whether the email exists.</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
