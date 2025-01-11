import OpenAI from 'openai';

import { getApiUrl } from '../config';

/**
 * Interfaces
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMSettings {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  model: string;
}

/**
 * Client functions
 */
export async function* streamChatCompletion(
  messages: ChatMessage[],
  settings: LLMSettings
): AsyncGenerator<string> {
  const openai = new OpenAI({
    baseURL: getApiUrl('/inferix/v1/llm'),
    apiKey: 'default',
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'X-Inferix-Workspace': 'default', // TODO: Make this dynamic
    },
  });

  const stream = await openai.chat.completions.create({
    messages,
    model: settings.model ?? 'gpt-4',
    temperature: settings.temperature,
    max_tokens: settings.maxTokens,
    top_p: settings.topP,
    frequency_penalty: settings.frequencyPenalty,
    presence_penalty: settings.presencePenalty,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}
