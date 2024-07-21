'use client';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';

import { Avatar } from '@/ui/components/avatar';
import { Button } from '@/ui/components/button';
import { Divider } from '@/ui/components/divider';
import { Input } from '@/ui/components/input';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/ui/components/navbar';
import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';
import { addWorkspace, deleteWorkspace } from '@/ui/widgets/navigation/helpers';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const popoverTextStyles =
    'font-semibold text-zinc-500 group-hover:text-black';
  const popoverIconStyles = 'h-5 w-5 fill-zinc-500 group-hover:fill-black';
  const popoverElementStyles =
    'group flex flex-row justify-between rounded-lg p-2 hover:bg-primary';
  const [workspace, setWorkspace] = useState('');
  const [workspaceList, setWorkspaceList] = useState<string[]>([]);

  return (
    <>
      <body className="min-h-screen min-w-full overflow-hidden bg-background font-sans antialiased">
        <Navbar className="min-w-full bg-primary p-4">
          <NavbarSection>
            <Popover>
              <PopoverButton className="hover:bg-primary-hove flex flex-row gap-2 rounded-lg p-2 font-sans text-sm font-medium">
                Workspace Switcher
                <ChevronDownIcon className={popoverIconStyles} />
              </PopoverButton>
              <PopoverPanel className="ml-4 flex min-w-64 flex-col">
                <div className="flex flex-row gap-2 rounded-lg p-2">
                  <Input
                    type="text"
                    placeholder="Add new workspace"
                    value={workspace}
                    onChange={e => setWorkspace(e.target.value)}
                  />
                  <Button
                    plain={true}
                    useCustomStyles={true}
                    className="inline-flex h-6 w-10 items-center justify-center rounded-lg bg-emerald-500 p-2 font-medium text-white hover:bg-emerald-600"
                    onClick={() => {
                      addWorkspace(
                        workspace,
                        workspaceList,
                        setWorkspaceList,
                        setWorkspace,
                      );
                    }}
                  >
                    <PlusIcon className="h-6 w-6 flex-shrink-0" />
                  </Button>
                </div>
                <Divider className="w-full" />

                <div className="flex flex-col p-1">
                  {workspaceList.map((ws, index) => (
                    <div key={index} className={popoverElementStyles}>
                      <h1 className={popoverTextStyles}>{ws}</h1>
                      <TrashIcon
                        className={popoverIconStyles}
                        onClick={() => {
                          deleteWorkspace(
                            index,
                            workspaceList,
                            setWorkspaceList,
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <NavbarItem href="/playground">Playground</NavbarItem>
            <NavbarItem href="/api-keys">API Keys</NavbarItem>
          </NavbarSection>
          <NavbarSpacer />

          <Popover>
            <PopoverButton className="flex items-center justify-center rounded-full hover:bg-primary-hover">
              <Avatar className="h-6 w-6 rounded-full" />
            </PopoverButton>
            <PopoverPanel className="min-w-56 translate-x-[-10px] transform">
              <div className="flex flex-col p-2 text-sm font-semibold">
                <h1>J D</h1>
                <p>johndoe@example.com</p>
              </div>
              <Divider className="w-inherit" />

              <div
                className={`rounded-none ${popoverElementStyles}`}
                onClick={() => {
                  //TODO
                }}
              >
                <h1 className={popoverTextStyles}>Sign Out</h1>
                <ArrowRightStartOnRectangleIcon className={popoverIconStyles} />
              </div>
            </PopoverPanel>
          </Popover>
        </Navbar>

        {children}
      </body>
    </>
  );
}
