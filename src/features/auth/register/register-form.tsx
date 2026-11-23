import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/forms/password-input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconLoader2 } from '@tabler/icons-react'

export function RegisterForm() {
  const { register, isSubmitting, error, setError } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setError('Semua kolom wajib diisi.')
      return
    }

    if (password.length < 6) {
      setError('Password minimal harus 6 karakter.')
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    try {
      await register({ name, email, password, confirmPassword })
    } catch {
      // Error handled in useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <label
          htmlFor="reg-name"
          className="text-foreground text-xs font-medium"
        >
          Nama Lengkap
        </label>
        <Input
          id="reg-name"
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="reg-email"
          className="text-foreground text-xs font-medium"
        >
          Email
        </label>
        <Input
          id="reg-email"
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
        <label
          htmlFor="reg-password"
          className="text-foreground text-xs font-medium"
        >
          Password
        </label>
        <PasswordInput
          id="reg-password"
          placeholder="Minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="reg-confirm-password"
          className="text-foreground text-xs font-medium"
        >
          Konfirmasi Password
        </label>
        <PasswordInput
          id="reg-confirm-password"
          placeholder="Ulangi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          disabled={isSubmitting}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Daftar Sekarang
      </Button>
    </form>
  )
}
