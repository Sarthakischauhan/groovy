"use client";

import { SessionProvider } from "next-auth/react";
import { auth } from "./auth"
export interface AuthContextProps {
  children: React.ReactNode;
}

export default  function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider refetchInterval={0}>{children}</SessionProvider>;
}