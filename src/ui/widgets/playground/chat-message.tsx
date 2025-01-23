import CodeBlockLowLight from '@tiptap/extension-code-block-lowlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import go from 'highlight.js/lib/languages/go';
import js from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ts from 'highlight.js/lib/languages/typescript';
import { common, createLowlight } from 'lowlight';
import * as React from 'react';
import { useRef, useState } from 'react';
import { BiRefresh, BiTrash } from 'react-icons/bi';
import { Markdown } from 'tiptap-markdown';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/button';

interface ChatMessageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  variant: 'system' | 'user' | 'assistant';
  content?: string;
  handleRegenerate: () => void;
  setContent: (content: string) => void;
  onDelete?: () => void;
}

const lowlight = createLowlight(common);
//current coding languages supported by editor
lowlight.register('python', python);
lowlight.register('go', go);
lowlight.register('js', js);
lowlight.register('ts', ts);

export default function ChatMessageBox({
  className,
  variant = 'system',
  content = '',
  handleRegenerate,
  setContent,
  onDelete,
}: ChatMessageProps) {
  const textareaRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  //const [message, setMessage] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditor({
    content: content,
    extensions: [
      Underline,
      Link.configure({
        HTMLAttributes: {
          class:
            'transition-[color] text-primary hover:underline cursor-pointer',
        },
      }),
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class:
              'bg-zinc-950/5 text-primary p-2 rounded-lg font-mono text-sm',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'pl-5 list-disc text-gray-800',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'pl-5 list-decimal text-black dark:text-white',
          },
        },
        heading: {
          levels: [1, 2, 3],
        },
        bold: {
          HTMLAttributes: {
            class: 'font-semibold',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'text-black dark:text-white',
          },
        },
      }),
      Markdown.configure({
        transformPastedText: true,
      }),
      Placeholder.configure({
        placeholder:
          (variant === 'system' && 'Enter System Instructions') || '',
        emptyEditorClass:
          'is-editor-empty before:content-[attr(data-placeholder)] before:text-gray-500 before:float-left before:pointer-events-none',
      }),
      CodeBlockLowLight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'tiptap',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'transition w-full text-sm border-none focus:ring-0 outline-none max-w-none prose prose-sm sm:prose lg:prose-lg mx-auto',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const divClassName = cn(
    'flex flex-col relative rounded-md bg-white ring-offset-background focus-visible:outline-none mb-2',
    variant === 'system' && 'border border-input',
    className,
  );

  const onMessageClick = () => {
    if (variant !== 'system') {
      setIsEditing(true);
    }
  };

  const onMessageBlur = () => {
    setIsEditing(false);
  };

  React.useEffect(() => {
    editor?.commands.setContent(content);
  }, [content]);

  return (
    <div
      className={divClassName}
      ref={divRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-10 w-full flex-row items-center justify-between bg-white px-3 pt-2">
        <p className="text-sm font-medium text-zinc-700 md:text-base">
          {variant.toUpperCase()}
        </p>
        <div className="flex min-w-[60px] flex-row items-center justify-end gap-1">
          {isHovered && variant === 'assistant' && (
            <Button plain className="h-auto p-0" size="sm" onClick={onDelete}>
              <BiTrash className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
            </Button>
          )}
          {isHovered && variant === 'user' && (
            <>
              <Button
                plain
                className="h-auto p-0"
                size="sm"
                onClick={handleRegenerate}
              >
                <BiRefresh className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
              </Button>
              <Button plain className="h-auto p-0" size="sm" onClick={onDelete}>
                <BiTrash className="h-4 w-4 fill-zinc-500 hover:fill-zinc-700 md:h-5 md:w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div>
        <EditorContent
          ref={textareaRef}
          editor={editor}
          className={cn(
            'w-full resize-none px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base',
            (variant === 'user' || variant === 'assistant') &&
            isEditing &&
            'rounded-md border border-input ring-offset-background',
          )}
          onBlur={onMessageBlur}
          autoFocus={isEditing}
          onClick={onMessageClick}
        />
      </div>
    </div>
  );
}
