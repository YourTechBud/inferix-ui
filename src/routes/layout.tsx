import { BiConversation, BiLock } from 'react-icons/bi';
import { Outlet, useLocation } from 'react-router';

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
import { Toaster } from '@/ui/components/sonner';
import User from '@/ui/widgets/navigation/user';
import WorkspaceSwitcher from '@/ui/widgets/navigation/workspaceSwitcher';

export function links() {
  return [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }];
}

export default function Layout() {
  const { pathname } = useLocation();

  const playgroundItems = [
    // { icon: BiLogOutCircle, label: 'Retrieval', href: '' },
    { icon: BiConversation, label: 'Chat', href: '/playground/chat' },
  ];

  // const dataItems = [
  //   { icon: BiObjectsHorizontalLeft, label: 'Pipelines', href: '' },
  //   { icon: BiData, label: 'Datasets', href: '' },
  // ];

  const sidebarBottomItems = [
    { icon: BiLock, label: 'API Keys', href: '/api-keys' },
    // { icon: BiSlider, label: 'Connections', href: '' },
  ];

  return (
    <div className="min-h-screen font-sans antialiased">
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
                        className={
                          pathname === item.href ? '' : 'text-zinc-500'
                        }
                      >
                        {item.label}
                      </SidebarLabel>
                    </SidebarItem>
                  ))}
                </SidebarSection>
                {/* <SidebarDivider /> */}

                {/* <SidebarSection>
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
              </SidebarSection> */}

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
                        className={
                          pathname === item.href ? '' : 'text-zinc-500'
                        }
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
        <div className="flex w-full flex-col items-center justify-center bg-background font-sans antialiased sm:min-h-screen lg:p-2">
          <Outlet />
        </div>
      </SidebarLayout>
      <Toaster />
    </div>
  );
}
