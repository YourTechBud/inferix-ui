import React from 'react';

import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';

interface CustomDropdownProps {
  trigger: React.ReactNode;
  items: { label: string; onClick: () => void; icon?: React.ReactNode }[];
  endButton?: React.ReactNode;
  containerClassName?: string;
  panelClassName?: string;
  itemClassName?: string;
  itemTextClassName?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  trigger,
  items,
  endButton,
  containerClassName = '',
  panelClassName = 'flex w-56 flex-col p-2 space-y-1',
  itemClassName = 'w-full text-left flex items-center rounded-lg p-2 hover:bg-item-hover focus:outline-none',
  itemTextClassName = 'font-medium text-sm',
}) => {
  return (
    <div className={containerClassName}>
      <Popover>
        <PopoverButton>{trigger}</PopoverButton>
        <PopoverPanel className={panelClassName}>
          {items.map((item, index) => (
            <button
              key={index}
              className={itemClassName}
              onClick={item.onClick}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span className={itemTextClassName}>{item.label}</span>
            </button>
          ))}
          {endButton && <div className="mt-2 w-full">{endButton}</div>}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default CustomDropdown;
