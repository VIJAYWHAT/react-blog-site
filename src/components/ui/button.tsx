// src/components/ui/button.tsx
import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline';
};

export function Button({ variant = 'default', className, children, ...props }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded text-white font-semibold transition';

  const variantStyles = {
    default: 'bg-blue-600 hover:bg-blue-700',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-100',
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {children}
    </button>
  );
}
