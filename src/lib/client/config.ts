export function getApiBaseUrl(): string {
  if (import.meta.env.DEV) {
    const host = import.meta.env.BACKEND_HOST || 'localhost';
    const port = import.meta.env.BACKEND_PORT || '4386';
    return `http://${host}:${port}`;
  }
  return ''; // In production, use relative URLs
}

export function getApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path}`;
}
