'use server'

import { NextResponse } from 'next/server'
import { createSession } from '@/app/utils/cookies-service'

export async function POST (request) {
  try {
    const { username, password } = await request.json()
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    }

  
    const res = await fetch(`${process.env.APIURL}/login/`, options)
    if (res.status !== 200) {
      return NextResponse.json({ message: 'Credenciales invalidas' }, { status: 401 })
    }
    const body = await res.json()
    const { access_token, user_id, rol } = body

    await createSession({ access_token, user_id, rol })
    const redirect = rol === 'Administrador' ? "/dashboard" : "/"
    return NextResponse.json({ ok: true, status: 200, redirect })
  } catch (error) {
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}
