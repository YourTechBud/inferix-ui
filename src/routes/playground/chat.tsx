'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BiArrowToRight, BiChevronDown, BiEraser } from 'react-icons/bi';
import { toast } from 'sonner';

import {
  ChatMessage,
  getModelsQuery,
  queryClient,
  streamChatCompletion,
} from '@/lib/client';
import { Button } from '@/ui/components/button';
import CustomDropdown from '@/ui/components/custom-dropdown';
import { Divider } from '@/ui/components/divider';
import { Heading } from '@/ui/components/headings';
import PagePanel from '@/ui/components/page-panel';
import { Spinner } from '@/ui/components/spinner';
import ChatMessageBox from '@/ui/widgets/playground/chat-message';
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

  // State for messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'You are an ai helpful assistant',
    },
  ]);

  const [selectedModel, setSelectedModel] = useState<string>(
    models?.data[0].id ?? '',
  );

  const streamResponse = async (
    messagesForCompletion: ChatMessage[],
    insertAtIndex?: number,
  ) => {
    try {
      const stream = streamChatCompletion(messagesForCompletion, {
        model: selectedModel,
      });

      // Create assistant message with empty content
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: '',
      };

      // Add or insert the assistant message
      setMessages(prev => {
        const newMessages = [...prev];
        if (insertAtIndex !== undefined) {
          // For regeneration: replace everything after insertAtIndex
          return [...newMessages.slice(0, insertAtIndex + 1), assistantMessage];
        }
        // For new messages: append to the end
        return [...newMessages, assistantMessage];
      });

      // Accumulate the full response
      let fullContent = '';
      for await (const chunk of stream) {
        fullContent += chunk;
        // Update the assistant's message with accumulated content
        setMessages(prev => {
          const newMessages = [...prev];
          const targetIndex =
            insertAtIndex !== undefined
              ? insertAtIndex + 1
              : newMessages.length - 1;
          newMessages[targetIndex] = {
            role: 'assistant',
            content: fullContent,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error in chat completion:', error);
      toast.error('Error in chat completion');
    }
  };

  const handleRegenerate = async (index: number) => {
    // Get messages up to and including the current index
    const messagesUpToIndex = messages.slice(0, index + 1);
    await streamResponse(messagesUpToIndex, index);
  };

  const handleSendPrompt = async (prompt: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content: prompt,
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);

    // Stream response with all messages including the new user message
    await streamResponse([...messages, userMessage]);
  };

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
      <div className="mb-4 mt-4 flex h-full flex-grow flex-row gap-4 sm:gap-6 lg:mb-0">
        <div className="flex h-full flex-grow flex-col sm:w-full md:w-[25vw] lg:w-[45vw]">
          <div
            id="chat-container"
            className="relative flex h-full flex-col gap-4"
          >
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

            <div id="chat-messages" className="flex-1 overflow-y-auto">
              {messages.map((message, index) => (
                <ChatMessageBox
                  key={index}
                  variant={message.role}
                  content={message.content}
                  handleRegenerate={() => handleRegenerate(index)}
                  setContent={newContent => {
                    setMessages(prevMessages => {
                      const updatedMessages = [...prevMessages];
                      updatedMessages[index].content = newContent;
                      return updatedMessages;
                    });
                  }}
                  onDelete={() => {
                    setMessages(prevMessages => {
                      // Don't allow deleting the system message
                      if (index === 0 && message.role === 'system')
                        return prevMessages;

                      const updatedMessages = [...prevMessages];
                      updatedMessages.splice(index, 1);
                      return updatedMessages;
                    });
                  }}
                />
              ))}
            </div>
            <div
              id="chat-prompt-container"
              className="absolute bottom-4 left-0 right-0 bg-white"
            >
              <ChatPrompt handleSendPrompt={handleSendPrompt} />
            </div>
          </div>
        </div>
        <Divider orientation="vertical" className="border" />
        <PlaygroundSettings />
      </div>
    </PagePanel>
  );
}
