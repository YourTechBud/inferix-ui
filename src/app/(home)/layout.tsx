'use client';

import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiConversation, BiLogOutCircle } from 'react-icons/bi';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/components/button';
import { Divider } from '@/ui/components/divider';
import { Input } from '@/ui/components/input';
import { Navbar } from '@/ui/components/navbar';
import { Popover, PopoverButton, PopoverPanel } from '@/ui/components/popover';
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/ui/components/sidebar';
import { SidebarLayout } from '@/ui/components/sidebar-layout';
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

  const pathname = usePathname();

  const playgroundItems = [
    { icon: BiConversation, label: 'Chat', href: '/chat' },
    { icon: BiLogOutCircle, label: 'Retrieval', href: '/retrieval' },
  ];
  return (
    <SidebarLayout
      navbar={<Navbar></Navbar>}
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Popover>
              <PopoverButton className="hover:bg-primary-hover flex w-[14rem] flex-row items-center justify-between rounded-lg p-2 font-sans text-sm font-medium">
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
              <SidebarHeading>Playground</SidebarHeading>
              {playgroundItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  href={item.href}
                  current={pathname === item.href}
                >
                  <item.icon
                    className={cn(
                      'h-4 w-4',
                      pathname === item.href ? '' : 'text-zinc-500',
                    )}
                  />
                  <SidebarLabel
                    className={pathname === item.href ? '' : 'text-zinc-500'}
                  >
                    {item.label}
                  </SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <div className="flex h-full w-full flex-col items-center justify-center overflow-auto bg-background font-sans antialiased sm:min-h-screen lg:p-2">
        {children}
      </div>
    </SidebarLayout>
  );
}
