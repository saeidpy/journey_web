import {createContext, useContext} from 'react'
import {Profile} from 'src/shared/types/server'

export type UserContextRealValues = {
  user?: Partial<Profile>
  token: string
  tokenExpireTimestamp: number
  refreshToken: string
  tokenType: string
}

export interface UserContextValue {
  user?: Partial<Profile>
  token?: string
  tokenType?: string
  tokenExpireTimestamp?: number
  refreshToken?: string

  setAuth: (value: UserContextRealValues, url?: string) => void

  setUser: (user: Partial<Profile>) => void
}
export const UserContext = createContext<UserContextValue | null>(null)

export function useUserProfile(): UserContextValue {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserProfile must be used inside the AuthGuard')
  }
  return context
}
