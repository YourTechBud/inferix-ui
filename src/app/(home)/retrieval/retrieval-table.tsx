import { Dataset } from '@/app/(home)/retrieval/page';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '@/ui/components/table';
import { PiBracketsCurly } from 'react-icons/pi';
import { ImTree } from 'react-icons/im';

export const RetrievalTable = ({ chunks }: { chunks: Dataset | null }) => {
  return (
    <Table>
      <TableHead>
        <TableRow className="flex">
          <TableHeader className="min-w-14 flex-grow-0">Rank</TableHeader>
          <TableHeader className="flex-grow">Content</TableHeader>
          <TableCell className="flex-grow-0" />
        </TableRow>
      </TableHead>
      {chunks && (
        <TableBody>
          {chunks.map(chunk => (
            <TableRow key={chunk.id} className="flex">
              <TableCell className="min-w-14 flex-grow-0 text-right">
                {chunk.rank}
              </TableCell>
              <TableCell className="flex-grow text-wrap">
                {chunk.content}
              </TableCell>
              <TableCell className="flex flex-grow-0 items-center gap-4 text-zinc-500 dark:text-zinc-400">
                <ImTree />
                <PiBracketsCurly />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};
