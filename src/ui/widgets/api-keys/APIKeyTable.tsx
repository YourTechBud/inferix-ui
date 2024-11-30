import { APIKey } from '@/app/(home)/api-keys/page';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/components/table';
import APIKeyTableRow from '@/ui/widgets/api-keys/APIKeyTableRow';

type APIKeyTableProps = {
  apiKeys: APIKey[];
  removeAPIKey: (id: string) => void;
};

export default function APIKeyTable({
  apiKeys,
  removeAPIKey,
}: APIKeyTableProps) {
  return (
    <Table className="mt-10">
      <TableHead>
        <TableRow>
          <TableHeader>Description</TableHeader>
          <TableHeader>Secret Key</TableHeader>
          <TableHeader>Created</TableHeader>
          <TableHeader>Last Used</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {apiKeys.map(apiKey => (
          <APIKeyTableRow
            key={apiKey.id}
            removeAPIKey={removeAPIKey}
            {...apiKey}
          />
        ))}
      </TableBody>
    </Table>
  );
}
