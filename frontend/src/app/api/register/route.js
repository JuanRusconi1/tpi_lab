'use server'

import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    const user = await request.json()

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
  
    const res = await fetch(`${process.env.APIURL}/usuarios/`, options)
    if (res.status !== 200) {
      return NextResponse.json({ message: 'No puedes ingresar este email' }, { status: 422 })
    }

    return NextResponse.json({ ok: true, status: 200 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}
