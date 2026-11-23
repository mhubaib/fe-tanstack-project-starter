import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { VerifyOtpForm } from '#/features/auth/verify-otp/verify-otp-form'

interface VerifyOtpSearchParams {
  email?: string
}

export const Route = createFileRoute('/(auth)/verify-otp')({
  validateSearch: (search: Record<string, unknown>): VerifyOtpSearchParams => ({
    email: typeof search.email === 'string' ? search.email : undefined,
  }),
  component: VerifyOtpPage,
})

function VerifyOtpPage() {
  const { email } = Route.useSearch()

  return (
    <AuthLayout
      title="Verifikasi OTP"
      description="Masukkan kode verifikasi 6 digit yang telah dikirim ke email Anda"
      footerPrompt={{
        text: 'Salah email atau ingin masuk?',
        linkText: 'Kembali ke Login',
        href: '/login',
      }}
    >
      <VerifyOtpForm initialEmail={email} />
    </AuthLayout>
  )
}
