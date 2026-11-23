import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { authApi } from '#/features/auth/api/auth-api'
import { PasswordInput } from '#/components/forms/password-input'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'

interface ResetPasswordFormProps {
  initialToken?: string
}

export function ResetPasswordForm({
  initialToken = '',
}: ResetPasswordFormProps) {
  const [token, setToken] = useState(initialToken)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!token) {
      setError('Token reset password tidak ditemukan atau tidak valid.')
      return
    }

    if (!password || !confirmPassword) {
      setError('Silakan isi password baru dan konfirmasi.')
      return
    }

    if (password.length < 6) {
      setError('Password baru minimal 6 karakter.')
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      await authApi.resetPassword({ token, password, confirmPassword })
      setIsSuccess(true)
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Gagal mengatur ulang kata sandi.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-full">
          <IconCheck className="size-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-foreground text-base font-semibold">
            Kata Sandi Berhasil Diperbarui!
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Kata sandi Anda telah berhasil direset. Silakan masuk menggunakan
            kata sandi baru Anda.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/login">
            <Button className="w-full">Masuk ke Akun</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormError message={error} />

      {!initialToken && (
        <div className="space-y-1.5">
          <label
            htmlFor="reset-token"
            className="text-foreground text-xs font-medium"
          >
            Token Reset
          </label>
          <Input
            id="reset-token"
            type="text"
            placeholder="Masukkan token dari email"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="new-password"
          className="text-foreground text-xs font-medium"
        >
          Password Baru
        </label>
        <PasswordInput
          id="new-password"
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
          htmlFor="confirm-new-password"
          className="text-foreground text-xs font-medium"
        >
          Konfirmasi Password Baru
        </label>
        <PasswordInput
          id="confirm-new-password"
          placeholder="Ulangi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          disabled={isSubmitting}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Simpan Password Baru
      </Button>
    </form>
  )
}
