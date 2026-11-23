import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { authApi } from '#/features/auth/api/auth-api'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#/components/ui/input-otp'
import { IconCheck, IconLoader2, IconRefresh } from '@tabler/icons-react'

interface VerifyOtpFormProps {
  initialEmail?: string
}

export function VerifyOtpForm({ initialEmail = '' }: VerifyOtpFormProps) {
  const { verifyOtp, isSubmitting, error, setError } = useAuth()
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleResend = async () => {
    if (!email || resendCooldown > 0 || isResending) return
    setIsResending(true)
    setResendSuccess(false)
    try {
      await authApi.resendOtp(email)
      setResendSuccess(true)
      setResendCooldown(60)
    } catch {
      setError('Gagal mengirim ulang OTP. Silakan coba lagi.')
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Email wajib diisi.')
      return
    }
    if (otp.length < 6) {
      setError('Silakan masukkan 6 digit kode OTP.')
      return
    }

    try {
      await verifyOtp({ email, otp })
    } catch {
      // Error handled in useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormError message={error} />

      {resendSuccess && (
        <div className="border-primary/30 bg-primary/10 text-primary flex items-center gap-2 rounded-lg border p-2.5 text-xs">
          <IconCheck className="size-4 shrink-0" />
          <span>Kode OTP baru berhasil dikirim ke email Anda!</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="otp-email"
          className="text-foreground text-xs font-medium"
        >
          Email Penerima OTP
        </label>
        <Input
          id="otp-email"
          type="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || !!initialEmail}
          required
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2">
        <label className="text-foreground text-xs font-medium">
          Masukkan 6-Digit Kode OTP
        </label>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(val) => setOtp(val)}
          disabled={isSubmitting}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || otp.length < 6}
      >
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Verifikasi OTP
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0 || isResending || !email}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending ? (
            <IconLoader2 className="size-3.5 animate-spin" />
          ) : (
            <IconRefresh className="size-3.5" />
          )}
          {resendCooldown > 0
            ? `Kirim ulang OTP dalam ${resendCooldown}s`
            : 'Kirim ulang kode OTP'}
        </button>
      </div>
    </form>
  )
}
