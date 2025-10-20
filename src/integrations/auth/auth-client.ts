import { createAuthClient } from 'better-auth/react'
import { API_URL } from '@/constants/api-url'
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: API_URL,
})

export const { signIn, signUp, useSession, getSession } = authClient
