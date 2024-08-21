import { cn } from '@/lib/utils';

interface HeadingProps {
  text: string;
  className?: string;
}

export const Heading = ({ text, className }: HeadingProps) => (
  <h1 className={cn('text-2xl font-bold', className)}>{text}</h1>
);

interface SubheadingProps {
  text: string;
  className?: string;
}

export const Subheading = ({ text, className }: SubheadingProps) => (
  <h2 className={cn('text-lg font-semibold', className)}>{text}</h2>
);

interface SecondaryTextProps {
  text: string;
  className?: string;
}

export const SecondaryText = ({ text, className }: SecondaryTextProps) => (
  <p className={cn('text-sm text-gray-500', className)}>{text}</p>
);
