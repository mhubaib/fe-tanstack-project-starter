import { useAuthStore } from '#/features/auth/stores/auth-store'
import { authApi } from '#/features/auth/api/auth-api'
import type { LoginDto, RegisterDto, VerifyOtpDto } from '#/types'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function useAuth() {
  const { user, token, isAuthenticated, setSession, clearSession, updateUser } =
    useAuthStore()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (payload: LoginDto, redirectTo?: string) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await authApi.login(payload)
      if (response.data) {
        // Remember me = 30 days, otherwise default 7 days
        const maxAge = payload.rememberMe ? 60 * 60 * 24 * 30 : undefined
        setSession(response.data.token, response.data.user, maxAge)

        if (redirectTo) {
          navigate({ href: redirectTo })
        } else {
          navigate({ to: '/' })
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(message)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const register = async (payload: RegisterDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await authApi.register(payload)
      if (response.data) {
        setSession(response.data.token, response.data.user)
        navigate({ to: '/' })
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      setError(message)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyOtp = async (payload: VerifyOtpDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const response = await authApi.verifyOtp(payload)
      if (response.data) {
        setSession(response.data.token, response.data.user)
        navigate({ to: '/' })
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'OTP verification failed.'
      setError(message)
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      clearSession()
      navigate({ to: '/login' })
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isSubmitting,
    error,
    setError,
    login,
    register,
    verifyOtp,
    logout,
    updateUser,
  }
}
