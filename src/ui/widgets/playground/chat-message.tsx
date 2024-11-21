import * as React from 'react';

import { cn } from '@/lib/utils';

interface ChatMessageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  variant: 'system' | 'user' | 'assistant';
}

export default function ChatMessage({
  className,
  type,
  variant,
  ...props
}: ChatMessageProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const inputClassName = cn(
    'flex h-10 rounded-md bg-white px-3 pt-2 pb-6 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pt-12',
    variant === 'system' && 'border border-input',
    className,
  );

  return (
    <div className="relative">
      <p className="absolute left-0 top-0 px-3 py-2 text-base font-medium text-zinc-700">
        {(variant === 'system' && 'SYSTEM') ||
          (variant === 'user' && 'USER') ||
          'ASSISTANT'}
      </p>

      <input
        type={type}
        className={inputClassName}
        ref={inputRef}
        {...props}
        placeholder={variant === 'system' ? 'Enter System Instructions' : ''}
      />
    </div>
  );
}
