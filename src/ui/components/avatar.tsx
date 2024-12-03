import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

import { TouchTarget } from './button';
import { Link } from './link';

type AvatarProps = {
  src?: string | null;
  square?: boolean;
  initials?: string;
  alt?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-14 h-14 text-xl',
};

export function Avatar({
  src = null,
  square = false,
  initials,
  alt = '',
  className,
  size = 'md', // Default size
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={clsx(
        className,
        sizeClasses[size],
        'inline-flex items-center justify-center align-middle [--avatar-radius:20%] [--ring-opacity:20%]',
        'outline outline-1 -outline-offset-1 outline-black/[--ring-opacity] dark:outline-white/[--ring-opacity]',
        square ? 'rounded-[--avatar-radius]' : 'rounded-full',
      )}
    >
      {initials && (
        <svg
          className="h-full w-full select-none fill-current font-medium uppercase"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : 'true'}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
          >
            {initials}
          </text>
        </svg>
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          className={clsx(
            'h-full w-full object-cover',
            square ? 'rounded-[--avatar-radius]' : 'rounded-full',
          )}
        />
      )}
    </span>
  );
}

export const AvatarButton = React.forwardRef(function AvatarButton(
  {
    src,
    square = false,
    initials,
    alt,
    className,
    size = 'md',
    ...props
  }: AvatarProps &
    (
      | Omit<Headless.ButtonProps, 'className'>
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classes = clsx(
    className,
    sizeClasses[size],
    square ? 'rounded-[20%]' : 'rounded-full',
    'relative focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
  );

  return 'href' in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>
        <Avatar
          src={src}
          square={square}
          initials={initials}
          alt={alt}
          size={size}
        />
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Avatar
          src={src}
          square={square}
          initials={initials}
          alt={alt}
          size={size}
        />
      </TouchTarget>
    </Headless.Button>
  );
});
