/**
 * types.ts
 * zod-validated DTOs and TypeScript types representing canonical EMR entities.
 * These act as normalized contracts between legacy OSCAR/OpenOSP responses and the UI.
 */

import { z } from 'zod'

/** Patient DTO schema */
export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dob: z.string(), // ISO date string; normalize from legacy formats
  sex: z.enum(['M', 'F', 'Other']).or(z.string()).transform((v) => (v === 'M' || v === 'F' ? v : 'Other')),
  phone: z.string().optional().nullable().transform((v) => (v ?? undefined)),
})
export type PatientDto = z.infer<typeof PatientSchema>

/** Provider DTO schema */
export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
})
export type ProviderDto = z.infer<typeof ProviderSchema>

/** Appointment DTO schema */
export const AppointmentSchema = z.object({
  id: z.string(),
  date: z.string(), // YYYY-MM-DD
  time: z.string(), // HH:mm
  patientName: z.string(),
  reason: z.string().optional().default(''),
  phone: z.string().optional(),
  providerId: z.string(),
  status: z.enum(['Scheduled', 'Arrived', 'In Room', 'Completed', 'Cancelled']).default('Scheduled'),
})
export type AppointmentDto = z.infer<typeof AppointmentSchema>

/** Encounter Note schema (simplified SOAP) */
export const EncounterNoteSchema = z.object({
  id: z.string(),
  encounterId: z.string(),
  subjective: z.string().default(''),
  objective: z.string().default(''),
  assessment: z.string().default(''),
  plan: z.string().default(''),
  signedAt: z.string().optional(),
})
export type EncounterNoteDto = z.infer<typeof EncounterNoteSchema>

/** Inbox item: Labs, Documents, Results */
export const InboxItemSchema = z.object({
  id: z.string(),
  type: z.enum(['Lab', 'Document', 'Result']),
  receivedAt: z.string(),
  patientName: z.string().optional(),
  summary: z.string(),
  assignedTo: z.string().optional(),
  status: z.enum(['New', 'Assigned', 'Ack', 'Filed']).default('New'),
})
export type InboxItemDto = z.infer<typeof InboxItemSchema>

/** Message schema (internal messages) */
export const MessageSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  sentAt: z.string(),
  subject: z.string(),
  body: z.string().default(''),
  read: z.boolean().default(false),
})
export type MessageDto = z.infer<typeof MessageSchema>

/** Tickler (task) schema */
export const TicklerSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
  dueAt: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.enum(['Open', 'In Progress', 'Done']).default('Open'),
  link: z.string().optional(),
})
export type TicklerDto = z.infer<typeof TicklerSchema>

/** Dashboard stats schema */
export const DashboardStatsSchema = z.object({
  date: z.string(),
  totalAppointments: z.number(),
  arrived: z.number(),
  inRoom: z.number(),
  resultsToReview: z.number(),
  unreadMessages: z.number(),
  openTicklers: z.number(),
})
export type DashboardStatsDto = z.infer<typeof DashboardStatsSchema>

/** Report descriptor */
export const ReportSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
})
export type ReportDto = z.infer<typeof ReportSchema>
