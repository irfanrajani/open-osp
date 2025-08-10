/**
 * Caseload.tsx
 * Snapshot of a provider's current caseload (arrived, in-room, etc.) similar to OSCAR activity panes.
 */

import { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { addDays, format } from 'date-fns'
import { getSession } from '../store/session'
import { getAppointmentsByDay } from '../lib/api/modules/appointments'

/**
 * CaseloadPage
 * Shows a quick summary of appointments for the logged-in provider.
 */
export default function CaseloadPage() {
  // Simple sync computation: in a fuller version, make this async with state and effect
  const today = format(new Date(), 'yyyy-MM-dd')
  const providerId = getSession().providerId

  // For the demo, we call the service synchronously through a wrapper; a real app would use useEffect/useState.
  // To keep the page interactive without extra libs, we simulate with a memo that returns a Promise-like then().
  const dataPromise = useMemo(() => getAppointmentsByDay(today, providerId), [today, providerId])

  return (
    <Card className="border bg-white">
      <CardHeader>
        <CardTitle className="text-base">Caseload — {format(new Date(), 'EEE, MMM d')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Minimal async handling: render placeholder & then update via microtask */}
        <AsyncList promise={dataPromise} />
      </CardContent>
    </Card>
  )
}

/**
 * AsyncList
 * Light async renderer for the demo; replace with real data hooks later.
 */
function AsyncList({ promise }: { promise: Promise<Awaited<ReturnType<typeof getAppointmentsByDay>>> }) {
  const [state, setState] = (window as any).__caseloadState ?? [null, null]
  if (!(window as any).__caseloadState) {
    ;(window as any).__caseloadState = [state, setState]
  }
  if (!state) {
    promise.then((d) => {
      (window as any).__caseloadState = [d, setState]
      const ev = new Event('caseload-update')
      window.dispatchEvent(ev)
    })
    window.addEventListener('caseload-update', () => {
      const rootEl = document.querySelector('#app')
      if (rootEl) {
        // noop: esbuild environment re-renders via state in real apps; here we keep it minimal
      }
    })
    return <div className="py-8 text-center text-sm text-neutral-500">Loading...</div>
  }
  const items = state as Awaited<ReturnType<typeof getAppointmentsByDay>>
  return (
    <ul className="divide-y">
      {items.map((a) => (
        <li key={a.id} className="px-2 py-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">{a.time} — {a.patientName}</div>
            <Badge variant="secondary">{a.status}</Badge>
          </div>
          <div className="text-xs text-neutral-600">{a.reason ?? ''}</div>
        </li>
      ))}
    </ul>
  )
}
