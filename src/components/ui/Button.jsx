import React from 'react';

/**
 * Button — shared primitive. variant: 'default' | 'primary' | 'ai'
 * If the existing project already has a Button component, use that one instead
 * and drop this file — the className contract ("btn", "btn-primary", "btn-ai", "btn-sm")
 * matches the existing app's styling so either can be swapped in.
 */
export default function Button({ variant = 'default', size, icon, spinning, className = '', children, ...rest }) {
  const classes = [
    'btn',
    variant === 'primary' ? 'btn-primary' : '',
    variant === 'ai' ? 'btn-ai' : '',
    size === 'sm' ? 'btn-sm' : '',
    spinning ? 'spin' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...rest}>
      {icon}
      {children}
    </button>
  );
}
