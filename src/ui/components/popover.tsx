import * as Headless from '@headlessui/react';

import { cn } from '@/lib/utils';

interface PopoverProps {
  className?: string;
  children: React.ReactNode;
}
export function Popover({ className, children }: PopoverProps) {
  return (
    <Headless.Popover className={cn('relative', className)}>
      {children}
    </Headless.Popover>
  );
}

export function PopoverButton({ className, children }: PopoverProps) {
  return (
    <Headless.PopoverButton
      className={cn(
        'hover:bg-primary-hover w-full rounded-xl border border-transparent outline-none transition data-[active]:border-zinc-200 data-[hover]:border-zinc-200 data-[active]:bg-zinc-200 dark:data-[active]:border-zinc-700 dark:data-[hover]:border-zinc-700',
        className,
      )}
    >
      {children}
    </Headless.PopoverButton>
  );
}

export function PopoverPanel({ className, children }: PopoverProps) {
  return (
    <Headless.Transition
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-5"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-5"
    >
      <Headless.PopoverPanel
        anchor="bottom"
        className={cn(
          className,
          'mt-2 rounded-md text-sm/6 shadow-lg ring-1 ring-black ring-opacity-5 [--anchor-gap:var(--spacing-5)] focus:outline-none',
          'bg-white/90 backdrop-blur-lg',
        )}
      >
        {children}
      </Headless.PopoverPanel>
    </Headless.Transition>
  );
}
