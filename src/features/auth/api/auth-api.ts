import { apiClient } from '#/lib/api-client'
import type {
  ApiResponse,
  AuthResponseData,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  User,
  VerifyOtpDto,
} from '#/types'

export const authApi = {
  /**
   * Login user with email & password
   */
  async login(payload: LoginDto): Promise<ApiResponse<AuthResponseData>> {
    try {
      return await apiClient.post<unknown, ApiResponse<AuthResponseData>>(
        '/auth/login',
        payload,
      )
    } catch (error) {
      // If endpoint is not yet mounted on backend, fallback to dev mockup simulation
      if (import.meta.env.DEV) {
        console.warn(
          '[Dev Mode Fallback] POST /auth/login fallback simulated. Returning mock user session.',
        )
        return {
          status: 'success',
          code: 200,
          message: 'Login successful (Dev Mock)',
          data: {
            token: 'mock-access-token-' + Date.now(),
            user: {
              id: 'user-1',
              name: payload.email.split('@')[0] || 'User Demo',
              email: payload.email,
              role: 'user',
              createdAt: new Date().toISOString(),
            },
          },
        }
      }
      throw error
    }
  },

  /**
   * Register new user
   */
  async register(payload: RegisterDto): Promise<ApiResponse<AuthResponseData>> {
    try {
      return await apiClient.post<unknown, ApiResponse<AuthResponseData>>(
        '/auth/register',
        payload,
      )
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Dev Mode Fallback] POST /auth/register fallback simulated.',
        )
        return {
          status: 'success',
          code: 201,
          message: 'Registration successful (Dev Mock)',
          data: {
            token: 'mock-access-token-' + Date.now(),
            user: {
              id: 'user-' + Date.now(),
              name: payload.name,
              email: payload.email,
              role: 'user',
              createdAt: new Date().toISOString(),
            },
          },
        }
      }
      throw error
    }
  },

  /**
   * Verify OTP code
   */
  async verifyOtp(
    payload: VerifyOtpDto,
  ): Promise<ApiResponse<AuthResponseData>> {
    try {
      return await apiClient.post<unknown, ApiResponse<AuthResponseData>>(
        '/auth/verify-otp',
        payload,
      )
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Dev Mode Fallback] POST /auth/verify-otp fallback simulated.',
        )
        return {
          status: 'success',
          code: 200,
          message: 'OTP verified successfully (Dev Mock)',
          data: {
            token: 'mock-access-token-' + Date.now(),
            user: {
              id: 'user-1',
              name: 'Verified User',
              email: payload.email,
              role: 'user',
              createdAt: new Date().toISOString(),
            },
          },
        }
      }
      throw error
    }
  },

  /**
   * Resend OTP code
   */
  async resendOtp(email: string): Promise<ApiResponse<null>> {
    try {
      return await apiClient.post<unknown, ApiResponse<null>>(
        '/auth/resend-otp',
        { email },
      )
    } catch (error) {
      if (import.meta.env.DEV) {
        return {
          status: 'success',
          code: 200,
          message: 'OTP resent successfully (Dev Mock)',
          data: null,
        }
      }
      throw error
    }
  },

  /**
   * Request password reset link / email
   */
  async forgotPassword(payload: ForgotPasswordDto): Promise<ApiResponse<null>> {
    try {
      return await apiClient.post<unknown, ApiResponse<null>>(
        '/auth/forgot-password',
        payload,
      )
    } catch (error) {
      if (import.meta.env.DEV) {
        return {
          status: 'success',
          code: 200,
          message: 'Password reset link sent (Dev Mock)',
          data: null,
        }
      }
      throw error
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(payload: ResetPasswordDto): Promise<ApiResponse<null>> {
    try {
      return await apiClient.post<unknown, ApiResponse<null>>(
        '/auth/reset-password',
        payload,
      )
    } catch (error) {
      if (import.meta.env.DEV) {
        return {
          status: 'success',
          code: 200,
          message: 'Password reset successfully (Dev Mock)',
          data: null,
        }
      }
      throw error
    }
  },

  /**
   * Get authenticated user profile
   */
  async getMe(): Promise<ApiResponse<User>> {
    return await apiClient.get<unknown, ApiResponse<User>>('/auth/me')
  },

  /**
   * Logout user session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // Ignore API logout error if token already expired
    }
  },
}
