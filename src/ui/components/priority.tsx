// import { CheckIcon, FlagIcon } from '@heroicons/react/16/solid';
// import clsx from 'clsx';

// import { calculatePriorityColor } from '@/lib/priority';

// import { Popover, PopoverButton, PopoverPanel } from './popover';

// const colors = {
//   red: 'text-red-500/80',
//   orange: 'text-orange-500/80',
//   amber: 'text-amber-500/80',
//   blue: 'text-blue-500/80',
//   zinc: 'text-gray-500/80',
// };

// interface PriorityProps {
//   className?: string;
//   priority: number;
// }

// export function PriorityLabel({ priority }: PriorityProps) {
//   const color = calculatePriorityColor(priority);
//   return (
//     <div className="flex content-center gap-2">
//       <FlagIcon className={clsx('size-4', colors[color])} />
//       <p className="text-xs text-gray-900">P{priority}</p>
//     </div>
//   );
// }

// export function PrioritySelector({ className, priority }: PriorityProps) {
//   return (
//     <Popover className="relative">
//       <PopoverButton className={clsx(className, 'p-2')}>
//         <PriorityLabel priority={priority} />
//       </PopoverButton>
//       <PopoverPanel>
//         {[1, 2, 3, 4, 5].map(p => {
//           return (
//             <div
//               key={p}
//               className="flex min-w-64 cursor-pointer items-center gap-4 px-4 py-2 text-sm text-gray-900 transition hover:bg-zinc-100"
//               role="menuitem"
//             >
//               <FlagIcon
//                 className={clsx('size-4', colors[calculatePriorityColor(p)])}
//               />
//               Priority {p}
//               {priority === p && (
//                 <CheckIcon className="ml-auto size-4 text-gray-700" />
//               )}
//             </div>
//           );
//         })}
//       </PopoverPanel>
//     </Popover>
//   );
// }
