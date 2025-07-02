import { NextResponse } from "next/server"
import { verifySession } from "./app/utils/cookies-service"

export async function middleware (req) {
  const { pathname } = req.nextUrl
  const user = await verifySession()
  if (user && (pathname === "/ingresar" || pathname === "/registrarme")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (!user && pathname === "/") {
    return NextResponse.redirect(new URL("/ingresar", req.url))
  }

  if (!user && (pathname === "/ingresar" || pathname === "/registrarme")) {
    return NextResponse.next()
  }

  if (!user) {
    return NextResponse.redirect(new URL("/ingresar", req.url))
  }
  const accessRules = {
    // Administrador: ["/dashboard"],
    Administrador: ["/dashboard"],
    Cliente: ["/", "/perfil", "/evento"],
  }
  const userCategory = user.rol
  const allowedRoutes = accessRules[userCategory] || []
  if (!allowedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url))
  }


  if (userCategory === "Administrador" && pathname.startsWith("/eventos")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/ingresar", "/registrarme", "/perfil", "/evento/:path*", "/dashboard/:path*"]
}
