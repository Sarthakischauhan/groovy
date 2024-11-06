"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, DollarSign, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import supabase from "@/utils/supabase"
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function OnBoarding() {
  const { data: session, status } = useSession() 
  const [step, setStep] = useState(0)
  const [financialInfo, setFinancialInfo] = useState({
    netWorth: undefined,
    creditBalance: undefined,
    estimatedIncome: undefined,
    estimatedExpenses: undefined,
  })
  const steps = [
    {
      title: "Welcome to FinTrack",
      description: "Let's gather some information to help you manage your finances better.",
    },
    {
      title: "Current Net Worth",
      description: "What's your estimated current net worth?",
      field: "netWorth",
    },
    {
      title: "Credit Balance",
      description: "What's your current net credit balance?",
      field: "creditBalance",
    },
    {
      title: "Estimated Income",
      description: "What's your estimated net income for next month?",
      field: "estimatedIncome",
    },
    {
      title: "Estimated Expenses",
      description: "What are your estimated expenses for next month?",
      field: "estimatedExpenses",
    },
    {
      title: "All Set!",
      description: "Thanks for providing your financial information.",
    },
  ]

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFinancialInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleNextStep()
  }

  const formatCurrency = (value: number) => {
    let valueInString = (value as unknown) as string
    const number = parseFloat(valueInString)
    return isNaN(number) ? '$0' : `$${number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          current_balance: financialInfo.netWorth,
          current_credit: financialInfo.creditBalance,
          incoming_income: financialInfo.estimatedIncome,
          estimated_expenses: financialInfo.estimatedExpenses,
          isOnboarded: true
        })
        .eq("email", session?.user?.email);

      if (error) {
        console.error("Error updating user:", error);
        return;
      }
      // Redirect to dashboard after successful update
      redirect("/");
    } catch (error) {
      console.error("Error in handleComplete:", error);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{steps[step].title}</CardTitle>
          <CardDescription>{steps[step].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <Button
                  onClick={handleNextStep}
                  className="w-full"
                >
                  Get Started
                  <ChevronRight className="ml-2" />
                </Button>
              )}

              {step > 0 && step < steps.length - 1 && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Label htmlFor={steps[step].field}>{steps[step].description}</Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="number"
                        id={steps[step].field}
                        name={steps[step].field}
                        value={financialInfo[steps[step].field as keyof typeof financialInfo]}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Next
                    </Button>
                  </div>
                </form>
              )}

              {step === steps.length - 1 && (
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  </motion.div>
                  <div className="space-y-2">
                    You are all set to proceed! Enjoy Groovy for all your expense tracking needs
                  </div>
                  <Button onClick={handleComplete} className="w-full">
                    Go to Dashboard
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-center">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === step ? 'bg-primary' : 'bg-gray-300'
                }`}
                initial={false}
                animate={{
                  scale: index === step ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}