import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { Label } from '#/components/ui/label'
import { Input } from '#/components/ui/input'
import { PasswordInput } from '#/components/forms/password-input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import { IconLoader2 } from '@tabler/icons-react'
import { loginSchema } from '#/types'
import type { LoginDto } from '#/types'
import { Checkbox } from '#/components/ui/checkbox'

interface LoginFormProps {
  redirectTo?: string
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const { login, isSubmitting, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginDto) => {
    try {
      await login(data, redirectTo)
    } catch {
      // Error handled inside useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormError message={error} />

      <div className="space-y-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
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
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
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
          autoComplete="current-password"
          disabled={isSubmitting}
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember-me"
          disabled={isSubmitting}
          {...register('rememberMe')}
        />
        <Label
          htmlFor="remember-me"
          className="text-muted-foreground text-xs font-normal"
        >
          Ingat saya
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Masuk
      </Button>
    </form>
  )
}
