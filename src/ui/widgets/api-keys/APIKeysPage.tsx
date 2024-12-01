import { APIKey } from '@/app/(home)/api-keys/page';
import APIKeyTable from '@/ui/widgets/api-keys/APIKeyTable';

type APIKeysPageProps = {
  apiKeys: APIKey[];
  removeAPIKey: (id: string) => void;
};

export default function APIKeysPage({
  apiKeys,
  removeAPIKey,
}: APIKeysPageProps) {
  return (
    <>
      <p>
        Manage your API keys. Remember to keep your API keys safe to prevent
        unauthorized access.
      </p>
      <APIKeyTable apiKeys={apiKeys} removeAPIKey={removeAPIKey} />
    </>
  );
}
