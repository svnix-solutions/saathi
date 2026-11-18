import React from 'react';
import '../styles/admin.css';
import { Sprite } from './Icon/Sprite';

/**
 * Storybook decorator for admin components: renders the story inside `.sa` (so the scoped stylesheet applies)
 * with the icon sprite, on the admin page background.
 */
export const withAdmin = (Story: React.ComponentType) => (
  <div className="sa" style={{ padding: 16, background: 'var(--bg)', minWidth: 360 }}>
    <Sprite />
    <Story />
  </div>
);
