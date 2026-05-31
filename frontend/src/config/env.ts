const base = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export const env = {
  apiBaseUrl: base.endsWith('/') ? base.slice(0, -1) : base,
};
