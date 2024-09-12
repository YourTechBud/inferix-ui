import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

export default function Retrieval() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="Retrieval" />
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
          <Button color="secondary">Import Dataset</Button>
        </div>
      </div>
    </PagePanel>
  );
}
