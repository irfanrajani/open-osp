/**
 * App.tsx
 * Main router for the application. Declares the shell layout and routes.
 */

import { HashRouter, Route, Routes } from 'react-router'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/Home'
import AppointmentsPage from './pages/Appointments'
import EncounterPage from './pages/Encounter'
import PatientsPage from './pages/Patients'
import DashboardPage from './pages/Dashboard'
import InboxPage from './pages/Inbox'
import MessagesPage from './pages/Messages'
import TicklersPage from './pages/Ticklers'
import CaseloadPage from './pages/Caseload'
import ReportsPage from './pages/Reports'
import AdminPage from './pages/Admin'
import PreferencesPage from './pages/Preferences'

/**
 * App
 * Declares app routes using HashRouter to work on static hosting.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="encounter/:id" element={<EncounterPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="ticklers" element={<TicklersPage />} />
          <Route path="caseload" element={<CaseloadPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="settings" element={<PreferencesPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
