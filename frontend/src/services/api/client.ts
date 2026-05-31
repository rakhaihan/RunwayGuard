import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public requestId?: string | null,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${env.apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, options);
  const requestId = response.headers.get('X-Request-ID');

  if (!response.ok) {
    let message = response.statusText;
    let code: string | undefined;
    try {
      const body = await response.json();
      if (body?.error?.message) message = body.error.message;
      if (body?.error?.code) code = body.error.code;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, response.status, code, requestId);
  }

  return response.json() as Promise<T>;
}
