/**
 * Single seam between the app and its API.
 *
 * Today the Route Handlers under app/api/** serve mock data from
 * lib/server/*Store.ts. When a real backend arrives, point API_BASE_URL at it
 * and nothing else in the app has to change — every page's api.ts goes
 * through here.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface ApiRequestOptions extends RequestInit {
  /** Arabic message to surface to the student when the request fails. */
  errorMessage: string;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions
): Promise<T> {
  const { errorMessage, headers, ...init } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: init.body
      ? { "Content-Type": "application/json", ...headers }
      : headers,
  });

  if (!response.ok) {
    throw new ApiError(errorMessage, response.status);
  }

  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}
