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
        'h-full w-full flex-grow flex-col',
        'px-10 lg:py-10',
        'bg-white lg:rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
