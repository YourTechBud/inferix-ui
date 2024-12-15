import { BiEdit, BiTrash } from 'react-icons/bi';

import { Button } from '@/ui/components/button';
import { TableCell, TableRow } from '@/ui/components/table';

import { APIKey } from './types';

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
      <TableCell>{created}</TableCell>
      <TableCell>{lastUsed || 'Never'}</TableCell>
      <TableCell className="flex flex-grow-0 justify-end gap-2">
        <Button plain size="icon">
          <BiEdit className="h-4 w-4" />
        </Button>
        <Button plain size="icon">
          <BiTrash className="size-4 text-red-600" onClick={handleDelete} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
