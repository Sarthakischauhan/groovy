import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/utils/auth";

export async function middleware(req: NextRequest) {
  const session = await auth(); // Validate session
  const isAuth = !!session 
  const userOnboarded = session?.user?.isOnboarded ?? null
  const pathName = req.nextUrl.pathname;
  const allowedUnauthPaths = ["/","/login"]

  if (!isAuth){
    if (!allowedUnauthPaths.includes(pathName)){
      return NextResponse.redirect(new URL("/login",req.url))
    }
  }
  
  // Onboarding page redirection logic
  if ( pathName === "/onboard"){ 
    if (userOnboarded){
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (isAuth && !userOnboarded && pathName !== "/onboard") {
    return NextResponse.redirect(new URL("/onboard", req.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
      '/',
      '/login',
      '/onboard'
  ]
}