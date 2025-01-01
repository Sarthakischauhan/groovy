"use client"
import {useState} from "react"
import { CardSelectProps, Option } from "./interfaces/SelectCardInterface";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "./Button";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export function SelectCard({ options, onSelect }: CardSelectProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null)
  
    const handleSelect = (id: string) => {
      setSelectedId(id)
    }
  
    const handleContinue = () => {
      if (selectedId) {
        onSelect(selectedId)
      }
    }
  
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all ${
                selectedId === option.id
                  ? "border-primary shadow-lg"
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleSelect(option.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {option.icon}
                  {option.title}
                </CardTitle>
                <CardDescription>{option.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add any additional content here if needed */}
              </CardContent>
              <CardFooter className="justify-end">
                {selectedId === option.id && (
                  <div className="w-4 h-4 rounded-full bg-primary" />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedId}
            className="gap-2 rounded-full h-12 w-12 primary"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }
  