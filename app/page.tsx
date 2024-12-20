import ExpenseTable from "./components/ExpenseTable/ExpenseTable";
import { auth } from "utils/auth";
import supabase from "utils/supabase";
import { Expense } from "@/components/ExpenseTable/ExpenseInterface";
import { ManagementHeader } from "./components/ManagementHeader";
import { getDateWeekBack } from "utils/utils";
export const revalidate = 60;
import { SessionProvider } from "next-auth/react";

const fetchUserData = async (email : string) => {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  if (error) {
    console.error("User fetch error:", error.message);
    return null;
  }
  return data;
};


const fetchExpensesData = async (userId : number) => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .gte("date_posted", getDateWeekBack())
    .order("date_posted", { ascending: false });
  if (error) {
    console.error("Expenses fetch error:", error.message);
    return [];
  }
  return data;
};

export default async function Home() {
  const session = await auth();
  let userData = null;
  let expenses = [] as Expense[];
  if (session) {
    userData = await fetchUserData(session?.user?.email as string);
    if (userData) {
      expenses = await fetchExpensesData(2);
    }
  }

  return (
    <>
      <SessionProvider session={session}>
        {(userData && session?.user?.isLoggedIn) ? (
          <div className="sm:w-9/10 md:w-3/5 mx-auto">
            <ManagementHeader users={[userData]} />
            <div className="w-full">
              <h1 className="w-full p-4 text-l md:text-3xl font-semibold font-inter">Recent Expense</h1>
              <ExpenseTable expenses={expenses} />
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
