/**
 * Admin.tsx
 * Administration portal landing page: entry points to users, providers, templates, schedules, etc.
 */

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Settings, Users, ClipboardList, CalendarRange } from 'lucide-react'
import { getSystemInfo } from '../lib/api/modules/admin'

/**
 * AdminPage
 * Provides high-level actions similar to OSCAR admin menus.
 */
export default function AdminPage() {
  // Simple promise display; a real version would use state/effect
  const infoPromise = getSystemInfo()

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">System Info</CardTitle>
          <CardDescription>Environment overview</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <AsyncInfo promise={infoPromise} />
        </CardContent>
      </Card>

      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">User & Provider Management</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button size="sm"><Users className="mr-1 h-4 w-4" /> Users</Button>
          <Button size="sm" variant="outline" className="bg-transparent"><Users className="mr-1 h-4 w-4" /> Providers</Button>
          <Button size="sm" variant="outline" className="bg-transparent"><CalendarRange className="mr-1 h-4 w-4" /> Schedules</Button>
        </CardContent>
      </Card>

      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Templates & Lists</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button size="sm"><ClipboardList className="mr-1 h-4 w-4" /> Note Templates</Button>
          <Button size="sm" variant="outline" className="bg-transparent"><ClipboardList className="mr-1 h-4 w-4" /> Order Sets</Button>
          <Button size="sm" variant="outline" className="bg-transparent"><Settings className="mr-1 h-4 w-4" /> Code Lists</Button>
        </CardContent>
      </Card>
    </div>
  )
}

/** AsyncInfo renders system info from the admin service. */
function AsyncInfo({ promise }: { promise: Promise<{ version: string; site: string; providers: number; users: number }> }) {
  const [dataSym, setDataSym] = (window as any).__adminInfo ?? [null, null]
  if (!(window as any).__adminInfo) {
    promise.then((d) => {
      ;(window as any).__adminInfo = [d, setDataSym]
      const ev = new Event('admin-info')
      window.dispatchEvent(ev)
    })
    window.addEventListener('admin-info', () => {
      // no-op placeholder; real apps would trigger state update
    })
    return <div>Loading...</div>
  }
  const data = dataSym as { version: string; site: string; providers: number; users: number }
  return (
    <ul className="space-y-1">
      <li><span className="text-neutral-500">Version:</span> {data.version}</li>
      <li><span className="text-neutral-500">Site:</span> {data.site}</li>
      <li><span className="text-neutral-500">Providers:</span> {data.providers}</li>
      <li><span className="text-neutral-500">Users:</span> {data.users}</li>
    </ul>
  )
}
