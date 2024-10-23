let cookies: Record<string, string> = {}

export const getCookies = (fresh = false): Record<string, string> => {
  if (fresh) {
    cookies = {}
  }

  if (Object.keys(cookies).length === 0 && document.cookie !== '') {
    for (const cookie of document.cookie.split(';')) {
      const match = cookie.trim().match(/([^=]+)=(.+)/)
      if (match === null || match.length < 3) {
        continue
      }

      cookies[match[1]] = match[2]
    }
  }

  return cookies
}

export const getCookie = (name: string, fresh = false): null | string => {
  return getCookies(fresh)[name] ?? null
}

export interface CookieOptions {
  path?: string
  expires?: Date
  maxAge?: number
  secure?: boolean
  sameSite?: string
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  const cookie: string[] = []
  cookie.push(`${name}=${value}`)
  if (options.path !== undefined) {
    cookie.push(`Path=${options.path}`)
  }
  if (options.maxAge !== undefined) {
    cookie.push(`Max-Age=${options.maxAge}`)
  }
  if (options.expires !== undefined) {
    cookie.push(`Expires=${options.expires.toUTCString()}`)
  }
  if (options.secure === true) {
    cookie.push('Secure')
  }
  if (options.sameSite !== undefined) {
    cookie.push(`SameSite=${options.sameSite}`)
  }

  document.cookie = cookie.join(';')
}

export const deleteCookie = (name: string): void => {
  setCookie(name, '', Object.assign({ maxAge: 0 }))
}
