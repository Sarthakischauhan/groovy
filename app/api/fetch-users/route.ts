import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'
import { auth } from "utils/auth"

export async function POST(req:Request){

    console.log(req.headers.get("cookie"))
    
    const session = await auth();
    if (!session){
        return new NextResponse("Unauthorized", {status:400})
    }
    
    const requestData = await req.json()
    const { email } = requestData
    
    const { data, error } = await supabase.from("users")
    .select("*").
    eq("email", email).
    single();

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