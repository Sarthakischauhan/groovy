import React from "react";
import moment from "moment";
import {Tile, TileImage, TileInfo} from "@/app/components/ui/Tile";
import { Coffee } from "lucide-react";

  import { Expense, ExpenseTableProps } from "./ExpenseInterface"; 
  
  const  ExpenseTable:React.FC<ExpenseTableProps> = ({expenses}) =>{
    return (
      <div className="container flex flex-col w-full p-4 space-y-2">
          {expenses.map((expense:any, key:number) => (
              <Tile className={`w-full flex p-5 ${expense.necessary ? 'bg-red-200/15' : 'bg-green-200/15'}`} key={key}>
                <TileImage className="tile-icon">
                    <div className="rounded-full p-2 bg-green-500/45">
                      <Coffee width={25} height={25} />
                    </div>
                </TileImage>
                <TileInfo className="flex-1">
                    <div className="flex flex-col">
                      <h2 className="text-[14px]">
                        {expense.name}
                      </h2>
                      <h4 className="text-[10px]">
                        {moment(new Date(expense.date_posted)).format("MMMM Do h:mm a")}
                      </h4>
                    </div>
                </TileInfo>
              </Tile>
          ))}
      </div>
    )
  }


  export default ExpenseTable;