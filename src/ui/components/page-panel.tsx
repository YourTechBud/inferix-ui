import clsx from 'clsx';
import React from 'react';

export default function PagePanel({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
  className?: string;
}) {
  return (
    <div
      {...props}
      className={clsx(
        'pb-4 pl-10 pr-10 lg:my-3',
        'lg:rounded-lg lg:bg-white lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10',
        className,
      )}
    >
      {children}
    </div>
  );
}
