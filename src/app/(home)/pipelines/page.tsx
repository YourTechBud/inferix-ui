import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

export default function Pipelines() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="Pipelines" />
      <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          src="/assets/pipelines.png"
          alt="pipelines"
          width={200}
          height={200}
          className="h-auto w-24 object-contain sm:w-[200px]"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <Subheading text="Setup Pipelines To Start Curating And Reading From Your Datasets!" />
          <SecondaryText text="Setup ingestion and retrieval pipelines to build and use datasets in your AI application!" />
        </div>
        <Button>Create Pipeline</Button>
      </div>
    </PagePanel>
  );
}
