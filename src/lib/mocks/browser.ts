import { setupWorker } from 'msw/browser';

import { handlers as chatCompletionHandlers } from '../client/llm/chat-completion.mock';
import { handlers as modelsHandlers } from '../client/llm/models.mock';

export const worker = setupWorker(...modelsHandlers, ...chatCompletionHandlers);
