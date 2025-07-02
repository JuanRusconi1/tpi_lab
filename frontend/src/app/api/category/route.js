import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    const category = await request.json()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    }
  
    await fetchWithAuth(`${process.env.APIURL}/categorias_evento/`, options)

    return NextResponse.json({ ok: true, status: 200 })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, message: error.message, status: 500 })
  }
}

export async function PUT(request) {
  try {
    const category = await request.json()

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    }
  
    await fetchWithAuth(`${process.env.APIURL}/categorias_evento/${category.id}`, options)

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

    const res = await fetchWithAuth(`${process.env.APIURL}/categorias_evento/${id}`, options);
    if (res.status !== 200) {
      return NextResponse.json({ message: 'No puedes eliminar esta categoria' }, { status: 403 });
    }

    return NextResponse.json({ ok: true, status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ ok: false, message: error.message, status: 500 });
  }
}