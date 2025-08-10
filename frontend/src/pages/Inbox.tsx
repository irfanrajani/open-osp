/**
 * Inbox.tsx
 * Triage-style Inbox for Labs, Documents, and Results with list + preview layout.
 */

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { getInboxItems, acknowledgeItem } from '../lib/api/modules/inbox'
import { InboxItemDto } from '../lib/api/types'
import { Clock, User, FileText, FlaskConical, Check } from 'lucide-react'

/**
 * InboxPage
 * Mirrors OSCAR's Inbox concept: queue of incoming items with assignment and acknowledgment.
 */
export default function InboxPage() {
  const [type, setType] = useState<'All' | 'Lab' | 'Document' | 'Result'>('All')
  const [items, setItems] = useState<InboxItemDto[]>([])
  const [selected, setSelected] = useState<InboxItemDto | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInboxItems(type === 'All' ? undefined : { type })
      .then(setItems)
      .finally(() => setLoading(false))
  }, [type])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
      <Card className="border bg-white">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Inbox</CardTitle>
          <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Lab">Labs</SelectItem>
              <SelectItem value="Document">Documents</SelectItem>
              <SelectItem value="Result">Results</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {loading && <li className="py-8 text-center text-neutral-500 text-sm">Loading...</li>}
            {!loading && items.length === 0 && <li className="py-8 text-center text-neutral-500 text-sm">No items.</li>}
            {items.map((it) => (
              <li
                key={it.id}
                className={`cursor-pointer px-2 py-3 hover:bg-neutral-50 ${selected?.id === it.id ? 'bg-emerald-50' : ''}`}
                onClick={() => setSelected(it)}
              >
                <div className="flex items-start gap-3">
                  <TypeIcon type={it.type} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{it.summary}</span>
                      <Badge variant="secondary">{it.type}</Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                      {it.patientName && (
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {it.patientName}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(it.receivedAt).toLocaleString()}
                      </span>
                      <span className="text-neutral-500">{it.status}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!selected ? (
            <div className="text-sm text-neutral-500">Select an item to preview details.</div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <TypeIcon type={selected.type} />
                <div className="font-medium">{selected.summary}</div>
              </div>
              <div className="text-sm text-neutral-600">
                Received: {new Date(selected.receivedAt).toLocaleString()}
              </div>
              <div className="rounded-md border bg-neutral-50 p-3 text-sm">
                This is a placeholder for the {selected.type.toLowerCase()} content preview (PDF, text, or structured lab).
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => acknowledgeItem(selected.id)} className="">
                  <Check className="mr-1 h-4 w-4" /> Acknowledge
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent">Assign</Button>
                <Button size="sm" variant="outline" className="bg-transparent">Link to encounter</Button>
                <Button size="sm" variant="outline" className="bg-transparent">File</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/** TypeIcon renders a type-specific icon. */
function TypeIcon({ type }: { type: 'Lab' | 'Document' | 'Result' }) {
  if (type === 'Lab') return <FlaskConical className="h-5 w-5 text-emerald-600" />
  if (type === 'Document') return <FileText className="h-5 w-5 text-emerald-600" />
  return <ClipboardList className="h-5 w-5 text-emerald-600" />
}
