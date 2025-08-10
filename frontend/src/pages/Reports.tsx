/**
 * Reports.tsx
 * Simple reports catalogue and runner mirroring OSCAR report lists.
 */

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { listReports, runReport } from '../lib/api/modules/reports'
import { ReportDto } from '../lib/api/types'

/**
 * ReportsPage
 * Displays available reports and allows running one (stub result).
 */
export default function ReportsPage() {
  const [items, setItems] = useState<ReportDto[]>([])
  const [running, setRunning] = useState<string | null>(null)
  const [result, setResult] = useState<unknown | null>(null)

  useEffect(() => {
    listReports().then(setItems)
  }, [])

  async function onRun(id: string) {
    setRunning(id)
    const r = await runReport(id)
    setResult(r)
    setRunning(null)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {items.map((r) => (
              <li key={r.id} className="px-2 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-neutral-600">{r.category}</div>
                    {r.description && <div className="text-xs text-neutral-500">{r.description}</div>}
                  </div>
                  <Button size="sm" onClick={() => onRun(r.id)} disabled={running === r.id}>
                    {running === r.id ? 'Running...' : 'Run'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Last Result</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          {result ? <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(result, null, 2)}</pre> : 'Run a report to see output.'}
        </CardContent>
      </Card>
    </div>
  )
}
