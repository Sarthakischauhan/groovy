import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/utils/auth";

export async function middleware(req: NextRequest) {
  const session = await auth(); // Validate session
  
  const userOnboarded = session?.user?.isOnboarded ?? null
  const userLoggedIn = session?.user?.isLoggedIn ?? null
  // Redirect to login if there's no session and the request is for a protected route
  const pathName = req.nextUrl.pathname;
  
  if (pathName.startsWith("/onboard") && userLoggedIn) {
    if (userOnboarded){
      console.log("Condition true")
      return NextResponse.redirect(new URL("/",req.url));
    }
  } 
  return NextResponse.next();
}