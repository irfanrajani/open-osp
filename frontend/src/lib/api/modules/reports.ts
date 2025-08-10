/**
 * modules/reports.ts
 * Reports catalogue and trigger endpoints with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { ReportSchema, ReportDto } from '../types'

const ReportsListSchema = z.array(ReportSchema)

export async function listReports(): Promise<ReportDto[]> {
  if (isMockMode()) {
    await delay()
    return [
      { id: 'r1', name: 'Appointment Utilization', category: 'Scheduling', description: 'Daily appointment counts by provider' },
      { id: 'r2', name: 'Outstanding Labs', category: 'Clinical', description: 'Labs without acknowledgement' },
      { id: 'r3', name: 'Billing Summary', category: 'Billing', description: 'Claims and payments overview' },
    ]
  }
  const raw = await fetchJson<unknown>('/reports')
  return ReportsListSchema.parse(raw)
}

export async function runReport(id: string): Promise<unknown> {
  if (isMockMode()) {
    await delay(400)
    return { id, generatedAt: new Date().toISOString(), rows: 42 }
  }
  return await fetchJson<unknown>(`/reports/${id}/run`, { method: 'POST' })
}
