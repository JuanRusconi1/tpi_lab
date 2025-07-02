import { NextResponse } from 'next/server'
import { deleteCookie } from '@/app/utils/cookies-service'

export async function GET () {
  try {
    await deleteCookie('authToken')

    return NextResponse.json({ ok: true }, { status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ ok: false, message: 'Problemas de conexion, Intente nuevamente' })
  }
}
