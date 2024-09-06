import ky from 'ky'
import cookiesNext from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookieStore = serverCookies
        }

        // const token = cookiesNext.getCookie('token', { cookies: cookieStore })
        const token = cookiesNext.getCookie('token', { cookies: cookieStore })

        // console.log({ token })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
