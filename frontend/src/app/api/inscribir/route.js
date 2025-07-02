'use server'

import { verifySession } from '@/app/utils/cookies-service'
import { fetchWithAuth } from '@/app/utils/fetchWithAuth'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    const inscripcion = await request.json()
    const now = new Date().toISOString()
    const { user_id } = await verifySession()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...inscripcion, fecha_inscripcion: now, usuario_id: user_id})
    }
  
    const res = await fetchWithAuth(`${process.env.APIURL}/inscripciones/`, options)

    if (res.status !== 200) return NextResponse.json({ ok: false, message: "No hay mas cupos disponibles", status: 404 })

    return NextResponse.json({ ok: true, status: 200 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}
