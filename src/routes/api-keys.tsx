import { useState } from 'react';

import { formatDate } from '@/lib/utils';
import { Heading } from '@/ui/components/headings';
import PagePanel from '@/ui/components/page-panel';
import APIKeysPlaceholder from '@/ui/widgets/api-keys/empty-state';
import APIKeyModal from '@/ui/widgets/api-keys/modal';
import APIKeysPage from '@/ui/widgets/api-keys/page';

export interface APIKey {
  id: string;
  description: string;
  lastDigits: string;
  created?: string;
  lastUsed?: string;
}

// todo: remove test data
const testData = [
  {
    id: '1',
    description: 'api key november',
    lastDigits: 'ef0123',
    created: formatDate(new Date(2024, 10, 1)),
    lastUsed: formatDate(new Date(2024, 10, 15)),
  },
  {
    id: '2',
    description: 'api key october',
    lastDigits: '555acd',
    created: formatDate(new Date(2024, 9, 31)),
  },
  {
    id: '3',
    description: 'api key september',
    lastDigits: '08fae0',
    created: formatDate(new Date(2024, 8, 4)),
  },
];

export default function Component() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(testData);
  const hasKeys = apiKeys && apiKeys.length > 0;

  // todo: remove mock functions
  const addMockKey = (description: string) => {
    const id = String(Date.now());
    const lastDigits = id.slice(0, 6);
    const created = formatDate(new Date());

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
        <Heading variant="page" text="API Keys" />
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
