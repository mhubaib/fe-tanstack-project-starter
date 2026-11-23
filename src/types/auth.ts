export interface User {
  id: string
  name: string
  email: string
  avatar?: string | null
  role?: string
  createdAt?: string
  updatedAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn?: number
}

export interface LoginDto {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterDto {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

export interface VerifyOtpDto {
  email: string
  otp: string
}

export interface ForgotPasswordDto {
  email: string
}

export interface ResetPasswordDto {
  token: string
  password: string
  confirmPassword?: string
}

export interface AuthResponseData {
  user: User
  token: string
  refreshToken?: string
}
