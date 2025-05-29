import { getCookie, setCookie } from './cookies'
import { apiClient } from './api'

const CSRF_TOKEN_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

let csrfToken: string | null = null

export const getCsrfToken = (): string | null => {
  return getCookie(CSRF_TOKEN_COOKIE)
}

export const setCsrfToken = (token: string): void => {
  setCookie(CSRF_TOKEN_COOKIE, token, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}

export const getCsrfHeader = (): { [key: string]: string } => {
  const token = getCsrfToken()
  return token ? { [CSRF_HEADER]: token } : {}
}

export async function refreshCsrfToken() {
  try {
    const response = await apiClient.get('/auth/csrf-token')
    csrfToken = response.data.token
    return csrfToken
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error)
    throw error
  }
} 