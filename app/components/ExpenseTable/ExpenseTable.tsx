import React from "react";
import moment from "moment";
import {Tile, TileImage, TileInfo, TileSecondInfo} from "@/components/ui/Tile";
import { Coffee, ShoppingCart, DollarSign, Trash2, Edit2} from "lucide-react";
import { Badge } from "@/components/ui/Badge"
import { ExpenseSheet } from "./ExpenseSheet";


import { Expense, ExpenseTableProps } from "./ExpenseInterface"; 
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Food':
      return <Coffee className="h-5 w-5" />
    case 'Groceries':
      return <ShoppingCart className="h-5 w-5" />
    default:
      return <DollarSign className="h-5 w-5" />
  }
}


const  ExpenseTable:React.FC<ExpenseTableProps> = ({expenses}) =>{
  return (
    <div className="w-full mx-auto p-4 space-y-4 font-inter">
      {expenses.map((expense, expenseID) => (
        <Tile 
          key={expenseID} 
          className="flex group items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <TileImage>
              <div className={`p-2 rounded-full ${expense.necessary ? 'bg-green-100' : 'bg-red-100'}`}>
                {expense.emoji  ? expense.emoji : getCategoryIcon(expense.type)} 
              </div>
            </TileImage>
            <TileInfo>
              <h2 className="font-bold text-lg">{expense.name}</h2>
              <p className="text-sm text-gray-500">
                {moment(expense.date_posted).parseZone().calendar() }
              </p>
            </TileInfo>
          </div>
          <TileSecondInfo className="flex items-center space-x-4">
            <Badge variant={expense.necessary ? "secondary" : "outline"} className={`${expense.necessary ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {expense.necessary ? 'Needed' : 'Not Needed'}
            </Badge>
            <p className="font-bold">${expense.amount.toFixed(2)}</p>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
              <ExpenseSheet expense={expense} />
            </div>
          </TileSecondInfo>
        </Tile>
      ))}
    </div>
  )
}


export default ExpenseTable;