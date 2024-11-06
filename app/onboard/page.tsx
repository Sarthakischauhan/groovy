import { SessionProvider } from "next-auth/react";
import OnBoarding from "./onboard";
import { auth } from "@/utils/auth";

export default async function FinancialOnboarding() {
  const session = await auth(); 
  return (
    <SessionProvider session={session}>
      <OnBoarding />
    </SessionProvider>
  )
}