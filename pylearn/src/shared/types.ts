import type {BrowserWindow, IpcMainInvokeEvent} from 'electron'
import {z} from 'zod';

import type {registerRoute} from 'lib/electron-router-dom'

export type BrowserWindowOrNull = Electron.BrowserWindow | null

type Route = Parameters<typeof registerRoute>[0]

export interface WindowProps extends Electron.BrowserWindowConstructorOptions {
  id: Route['id']
  query?: Route['query']
}

export interface WindowCreationByIPC {
  channel: string
  window(): BrowserWindowOrNull
  callback(window: BrowserWindow, event: IpcMainInvokeEvent): void
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6)
})

export type SignupSchema = z.infer<typeof signupSchema>


export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserSchema = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
export type UserListSchema = z.infer<typeof userListSchema>

export const ConceptValueSchema = z.object({
  id: z.string(),
  type: z.string(),
  value: z.string(),
});

export type ConceptValue = z.infer<typeof ConceptValueSchema>;

export const SubConceptSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.array(ConceptValueSchema),
  short_description: z.string().default("short description not provided"),
  description: z.string().default("description not provided"),
});

export type SubConcept = z.infer<typeof SubConceptSchema>;

export const ConceptSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.array(ConceptValueSchema),
  sub_concepts: z.array(SubConceptSchema),
  tags: z.array(z.string()),
  short_description: z.string().default("short description not provided"),
  description: z.string().default("description not provided"),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  common_pitfalls: z.array(z.string()).default([]),
  related_concepts: z.array(z.string()).default([]),
});

export type Concept = z.infer<typeof ConceptSchema>;

export const ProgressSchema = z.object({
  conceptId: z.string(),
  read: z.boolean().default(false),
  read_on: z.date().optional(),
  bookmarked: z.boolean().default(false),
});

export type Progress = z.infer<typeof ProgressSchema>;
