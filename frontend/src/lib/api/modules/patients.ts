/**
 * modules/patients.ts
 * Patient search and details with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { z } from 'zod'
import { PatientSchema, PatientDto } from '../types'

const PatientsListSchema = z.array(PatientSchema)

/** Simple search across name/phone. */
export async function searchPatients(query: string): Promise<PatientDto[]> {
  if (isMockMode()) {
    await delay()
    const mock: PatientDto[] = [
      { id: 'p100', name: 'Jane Doe', dob: '1991-04-10', sex: 'F', phone: '555-1234' },
      { id: 'p101', name: 'John Smith', dob: '1984-09-21', sex: 'M', phone: '555-9933' },
      { id: 'p102', name: 'Ava Chen', dob: '1990-02-17', sex: 'F' },
    ]
    if (!query) return mock
    const s = query.toLowerCase()
    return mock.filter((p) => p.name.toLowerCase().includes(s) || (p.phone ?? '').toLowerCase().includes(s))
  }
  const raw = await fetchJson<unknown>(`/patients?search=${encodeURIComponent(query)}`)
  return PatientsListSchema.parse(raw)
}
