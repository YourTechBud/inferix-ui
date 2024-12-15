import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import clsx from 'clsx';

interface CheckboxProps {
  className?: string;
  color: 'zinc' | 'red' | 'orange' | 'amber' | 'blue';
  enabled?: boolean;
  setEnabled?: (enabled: boolean) => void;
}

const colors = {
  red: 'ring-red-400 hover:shadow-red-200 stroke-red-400 group-data-[checked]:bg-red-400',
  orange:
    'ring-orange-400 hover:shadow-orange-200 stroke-orange-400 group-data-[checked]:bg-orange-400',
  amber:
    'ring-amber-400 hover:shadow-amber-200 stroke-amber-400 group-data-[checked]:bg-amber-400',
  blue: 'ring-blue-400 hover:shadow-blue-200 stroke-blue-400 group-data-[checked]:bg-blue-400',
  zinc: 'ring-zinc-400 hover:shadow-zinc-200 stroke-zinc-400 group-data-[checked]:bg-zinc-400',
};

export default function Checkbox(props: CheckboxProps) {
  return (
    <HeadlessCheckbox
      checked={props.enabled}
      onChange={props.setEnabled}
      onClick={e => e.stopPropagation()}
      className={clsx(
        'group size-5 rounded-md bg-white/10 p-1 shadow-none ring-1 ring-inset transition hover:shadow-sm data-[checked]:bg-white',
        colors[props.color],
        props.className,
      )}
    >
      <svg
        className={clsx(
          'ring-none stroke-${props.color}-400 group-data-[checked]:bg-${props.color}-400 rounded-md transition',
          colors[props.color],
        )}
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          className="opacity-0 transition sm:group-hover:opacity-100"
          d="M3 8L6 11L11 3.5"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </HeadlessCheckbox>
  );
}
