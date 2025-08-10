/**
 * modules/inbox.ts
 * Inbox (Labs/Documents/Results) triage service with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { InboxItemSchema, InboxItemDto } from '../types'

const InboxListSchema = z.array(InboxItemSchema)

/** Retrieves inbox items (optionally filtered by type or assignee). */
export async function getInboxItems(params?: { type?: 'Lab' | 'Document' | 'Result'; assignedTo?: string }): Promise<InboxItemDto[]> {
  if (isMockMode()) {
    await delay()
    const mock: InboxItemDto[] = [
      { id: 'i1', type: 'Lab', receivedAt: new Date().toISOString(), patientName: 'Jane Doe', summary: 'CBC: WNL', assignedTo: 'Dr. Lee', status: 'New' },
      { id: 'i2', type: 'Document', receivedAt: new Date().toISOString(), patientName: 'John Smith', summary: 'Discharge summary (PDF)', status: 'Assigned', assignedTo: 'Dr. Patel' },
      { id: 'i3', type: 'Result', receivedAt: new Date().toISOString(), patientName: 'Ava Chen', summary: 'CXR: No acute findings', status: 'Ack' },
    ]
    return mock.filter((m) => (!params?.type || m.type === params.type) && (!params?.assignedTo || m.assignedTo === params.assignedTo))
  }
  const q = new URLSearchParams()
  if (params?.type) q.set('type', params.type)
  if (params?.assignedTo) q.set('assignedTo', params.assignedTo)
  const raw = await fetchJson<unknown>(`/inbox?${q.toString()}`)
  return InboxListSchema.parse(raw)
}

/** Acknowledge an inbox item. */
export async function acknowledgeItem(id: string): Promise<void> {
  if (isMockMode()) {
    await delay(150)
    return
  }
  await fetchJson<void>(`/inbox/${id}/ack`, { method: 'POST' })
}
