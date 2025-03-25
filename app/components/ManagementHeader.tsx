"use client"
import React, {useState} from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent,  CardFooter } from './ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/Carousel"
import { Wallet, ArrowUpIcon, CalendarIcon, TrendingUpIcon, ChevronLeftCircle } from "lucide-react";
import supabase from "utils/supabase";
import Greeting from './Greeting';
import useModal from "@/hooks/useModal"
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/Dialog';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Expense } from './ExpenseTable/ExpenseInterface';
import { useSession } from "next-auth/react"
import { DatePicker } from './ui/DatePicker';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Checkbox } from './ui/checkbox';

interface FormDataInterface {
  amount: number;
  necessary: boolean;
  date_posted: string;
  type:string;
  name:string;
} 

export const ManagementHeader = ({users}) => {
  const {data: session, status } = useSession() 
  const { currentMode, handleModal, isActive, setIsActive } = useModal();
  const [ necessaryChecked, setNecessaryChecked ] = useState(false);
  const {current_credit,incoming_income, current_balance, name, estimated_expenses} = users && users[0];
  const [formData, setFormData] = React.useState<FormDataInterface>({
    amount: 0,
    necessary: false,
    date_posted: "",
    type:"",
    name:"",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const enrichResponse = await fetch("/api/enrich",{
        method: 'POST',
        body: JSON.stringify({
          name: formData.name
        })
      })
      const { name, emoji } = await enrichResponse.json()

      const dateToSubmit = formData.date_posted 
        ? new Date(formData.date_posted).toISOString()
        : new Date().toISOString();

      const insertResponse = await fetch("/api/add-expenses/manual/",{
        method: 'POST', 
        body: JSON.stringify({
            amount: Number(formData.amount), 
            necessary: necessaryChecked,
            date_posted: dateToSubmit,
            type: "credit",
            name: name,
            user_id: session?.user?.id?.toString(), 
            emoji: emoji 
        })
      }) 
      
      const { status, data, error} = await insertResponse.json()

      if (error) throw error;

      console.log('Data inserted successfully:');
      setIsActive(false);
      setFormData({ // Reset form after successful submission
        amount: 0,
        necessary: false,
        date_posted: "",
        type: "",
        name: "",
      });
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleSubmitIncome = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;
    try{
      const { data, error } = await supabase
      .from('users')
      .update({
        current_balance: Number(current_balance) + Number(formData.amount)
      })
      .eq("id",session?.user?.id)

      if (error) throw error;

      console.log("Income updated successfuly");
      setIsActive(false)
      setFormData({ // Reset form after successful submission
        amount: 0,
        necessary: false,
        date_posted: "",
        type: "",
        name: "",
      });
    } catch(error){
      console.log("Error while updating income", error);
    }
  };

  const tiles = [
    { key:1, title: "Current Credit", icon: <ArrowUpIcon className="h-4 w-4 text-red-500" />, amount:current_credit, actions:[<Button key={1} onClick={(e) => handleModal(true, "addExpense")}>Add Expense</Button>] },
    { key:2,title: "Current Balance", icon: <Wallet className="h-4 w-4 text-green-500" />, amount:current_balance, actions:[<Button key={2} onClick={(e) => handleModal(true, "addIncome")}>Add Income</Button>]},
    { key:3,title: "Estimated Income", icon: <TrendingUpIcon className="h-4 w-4 text-purple-500" />, amount:incoming_income, actions:[<Button key={3} onClick={(e) => handleModal(true, "addIncome")}>Add Income</Button>]},
    { key:4,title: "Estimates expenses", icon: <CalendarIcon className="h-4 w-4 text-blue-500" />, amount:estimated_expenses, actions:[<Button key={4} onClick={(e) => handleModal(true,"addExpense")}>Add Expense</Button>] },
  ]
  return (
    <>
      <Greeting name={name} existingUser={session?.user?.isOnboarded} />
      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full p-4"
    >
      <CarouselContent>
        {tiles.map((item, index) => (
          <CarouselItem key={item.key} className="md:basis-1/2">
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
          <form onSubmit={currentMode === "addExpense" ? handleSubmitExpense : handleSubmitIncome}>
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label htmlFor="item" className="text-right">Name</Label>
                <Input id="item" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3 rounded-sm focus:outline-none" />
              </div>
              <div>
                <Label htmlFor="money" className="text-right">Amount</Label>
                <Input id="money" name="amount" type="number" value={formData.amount} onChange={handleInputChange} className="col-span-3 rounded-sm focus:outline-none" />
              </div>
              <div>
                <Label htmlFor="time" className="text-right">Time</Label>
                <Input id="time" name="date_posted" type="datetime-local" value={formData.date_posted} onChange={handleInputChange} className="col-span-3" />
                {/* <DatePicker /> */}
              </div>  
            </div>
            <DialogFooter className='flex sm:justify-between justify-between sm:flex'>
              {currentMode === 'addExpense' && (
                  <div className='flex items-center space-x-2'>
                    <Checkbox id="necessity" name="necessary" checked={necessaryChecked} onCheckedChange={() => setNecessaryChecked(!necessaryChecked)} />
                    <Label htmlFor="necessary" className="text-right text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Was this necessary?</Label>
                  </div>
                )}
              <Button type="submit" className="w-2/5 rounded-full items-center">
                Add
                <ChevronRightIcon />
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}
