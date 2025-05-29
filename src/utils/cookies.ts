interface CookieOptions {
  path?: string
  domain?: string
  expires?: Date | number
  maxAge?: number
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.path) cookie += `; path=${options.path}`
  if (options.domain) cookie += `; domain=${options.domain}`
  if (options.expires) {
    const expires = options.expires instanceof Date ? options.expires : new Date(options.expires)
    cookie += `; expires=${expires.toUTCString()}`
  }
  if (options.maxAge) cookie += `; max-age=${options.maxAge}`
  if (options.secure) cookie += '; secure'
  if (options.sameSite) cookie += `; samesite=${options.sameSite}`

  document.cookie = cookie
}

export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

export const deleteCookie = (name: string, options: CookieOptions = {}): void => {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  })
} 