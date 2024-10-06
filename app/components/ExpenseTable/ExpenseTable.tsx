import React from "react";
import moment from "moment";
import {Tile, TileImage, TileInfo, TileSecondInfo} from "@/app/components/ui/Tile";
import { Coffee } from "lucide-react";

  import { Expense, ExpenseTableProps } from "./ExpenseInterface"; 
  
  const  ExpenseTable:React.FC<ExpenseTableProps> = ({expenses}) =>{
    return (
      <div className="container flex flex-col w-full p-4 space-y-2 items-center">
          {expenses.map((expense:any, key:number) => (
              <Tile className={`w-full flex p-5 ${!expense.necessary ? 'bg-red-200/15' : 'bg-green-200/15'}`} key={key}>
                <TileImage className="tile-icon self-center">
                    <div className="rounded-full p-2 bg-green-500/45">
                      <Coffee width={25} height={25} />
                    </div>
                </TileImage>
                <TileInfo className="flex-1">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">
                        {expense.name}
                      </h2>
                      <h2 className="text-[14px]">
                        ${expense.amount}
                      </h2>
                    </div>
                </TileInfo>
                <TileSecondInfo className="status">
                  <div className="rounded-full  bg-green-500/45 text-center text-[12px]">
                    {!expense.necessary ? "Needed" : "Not Needed"}
                  </div>
                  <div className="date text-[12px] font-semibold">
                    {moment(new Date(expense.date_posted)).format("MMMM Do, h:mm a")}
                  </div>
                </TileSecondInfo>
              </Tile>
          ))}
      </div>
    )
  }


  export default ExpenseTable;