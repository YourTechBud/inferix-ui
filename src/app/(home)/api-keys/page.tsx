'use client';

import { useState } from 'react';

import { Heading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';
import APIKeysPlaceholder from '@/app/(home)/api-keys/_components/APIKeysPlaceholder';
import APIKeysPage from '@/app/(home)/api-keys/_components/APIKeysPage';
import APIKeyModal from './_components/APIKeyModal';

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
  const [apiKeys, setApiKeys] = useState<APIKey[]>(testData);
  const hasKeys = apiKeys && apiKeys.length > 0;

  // todo: remove mock functions
  const addMockKey = (description: string) => {
    const id = String(Date.now());
    const lastDigits = id.slice(0, 6);
    const created = new Date();

    const newKey = {
      id,
      lastDigits,
      description,
      created,
    };

    setApiKeys(prevKeys => (prevKeys ? [...prevKeys, newKey] : [newKey]));
  };

  const removeMockKey = (id: string) => {
    setApiKeys(prevKeys => prevKeys?.filter(key => key.id !== id));
  };

  return (
    <PagePanel className="flex h-full flex-col">
      <div className="mb-6 flex justify-between">
        <Heading text="API Keys" />
        {hasKeys && <APIKeyModal hasIcon addAPIKey={addMockKey} />}
      </div>
      {hasKeys ? (
        <APIKeysPage apiKeys={apiKeys} removeAPIKey={removeMockKey} />
      ) : (
        <APIKeysPlaceholder addAPIKey={addMockKey} />
      )}
    </PagePanel>
  );
}
