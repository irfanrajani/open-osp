/**
 * modules/appointments.ts
 * Appointments service: day queries and status updates with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { AppointmentSchema, AppointmentDto } from '../types'

/** Response schema for list */
const AppointmentsListSchema = z.array(AppointmentSchema)

/** Retrieves appointments for a given day and optional provider filter. */
export async function getAppointmentsByDay(date: string, providerId?: string): Promise<AppointmentDto[]> {
  if (isMockMode()) {
    await delay()
    const mock: AppointmentDto[] = [
      { id: 'a1', date, time: '09:00', patientName: 'John Smith', reason: 'Follow-up', phone: '555-1234', providerId: 'p1', status: 'Scheduled' },
      { id: 'a2', date, time: '09:30', patientName: 'Ava Chen', reason: 'Annual Physical', phone: '555-5555', providerId: 'p2', status: 'Arrived' },
      { id: 'a3', date, time: '10:15', patientName: 'Samuel Park', reason: 'Blood Pressure', providerId: 'p1', status: 'In Room' },
    ]
    return (providerId ? mock.filter((m) => m.providerId === providerId) : mock)
  }
  const raw = await fetchJson<unknown>(`/appointments?date=${encodeURIComponent(date)}${providerId ? `&providerId=${providerId}` : ''}`)
  return AppointmentsListSchema.parse(raw)
}

/** Updates appointment status. */
export async function updateAppointmentStatus(id: string, status: AppointmentDto['status']): Promise<void> {
  if (isMockMode()) {
    await delay(200)
    return
  }
  await fetchJson<void>(`/appointments/${id}/status`, { method: 'PATCH', body: { status } })
}
