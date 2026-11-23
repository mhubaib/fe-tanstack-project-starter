import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { authApi } from '#/features/auth/api/auth-api'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconCheck, IconLoader2, IconMail } from '@tabler/icons-react'
import { forgotPasswordSchema } from '#/types'
import type { ForgotPasswordDto } from '#/types'

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await authApi.forgotPassword(data)
      setSubmittedEmail(data.email)
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

  if (submittedEmail) {
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
            <span className="text-foreground font-medium">
              {submittedEmail}
            </span>{' '}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <Label htmlFor="forgot-email">Email Akun</Label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="nama@email.com"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <IconLoader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <IconMail className="mr-2 size-4" />
        )}
        Kirim Kode Verifikasi
      </Button>
    </form>
  )
}
