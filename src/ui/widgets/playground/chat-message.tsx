import * as React from 'react';
import { useRef, useState } from 'react';
import { BiRefresh, BiTrash } from 'react-icons/bi';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/button';

interface ChatMessageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  variant: 'system' | 'user' | 'assistant';
  content?: string;
  onContentChange?: (content: string) => void;
}

export default function ChatMessage({
  className,
  variant = 'system',
  content = '',
  onContentChange,
}: ChatMessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const inputClassName = cn(
    'w-full text-sm md:text-base placeholder:text-muted-foreground border-none focus-visible:outline-none resize-none disabled:cursor-not-allowed disabled:opacity-50',
    className,
    variant === 'system' && 'text-sm',
  );

  const divClassName = cn(
    'flex flex-col relative min-h-[64px] rounded-md bg-white ring-offset-background focus-visible:outline-none mb-4',
    variant === 'system' && 'border border-input',
    className,
  );

  const adjustHeights = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 64);
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > 40 ? 'auto' : 'hidden';
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (onContentChange) {
      onContentChange(e.target.value);
    }
    adjustHeights();
  };

  const onMessageClick = () => {
    if (variant !== 'system') {
      setIsEditing(true);
    }
  };

  const onMessageBlur = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={divClassName}
      ref={divRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-10 w-full flex-row items-center justify-between bg-white px-3 py-2">
        <p className="text-sm font-medium text-zinc-700 md:text-base">
          {variant.toUpperCase()}
        </p>
        <div className="flex min-w-[60px] flex-row items-center justify-end gap-1">
          {isHovered && variant === 'user' && (
            <Button plain className="h-auto p-0" size="sm">
              <BiTrash className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
            </Button>
          )}
          {isHovered && variant === 'assistant' && (
            <>
              <Button plain className="h-auto p-0" size="sm">
                <BiRefresh className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
              </Button>
              <Button plain className="h-auto p-0" size="sm">
                <BiTrash className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {variant === 'system' || isEditing ? (
        <div
          className={cn(
            variant !== 'system' &&
              'rounded-md border border-input pt-2 ring-offset-background',
            'px-3 pb-2',
          )}
        >
          <textarea
            id="message"
            className={inputClassName}
            ref={textareaRef}
            value={message}
            rows={variant === 'system' ? 1 : 2}
            placeholder={
              variant === 'system' ? 'Enter System Instructions' : ''
            }
            onChange={handleInput}
            onBlur={onMessageBlur}
            autoFocus={isEditing}
            aria-multiline="true"
          />
        </div>
      ) : (
        <div className="flex flex-col px-3 pb-2">
          <p
            className="cursor-pointer sm:text-sm md:text-base"
            onClick={onMessageClick}
          >
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
