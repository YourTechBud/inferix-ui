/*
 * Mock server handlers
 */

import { http, HttpResponse } from 'msw';

import { getApiUrl } from '../config';
import { ModelsResponse } from './models';

export const handlers = [
  http.get(getApiUrl('/inferix/v1/llm/models'), () => {
    const response: ModelsResponse = {
      data: [
        {
          id: 'gpt-4o',
          created: 1728518400,
          object: 'model',
          owned_by: 'openai',
        },
      ],
    };
    return HttpResponse.json(response);
  }),
];
