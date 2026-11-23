import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { authApi } from '#/features/auth/api/auth-api'
import { PasswordInput } from '#/components/forms/password-input'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconCheck, IconLoader2 } from '@tabler/icons-react'
import { resetPasswordSchema } from '#/types'
import type { ResetPasswordDto } from '#/types'

interface ResetPasswordFormProps {
  initialToken?: string
}

export function ResetPasswordForm({
  initialToken = '',
}: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: initialToken,
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await authApi.resetPassword(data)
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={error} />

      {!initialToken && (
        <div className="space-y-1.5">
          <Label htmlFor="reset-token">Token Reset</Label>
          <Input
            id="reset-token"
            type="text"
            placeholder="Masukkan token dari email"
            disabled={isSubmitting}
            aria-invalid={!!errors.token}
            {...register('token')}
          />
          {errors.token && (
            <p className="text-destructive text-xs">{errors.token.message}</p>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="new-password">Password Baru</Label>
        <PasswordInput
          id="new-password"
          placeholder="Minimal 6 karakter"
          autoComplete="new-password"
          disabled={isSubmitting}
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm-new-password">Konfirmasi Password Baru</Label>
        <PasswordInput
          id="confirm-new-password"
          placeholder="Ulangi password baru"
          autoComplete="new-password"
          disabled={isSubmitting}
          aria-invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Simpan Password Baru
      </Button>
    </form>
  )
}
