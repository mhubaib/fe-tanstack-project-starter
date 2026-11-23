import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { authApi } from '#/features/auth/api/auth-api'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconCheck, IconLoader2, IconMail } from '@tabler/icons-react'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Silakan masukkan email Anda.')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      await authApi.forgotPassword({ email })
      setIsSubmitted(true)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Gagal memproses permintaan reset password.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-full">
          <IconCheck className="size-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-foreground text-base font-semibold">
            Tautan Terkirim!
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Jika akun dengan email{' '}
            <span className="font-medium text-foreground">{email}</span>{' '}
            terdaftar, kami telah mengirimkan instruksi pengaturan ulang kata
            sandi.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Kembali ke Login
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <label
          htmlFor="forgot-email"
          className="text-foreground text-xs font-medium"
        >
          Email Akun
        </label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={isSubmitting}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <IconLoader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <IconMail className="mr-2 size-4" />
        )}
        Kirim Tautan Reset
      </Button>
    </form>
  )
}
