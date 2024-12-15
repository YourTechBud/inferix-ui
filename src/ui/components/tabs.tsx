import * as Headless from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';

interface TabContext {
  index: number;
  setIndex?: (index: number) => void;
}

const TabContext = createContext<TabContext>({ index: 0 });

interface TabGroupProps {
  className?: string;
  children: ReactNode;
}

export function TabGroup({ className, children }: TabGroupProps) {
  const [index, setIndex] = useState(0);
  return (
    <TabContext.Provider value={{ index, setIndex }}>
      <_TabGroup className={className}>{children}</_TabGroup>
    </TabContext.Provider>
  );
}
function _TabGroup({ className, children }: TabGroupProps) {
  const { index, setIndex } = useContext(TabContext);
  return (
    <Headless.TabGroup
      className={className}
      selectedIndex={index}
      onChange={setIndex}
    >
      {children}
    </Headless.TabGroup>
  );
}

export function TabList({ className, children }: TabGroupProps) {
  return (
    <Headless.TabList
      className={clsx(
        className,
        'inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-gray-200 p-1 text-gray-600',
      )}
    >
      {children}
    </Headless.TabList>
  );
}

interface TabProps {
  className?: string;
  index: number;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}

export function Tab({ className, index, title, icon: Icon }: TabProps) {
  const { index: activeTab } = useContext(TabContext);
  return (
    <Headless.Tab
      key={index}
      className={clsx(
        'relative transition',
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none ring-0 transition-all',
        className,
      )}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {activeTab === index && (
        <motion.span
          layoutId="bubble"
          className="absolute inset-0 z-10 rounded-md bg-white shadow"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}

      <p
        className={clsx(
          'z-20',
          activeTab === index ? 'text-gray-700' : 'text-gray-600',
        )}
      >
        {title && title}
        {Icon && <Icon key={index} className="size-5" />}
      </p>
    </Headless.Tab>
  );
}

export function TabPanels({ className, children }: TabGroupProps) {
  return (
    <Headless.TabPanels className={className}>{children}</Headless.TabPanels>
  );
}

interface TabPanelProps {
  className?: string;
  index: number;
  children: ReactNode;
}

export function TabPanel({ className, index, children }: TabPanelProps) {
  return (
    <Headless.TabPanel key={index} className={className}>
      {children}
    </Headless.TabPanel>
  );
}
