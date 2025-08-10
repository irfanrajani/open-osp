/**
 * Patients.tsx
 * Patient registry with quick search and a simple list.
 */

import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Input } from '../components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Search } from 'lucide-react'

/**
 * Patient
 * Basic patient info for listing.
 */
interface Patient {
  id: string
  name: string
  dob: string
  sex: 'M' | 'F' | 'Other'
  phone?: string
}

const MOCK_PATIENTS: Patient[] = [
  { id: 'p100', name: 'Jane Doe', dob: '1991-04-10', sex: 'F', phone: '555-1234' },
  { id: 'p101', name: 'John Smith', dob: '1984-09-21', sex: 'M', phone: '555-9933' },
  { id: 'p102', name: 'Ava Chen', dob: '1990-02-17', sex: 'F' },
  { id: 'p103', name: 'Samuel Park', dob: '1975-12-02', sex: 'M' },
]

/**
 * PatientsPage
 * Searchable list of patients leading to encounters.
 */
export default function PatientsPage() {
  const [q, setQ] = useState('')

  /** Filters patients by query across name and phone. */
  const results = useMemo(() => {
    if (!q) return MOCK_PATIENTS
    const s = q.toLowerCase()
    return MOCK_PATIENTS.filter(
      (p) => p.name.toLowerCase().includes(s) || (p.phone ?? '').toLowerCase().includes(s),
    )
  }, [q])

  return (
    <div className="space-y-4">
      <Card className="border bg-white">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Patients</CardTitle>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or phone"
              className="w-72 bg-white pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">DOB</th>
                  <th className="px-3 py-2">Sex</th>
                  <th className="px-3 py-2">Phone</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-neutral-500">
                      No patients found.
                    </td>
                  </tr>
                )}
                {results.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2">{p.dob}</td>
                    <td className="px-3 py-2">{p.sex}</td>
                    <td className="px-3 py-2">{p.phone ?? '—'}</td>
                    <td className="px-3 py-2">
                      <Link to={`/encounter/${p.id}`}>
                        <Button size="sm">Open encounter</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
