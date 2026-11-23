import { create } from 'zustand'
import type { User } from '#/types'
import {
  clearAuthCookies,
  getAuthToken,
  getAuthUser,
  setAuthToken,
  setAuthUser,
} from '#/lib/cookies'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setSession: (token: string, user: User, maxAge?: number) => void
  clearSession: () => void
  initSession: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize state directly from cookies
  const initialToken = getAuthToken() || null
  const initialUser = getAuthUser<User>() || null

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken,
    isLoading: false,

    setSession: (token: string, user: User, maxAge?: number) => {
      setAuthToken(token, maxAge)
      setAuthUser(user, maxAge)
      set({
        token,
        user,
        isAuthenticated: true,
      })
    },

    clearSession: () => {
      clearAuthCookies()
      set({
        token: null,
        user: null,
        isAuthenticated: false,
      })
    },

    initSession: () => {
      const token = getAuthToken() || null
      const user = getAuthUser<User>() || null
      set({
        token,
        user,
        isAuthenticated: !!token,
      })
    },

    updateUser: (updatedFields: Partial<User>) => {
      const currentUser = get().user
      if (!currentUser) return
      const newUser = { ...currentUser, ...updatedFields }
      setAuthUser(newUser)
      set({ user: newUser })
    },
  }
})
