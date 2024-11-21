import React from 'react';
import { BiChevronDown, BiPlus } from 'react-icons/bi';

import { Button } from '@/ui/components/button';
import CustomDropdown from '@/ui/components/custom-dropdown';

const WorkspaceSwitcher = () => {
  const popoverIconStyles = 'h-5 w-5 fill-zinc-500 group-hover:fill-black';

  const trigger = (
    <div className="flex flex-row items-center justify-between rounded-lg p-2 font-sans text-sm font-medium hover:bg-popover-hover focus:outline-none active:bg-popover-hover">
      Mark&apos;s Workspace
      <BiChevronDown className={popoverIconStyles} />
    </div>
  );

  const items = [
    {
      label: 'Playground',
      onClick: () => console.log('Playground clicked'),
      icon: <div className="h-4 w-4 rounded-full bg-gray-300" />,
    },
  ];

  const endButton = (
    <Button className="w-full">
      <div className="flex flex-row items-center gap-1">
        <BiPlus className="h-4 w-4 flex-shrink-0" />
        <p className="sm:text-medium text-sm">Create Workspace</p>
      </div>
    </Button>
  );

  return (
    <CustomDropdown trigger={trigger} items={items} endButton={endButton} />
  );
};

export default WorkspaceSwitcher;
