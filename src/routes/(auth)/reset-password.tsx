import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { ResetPasswordForm } from '#/features/auth/reset-password/reset-password-form'

interface ResetPasswordSearchParams {
  token?: string
}

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: (
    search: Record<string, unknown>,
  ): ResetPasswordSearchParams => ({
    token: typeof search.token === 'string' ? search.token : undefined,
  }),
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const { token } = Route.useSearch()

  return (
    <AuthLayout
      title="Atur Ulang Kata Sandi"
      description="Masukkan kata sandi baru untuk mengamankan akun Anda"
      footerPrompt={{
        text: 'Batal atau ingin kembali?',
        linkText: 'Kembali ke Login',
        href: '/login',
      }}
    >
      <ResetPasswordForm initialToken={token} />
    </AuthLayout>
  )
}
