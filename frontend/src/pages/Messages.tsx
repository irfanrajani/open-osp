/**
 * Messages.tsx
 * Internal messaging center similar to OSCAR's Messages/Tickler inbox.
 */

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { getMessages, sendMessage } from '../lib/api/modules/messages'
import { MessageDto } from '../lib/api/types'

/**
 * MessagesPage
 * Displays a list of messages and a simple composer.
 */
export default function MessagesPage() {
  const [items, setItems] = useState<MessageDto[]>([])
  const [loading, setLoading] = useState(false)
  const [compose, setCompose] = useState({ to: '', subject: '', body: '' })

  useEffect(() => {
    setLoading(true)
    getMessages()
      .then(setItems)
      .finally(() => setLoading(false))
  }, [])

  async function onSend() {
    await sendMessage(compose)
    setCompose({ to: '', subject: '', body: '' })
    const refreshed = await getMessages()
    setItems(refreshed)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {loading && <li className="py-8 text-center text-sm text-neutral-500">Loading...</li>}
            {!loading && items.length === 0 && <li className="py-8 text-center text-sm text-neutral-500">No messages.</li>}
            {items.map((m) => (
              <li key={m.id} className={`px-2 py-3 ${m.read ? '' : 'bg-emerald-50/40'}`}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{m.subject}</div>
                  <div className="text-xs text-neutral-500">{new Date(m.sentAt).toLocaleString()}</div>
                </div>
                <div className="text-xs text-neutral-600">From: {m.from} • To: {m.to}</div>
                <div className="mt-1 text-sm">{m.body}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border bg-white">
        <CardHeader>
          <CardTitle className="text-base">Compose</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="To (provider or role)" value={compose.to} onChange={(e) => setCompose({ ...compose, to: e.target.value })} className="bg-white" />
          <Input placeholder="Subject" value={compose.subject} onChange={(e) => setCompose({ ...compose, subject: e.target.value })} className="bg-white" />
          <Textarea placeholder="Message body" value={compose.body} onChange={(e) => setCompose({ ...compose, body: e.target.value })} className="bg-white min-h-[120px]" />
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={onSend}>Send</Button>
            <Button size="sm" variant="outline" className="bg-transparent" onClick={() => setCompose({ to: '', subject: '', body: '' })}>Discard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
