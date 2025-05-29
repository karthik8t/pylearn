import type { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { z } from 'zod';

import type { registerRoute } from 'lib/electron-router-dom'

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
