import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'

export async function POST(req:Request){
    const requestData = await req.json()
    const { userId, date_posted } = requestData
    const { data , error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .gte("date_posted",date_posted)
    .order("date_posted", { ascending: false });
    if (error) {
        console.error("Expenses fetch error:", error.message);
        return NextResponse.json({ error: 'Error fetching expenses' }, { status: 500 })
    }
    return new NextResponse(
        JSON.stringify({
            expenses: data
        }),
        {status : 200}
    )
}
