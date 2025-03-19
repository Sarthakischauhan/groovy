import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'

export async function POST(req:Request){
    const requestData = await req.json()
    const { email } = requestData
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
    if (error) {
        console.error("Expenses fetch error:", error.message);
        return NextResponse.json({ error: 'Error fetching expenses' }, { status: 500 })
    }
    return new NextResponse(
        JSON.stringify({
            user: data
        }),
        {status : 200}
    )
}