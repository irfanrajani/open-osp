/**
 * Dashboard.tsx
 * Landing dashboard showing key clinical and operational metrics.
 */

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CalendarDays, ClipboardList, Inbox, MessageSquare, Activity } from 'lucide-react'
import { getDashboardStats } from '../lib/api/modules/dashboard'
import { Link } from 'react-router'

/**
 * DashboardPage
 * Displays KPIs and quick links similar to OSCAR dashboard concepts.
 */
export default function DashboardPage() {
  const [date] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{ totalAppointments: number; arrived: number; inRoom: number; resultsToReview: number; unreadMessages: number; openTicklers: number } | null>(null)

  useEffect(() => {
    const d = format(date, 'yyyy-MM-dd')
    getDashboardStats(d)
      .then((s) => setStats(s))
      .finally(() => setLoading(false))
  }, [date])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <KpiCard
          title="Appointments"
          value={loading ? '—' : String(stats?.totalAppointments ?? 0)}
          icon={<CalendarDays className="h-5 w-5 text-emerald-600" />}
          to="/appointments"
        />
        <KpiCard
          title="Arrived"
          value={loading ? '—' : String(stats?.arrived ?? 0)}
          icon={<Activity className="h-5 w-5 text-emerald-600" />}
          to="/appointments"
        />
        <KpiCard
          title="Results to review"
          value={loading ? '—' : String(stats?.resultsToReview ?? 0)}
          icon={<Inbox className="h-5 w-5 text-emerald-600" />}
          to="/inbox"
        />
        <KpiCard
          title="Unread messages"
          value={loading ? '—' : String(stats?.unreadMessages ?? 0)}
          icon={<MessageSquare className="h-5 w-5 text-emerald-600" />}
          to="/messages"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s Overview</CardTitle>
            <CardDescription>{format(date, 'EEE, MMM d')}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-neutral-700">
            {loading ? 'Loading...' : (
              <ul className="space-y-1">
                <li>Total appointments: {stats?.totalAppointments}</li>
                <li>Arrived: {stats?.arrived} | In room: {stats?.inRoom}</li>
                <li>Results awaiting review: {stats?.resultsToReview}</li>
                <li>Open ticklers: {stats?.openTicklers}</li>
              </ul>
            )}
            <Link to="/appointments" className="mt-3 inline-block">
              <Button size="sm" variant="outline" className="bg-transparent">Open schedule</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Inbox Preview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-neutral-700 space-y-2">
            <div>- Labs, documents, and results that mirror OSCAR&apos;s Inbox.</div>
            <Link to="/inbox">
              <Button size="sm" variant="outline" className="bg-transparent">Go to Inbox</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-neutral-700">
            <div>Common clinic reports accessible with one click.</div>
            <Link to="/reports">
              <Button size="sm" variant="outline" className="bg-transparent">Open Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * KpiCard
 * Small KPI widget with an icon and link.
 */
function KpiCard(props: { title: string; value: string; icon: React.ReactNode; to: string }) {
  return (
    <Link to={props.to}>
      <Card className="border bg-white transition hover:shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
          {props.icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{props.value}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
