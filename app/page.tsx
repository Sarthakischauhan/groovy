import Navbar from "./components/Navbar/Navbar";
import data from './data/dummy.js';
import ExpenseTable from "./components/ExpenseTable/ExpenseTable";
import { auth } from "@/utils/auth";
import supabase from "@/utils/supabase";
import {Expense} from "@/app/components/ExpenseTable/ExpenseInterface";
import { ManagementHeader } from "./components/ManagementHeader";
import { getDateWeekBack } from "@/utils/utils";


export const revalidate = 60;
export default async function Home() {
  const name  = auth.name;
  const { money } = data;

  let { data: expenses, error } = await supabase
  .from('expenses')
  .select('*')
  .gte("date_posted", getDateWeekBack()) 
  .order('date_posted', {ascending: false});

  const {data: users, error:userError} = await supabase.from("users").select("*").eq("id",2); 
  return (
    <>
      <div className="sm:w-9/10 md:w-3/5 mx-auto">
        <ManagementHeader users={users} />
        <div className="w-full">

            <h1 className="w-full p-4 text-l md:text-3xl font-semibold font-inter">Recent Expense</h1>
            <ExpenseTable expenses={expenses as Expense[]} />
        </div>
      </div>
    </>
  );
}