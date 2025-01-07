import { setupWorker } from 'msw/browser';

import { handlers } from '../client/llm/models';

export const worker = setupWorker(...handlers);
