import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthToken } from '#/lib/cookies'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { ForgotPasswordForm } from '#/features/auth/forgot-password/forgot-password-form'

export const Route = createFileRoute('/(auth)/forgot-password')({
  beforeLoad: () => {
    const token = getAuthToken()
    if (token) {
      throw redirect({ to: '/' })
    }
  },
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Lupa Kata Sandi"
      description="Masukkan email yang terdaftar untuk menerima petunjuk reset kata sandi"
      footerPrompt={{
        text: 'Ingat kata sandi Anda?',
        linkText: 'Masuk di sini',
        href: '/login',
      }}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
