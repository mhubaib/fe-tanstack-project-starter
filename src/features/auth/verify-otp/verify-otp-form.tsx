import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '#/features/auth/hooks/use-auth'
import { authApi } from '#/features/auth/api/auth-api'
import { Label } from '#/components/ui/label'
import { Button } from '#/components/ui/button'
import { FormError } from '#/components/forms/form-error'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '#/components/ui/input-otp'
import { IconCheck, IconLoader2, IconRefresh } from '@tabler/icons-react'
import { OTP_PURPOSES, verifyOtpSchema } from '#/types'
import type { OtpPurpose, VerifyOtpDto } from '#/types'

interface VerifyOtpFormProps {
  initialEmail?: string
  initialPurpose?: OtpPurpose
}

export function VerifyOtpForm({
  initialEmail = '',
  initialPurpose = OTP_PURPOSES.EMAIL_VERIFICATION,
}: VerifyOtpFormProps) {
  const { verifyOtp, isSubmitting, error, setError } = useAuth()
  const [resendCooldown, setResendCooldown] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpDto>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: initialEmail,
      otp: '',
      purpose: initialPurpose,
    },
  })

  useEffect(() => {
    if (initialEmail) {
      setValue('email', initialEmail)
    }
    setValue('purpose', initialPurpose)
  }, [initialEmail, initialPurpose, setValue])

  const emailValue = watch('email')
  const otpValue = watch('otp')

  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleResend = async () => {
    if (!emailValue || resendCooldown > 0 || isResending) return
    setIsResending(true)
    setResendSuccess(false)
    try {
      await authApi.resendOtp(emailValue)
      setResendSuccess(true)
      setResendCooldown(60)
    } catch {
      setError('Gagal mengirim ulang OTP. Silakan coba lagi.')
    } finally {
      setIsResending(false)
    }
  }

  const onSubmit = async (data: VerifyOtpDto) => {
    try {
      await verifyOtp(data)
    } catch {
      // Error handled in useAuth
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormError message={error || errors.email?.message} />

      {resendSuccess && (
        <div className="border-primary/30 bg-primary/10 text-primary flex items-center gap-2 rounded-lg border p-2.5 text-xs">
          <IconCheck className="size-4 shrink-0" />
          <span>Kode OTP baru berhasil dikirim ke email Anda!</span>
        </div>
      )}

      <input type="hidden" {...register('email')} />

      <div className="flex flex-col items-center justify-center gap-4">
        <Label>Masukkan 6-Digit Kode OTP</Label>
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              disabled={isSubmitting}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.otp && (
          <p className="text-destructive text-xs">{errors.otp.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || otpValue.length < 6}
      >
        {isSubmitting && <IconLoader2 className="mr-2 size-4 animate-spin" />}
        Verifikasi OTP
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={resendCooldown > 0 || isResending || !emailValue}
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
