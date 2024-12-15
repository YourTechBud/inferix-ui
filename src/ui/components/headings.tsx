import { cn } from '@/lib/utils';

interface HeadingProps {
  text: string;
  className?: string;
  variant:
    | 'page'
    | 'nav'
    | 'label'
    | 'section'
    | 'element'
    | 'monospaced'
    | 'regular'
    | 'small'
    | 'secondary';
}

export const Heading = ({ text, className, variant }: HeadingProps) => (
  <h1
    className={
      (variant === 'page' && cn('text-2xl font-bold', className)) ||
      (variant === 'section' && cn('text-lg font-semibold', className)) ||
      (variant === 'secondary' && cn('text-sm text-gray-500', className)) ||
      (variant === 'small' && cn('text-sm text-black', className)) ||
      ''
    }
  >
    {text}
  </h1>
);
