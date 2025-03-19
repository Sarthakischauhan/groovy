export interface Expense{
    amount: number;
    necessary: boolean;
    date_posted: string;
    type:string;
    name:string;
    emoji:string;
}

export interface ExpenseTableProps {
    expenses : Expense[];
}
export interface ExpenseSheetProps {
    expense: Expense;
  }