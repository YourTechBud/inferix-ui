import { TableRow, TableCell } from '@/ui/components/table';
import { Button } from '@/ui/components/button';
import { Trash2, SquarePen } from 'lucide-react';
import { APIKey } from '@/app/(home)/api-keys/page';

type APIKeyTableRowProps = APIKey;

export default function APIKeyTableRow({
  description,
  lastDigits,
  created,
  lastUsed,
}: APIKeyTableRowProps) {
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
          <Trash2 className="text-red-600" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
