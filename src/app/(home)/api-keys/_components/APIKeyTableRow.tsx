import { TableRow, TableCell } from '@/ui/components/table';
import { Button } from '@/ui/components/button';
import { Trash2, SquarePen } from 'lucide-react';
import { APIKey } from '@/app/(home)/api-keys/page';

interface APIKeyTableRowProps extends APIKey {
  removeAPIKey: (id: string) => void;
}

export default function APIKeyTableRow({
  id,
  description,
  lastDigits,
  created,
  lastUsed,
  removeAPIKey,
}: APIKeyTableRowProps) {
  const handleDelete = () => {
    // todo: update to delete from database
    removeAPIKey(id);
  };

  return (
    <TableRow>
      <TableCell>{description}</TableCell>
      <TableCell>{`ik:...${lastDigits}`}</TableCell>
      <TableCell>{created?.toLocaleDateString()}</TableCell>
      <TableCell>{lastUsed?.toLocaleDateString()}</TableCell>
      <TableCell className="flex flex-grow-0 justify-end gap-2">
        <Button plain size="icon">
          <SquarePen />
        </Button>
        <Button plain size="icon">
          <Trash2 className="text-red-600" onClick={handleDelete} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
