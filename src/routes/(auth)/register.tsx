import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthToken } from '#/lib/cookies'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { RegisterForm } from '#/features/auth/register/register-form'

export const Route = createFileRoute('/(auth)/register')({
  beforeLoad: () => {
    const token = getAuthToken()
    if (token) {
      throw redirect({ to: '/' })
    }
  },
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <AuthLayout
      title="Buat Akun Baru"
      description="Lengkapi data di bawah ini untuk membuat akun baru"
      footerPrompt={{
        text: 'Sudah punya akun?',
        linkText: 'Masuk di sini',
        href: '/login',
      }}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
