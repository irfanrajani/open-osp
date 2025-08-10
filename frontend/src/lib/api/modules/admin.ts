/**
 * modules/admin.ts
 * Administration scaffolding: minimal endpoints and mock data.
 */

import { fetchJson, isMockMode, delay } from '../http'

/** Returns simple system info; expand as needed. */
export async function getSystemInfo(): Promise<{ version: string; site: string; providers: number; users: number }> {
  if (isMockMode()) {
    await delay()
    return { version: 'OSCAR 19 (mock)', site: 'Clinic A', providers: 12, users: 45 }
  }
  return await fetchJson(`/admin/system-info`)
}
