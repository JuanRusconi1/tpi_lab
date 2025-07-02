import { getCookie, verifySession } from './cookies-service'

export async function fetchWithAuth (url, options = {}) {
  const cookie = await verifySession()
  const authToken = cookie?.access_token

  if (!authToken) {
    throw new Error('No se encontro el token de acceso')
  }
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
}
