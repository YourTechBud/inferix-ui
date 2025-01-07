'use client';
import { CloseButton } from '@headlessui/react';
import React from 'react';

import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';

interface CustomDropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    sublabel?: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }[];
  endButton?: React.ReactNode;
  containerClassName?: string;
  panelClassName?: string;
  itemClassName?: string;
  itemTextClassName?: string;
}

export default function CustomDropdown({
  trigger,
  items,
  endButton,
  containerClassName = '',
  panelClassName = 'flex w-56 flex-col p-2 space-y-1',
  itemClassName = 'w-full text-left flex items-center rounded-lg p-2 hover:bg-item-hover focus:outline-none',
  itemTextClassName = 'font-medium text-sm',
}: CustomDropdownProps) {
  return (
    <div className={containerClassName}>
      <Popover>
        <PopoverButton>{trigger}</PopoverButton>
        <PopoverPanel className={panelClassName}>
          {items.map((item, index) => (
            <CloseButton
              key={index}
              className={itemClassName}
              onClick={item.onClick}
            >
              <div className="flex flex-row items-center justify-between">
                {item.icon && <span className="mr-2">{item.icon}</span>}
                <div className="flex flex-col">
                  <span className={itemTextClassName}>{item.label}</span>
                  {item.sublabel && (
                    <span className="text-xs text-gray-500">
                      {item.sublabel}
                    </span>
                  )}
                </div>
              </div>
            </CloseButton>
          ))}
          {endButton && <div className="mt-2 w-full">{endButton}</div>}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
