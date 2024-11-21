import clsx from 'clsx';

export function Divider({
  soft = false,
  orientation = 'horizontal',
  className,
  ...props
}: {
  soft?: boolean;
  orientation?: string;
} & React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      {...props}
      className={clsx(
        className,
        orientation == 'vertical' ? 'h-full border-l' : 'w-full border-t',
        soft && 'border-zinc-950/5 dark:border-white/5',
        !soft && 'border-zinc-950/10 dark:border-white/10',
      )}
    />
  );
}
