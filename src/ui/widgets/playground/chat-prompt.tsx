'use client';
import { useRef, useState } from 'react';
import React from 'react';
import { BiPlay } from 'react-icons/bi';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/button';

import RadioButtons from '../../components/radio-buttons';

interface ChatPromptProps {
  handleSendPrompt: () => void;
  isRetrievalPrompt?: boolean;
}

export default function ChatPrompt({
  handleSendPrompt,
  isRetrievalPrompt = false,
}: ChatPromptProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false); //use to track if textarea is in focus
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  //styles for components
  const divClassName = cn(
    'flex flex-col w-full rounded-lg border-2 border-input bg-white ring-offset-background focus-visible:outline-none resize-none overflow-hidden p-4 min-h-28 max-h-52',
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
      divRef.current.style.height = `${
        textareaRef.current.scrollHeight + 80 //adding extra space for buttons
      }px`;
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
    handleSendPrompt();
    setMessage(''); // clear the message after sending
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
      ></textarea>
      {!isRetrievalPrompt && (
        <div className="mt-4 flex flex-row items-end justify-between">
          <RadioButtons option1="User" option2="Assistant" />

          <div className="flex flex-row gap-2">
            <Button color="secondary" size="sm">
              Add
            </Button>

            <Button size="sm" onClick={handleSend}>
              <div className="flex flex-row items-center gap-2">
                Run <BiPlay className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      )}
      {isRetrievalPrompt && (
        <div className="mt-4 flex flex-row items-end justify-end">
          <Button size="sm" onClick={handleSend}>
            <div className="flex flex-row items-center gap-2">
              Run <BiPlay className="h-4 w-4" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
