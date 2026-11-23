import { z } from 'zod'
import { userSchema } from './user'

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().optional(),
})

export const loginSchema = z.object({
  email: z.email('Format email tidak valid').min(1, 'Email wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nama wajib diisi'),
    email: z.email('Format email tidak valid').min(1, 'Email wajib diisi'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

export const OTP_PURPOSES = {
  EMAIL_VERIFICATION: 'email-verification',
  RESET_PASSWORD: 'reset-password',
  LOGIN: 'login',
} as const

export type OtpPurpose = (typeof OTP_PURPOSES)[keyof typeof OTP_PURPOSES]

export const verifyOtpSchema = z.object({
  email: z.email('Format email tidak valid').min(1, 'Email wajib diisi'),
  otp: z.string().length(6, 'Kode OTP harus 6 digit'),
  purpose: z.enum([
    OTP_PURPOSES.EMAIL_VERIFICATION,
    OTP_PURPOSES.RESET_PASSWORD,
    OTP_PURPOSES.LOGIN,
  ]),
})

export const forgotPasswordSchema = z.object({
  email: z.email('Format email tidak valid').min(1, 'Email wajib diisi'),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token reset wajib diisi'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>

export const authResponseDataSchema = z.object({
  user: userSchema,
  token: z.string(),
  refreshToken: z.string().optional(),
})

export type AuthTokens = z.infer<typeof authTokensSchema>
export type LoginDto = z.infer<typeof loginSchema>
export type RegisterDto = z.infer<typeof registerSchema>
export type AuthResponseData = z.infer<typeof authResponseDataSchema>
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>
