import { cn } from '@/lib/utils';

interface LabelProps {
  className?: string;
  text: string;
}
export default function Label({ className, text }: LabelProps) {
  return (
    <h4 className={cn('text-xs font-semibold text-gray-600', className)}>
      {text}
    </h4>
  );
}
