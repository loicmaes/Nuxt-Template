export const useFrontPath = (path: string): string => `${useRuntimeConfig().public.apiUrl}/${path.startsWith("/") ? path.substring(1) : path}`;
