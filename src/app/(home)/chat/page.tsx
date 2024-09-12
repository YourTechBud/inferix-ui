import Image from 'next/image';

import { Button } from '@/ui/components/button';
import { Heading, SecondaryText, Subheading } from '@/ui/components/heading';
import PagePanel from '@/ui/components/page-panel';

export default function Chat() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading text="Chat" />
      <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          src="/assets/chat.png"
          alt="chat"
          width={200}
          height={200}
          className="h-auto w-24 object-contain sm:w-[200px]"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <Subheading text="You're Just One Step Away From AI-ing!" />
          <SecondaryText text="You will need to setup connections to Groq, OpenAI or any supported backend to use the playground" />
        </div>
        <Button>Setup Connections</Button>
      </div>
    </PagePanel>
  );
}
