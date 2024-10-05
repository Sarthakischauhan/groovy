import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent,  CardFooter } from '../ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/Carousel"
import { Wallet, ArrowUpIcon, CalendarIcon, TrendingUpIcon } from "lucide-react";
import moment from 'moment';
import supabase from "@/utils/supabase";
import Greeting from '../Greeting/Greeting';
import { Button } from '../ui/Button';

export const ManagementHeader = async() => {
  const {data: users, error} = await supabase.from("users").select("*").eq("id",2);
  const {current_credit,incoming_income, current_balance, name, estimated_expenses} = users && users[0];
  const tiles = [
    { title: "Current Credit", icon: <ArrowUpIcon className="h-4 w-4 text-red-500" />, amount:current_credit, actions:[<Button>Add Expense</Button>] },
    { title: "Current Balance", icon: <Wallet className="h-4 w-4 text-green-500" />, amount:current_balance, actions:[<Button>Add Income</Button>]},
    { title: "Estimated Income", icon: <TrendingUpIcon className="h-4 w-4 text-purple-500" />, amount:incoming_income, actions:[<Button>Add Income</Button>]},
    { title: "Estimates expenses", icon: <CalendarIcon className="h-4 w-4 text-blue-500" />, amount:estimated_expenses, actions:[] },
  ]
  return (
    <>
      <Greeting name={name} />
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-4"
    >
      <CarouselContent>
        {tiles.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.amount ?? 0}</div>
                  <p className="text-xs text-muted-foreground">
                    +0% from last month
                  </p>
                </CardContent>
                {item.actions ? 
                  <CardFooter>
                    {item.actions[0]}
                  </CardFooter>  
                :
                <></>
                }
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden lg:block md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
    </>

  )
}
