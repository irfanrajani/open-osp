/**
 * modules/dashboard.ts
 * Dashboard KPIs with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { DashboardStatsSchema, DashboardStatsDto } from '../types'

export async function getDashboardStats(date: string): Promise<DashboardStatsDto> {
  if (isMockMode()) {
    await delay()
    return {
      date,
      totalAppointments: 24,
      arrived: 10,
      inRoom: 4,
      resultsToReview: 6,
      unreadMessages: 3,
      openTicklers: 5,
    }
  }
  const raw = await fetchJson<unknown>(`/dashboard?date=${encodeURIComponent(date)}`)
  return DashboardStatsSchema.parse(raw)
}
