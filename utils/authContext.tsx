"use client";

import { SessionProvider } from "next-auth/react";
import { auth } from "./auth"
export interface AuthContextProps {
  children: React.ReactNode;
}

export default async function AuthContext({ children }: AuthContextProps) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}