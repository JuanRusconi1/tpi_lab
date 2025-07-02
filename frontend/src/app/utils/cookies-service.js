import 'server-only'
import { cookies } from 'next/headers'
import { encrypt, decrypt } from './jwt-service.js'

export async function createSession (object) {
  const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
  const session = await encrypt({ object, expires })
  cookies().set('authToken', session, { httpOnly: true, expires, secure: true })
}

export async function verifySession () {
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('authToken')
    const { object, expires } = await decrypt(cookie?.value)

    if (!object) {
      return false
    }
    if (new Date(expires) < new Date()) {
      return false
    }
    return object
  } catch (error) {
    return false
  }
}

export function getCookie (name) {
  const cookie = cookies().get(name)?.value
  return cookie || null
}

export async function deleteCookie (name) {
  return cookies().delete(name)
}
