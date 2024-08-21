'use client';
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { useState } from 'react';

import { Button } from '@/ui/components/button';
import { Divider } from '@/ui/components/divider';
import { Input } from '@/ui/components/input';
import { Navbar, NavbarItem } from '@/ui/components/navbar';
import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarSection,
} from '@/ui/components/sidebar';
import { SidebarLayout } from '@/ui/components/sidebar-layout';
import { addWorkspace, deleteWorkspace } from '@/ui/widgets/navigation/helpers';

interface HomeLayoutProps {
  children: React.ReactNode;
}
const navItems = [
  { label: 'Playground', url: '/playground' },
  { label: 'API Keys', url: '/api-keys' },
];

export default function HomeLayout({ children }: HomeLayoutProps) {
  const popoverTextStyles =
    'font-semibold text-zinc-500 group-hover:text-black';
  const popoverIconStyles = 'h-5 w-5 fill-zinc-500 group-hover:fill-black';
  const popoverElementStyles =
    'group flex flex-row justify-between rounded-lg p-2 hover:bg-primary';
  const [workspace, setWorkspace] = useState('');
  const [workspaceList, setWorkspaceList] = useState<string[]>([]);

  return (
    <SidebarLayout
      navbar={<Navbar></Navbar>}
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Popover>
              <PopoverButton className="flex w-[14rem] flex-row items-center justify-between rounded-lg p-2 font-sans text-sm font-medium hover:bg-primary-hover">
                Mark&apos;s Workspace
                <ChevronDownIcon className={popoverIconStyles} />
              </PopoverButton>
              <PopoverPanel className="ml-4 flex w-64 flex-col">
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
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <NavbarItem key={label} href={url}>
                  {label}
                </NavbarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden bg-background p-2 font-sans antialiased sm:min-h-screen">
        {/* panel div */}
        <div className="flex h-full w-full flex-grow flex-col overflow-hidden rounded-lg bg-white p-4 sm:p-6 md:p-10">
          {children}
        </div>
      </div>
    </SidebarLayout>
  );
}
