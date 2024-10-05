export interface Expense{
    id: number;
    amount: number;
    necessary: boolean;
    date_posted: string;
    type:string;
    name:string;
}

export interface ExpenseTableProps {
    expenses : Expense[];
}
