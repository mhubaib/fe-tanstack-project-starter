import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '#/components/layouts/auth-layout'
import { VerifyOtpForm } from '#/features/auth/verify-otp/verify-otp-form'
import { OTP_PURPOSES } from '#/types'
import type { OtpPurpose } from '#/types'

interface VerifyOtpSearchParams {
  email?: string
  purpose?: OtpPurpose
}

export const Route = createFileRoute('/(auth)/verify-otp')({
  validateSearch: (search: Record<string, unknown>): VerifyOtpSearchParams => ({
    email: typeof search.email === 'string' ? search.email : undefined,
    purpose:
      typeof search.purpose === 'string'
        ? (search.purpose as OtpPurpose)
        : undefined,
  }),
  component: VerifyOtpPage,
})

function VerifyOtpPage() {
  const { email, purpose } = Route.useSearch()

  const getHeaderInfo = (p?: string, e?: string) => {
    switch (p) {
      case OTP_PURPOSES.RESET_PASSWORD:
        return {
          title: 'Verifikasi Reset Password',
          description: e
            ? `Masukkan kode OTP 6 digit yang telah dikirim ke ${e}.`
            : 'Masukkan kode OTP 6 digit untuk melanjutkan proses pengaturan ulang kata sandi.',
        }
      case OTP_PURPOSES.LOGIN:
        return {
          title: 'Verifikasi Login 2FA',
          description: e
            ? `Masukkan kode OTP 6 digit yang telah dikirim ke ${e}.`
            : 'Masukkan kode OTP 6 digit untuk menyelesaikan proses masuk ke akun Anda.',
        }
      case OTP_PURPOSES.EMAIL_VERIFICATION:
      default:
        return {
          title: 'Verifikasi OTP',
          description: e
            ? `Masukkan kode verifikasi 6 digit yang telah dikirim ke ${e}.`
            : 'Masukkan kode verifikasi 6 digit yang telah dikirim ke email Anda.',
        }
    }
  }

  const { title, description } = getHeaderInfo(purpose, email)

  return (
    <AuthLayout
      title={title}
      description={description}
      footerPrompt={{
        text: 'Salah email atau ingin masuk?',
        linkText: 'Kembali ke Login',
        href: '/login',
      }}
    >
      <VerifyOtpForm initialEmail={email} initialPurpose={purpose} />
    </AuthLayout>
  )
}
