'use client';
import { useRef, useState } from 'react';
import React from 'react';
import { BiPlay } from 'react-icons/bi';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/button';
import { Spinner } from '@/ui/components/spinner';

import RadioButtons from '../../components/radio-buttons';

interface ChatPromptProps {
  handleSendPrompt: (message: string) => void;
  handleAddMessage: (message: string, role: 'user' | 'assistant') => void;
  className?: string;
  isStreaming: boolean;
}

export default function ChatPrompt({
  handleSendPrompt,
  handleAddMessage,
  className,
  isStreaming = false,
}: ChatPromptProps) {
  const [message, setMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'assistant'>(
    'user',
  );
  const [isFocused, setIsFocused] = useState(false); //use to track if textarea is in focus
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  //styles for components
  const divClassName = cn(
    className,
    'flex flex-col w-full rounded-lg border-2 border-input bg-white ring-offset-background focus-visible:outline-none resize-none overflow-hidden p-4 min-h-28 max-h-40',
    isFocused
      ? 'ring-2 ring-primary ring-opacity-50'
      : 'focus-visible:ring-2 focus-visible:ring-ring',
  );

  const inputClassName = cn(
    'w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-base border-none focus-visible:outline-none resize-none overflow-hidden min-h-6',
  );

  //dynamically changing the height of div and textarea when text is too big
  const adjustHeights = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.overflow = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (divRef.current && textareaRef.current) {
      divRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight + 80; //adding extra space for buttons
      divRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustHeights();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSend = () => {
    // Don't send message when streaming
    if (isStreaming) {
      return;
    }

    // Return if message is empty
    if (message.trim() === '') {
      toast.error('Please enter a message');
      return;
    }

    handleSendPrompt(message.trim());
    setMessage(''); // clear the message after sending
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check for both Ctrl and Cmd (Meta key)
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAdd = () => {
    if (message.trim() === '') {
      toast.error('Please enter a message');
      return;
    }

    handleAddMessage(message.trim(), selectedRole);
    setMessage(''); // clear the message after adding
  };

  return (
    <div className={divClassName} ref={divRef}>
      <textarea
        id="message"
        name="message"
        rows={1}
        ref={textareaRef}
        className={inputClassName}
        placeholder="Enter user message..."
        value={message}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-multiline="true"
        onKeyDown={handleKeyDown}
      ></textarea>
      <div className="mt-4 flex flex-row items-end justify-between">
        <RadioButtons
          option1="User"
          option2="Assistant"
          onChange={(selected: string) =>
            setSelectedRole(selected === 'User' ? 'user' : 'assistant')
          }
        />

        <div className="flex flex-row gap-2">
          <Button
            className="w-20"
            color="secondary"
            size="sm"
            onClick={handleAdd}
          >
            Add
          </Button>

          <Button
            className="w-20"
            size="sm"
            onClick={handleSend}
            disabled={isStreaming}
          >
            {isStreaming ? (
              <Spinner />
            ) : (
              <div className="flex flex-row items-center gap-2 text-center">
                Run <BiPlay className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
