// src/components/ui/card.tsx
import React from 'react';
import clsx from 'clsx';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: DivProps) {
  return (
    <div className={clsx("rounded border p-4 shadow bg-white", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: DivProps) {
  return (
    <div className={clsx("mb-2 font-bold", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: DivProps) {
  return (
    <h2 className={clsx("text-lg", className)} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className, ...props }: DivProps) {
  return (
    <div className={clsx("text-sm", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: DivProps) {
  return (
    <div className={clsx("pt-4 border-t mt-4", className)} {...props}>
      {children}
    </div>
  );
}
