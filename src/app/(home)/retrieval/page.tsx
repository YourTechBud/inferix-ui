'use client';

import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

import { useState } from 'react';

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

// mock data
import { graphRetriever } from './mock-data';

type Data = {
  id: number;
  rank: number;
  content: string;
};

type Dataset = Data[];

export default function Retrieval() {
  const [data, setData] = useState<Dataset | null>(null);
  const [chunks, setChunks] = useState<Dataset | null>(graphRetriever);

  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="Retrieval" />
      {data ? (
        <div className="flex flex-grow flex-col gap-4 sm:gap-6">
          <div>Options Menu</div>
          <div className="flex-grow">
            <Table>
              <TableHead>
                <TableRow className="flex">
                  <TableHeader className="min-w-14 flex-grow-0">
                    Rank
                  </TableHeader>
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
            {!chunks && (
              <div className="border-b border-b-zinc-950/5 py-2 text-center text-sm/6 text-zinc-500 dark:text-zinc-400">
                Fire a query to view the retrieved chunks.
              </div>
            )}
          </div>
          <div>Retrieval Prompt</div>
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
          <Image
            src="/assets/chat.png"
            alt="retrieval"
            width={200}
            height={200}
            className="h-auto w-24 object-contain sm:w-[200px]"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <Subheading text="You're Just One Step Away From AI-ing!" />
            <SecondaryText text="You will need to setup pipelines or import datasets to start experimenting with RAG" />
          </div>
          <div className="flex flex-row items-center gap-4">
            <Button>Setup Connections</Button>
            <SecondaryText text="OR" />
            <Button color="secondary" onClick={() => setData(graphRetriever)}>
              Import Dataset
            </Button>
          </div>
        </div>
      )}
    </PagePanel>
  );
}
