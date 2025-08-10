/**
 * modules/ticklers.ts
 * Ticklers (tasks) service with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { TicklerSchema, TicklerDto } from '../types'

const TicklersListSchema = z.array(TicklerSchema)

export async function getTicklers(): Promise<TicklerDto[]> {
  if (isMockMode()) {
    await delay()
    return [
      { id: 't1', title: 'Review lab: A1C', createdAt: new Date().toISOString(), dueAt: undefined, assignedTo: 'Dr. Lee', status: 'Open', link: '/inbox#i1' },
      { id: 't2', title: 'Sign encounter note (Jane Doe)', createdAt: new Date().toISOString(), dueAt: undefined, assignedTo: 'Dr. Lee', status: 'In Progress', link: '/encounter/1234' },
    ]
  }
  const raw = await fetchJson<unknown>('/ticklers')
  return TicklersListSchema.parse(raw)
}
