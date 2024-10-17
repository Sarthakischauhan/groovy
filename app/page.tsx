import Navbar from "./components/Navbar/Navbar";
import data from './data/dummy.js';
import ExpenseTable from "./components/ExpenseTable/ExpenseTable";

import supabase from "@/utils/supabase";
import {Expense} from "@/app/components/ExpenseTable/ExpenseInterface";
import { ManagementHeader } from "./components/ManagementHeader";

export const revalidate = 60;
export default async function Home() {
  const userName = "Sarthak Chauhan";
  const { money } = data;

  let { data: expenses, error } = await supabase
  .from('expenses')
  .select('*').order('date_posted', {ascending: false});
  
  return (
    <>
      <div className="sm:w-9/10 md:w-3/5 mx-auto">
        <ManagementHeader />
        <div className="w-full">
            <h1 className="w-full p-4 text-l md:text-3xl font-semibold font-inter">Recent Expense</h1>
            <ExpenseTable expenses={expenses as Expense[]} />
        </div>
      </div>
    </>
  );
}