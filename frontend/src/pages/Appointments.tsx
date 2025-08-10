/**
 * Appointments.tsx
 * Day schedule with provider filter, date navigation, and details panel.
 */

import { useMemo, useState } from 'react'
import { format, addDays } from 'date-fns'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, User, Phone, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

/**
 * Appointment
 * Domain model for a scheduled appointment.
 */
interface Appointment {
  id: string
  time: string
  patient: string
  reason: string
  phone?: string
  providerId: string
  status: 'Scheduled' | 'Arrived' | 'In Room' | 'Completed' | 'Cancelled'
}

/**
 * Provider
 * Domain model for a provider filter.
 */
interface Provider {
  id: string
  name: string
}

const MOCK_PROVIDERS: Provider[] = [
  { id: 'p1', name: 'Dr. Lee' },
  { id: 'p2', name: 'Dr. Patel' },
  { id: 'p3', name: 'NP Gomez' },
]

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', time: '09:00', patient: 'John Smith', reason: 'Follow-up', phone: '555-1234', providerId: 'p1', status: 'Scheduled' },
  { id: 'a2', time: '09:30', patient: 'Ava Chen', reason: 'Annual Physical', phone: '555-5555', providerId: 'p2', status: 'Arrived' },
  { id: 'a3', time: '10:15', patient: 'Samuel Park', reason: 'Blood Pressure', providerId: 'p1', status: 'In Room' },
  { id: 'a4', time: '11:30', patient: 'Maria Garcia', reason: 'Lab Review', providerId: 'p3', status: 'Scheduled' },
  { id: 'a5', time: '14:00', patient: 'Ahmed Khan', reason: 'Diabetes mgmt', providerId: 'p2', status: 'Completed' },
]

/**
 * StatusBadge
 * Visual badge for appointment status.
 */
function StatusBadge({ status }: { status: Appointment['status'] }) {
  const color =
    status === 'Arrived'
      ? 'bg-amber-100 text-amber-700'
      : status === 'In Room'
      ? 'bg-indigo-100 text-indigo-700'
      : status === 'Completed'
      ? 'bg-emerald-100 text-emerald-700'
      : status === 'Cancelled'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-neutral-100 text-neutral-700'
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${color}`}>{status}</span>
}

/**
 * AppointmentsPage
 * Main appointment management screen for a day.
 */
export default function AppointmentsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [provider, setProvider] = useState<string>('all')
  const [query, setQuery] = useState<string>('')
  const [selected, setSelected] = useState<Appointment | null>(null)

  /** Filters the mock appointments by provider and search query. */
  const items = useMemo(() => {
    const day = MOCK_APPOINTMENTS // demo: ignoring date in mock
    return day.filter((a) => {
      const matchProv = provider === 'all' || a.providerId === provider
      const matchQuery =
        !query ||
        a.patient.toLowerCase().includes(query.toLowerCase()) ||
        a.reason.toLowerCase().includes(query.toLowerCase())
      return matchProv && matchQuery
    })
  }, [provider, query])

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setDate((d) => addDays(d, -1))}
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 rounded-md border bg-white px-3 py-2">
            <CalendarDays className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium">{format(date, 'EEE, MMM d')}</span>
          </div>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setDate((d) => addDays(d, 1))}
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-400" />
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {MOCK_PROVIDERS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Search patient or reason"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white md:w-64"
          />
        </div>
      </div>

      {/* Layout: list and details */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
        {/* Schedule list */}
        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Day Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {items.length === 0 && (
                <li className="py-10 text-center text-sm text-neutral-500">No appointments found.</li>
              )}
              {items.map((a) => (
                <li
                  key={a.id}
                  className={`flex cursor-pointer items-start justify-between gap-3 py-3 transition-colors hover:bg-neutral-50 ${
                    selected?.id === a.id ? 'bg-emerald-50' : ''
                  }`}
                  onClick={() => setSelected(a)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="h-4 w-4 text-neutral-400" />
                        {a.time}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-neutral-400" />
                        <span className="font-medium">{a.patient}</span>
                        <StatusBadge status={a.status} />
                      </div>
                      <div className="mt-1 text-sm text-neutral-600">{a.reason}</div>
                      {a.phone && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                          <Phone className="h-3.5 w-3.5" />
                          {a.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {MOCK_PROVIDERS.find((p) => p.id === a.providerId)?.name}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Appointment Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!selected ? (
              <div className="text-sm text-neutral-500">Select an appointment to view details.</div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-500">{format(date, 'PPP')}</div>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="rounded-md border bg-neutral-50 p-3">
                  <div className="text-sm">
                    <span className="font-medium">{selected.patient}</span> — {selected.reason}
                  </div>
                  <div className="mt-1 text-xs text-neutral-600">
                    Time: {selected.time} | Provider:{' '}
                    {MOCK_PROVIDERS.find((p) => p.id === selected.providerId)?.name}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Check in</Button>
                  <Button size="sm" variant="outline" className="bg-transparent">Mark in room</Button>
                  <Button size="sm" variant="outline" className="bg-transparent">Complete</Button>
                  <Button size="sm" variant="outline" className="bg-transparent">Cancel</Button>
                </div>
                <div className="pt-2">
                  <div className="text-sm font-medium">Actions</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button size="sm">Open encounter</Button>
                    <Button size="sm" variant="outline" className="bg-transparent">Reschedule</Button>
                    <Button size="sm" variant="outline" className="bg-transparent">Message</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
