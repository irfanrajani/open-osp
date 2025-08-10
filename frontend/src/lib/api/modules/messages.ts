/**
 * modules/messages.ts
 * Internal messages retrieval and send with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { MessageSchema, MessageDto } from '../types'

const MessagesListSchema = z.array(MessageSchema)

export async function getMessages(): Promise<MessageDto[]> {
  if (isMockMode()) {
    await delay()
    return [
      { id: 'm1', from: 'Nurse Station', to: 'Dr. Lee', sentAt: new Date().toISOString(), subject: 'Patient arrived', body: 'John Smith is ready in Room 2', read: false },
      { id: 'm2', from: 'Front Desk', to: 'Dr. Lee', sentAt: new Date().toISOString(), subject: 'Refill request', body: 'Please review refill for Lisinopril', read: true },
    ]
  }
  const raw = await fetchJson<unknown>('/messages')
  return MessagesListSchema.parse(raw)
}

export async function sendMessage(payload: Pick<MessageDto, 'to' | 'subject' | 'body'>): Promise<void> {
  if (isMockMode()) {
    await delay(200)
    return
  }
  await fetchJson<void>('/messages', { method: 'POST', body: payload })
}
