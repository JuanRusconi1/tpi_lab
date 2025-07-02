import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    const user = await request.json()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
  
    const res = await fetchWithAuth(`${process.env.APIURL}/usuarios/`, options)

    if (res.status !== 200) {
      return NextResponse.json({ message: 'No puedes ingresar este email' }, { status: 422 })
    }

    return NextResponse.json({ ok: true, status: 200 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}

export async function PUT(request) {
  try {
    const user = await request.json()

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
  
    const res = await fetchWithAuth(`${process.env.APIURL}/usuarios/${user.id}`, options)
    if (res.status !== 200) {
      return NextResponse.json({ message: 'No puedes ingresar este email' }, { status: 422 })
    }

    return NextResponse.json({ ok: true, status: 200 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await fetchWithAuth(`${process.env.APIURL}/usuarios/${id}`, options);
    if (res.status !== 200) {
      return NextResponse.json({ message: 'No puedes eliminar este usuario' }, { status: 422 });
    }

    return NextResponse.json({ ok: true, status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ ok: false, message: error.message, status: 500 });
  }
}