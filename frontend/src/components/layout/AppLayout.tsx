/**
 * AppLayout.tsx
 * Application shell: sidebar navigation + top bar, renders nested routes via <Outlet/>.
 */

import { Outlet, NavLink, Link, useLocation } from 'react-router'
import { useState } from 'react'
import { CalendarDays, Stethoscope, Users, Settings, Menu, Hospital, Search, LayoutDashboard, Inbox, MessageSquare, ClipboardList, BriefcaseMedical, BarChart3 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

/**
 * NavItem
 * Interface describing a sidebar navigation item.
 */
interface NavItem {
  /** Unique key and route path. */
  to: string
  /** Label to show. */
  label: string
  /** Icon component. */
  icon: React.ComponentType<{ className?: string }>
}

/**
 * AppLayout
 * Provides a consistent layout with responsive sidebar and a top utility bar.
 */
export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  /** Sidebar navigation configuration. */
  const nav: NavItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/appointments', label: 'Appointments', icon: CalendarDays },
    { to: '/patients', label: 'Patients', icon: Users },
    { to: '/encounter/1234', label: 'Encounter Demo', icon: Stethoscope },
    { to: '/inbox', label: 'Inbox', icon: Inbox },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/ticklers', label: 'Ticklers', icon: ClipboardList },
    { to: '/caseload', label: 'Caseload', icon: BriefcaseMedical },
    { to: '/reports', label: 'Reports', icon: BarChart3 },
    { to: '/admin', label: 'Administration', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
          <Button
            variant="outline"
            className="md:hidden bg-transparent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <Hospital className="h-6 w-6 text-emerald-600" />
            <span className="font-semibold">OSCare</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search patients, charts, orders..."
                className="pl-9 w-72"
              />
            </div>
            <Link to="/preferences">
              <Button variant="outline" className="bg-transparent">Preferences</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Body with sidebar + content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside
          className={`border-r bg-white md:static ${open ? 'block' : 'hidden'} md:block`}
        >
          <nav className="p-3">
            <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
              Navigation
            </div>
            <ul className="space-y-1">
              {nav.map((n) => {
                const Icon = n.icon
                const active =
                  location.pathname === n.to ||
                  (n.to !== '/' && location.pathname.startsWith(n.to))
                return (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{n.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 border-t pt-3">
              <NavLink
                to="/preferences"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              >
                <Settings className="h-4 w-4" />
                <span>Preferences</span>
              </NavLink>
            </div>
          </nav>
        </aside>

        {/* Route content */}
        <main className="min-h-[calc(100vh-65px)] bg-neutral-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
