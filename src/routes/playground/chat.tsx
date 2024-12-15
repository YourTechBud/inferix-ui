'use client';
import { BiArrowToRight, BiChevronDown, BiEraser } from 'react-icons/bi';

import { Button } from '@/ui/components/button';
import CustomDropdown from '@/ui/components/custom-dropdown';
import { Divider } from '@/ui/components/divider';
import { Heading } from '@/ui/components/headings';
import PagePanel from '@/ui/components/page-panel';
import ChatMessage from '@/ui/widgets/playground/chat-message';
import ChatPrompt from '@/ui/widgets/playground/chat-prompt';
import PlaygroundSettings from '@/ui/widgets/playground/playground-settings';

interface Model {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

function NoModelChat() {
  return (
    <PagePanel className="flex h-full flex-col">
      <Heading variant="page" text="Chat" />
      <div className="flex flex-grow flex-col items-center justify-center gap-4 sm:gap-6">
        <img
          src="/assets/chat.png"
          alt="chat"
          width={200}
          height={200}
          className="h-auto w-24 object-contain sm:w-[200px]"
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <Heading
            variant="section"
            text="You're Just One Step Away From AI-ing!"
          />
          <Heading
            variant="secondary"
            text="You will need to setup connections to Groq, OpenAI or any supported backend to use the playground"
          />
        </div>
        <Button>Setup Connections</Button>
      </div>
    </PagePanel>
  );
}

export default function Chat() {
  // Sample models for testing
  const sampleModels: Model[] = [
    {
      id: '1',
      object: 'Llama 3.1 Instruct - 8B',
      created: 1632096000,
      owned_by: 'Groq',
    },
    {
      id: '2',
      object: 'GPT 4o',
      created: 1632096000,
      owned_by: 'OpenAI',
    },
    {
      id: '3',
      object: 'Mistral OpenHermes 2.5',
      created: 1632096000,
      owned_by: 'Together.ai',
    },
  ];

  if (sampleModels.length === 0) {
    return <NoModelChat />;
  }

  const popoverIconStyles = 'h-5 w-5 fill-zinc-500 group-hover:fill-black';

  const trigger = (
    <div className="flex flex-row items-center justify-between rounded-lg border p-2 font-sans text-sm font-medium hover:bg-popover-hover focus:outline-none active:bg-popover-hover">
      Llama 3.1 Instruct
      <BiChevronDown className={`${popoverIconStyles} ml-4`} />
    </div>
  );

  const items = sampleModels.map(model => ({
    label: model.object,
    sublabel: model.owned_by,
    onClick: () => console.log(`${model.object} clicked`),
    icon: <div className="h-4 w-4 rounded-sm bg-gray-300" />,
  }));

  const endButton = (
    <Button className="w-full">
      <div className="flex flex-row items-center gap-1">
        <p className="sm:text-medium text-sm">Refresh Model List</p>
      </div>
    </Button>
  );

  return (
    <PagePanel className="flex h-full flex-col">
      <Heading variant="page" text="Chat" />
      <div className="flex flex-grow flex-row gap-4 sm:gap-6">
        <div className="mt-4 flex flex-grow flex-col justify-between space-y-4 lg:w-[750px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <CustomDropdown
                trigger={trigger}
                items={items}
                endButton={endButton}
              />
              <Button color="white">
                <BiArrowToRight className="h-5 w-5 fill-black" />
              </Button>
              <Button color="secondary">
                <div className="flex flex-row items-center gap-1">
                  <BiEraser className="h-5 w-5 fill-white" />
                  <p className="sm:text-small text-xs">Clear Conversation</p>
                </div>
              </Button>
            </div>

            <ChatMessage variant="system" className="w-full" />
          </div>

          <ChatPrompt handleSendPrompt={() => {}} />
        </div>
        <Divider orientation="vertical" className="border" />
        <PlaygroundSettings />
      </div>
    </PagePanel>
  );
}
