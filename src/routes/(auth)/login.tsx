import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthToken } from '#/lib/cookies'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { LoginForm } from '#/features/auth/login/login-form'

interface LoginSearchParams {
  redirect?: string
}

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: () => {
    const token = getAuthToken()
    if (token) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  const { redirect: redirectTo } = Route.useSearch()

  return (
    <AuthLayout
      title="Selamat Datang"
      description="Masuk ke akun Anda untuk melanjutkan"
      footerPrompt={{
        text: 'Belum punya akun?',
        linkText: 'Daftar sekarang',
        href: '/register',
      }}
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthLayout>
  )
}
