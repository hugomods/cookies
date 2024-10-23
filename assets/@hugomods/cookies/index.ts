let cookies: Record<string, string> = {}

export const getCookies = (fresh = false): Record<string, string> => {
  if (fresh) {
    cookies = {}
  }

  if (Object.keys(cookies).length === 0 && document.cookie !== '') {
    for (let cookie of document.cookie.split(';')) {
      const match = cookie.trim().match(/([^=]+)=(.+)/)
      if (match === null || match.length < 3) {
        continue
      }
  
      cookies[match[1]] = match[2]
    }
  }

  return cookies
}
 
export const getCookie = (name: string, fresh = false): null|string => {
  return getCookies(fresh)[name] ?? null
}

export const setCookie = (name: string, value: string, options: Record<string, number|string> = {}): void => {
  const cookie: string[] = []
  cookie.push(`${name}=${value}`)
  if (options.hasOwnProperty('path')) {
    cookie.push(`Path=${options.path}`)
  }
  if (options.hasOwnProperty('maxAge')) {
    cookie.push(`Max-Age=${options.maxAge}`)
  }
  if (options.hasOwnProperty('expires')) {
    cookie.push(`Expires=${options.expires}`)
  }
  if (options.secure) {
    cookie.push('Secure')
  }
  if (options.hasOwnProperty('sameSite')) {
    cookie.push(`SameSite=${options.sameSite}`)
  }

  document.cookie = cookie.join(';')
}

export const deleteCookie = (name: string, options: Record<string, number|string> = {}): void => {
  setCookie(name, '', Object.assign(options, {maxAge: 0}))
}
