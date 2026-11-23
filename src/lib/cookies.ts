export const DEFAULT_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export const COOKIE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
} as const

export interface CookieOptions {
  path?: string
  maxAge?: number
  sameSite?: 'Lax' | 'Strict' | 'None'
  secure?: boolean
}

/**
 * Get a cookie value by name.
 * Supports passing customCookieString for SSR / server contexts.
 */
export function getCookie(
  name: string,
  customCookieString?: string,
): string | undefined {
  const cookieSource =
    customCookieString ??
    (typeof document !== 'undefined' ? document.cookie : undefined)

  if (!cookieSource) return undefined

  const value = `; ${cookieSource}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    if (!cookieValue) return undefined
    try {
      return decodeURIComponent(cookieValue)
    } catch {
      return cookieValue
    }
  }

  return undefined
}

/**
 * Set a cookie in the browser document.
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  if (typeof document === 'undefined') return

  const {
    path = '/',
    maxAge = DEFAULT_COOKIE_MAX_AGE,
    sameSite = 'Lax',
    secure = typeof window !== 'undefined' &&
      window.location.protocol === 'https:',
  } = options

  const encodedValue = encodeURIComponent(value)
  let cookieString = `${name}=${encodedValue}; path=${path}; max-age=${maxAge}; SameSite=${sameSite}`
  if (secure) {
    cookieString += '; Secure'
  }

  document.cookie = cookieString
}

/**
 * Remove a cookie from the browser document.
 */
export function removeCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; path=${path}; max-age=0; SameSite=Lax`
}

/* =========================================================================
   Authentication Specific Cookie Helpers
   ========================================================================= */

export function getAuthToken(customCookieString?: string): string | undefined {
  return getCookie(COOKIE_KEYS.TOKEN, customCookieString)
}

export function setAuthToken(token: string, maxAge?: number): void {
  setCookie(COOKIE_KEYS.TOKEN, token, { maxAge })
}

export function removeAuthToken(): void {
  removeCookie(COOKIE_KEYS.TOKEN)
}

export function getAuthRefreshToken(
  customCookieString?: string,
): string | undefined {
  return getCookie(COOKIE_KEYS.REFRESH_TOKEN, customCookieString)
}

export function setAuthRefreshToken(
  refreshToken: string,
  maxAge?: number,
): void {
  setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, { maxAge })
}

export function removeAuthRefreshToken(): void {
  removeCookie(COOKIE_KEYS.REFRESH_TOKEN)
}

export function getAuthUser<T = unknown>(
  customCookieString?: string,
): T | null {
  const raw = getCookie(COOKIE_KEYS.USER, customCookieString)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function setAuthUser<T = unknown>(user: T, maxAge?: number): void {
  setCookie(COOKIE_KEYS.USER, JSON.stringify(user), { maxAge })
}

export function removeAuthUser(): void {
  removeCookie(COOKIE_KEYS.USER)
}

/**
 * Clear all authentication cookies at once.
 */
export function clearAuthCookies(): void {
  removeAuthToken()
  removeAuthRefreshToken()
  removeAuthUser()
}
