import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

export default function APIKeys() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="API Keys" />
      <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          src="/assets/apiKeys.png"
          alt="api-keys"
          width={200}
          height={200}
          className="h-auto w-24 object-contain sm:w-[200px]"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <Subheading text="Want Programmatic Access? No Problem!" />
          <SecondaryText text="Manage your API keys. Remember to keep your API keys safe to prevent unauthorized access." />
        </div>
        <Button>Create API Key</Button>
      </div>
    </PagePanel>
  );
}
