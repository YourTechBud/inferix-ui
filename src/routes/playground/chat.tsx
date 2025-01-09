'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BiArrowToRight, BiChevronDown, BiEraser } from 'react-icons/bi';

import { getModelsQuery, queryClient } from '@/lib/client';
import { Button } from '@/ui/components/button';
import CustomDropdown from '@/ui/components/custom-dropdown';
import { Divider } from '@/ui/components/divider';
import { Heading } from '@/ui/components/headings';
import PagePanel from '@/ui/components/page-panel';
import { Spinner } from '@/ui/components/spinner';
import ChatMessage from '@/ui/widgets/playground/chat-message';
import ChatPrompt from '@/ui/widgets/playground/chat-prompt';
import PlaygroundSettings from '@/ui/widgets/playground/playground-settings';

export async function clientLoader() {
  const modelsQuery = getModelsQuery();

  return {
    models:
      queryClient.getQueryData(modelsQuery.queryKey) ??
      (await queryClient.fetchQuery(modelsQuery)),
  };
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

export default function Component() {
  const { data: models, isFetching: isModelDataFetching } =
    useQuery(getModelsQuery());

  // TODO: This should be a separate page, the loader should redirect to the page
  if (models?.data.length === 0) {
    return <NoModelChat />;
  }

  const [selectedModel, setSelectedModel] = useState<string>(
    models?.data[0].id ?? '',
  );

  const popoverIconStyles = 'h-5 w-5 fill-zinc-500 group-hover:fill-black';

  const trigger = (
    <div className="flex flex-row items-center justify-between rounded-lg border p-2 font-sans text-sm font-medium hover:bg-popover-hover focus:outline-none active:bg-popover-hover">
      {selectedModel}
      <BiChevronDown className={`${popoverIconStyles} ml-4`} />
    </div>
  );

  const items = models?.data
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(model => ({
      label: model.id,
      sublabel: model.owned_by,
      onClick: () => setSelectedModel(model.id),
      icon: <div className="h-4 w-4 rounded-sm bg-gray-300" />,
    }));

  const endButton = (
    // Maybe this button with a loader should be a separate component cause it's going to be used in multiple places
    <Button
      className="w-full"
      onClick={() => {
        // Invalidating the query will trigger a refetch
        queryClient.invalidateQueries(getModelsQuery());
      }}
    >
      {isModelDataFetching ? (
        <Spinner />
      ) : (
        <div className="flex flex-row items-center gap-1">
          <p className="sm:text-medium text-sm">Refresh Model List</p>
        </div>
      )}
    </Button>
  );

  return (
    <PagePanel className="flex h-full flex-col">
      <Heading variant="page" text="Chat" />
      <div className="mb-4 mt-4 flex flex-grow flex-row gap-4 sm:max-h-[70vh] sm:gap-6 lg:mb-0 lg:max-h-[68vh] 2xl:max-h-[90vh]">
        <div className="flex h-full flex-grow flex-col justify-between sm:w-full md:w-[25vw] lg:w-[45vw]">
          <div className="flex h-full flex-grow flex-col gap-4">
            <div className="flex flex-row gap-4">
              <CustomDropdown
                containerClassName="w-56" // TODO: Make sure the text inside doesn't overflow
                trigger={trigger}
                items={items ?? []}
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

            <div className="flex h-full flex-col justify-between">
              <div className="flex-1 overflow-y-auto">
                <ChatMessage variant="system" />
                <ChatMessage
                  variant="user"
                  content="Hi how are you?"
                  className="w-full"
                />
                <ChatMessage
                  variant="assistant"
                  content="Hi how can i help you?"
                />
                <ChatMessage
                  variant="assistant"
                  content="Hi how can i help you?"
                />
                <ChatMessage
                  variant="user"
                  content="Hi how are you?"
                  className="w-full"
                />
                <ChatMessage
                  variant="user"
                  content="Hi how are you?"
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <ChatPrompt handleSendPrompt={() => {}} />
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className="border" />
        <PlaygroundSettings />
      </div>
    </PagePanel>
  );
}
