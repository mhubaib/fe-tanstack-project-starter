import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/forms/password-input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconLoader2 } from '@tabler/icons-react'

interface LoginFormProps {
  redirectTo?: string
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const { login, isSubmitting, error, setError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Silakan isi email dan password.')
      return
    }

    try {
      await login({ email, password, rememberMe }, redirectTo)
    } catch {
      // Error handled inside useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <label
          htmlFor="login-email"
          className="text-foreground text-xs font-medium"
        >
          Email
        </label>
        <Input
          id="login-email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-foreground text-xs font-medium"
          >
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-primary text-xs underline-offset-4 hover:underline"
          >
            Lupa password?
          </Link>
        </div>
        <PasswordInput
          id="login-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="border-input text-primary focus:ring-ring size-4 rounded"
          disabled={isSubmitting}
        />
        <label
          htmlFor="remember-me"
          className="text-muted-foreground text-xs select-none"
        >
          Ingat saya (30 hari)
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Masuk
      </Button>
    </form>
  )
}
