/**
 * Responsibility: Typed accessors for import.meta.env (VITE_API_BASE_URL).
 */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
};
