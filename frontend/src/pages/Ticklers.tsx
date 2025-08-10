/**
 * Ticklers.tsx
 * Tickler (task) list and simple status indicators, akin to OSCAR's Tickler system.
 */

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { getTicklers } from '../lib/api/modules/ticklers'
import { TicklerDto } from '../lib/api/types'
import { Link } from 'react-router'

/**
 * TicklersPage
 * Shows open tasks with quick context and links.
 */
export default function TicklersPage() {
  const [items, setItems] = useState<TicklerDto[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTicklers()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Card className="border bg-white">
      <CardHeader>
        <CardTitle className="text-base">Ticklers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {loading && <li className="py-8 text-center text-sm text-neutral-500">Loading...</li>}
          {!loading && items.length === 0 && <li className="py-8 text-center text-sm text-neutral-500">No open ticklers.</li>}
          {items.map((t) => (
            <li key={t.id} className="px-2 py-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">{t.title}</div>
                <Badge variant="secondary">{t.status}</Badge>
              </div>
              <div className="text-xs text-neutral-600">
                Created: {new Date(t.createdAt).toLocaleString()} {t.assignedTo ? `• Assigned to: ${t.assignedTo}` : ''}
              </div>
              {t.link && (
                <Link to={t.link} className="mt-1 inline-block text-xs text-emerald-700 hover:underline">
                  Open related item
                </Link>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
