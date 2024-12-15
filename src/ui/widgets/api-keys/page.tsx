import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/ui/components/button';
import APIKeyTable from '@/ui/widgets/api-keys/table';

import { APIKey } from './types';

type APIKeysPageProps = {
  apiKeys: APIKey[];
  removeAPIKey: (id: string) => void;
};

export default function APIKeysPage({
  apiKeys,
  removeAPIKey,
}: APIKeysPageProps) {
  const [baseUrl, setBaseUrl] = useState('');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(baseUrl);
    toast.success('Base URL copied to clipboard!');
  };

  useEffect(() => {
    const { protocol, hostname, port } = window.location;

    const isHttpsDefaultPort = protocol === 'https' && port === '443';
    const isHttpDefaultPort = protocol === 'http' && port === '80';
    const isDefaultPort = isHttpsDefaultPort || isHttpDefaultPort;

    setBaseUrl(
      `${protocol}//${hostname}${isDefaultPort ? '' : ':' + port}/inferix/v1/llm`,
    );
  }, []);

  return (
    <>
      <p>
        Manage your API keys. Remember to keep your API keys safe to prevent
        unauthorized access.
      </p>
      <div className="mt-4 flex items-center gap-2">
        <p className="py-2">Base URL:</p>
        {baseUrl && (
          <>
            <div className="ml-1 flex items-center gap-1 rounded-lg border pl-4">
              <p>{baseUrl}</p>
              <Button
                plain
                size="icon"
                aria-label="Copy base URL"
                onClick={handleCopy}
                className="h-9 w-9"
              >
                <Copy />
              </Button>
            </div>
          </>
        )}
      </div>
      <APIKeyTable apiKeys={apiKeys} removeAPIKey={removeAPIKey} />
    </>
  );
}
