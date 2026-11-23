import axios from 'axios'
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { clearAuthCookies, getAuthToken } from '#/lib/cookies'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

// Request Interceptor: Attach Auth Token from Cookie
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error),
)

// Response Interceptor: Handle Global 401 and Response Formatting
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAuthCookies()

      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        const isAuthRoute =
          currentPath.includes('/login') ||
          currentPath.includes('/register') ||
          currentPath.includes('/verify-otp') ||
          currentPath.includes('/forgot-password') ||
          currentPath.includes('/reset-password')

        if (!isAuthRoute) {
          const redirectQuery = encodeURIComponent(
            currentPath + window.location.search,
          )
          window.location.href = `/login?redirect=${redirectQuery}`
        }
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
