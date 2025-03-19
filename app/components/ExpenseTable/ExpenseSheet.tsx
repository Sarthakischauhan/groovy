import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/Button"
import { ArrowRight, EllipsisVertical } from "lucide-react";
import { Expense } from "./ExpenseInterface";
import moment from "moment";
import { Badge } from "@/components/ui/Badge";
import { ExpenseSheetProps } from "./ExpenseInterface";


export function ExpenseSheet({ expense }: ExpenseSheetProps) {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <EllipsisVertical className="h-4 w-4 sm:hidden" />
                        <ArrowRight className="h-4 w-4 hidden sm:block" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">{expense.emoji}</span>
                            <SheetTitle>{expense.name}</SheetTitle>
                        </div>
                        <SheetDescription className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span>Amount:</span>
                                <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Category:</span>
                                <span>{expense.type}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Date:</span>
                                <span>{moment(expense.date_posted).format('MMMM Do, YYYY')}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Status:</span>
                                <Badge variant={expense.necessary ? "secondary" : "outline"}>
                                    {expense.necessary ? 'Needed' : 'Not Needed'}
                                </Badge>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    )
}