import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/components/ui/Table";
  import moment from "moment";

  import { Expense, ExpenseTableProps } from "./ExpenseInterface"; 
  
  const  ExpenseTable:React.FC<ExpenseTableProps> = ({expenses}) =>{
    return (
      <Table>
        <TableCaption>Recent expenses for last week</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Necessary</TableHead>
            <TableHead className="w-[150px]">Date Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense:any, key:number) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell className="font-medium">{expense.amount}</TableCell>
              <TableCell>{expense.necessary ? "Yes" : "No"}</TableCell>
              <TableCell>{moment(expense.date_posted).format("hh:mm MMMM Do")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }


  export default ExpenseTable;