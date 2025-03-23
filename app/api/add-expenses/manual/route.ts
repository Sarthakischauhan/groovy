import { NextResponse } from 'next/server'
import supabase from 'utils/supabase'
import { createExpenseSchema } from '../validations'

export async function POST(req:Request){
    const requestData = await req.json()
    const validatedData = createExpenseSchema.parse(requestData)
    const { amount, necessary, date_posted, type, user_id, name, emoji } = validatedData 

    const { data: insertedData, error } = await supabase
    .from('expenses')
    .insert([
      {
        amount: amount, 
        necessary: necessary,
        date_posted: date_posted,
        type: "credit",
        name: name,
        user_id: user_id, 
        emoji: emoji 
      }
    ])
    if (error){
        return new NextResponse(
            JSON.stringify({ error: error.message }), 
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new NextResponse(
      JSON.stringify({ success: true, data: insertedData }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}