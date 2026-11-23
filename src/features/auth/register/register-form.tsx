import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/forms/password-input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconLoader2 } from '@tabler/icons-react'
import { registerSchema } from '#/types'
import type { RegisterDto } from '#/types'

export function RegisterForm() {
  const { register: registerAuth, isSubmitting, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterDto) => {
    try {
      await registerAuth(data)
    } catch {
      // Error handled in useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <Label htmlFor="reg-name">Nama Lengkap</Label>
        <Input
          id="reg-name"
          type="text"
          placeholder="Nama Anda"
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
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

      <div className="space-y-1.5">
        <Label htmlFor="reg-password">Password</Label>
        <PasswordInput
          id="reg-password"
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
        <Label htmlFor="reg-confirm-password">Konfirmasi Password</Label>
        <PasswordInput
          id="reg-confirm-password"
          placeholder="Ulangi password"
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
        Daftar Sekarang
      </Button>
    </form>
  )
}
