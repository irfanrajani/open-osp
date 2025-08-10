/**
 * Encounter.tsx
 * Modern encounter workspace with tabs for Notes, Vitals, Orders, and History.
 */

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { User, AlertTriangle } from 'lucide-react'

/**
 * NoteFields
 * Structured fields for a SOAP-style note.
 */
interface NoteFields {
  subjective: string
  objective: string
  assessment: string
  plan: string
}

/**
 * EncounterPage
 * Provides a charting interface ready to integrate with APIs.
 */
export default function EncounterPage() {
  const [tab, setTab] = useState<string>('note')
  const [note, setNote] = useState<NoteFields>({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  })

  /** Inserts canned text for the selected section to accelerate charting. */
  function insertTemplate(section: keyof NoteFields, text: string) {
    setNote((n) => ({ ...n, [section]: n[section] ? n[section] + '\n' + text : text }))
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      {/* Main chart area */}
      <div className="space-y-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-white">
            <TabsTrigger value="note">Note</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="note" className="space-y-4">
            <Card className="border bg-white">
              <CardHeader>
                <CardTitle className="text-base">SOAP Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subjective */}
                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Subjective</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => insertTemplate('subjective', 'Patient reports improving cough over 3 days. Denies fever or chest pain.')}
                      >
                        Insert template
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={note.subjective}
                    onChange={(e) => setNote({ ...note, subjective: e.target.value })}
                    placeholder="Chief complaint, HPI, ROS..."
                    className="min-h-[100px] bg-white"
                  />
                </section>

                {/* Objective */}
                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Objective</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => insertTemplate('objective', 'General: NAD. Lungs: CTA bilaterally. CV: RRR, no m/r/g.')}
                      >
                        Insert template
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={note.objective}
                    onChange={(e) => setNote({ ...note, objective: e.target.value })}
                    placeholder="Exam, relevant labs/imaging..."
                    className="min-h-[100px] bg-white"
                  />
                </section>

                {/* Assessment */}
                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Assessment</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => insertTemplate('assessment', 'Acute cough, likely viral URI. Hypertension, controlled.')}
                      >
                        Insert template
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={note.assessment}
                    onChange={(e) => setNote({ ...note, assessment: e.target.value })}
                    placeholder="Differential and working diagnoses..."
                    className="min-h-[90px] bg-white"
                  />
                </section>

                {/* Plan */}
                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Plan</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => insertTemplate('plan', 'Supportive care; rest, fluids. Return precautions reviewed. Follow up PRN.')}
                      >
                        Insert template
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={note.plan}
                    onChange={(e) => setNote({ ...note, plan: e.target.value })}
                    placeholder="Treatment, orders, follow-up..."
                    className="min-h-[100px] bg-white"
                  />
                </section>

                <div className="flex flex-wrap gap-2">
                  <Button>Sign</Button>
                  <Button variant="outline" className="bg-transparent">Save Draft</Button>
                  <Button variant="outline" className="bg-transparent">Share</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals">
            <Card className="border bg-white">
              <CardHeader>
                <CardTitle className="text-base">Vitals</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <VitalInput label="BP (mmHg)" placeholder="120/80" />
                <VitalInput label="HR (bpm)" placeholder="72" />
                <VitalInput label="Temp (°C)" placeholder="37.0" />
                <VitalInput label="Resp (rpm)" placeholder="14" />
                <VitalInput label="SpO₂ (%)" placeholder="98" />
                <VitalInput label="Weight (kg)" placeholder="70" />
                <div className="col-span-full flex gap-2 pt-2">
                  <Button>Save Vitals</Button>
                  <Button variant="outline" className="bg-transparent">Import from device</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="border bg-white">
              <CardHeader>
                <CardTitle className="text-base">Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <Input placeholder="Medication (e.g., Amoxicillin 500 mg)" className="bg-white" />
                  <Input placeholder="Labs (e.g., CBC, CMP)" className="bg-white" />
                  <Input placeholder="Imaging (e.g., CXR)" className="bg-white" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">CBC</Badge>
                  <Badge variant="secondary">CMP</Badge>
                  <Badge variant="secondary">A1C</Badge>
                </div>
                <div className="flex gap-2">
                  <Button>Place Orders</Button>
                  <Button variant="outline" className="bg-transparent">Save as set</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border bg-white">
              <CardHeader>
                <CardTitle className="text-base">History</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>2025-03-10 — Follow-up visit — Hypertension stable.</li>
                  <li>2025-01-02 — Telehealth — URI, supportive care.</li>
                  <li>2024-11-21 — Annual physical — All screenings up to date.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right sidebar: patient summary */}
      <aside className="space-y-4">
        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-5 w-5 text-emerald-600" />
              Jane Doe — 34F
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div><span className="text-neutral-500">MRN:</span> 1234-5678</div>
            <div><span className="text-neutral-500">Allergies:</span> NKDA</div>
            <div><span className="text-neutral-500">Problems:</span> Hypertension</div>
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              No advanced directive on file.
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-white">
          <CardHeader>
            <CardTitle className="text-base">Active Medications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div>Lisinopril 10 mg daily</div>
            <div>Vitamin D 1000 IU daily</div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}

/**
 * VitalInput
 * Small reusable field for vitals entry.
 */
function VitalInput({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-neutral-500">{label}</div>
      <Input placeholder={placeholder} className="bg-white" />
    </div>
  )
}
