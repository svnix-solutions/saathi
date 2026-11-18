import React from 'react';
import { I } from '../Icon/Icon';

export type ModalProps = {
  /** Rendered only while true. */
  open: boolean;
  /** Backdrop click and the close icon call this. */
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  /** Buttons, right-aligned under the content. */
  actions?: React.ReactNode;
};

/** Centred dialog over a dark backdrop (`.modal-bg` / `.modal`). */
export function Modal({ open, onClose, title, children, actions }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="row"><div className="h" style={{ fontSize: 18 }}>{title}</div><span className="clk m" onClick={onClose} aria-label="Close"><I n="close" /></span></div>
        {children}
        {actions && <div className="lft" style={{ justifyContent: 'flex-end', gap: 8 }}>{actions}</div>}
      </div>
    </div>
  );
}
