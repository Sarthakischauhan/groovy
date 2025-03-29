import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'
import { auth } from "utils/auth";
import { getToken } from "next-auth/jwt"

export async function POST(req:Request){
    const requestData = await req.json()
    const { userId, date_posted } = requestData
    const session = await auth();

    if (!session){
        return new NextResponse("Unauthorized", {status:400})
    }

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
