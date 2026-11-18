import React from 'react';

/** Bottom-centre message (`.toast`). Renders nothing when `msg` is empty. Shown by `useAdmin().toast()`. */
export const Toast = ({ msg }: { /** Text to show. */ msg?: string | null }) => (msg ? <div className="toast">{msg}</div> : null);
