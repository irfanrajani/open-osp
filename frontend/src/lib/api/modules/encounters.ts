/**
 * modules/encounters.ts
 * Encounter note retrieval and updates with mock fallback.
 */

import { fetchJson, isMockMode, delay } from '../http'
import { EncounterNoteSchema, EncounterNoteDto } from '../types'

/** Fetches encounter note by encounter id. */
export async function getEncounterNote(encounterId: string): Promise<EncounterNoteDto> {
  if (isMockMode()) {
    await delay()
    return {
      id: 'n-' + encounterId,
      encounterId,
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
    }
  }
  const raw = await fetchJson<unknown>(`/encounters/${encounterId}/note`)
  return EncounterNoteSchema.parse(raw)
}

/** Saves encounter note. */
export async function saveEncounterNote(encounterId: string, payload: Partial<EncounterNoteDto>): Promise<EncounterNoteDto> {
  if (isMockMode()) {
    await delay(250)
    return {
      id: 'n-' + encounterId,
      encounterId,
      subjective: payload.subjective ?? '',
      objective: payload.objective ?? '',
      assessment: payload.assessment ?? '',
      plan: payload.plan ?? '',
    }
  }
  const raw = await fetchJson<unknown>(`/encounters/${encounterId}/note`, { method: 'POST', body: payload })
  return EncounterNoteSchema.parse(raw)
}
