/** Validation rules for the account screens (no UI). */

/** A UPI ID looks like "name@bank". */
export const isUpiId = (id: string) => /^\S+@\S+$/.test(id);

/** A name needs at least two letters once trimmed. */
export const isValidName = (name: string) => name.trim().length >= 2;

/** Toggles `i` in a list of ticked indices. */
export const toggleIndex = (list: number[], i: number) => (list.includes(i) ? list.filter((y) => y !== i) : [...list, i]);
