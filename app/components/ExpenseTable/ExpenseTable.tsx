import React from "react";
import moment from "moment";
import {Tile, TileImage} from "@/app/components/ui/Tile";
import { Coffee } from "lucide-react";

  import { Expense, ExpenseTableProps } from "./ExpenseInterface"; 
  
  const  ExpenseTable:React.FC<ExpenseTableProps> = ({expenses}) =>{
    return (
      <div className="container flex flex-row space-y-10 w-full p-4">
          {expenses.map((expense:any, key:number) => (
              <Tile className="w-full">
                <TileImage>
                    <Coffee width={18} height={18} />
                </TileImage>
              </Tile>
          ))}
      </div>
    )
  }


  export default ExpenseTable;