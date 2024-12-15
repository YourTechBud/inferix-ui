// import { CalendarDaysIcon, SunIcon } from '@heroicons/react/16/solid';

// import { checkDate, getDifferenceInDays } from '@/lib/date';
// import { cn } from '@/lib/utils';

// import { Calendar } from './calendar';
// import { Popover, PopoverButton, PopoverPanel } from './popover';

// const calculateDaysColor = (dueDate: string) => {
//   const diffInDays = getDifferenceInDays(dueDate);

//   // Use red for overdue tasks
//   if (diffInDays < 0) {
//     return 'text-red-500/80';
//   }

//   // Use green for tasks due today
//   if (diffInDays === 0) {
//     return 'text-green-600/80';
//   }

//   // Use amber for tasks due tomorrow
//   if (diffInDays === 1) {
//     return 'text-amber-600/80';
//   }

//   // Use purple for everything else
//   return 'text-purple-600/80';
// };

// interface DateProps {
//   className?: string;
//   date?: string;
// }

// export function DateLabel({ className, date }: DateProps) {
//   let color = 'text-gray-700/80';
//   let value = 'No due date';

//   if (date) {
//     color = calculateDaysColor(date);
//     value = checkDate(date);
//   }
//   return (
//     <span className={cn(className, 'flex gap-1 text-xs', color)}>
//       <CalendarDaysIcon className="size-4" /> {value}
//     </span>
//   );
// }

// export function DateSelector({ className, date }: DateProps) {
//   const selectedDate = date ? new Date(date) : undefined;
//   return (
//     <Popover className="relative">
//       <PopoverButton className={cn(className, 'p-2')}>
//         <DateLabel date={date} />
//       </PopoverButton>
//       <PopoverPanel>
//         <div
//           className="text-medium flex w-full cursor-pointer items-center gap-2 px-4 py-4 text-sm text-gray-900 transition hover:bg-zinc-100"
//           role="menuitem"
//         >
//           <SunIcon className="size-4 text-amber-500" />
//           Tomorrow
//         </div>

//         <div className="border-b border-zinc-100"></div>

//         <Calendar mode="single" selected={selectedDate} />
//       </PopoverPanel>
//     </Popover>
//   );
// }
