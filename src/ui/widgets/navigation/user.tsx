import { BiChevronDown } from 'react-icons/bi';
import { BiLogOut, BiUser } from 'react-icons/bi';

import { Avatar } from '@/ui/components/avatar';
import CustomDropdown from '@/ui/components/custom-dropdown';

const trigger = (
  <div className="flex flex-row items-center justify-between rounded-lg p-2 hover:bg-popover-hover active:bg-popover-hover">
    <div className="flex flex-row items-center gap-2">
      <Avatar
        src="/assets/avatar.png"
        alt="avatar"
        className="flex-shrink-0 object-contain"
        size="lg"
      />

      <div className="flex min-w-0 flex-grow flex-col">
        <h1 className="truncate text-left text-base font-semibold">
          Mark Warner
        </h1>
        <p className="truncate text-sm">mark@example.com</p>
      </div>
    </div>
    <BiChevronDown className="h-5 w-5 flex-shrink-0 fill-zinc-500 group-hover:fill-black" />
  </div>
);

const items = [
  {
    label: 'My Profile',
    onClick: () => console.log('Profile clicked'),
    icon: <BiUser className="h-4 w-4 text-zinc-500" />,
  },
  {
    label: 'Sign Out',
    onClick: () => console.log('Sign out clicked'),
    icon: <BiLogOut className="h-4 w-4 text-zinc-500" />,
  },
];

export default function User() {
  return <CustomDropdown trigger={trigger} items={items} />;
}
