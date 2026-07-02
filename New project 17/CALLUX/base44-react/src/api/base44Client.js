import { createClient } from '@base44/sdk';

export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID || 'replace-with-base44-app-id'
});

export async function safeList(entityName, fallback) {
  try {
    if (!base44?.entities?.[entityName]) return fallback;
    return await base44.entities[entityName].list();
  } catch {
    return fallback;
  }
}

