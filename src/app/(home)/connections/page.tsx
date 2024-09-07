import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

export default function Connections() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="Connections" />
      <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          src="/assets/connections.png"
          alt="connections"
          width={200}
          height={200}
          className="h-auto w-24 object-contain sm:w-[200px]"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <Subheading text="Setup Connections To Make Inferix Useful!" />
          <SecondaryText text="Setup connections to OpenAI, Groq, Vector Databases and more to get started with Inferix." />
        </div>
        <Button>Create Connection</Button>
      </div>
    </PagePanel>
  );
}
