import { getApiUrl } from '../config';

interface Model {
  id: string;
  created: number;
  object: string;
  owned_by: string;
}

interface ModelsResponse {
  data: Model[];
}

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

export function getModelsQuery() {
  return {
    queryKey: ['models'],
    queryFn: fetchModels,
  };
}
