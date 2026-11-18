import { useState } from 'react';
import { useAdmin } from '../../../session';
import { initialOfferCodes, type OfferCode } from '../data';
import { isValidOfferCode } from '../offerText';

/** Offer codes: the list, the code being edited (a draft form), live switches, saving and creating codes. */
export function useOffers() {
  const { toast } = useAdmin();
  const [codes, setCodes] = useState(initialOfferCodes);
  const [sel, setSel] = useState('FIRST50');
  const cur = codes.find((c) => c.code === sel) ?? codes[0];
  const [form, setForm] = useState<OfferCode>(cur);

  const live = codes.filter((c) => c.live).length;
  const pick = (c: OfferCode) => { setSel(c.code); setForm(c); };
  const setLive = (code: string, v: boolean) => {
    setCodes((cs) => cs.map((c) => c.code === code ? { ...c, live: v } : c));
    if (code === form.code) setForm((f) => ({ ...f, live: v }));
    toast(`${code} switched ${v ? 'on' : 'off'}`);
  };
  const save = () => {
    if (!form.value) return toast('The offer needs a value');
    setCodes((cs) => cs.map((c) => c.code === form.code ? { ...form, until: form.until === 'No end date' ? 'No end' : form.until } : c)); toast(`${form.code} saved`);
  };
  /** Creates a live code from the "New offer code" form; false when it is not valid. */
  const create = (nw: OfferCode) => {
    const code = nw.code.trim().toUpperCase();
    if (!isValidOfferCode(code)) { toast('Use 4 to 12 letters or numbers'); return false; }
    if (codes.some((c) => c.code === code)) { toast(`${code} already exists`); return false; }
    if (!nw.value) { toast('The offer needs a value'); return false; }
    const c = { ...nw, code, first: nw.forWho === 'First visit only' };
    setCodes((cs) => [c, ...cs]); pick(c); toast(`${code} is live`); return true;
  };

  return { codes, cur, form, setForm, live, pick, setLive, save, create };
}
