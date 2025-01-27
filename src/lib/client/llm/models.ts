import { getApiUrl } from '../config';

/*
 * Interfaces
 */

export interface Model {
  id: string;
  created: number;
  object: string;
  owned_by: string;
}

export interface ModelsResponse {
  data: Model[];
}

/*
 * Client functions
 */

export async function fetchModels(): Promise<ModelsResponse> {
  const response = await fetch(getApiUrl('/inferix/v1/llm/models'), {
    method: 'GET',
    headers: {
      // 'Authorization': 'Basic XXXX',
      // TODO: Workspace needs to be dynamic
      'X-Inferix-Workspace': 'default',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.statusText}`);
  }

  return response.json();
}

/*
 * React Query functions
 */

export function getModelsQuery() {
  return {
    queryKey: ['models'],
    queryFn: fetchModels,
  };
}
