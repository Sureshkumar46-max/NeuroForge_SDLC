import React from 'react';

/**
 * ConfidenceScore — small reusable confidence bar + percentage.
 * `size`: 'sm' (used inline in suggestion rows / table) | 'block' (used in the confidence tiles)
 */
export default function ConfidenceScore({ value, size = 'sm' }) {
  if (size === 'block') {
    return (
      <span className="conf-bar" style={{ display: 'block', width: '100%' }}>
        <span style={{ width: `${value}%` }} />
      </span>
    );
  }
  return (
    <span className="conf-wrap">
      <span className="conf-bar"><span style={{ width: `${value}%` }} /></span>
      <span className="conf-pct">{value}%</span>
    </span>
  );
}
