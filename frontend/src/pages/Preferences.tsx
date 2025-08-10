/**
 * Preferences.tsx
 * User preferences (analogous to OSCAR's Preferences/Settings).
 */

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

/**
 * PreferencesPage
 * Offers a small form for personal settings.
 */
export default function PreferencesPage() {
  const [form, setForm] = useState({ displayName: 'Dr. Lee', theme: 'system', notifications: true })

  return (
    <Card className="border bg-white">
      <CardHeader>
        <CardTitle className="text-base">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid max-w-lg grid-cols-1 gap-3">
          <div className="space-y-1">
            <Label htmlFor="displayName">Display name</Label>
            <Input id="displayName" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} className="bg-white" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="theme">Theme</Label>
            <select id="theme" value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })} className="w-full rounded-md border bg-white px-3 py-2 text-sm">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="notif" type="checkbox" checked={form.notifications} onChange={(e) => setForm({ ...form, notifications: e.target.checked })} />
            <Label htmlFor="notif">Enable notifications</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Save</Button>
          <Button size="sm" variant="outline" className="bg-transparent">Reset</Button>
        </div>
      </CardContent>
    </Card>
  )
}
