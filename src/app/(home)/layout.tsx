'use client';

import { usePathname } from 'next/navigation';
import {
  BiConversation,
  BiData,
  BiLock,
  BiLogOutCircle,
  BiObjectsHorizontalLeft,
  BiSlider,
} from 'react-icons/bi';

import { cn } from '@/lib/utils';
import { Navbar } from '@/ui/components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/ui/components/sidebar';
import { SidebarLayout } from '@/ui/components/sidebar-layout';
import User from '@/ui/widgets/navigation/user';
import WorkspaceSwitcher from '@/ui/widgets/navigation/workspaceSwitcher';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const pathname = usePathname();

  const playgroundItems = [
    { icon: BiLogOutCircle, label: 'Retrieval', href: '' },
    { icon: BiConversation, label: 'Chat', href: '/chat' },
  ];

  const dataItems = [
    { icon: BiObjectsHorizontalLeft, label: 'Pipelines', href: '' },
    { icon: BiData, label: 'Datasets', href: '' },
  ];

  const sidebarBottomItems = [
    { icon: BiLock, label: 'API Keys', href: '' },
    { icon: BiSlider, label: 'Connections', href: '' },
  ];

  return (
    <SidebarLayout
      navbar={<Navbar></Navbar>}
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <WorkspaceSwitcher />
          </SidebarHeader>
          <SidebarBody className="flex flex-grow flex-col justify-between">
            <div>
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
              <SidebarDivider />

              <SidebarSection>
                <SidebarHeading>Data</SidebarHeading>
                {dataItems.map((item, index) => (
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
              <SidebarSpacer />
            </div>

            <div className="mt-auto">
              <SidebarSection>
                {sidebarBottomItems.map((item, index) => (
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

              <SidebarDivider />
              <User />
            </div>
          </SidebarBody>
        </Sidebar>
      }
    >
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden bg-background font-sans antialiased sm:min-h-screen lg:p-2">
        {children}
      </div>
    </SidebarLayout>
  );
}
