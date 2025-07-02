import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const key = new TextEncoder().encode(process.env.SECRET_KEY)

export async function encrypt (payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7day')
    .sign(key)
}

export async function decrypt (token) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    return null
  }
}
