/** 70 · Admin sign in: email + password → 6-digit code → dashboard. Demo: password "saathi", code 482193. */
import React, { useEffect, useRef, useState } from 'react';
import { Check, Mark, useAdmin, type Role } from '../shell';

const PASSWORD = 'saathi';
const CODE = '482193';

type Err = null | 'wrong' | 'locked' | 'norole' | 'off' | 'code';

const errBox: React.CSSProperties = { padding: '9px 11px', borderColor: 'var(--red)', color: 'var(--red)' };

export function LoginPage() {
  const { go, setSession, toast } = useAdmin();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('admin@saathi.example');
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);
  const [tries, setTries] = useState(3);
  const [err, setErr] = useState<Err>(null);
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [secs, setSecs] = useState(24);
  const boxes = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== 2 || secs <= 0) return;
    const t = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [step, secs]);

  const who = (() => {
    const e = email.toLowerCase();
    if (e.startsWith('opslead')) return { name: 'Ops lead', face: 'ol', roles: ['Operations'] as Role[], label: 'Roles: Operations, Quality · all zones. You will see 8 of 13 menus.' };
    if (e.startsWith('support')) return { name: 'Anu', face: 'au', roles: ['Support'] as Role[], label: 'Role: Support · Block C, Sector 21. You will see 5 of 13 menus.' };
    return { name: 'Admin', face: 'ad', roles: ['Owner'] as Role[], label: 'Role: Owner · all zones. You will see all 13 menus.' };
  })();

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
    setErr(null); setStep(2); setSecs(24); setCode(['', '', '', '', '', '']);
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
    setSession({ roles: who.roles, zones: who.roles[0] === 'Support' ? ['Block C', 'Sector 21'] : ['All zones'], name: who.name, face: who.face });
    setTimeout(() => go('dashboard'), 1100);
  };

  const unlock = () => { setTries(3); setErr(null); setPw(''); toast('Unlocked (demo). An Owner does this from Team.'); };

  return (
    <div className="win" style={{ margin: 0, height: '100vh', minHeight: 640, borderRadius: 0, border: 0, boxShadow: 'none', background: 'var(--bg)' }}>
      <div style={{ width: 330, background: 'var(--green-d)', color: '#fff', padding: '34px 30px', display: 'flex', flexDirection: 'column', flex: 'none' }}>
        <div className="logo" style={{ fontSize: 24, color: '#fff' }}><Mark size={38} />Saathi</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.15, marginTop: 34 }}>Admin panel</div>
        <div style={{ color: '#cfe5dd', marginTop: 8, fontSize: 14 }}>For the Saathi team only. Bookings, partners, payouts and support.</div>
        <div className="ch c6" style={{ width: 200, height: 230, backgroundColor: 'transparent', backgroundSize: '200%', backgroundPosition: '50% 12%', margin: 'auto auto 0', animation: 'none' }} />
        <div className="s" style={{ color: '#8fbfb1' }}>Every sign-in and every change is recorded.</div>
      </div>

      <div style={{ flex: 1, padding: 30, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignContent: 'center' }}>
        {/* Step 1 */}
        <form className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, opacity: step === 1 ? 1 : 0.55 }}
          onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="s" style={{ fontWeight: 700, color: 'var(--green)' }}>Step 1</div>
          <div className="h" style={{ fontSize: 22 }}>Sign in</div>
          <div className="h2">Work email</div>
          <input className="inp" style={{ fontSize: 14 }} value={email} disabled={step !== 1} onChange={(e) => { setEmail(e.target.value); if (err !== 'locked') setErr(null); }} />
          <div className="h2">Password</div>
          <div className="inp row" style={{ fontSize: 14, padding: '0 12px' }}>
            <input type={show ? 'text' : 'password'} value={pw} disabled={step !== 1} placeholder="saathi" autoFocus
              style={{ border: 0, outline: 'none', font: 'inherit', fontSize: 14, padding: '12px 0', flex: 1, minWidth: 0, background: 'transparent', letterSpacing: show ? 0 : '.2em' }}
              onChange={(e) => { setPw(e.target.value); if (err === 'wrong') setErr(null); }} />
            <span className="s clk" style={{ color: 'var(--green)', fontWeight: 700 }} onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</span>
          </div>
          <div className="row s"><span className="lft"><Check on={keep} onChange={setKeep} />Keep me signed in for 8 hours</span></div>
          {err === 'wrong' && <div className="card s" style={errBox}><b>Email or password is not right.</b> {tries} {tries === 1 ? 'try' : 'tries'} left.</div>}
          {err === 'locked' && <div className="card s" style={errBox}><b>Too many tries.</b> This account is locked for 15 minutes. An Owner can unlock it. <span className="clk" style={{ textDecoration: 'underline' }} onClick={unlock}>Unlock (demo)</span></div>}
          {err === 'norole' && <div className="card s" style={{ padding: '9px 11px', background: 'var(--yellow)', border: 0 }}><b>No role yet.</b> Your account exists but has no role. Ask an Owner to give you one.</div>}
          {err === 'off' && <div className="card s" style={{ padding: '9px 11px' }}><b>Access removed.</b> This account is switched off. Speak to your manager.</div>}
          <button type="submit" className="btn" style={{ marginTop: 6, opacity: err === 'locked' ? 0.5 : 1 }} disabled={step !== 1}>Continue</button>
          <div className="s clk" style={{ textAlign: 'center', color: 'var(--green)', fontWeight: 700 }} onClick={() => toast('Reset link sent to your work email')}>Forgot password</div>
          <div className="s m" style={{ textAlign: 'center' }}>No account? An Owner invites you from Team.</div>
        </form>

        {/* Step 2 */}
        <form className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, opacity: step === 1 ? 0.55 : 1 }}
          onSubmit={(e) => { e.preventDefault(); if (step === 2) verify(); }}>
          <div className="s" style={{ fontWeight: 700, color: 'var(--green)' }}>Step 2</div>
          <div className="h" style={{ fontSize: 22 }}>Enter your code</div>
          <div className="m">We sent a 6-digit code to your phone ending 0034. It works for 5 minutes.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 7 }}>
            {code.map((d, i) => (
              <input key={i} ref={(el) => { boxes.current[i] = el; }} className={`inp otp ${step === 2 && !d && code.findIndex((x) => !x) === i ? 'sel' : ''}`}
                inputMode="numeric" maxLength={6} value={d} disabled={step !== 2}
                style={{ minHeight: 44, fontSize: 18, padding: '8px 0', fontWeight: 600, ...(err === 'code' ? { borderColor: 'var(--red)' } : {}) }}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Backspace' && !d && i > 0) boxes.current[i - 1]?.focus(); }} />
            ))}
          </div>
          {err === 'code'
            ? <div className="card s" style={errBox}><b>That code is not right.</b> Check the latest SMS and try again.</div>
            : null}
          <div className="s m">{step === 1 ? 'Send again in 0:24' : secs > 0
            ? `Send again in 0:${String(secs).padStart(2, '0')}`
            : <span className="clk" style={{ color: 'var(--green)', fontWeight: 700 }} onClick={() => { setSecs(24); toast('New code sent (demo code 482193)'); }}>Send again</span>}</div>
          <button type="submit" className="btn" style={{ marginTop: 6 }} disabled={step !== 2}>Sign in</button>
          {step === 3
            ? <div className="card sel s" style={{ padding: '9px 11px' }}><b>Signed in as {who.name}.</b> {who.label}</div>
            : <div className="card s m" style={{ padding: '9px 11px', borderStyle: 'dashed' }}>Demo: any email, password <b>saathi</b>, code <b>482193</b>. Emails starting <b>opslead</b>, <b>support</b>, <b>norole</b> or <b>off</b> show other roles and errors.</div>}
          <div className="s m">The code step is asked on every new device and once a day.</div>
        </form>

        {/* Error states (reference) */}
        <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="s" style={{ fontWeight: 700, color: 'var(--red)' }}>When something is wrong</div>
          <div className="card s" style={errBox}><b>Email or password is not right.</b> 3 tries left.</div>
          <div className="card s" style={errBox}><b>Too many tries.</b> This account is locked for 15 minutes. An Owner can unlock it.</div>
          <div className="card s" style={{ padding: '9px 11px', background: 'var(--yellow)', border: 0 }}><b>No role yet.</b> Your account exists but has no role. Ask an Owner to give you one.</div>
          <div className="card s" style={{ padding: '9px 11px' }}><b>Access removed.</b> This account is switched off. Speak to your manager.</div>
          <div className="card s" style={{ padding: '9px 11px' }}><b>Signed out.</b> You were signed out after 8 hours. Sign in again to carry on.</div>
          <div className="s m" style={{ marginTop: 'auto' }}>The message never says whether the email exists.</div>
        </div>
      </div>
    </div>
  );
}
