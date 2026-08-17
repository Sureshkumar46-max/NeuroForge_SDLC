import React from 'react';

/**
 * Badge — category / priority / status pills used across the app.
 * `tone` maps to a CSS class: frontend | backend | database | devops |
 *                              low | medium | high | critical |
 *                              pending | accepted | overridden | suggested
 */
export default function Badge({ tone = 'default', children, className = '' }) {
  const isStatus = ['pending', 'accepted', 'overridden', 'suggested'].includes(tone);
  const base = isStatus ? 'status-badge' : 'badge';
  return <span className={`${base} ${base}-${tone} ${className}`}>{children}</span>;
}
