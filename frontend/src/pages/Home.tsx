/**
 * Home.tsx
 * Landing page with quick links and a friendly overview.
 */

import { Link } from 'react-router'
import { CalendarDays, Users, Stethoscope } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'

/**
 * HomePage
 * Portal-like home with primary shortcuts and highlights.
 */
export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold md:text-3xl">Welcome to OSCare</h1>
            <p className="mt-2 text-neutral-600">
              A clean, modern interface for scheduling, documentation, and patient management.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/appointments">
                <Button>Open Appointments</Button>
              </Link>
              <Link to="/patients">
                <Button variant="outline" className="bg-transparent">Find Patient</Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://pub-cdn.sider.ai/u/U0Z6H6JWVL1/web-coder/6899066414f019f2a8452783/resource/0d65af62-8ca1-4604-8bd4-b4bca2ea60a7.jpg" className="object-cover w-full h-64 md:h-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Quick cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-emerald-600" />
              Today&apos;s Schedule
            </CardTitle>
            <CardDescription>Review and manage upcoming visits.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-neutral-700">
              <li>09:00 - New Patient Intake</li>
              <li>10:15 - Follow-up: J. Smith</li>
              <li>11:30 - Annual Physical: A. Chen</li>
            </ul>
            <Link to="/appointments" className="mt-4 inline-block">
              <Button size="sm" variant="outline" className="bg-transparent">View appointments</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-emerald-600" />
              Encounter Notes
            </CardTitle>
            <CardDescription>SOAP templates and orders at your fingertips.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-700">
              Launch the note editor to document your next visit.
            </p>
            <Link to="/encounter/1234" className="mt-4 inline-block">
              <Button size="sm">Open demo encounter</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              Patient Registry
            </CardTitle>
            <CardDescription>Search, filter, and manage patient profiles.</CardDescription>
          </CardHeader>
          <CardContent>
            <img src="https://pub-cdn.sider.ai/u/U0Z6H6JWVL1/web-coder/6899066414f019f2a8452783/resource/8edd51d5-9184-4505-8722-ebf0b86e980b.jpg" className="object-cover w-full h-28 rounded-md" />
            <Link to="/patients" className="mt-4 inline-block">
              <Button size="sm" variant="outline" className="bg-transparent">Browse patients</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
