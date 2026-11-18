import React from 'react';

/** Renders `**bold**` spans of a campaign message in bold. */
export const BoldText = ({ text }: { text: string }) => (
  <>{text.split('**').map((p, i) => (i % 2 ? <b key={i}>{p}</b> : <React.Fragment key={i}>{p}</React.Fragment>))}</>
);
