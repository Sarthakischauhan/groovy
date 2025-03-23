import ExpenseTable from "./components/ExpenseTable/ExpenseTable";
import { auth } from "utils/auth";
import supabase from "utils/supabase";
import { Expense } from "@/components/ExpenseTable/ExpenseInterface";
import { ManagementHeader } from "./components/ManagementHeader";
import { getDateWeekBack } from "utils/utils";
export const revalidate = 60;
import { SessionProvider } from "next-auth/react";

const fetchUserData = async (email : string) => {
  try{
    const response = await fetch(process.env.URL + "/api/fetch-users", {
      method: 'POST',
      body: JSON.stringify({
        email : email
      })
    })
    if (response.status == 200 ){
      const { user, error } = await response.json()
      return user 
    }
  }
  catch (err){
    console.log(err)
  }
};


const fetchExpensesData = async (userId : number) => {
  try{
    const response = await fetch(process.env.URL + "/api/fetch-expenses", {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        date_posted: getDateWeekBack()
      })
    })
    if (response.status == 200 ){
      const { expenses, error } = await response.json()
      return expenses
    }
  }
  catch (err){
    console.log(err)
  }
};

export default async function Home() {
  const session = await auth();
  let userData = null;
  let expenses = [] as Expense[];
  if (session) {
    userData = await fetchUserData(session?.user?.email as string);
    if (userData?.id) {
      expenses = await fetchExpensesData(userData.id);
    }
  }

  return (
    <>
      <SessionProvider session={session}>
        {(userData && session?.user?.isLoggedIn) ? (
          <div className="sm:w-9/10 md:w-4/5 lg:w-3/5 mx-auto">
            <ManagementHeader users={[userData]} />
            <div className="w-full">
              <h1 className="w-full p-4 text-l md:text-3xl font-semibold font-inter">Recent Expense</h1>
              <ExpenseTable expenses={expenses ? expenses : []} />
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p>Please sign in to view your expenses.</p>
          </div>
        )}
      </SessionProvider>
    </>
  );
}
