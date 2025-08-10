/**
 * session.ts
 * Minimal session store using a simple module pattern (no external deps).
 * Can migrate to Zustand if global state grows.
 */

/** Current user session information. */
export interface SessionState {
  userName: string
  providerId?: string
}

/** In-memory session; for demo purposes only. */
let state: SessionState = {
  userName: 'Dr. Lee',
  providerId: 'p1',
}

/** Returns current session state. */
export function getSession(): SessionState {
  return state
}

/** Updates session state. */
export function setSession(partial: Partial<SessionState>) {
  state = { ...state, ...partial }
}
