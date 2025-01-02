import * as React from 'react';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface ChatMessageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  variant: 'system' | 'user' | 'assistant';
}

export default function ChatMessage({
  className,
  variant = 'assistant'
}: ChatMessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const inputClassName = cn(
    'w-full text-sm placeholder:text-muted-foreground border-none focus-visible:outline-none resize-none overflow-hidden disabled:cursor-not-allowed disabled:opacity-50 h-10 pt-6 pb-6',
    className,
  );
  const divClassName = cn('relative resize-none overflow-hidden min-h-10 max-h-40 rounded-md bg-white bg-white ring-offset-background focus-visible:outline-none px-3 pt-2 pb-4', 
    variant === 'system' && 'border border-input', className);

  const [message, setMessage] = useState('');
  const adjustHeights = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (divRef.current && textareaRef.current) {
      divRef.current.style.height = 'auto';
      divRef.current.style.overflow = 'auto';
      divRef.current.style.height = `${
        textareaRef.current.scrollHeight + 12 //adding extra space for buttons
      }px`;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeights();
  };
  
  return (
    <div className={divClassName} ref={divRef}>
      <p className="absolute left-0 top-0 px-3 py-2 text-base font-medium text-zinc-700">
        {(variant === 'system' && 'SYSTEM') ||
          (variant === 'user' && 'USER') ||
          'ASSISTANT'}
      </p>

      <textarea
        id="message"
        className={inputClassName}
        ref={textareaRef}
        value={message}
        rows={1}
        placeholder={variant === 'system' ? 'Enter System Instructions' : ''}
        onChange={handleInput}
        aria-multiline="true"
      />
    </div>
  );
}
