'use client';

import { useState } from 'react';

import { Heading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';
import APIKeysPlaceholder from '@/app/(home)/api-keys/_components/APIKeysPlaceholder';
import APIKeysPage from '@/app/(home)/api-keys/_components/APIKeysPage';
import { Button } from '@/ui/components/button';
import { Plus } from 'lucide-react';

export interface APIKey {
  id: string;
  description: string;
  lastDigits: string;
  created?: Date;
  lastUsed?: Date;
}

// todo: remove test data
const testData = [
  {
    id: '1',
    description: 'api key november',
    lastDigits: 'ef0123',
    created: new Date(2024, 10, 1),
    lastUsed: new Date(2024, 10, 15),
  },
  {
    id: '2',
    description: 'api key october',
    lastDigits: '555acd',
    created: new Date(2024, 9, 31),
  },
  {
    id: '3',
    description: 'api key september',
    lastDigits: '08gfae',
    created: new Date(2024, 8, 4),
  },
];

export default function APIKeys() {
  const [apiKeys, setApiKeys] = useState(testData);

  return (
    <PagePanel className="flex h-full flex-col">
      <div className="mb-6 flex justify-between">
        <Heading text="API Keys" />
        {apiKeys && (
          <Button>
            <Plus />
            Create API Key
          </Button>
        )}
      </div>
      {apiKeys ? <APIKeysPage apiKeys={apiKeys} /> : <APIKeysPlaceholder />}
    </PagePanel>
  );
}
