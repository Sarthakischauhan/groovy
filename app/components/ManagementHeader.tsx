"use client"


import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent,  CardFooter } from './ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/Carousel"
import { Wallet, ArrowUpIcon, CalendarIcon, TrendingUpIcon } from "lucide-react";
import moment from 'moment';
import supabase from "@/utils/supabase";
import Greeting from './Greeting';
import useModal from '@/app/hooks/useModal'; 
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/Dialog';
import { Input } from './ui/Input';
import { Label } from './ui/Label';



export const ManagementHeader = ({users}) => {
  
  const { currentMode, handleModal, isActive, setIsActive } = useModal();
  const {current_credit,incoming_income, current_balance, name, estimated_expenses} = users && users[0];
  const [formData, setFormData] = React.useState({
    money: '',
    reason: '',
    time: '',
    item: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsActive(false);
    // Here you would typically send the data to your backend
  };

  const tiles = [
    { title: "Current Credit", icon: <ArrowUpIcon className="h-4 w-4 text-red-500" />, amount:current_credit, actions:[<Button onClick={(e) => handleModal(true, "addExpense")}>Add Expense</Button>] },
    { title: "Current Balance", icon: <Wallet className="h-4 w-4 text-green-500" />, amount:current_balance, actions:[<Button onClick={(e) => handleModal(true, "addIncome")}>Add Income</Button>]},
    { title: "Estimated Income", icon: <TrendingUpIcon className="h-4 w-4 text-purple-500" />, amount:incoming_income, actions:[<Button onClick={(e) => handleModal(true, "addIncome")}>Add Income</Button>]},
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
    <Dialog open={isActive} onOpenChange={setIsActive}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{currentMode === 'addExpense' ? 'Add Expense' : 'Add Income'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label htmlFor="money" className="text-right">Amount</Label>
                <Input id="money" name="money" value={formData.money} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="reason" className="text-right">Reason</Label>
                <Input id="reason" name="reason" value={formData.reason} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div >
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" name="time" type="datetime-local" value={formData.time} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div>
                <Label htmlFor="item" className="text-right">Item</Label>
                <Input id="item" name="item" value={formData.item} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}
